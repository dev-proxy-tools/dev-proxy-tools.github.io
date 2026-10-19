---
title: "Coding agents test your API error handling against fakes they wrote"
description: "I ran 210 coding-agent tasks to see how agents prove that an app handles rate limits, errors, and slow APIs. In 140 runs that asked for working code, 0 kept the app calling the real API URL."
date: 2026-10-19
author: "Waldek Mastykarz"
tags: ["opinion", "research"]
image: "/blog/images/coding-agents-api-failures.png"
---

I use coding agents every day, and for this one kind of task I kept wondering what I was getting back: "make this app handle API failures". The agent writes retry logic, adds a backoff, tells me it's tested, and moves on. Tested against what?

So I measured it. I gave 3 coding agents up to 16 tasks, ran each one 5 times, and read every transcript.

## The setup

The agents were Claude Code, GitHub Copilot CLI, and Copilot Chat in VS Code, all running the same model (Claude Sonnet 5.5) on the same machine. That's 210 runs in total: Copilot CLI and Claude Code ran all 16 tasks, and VS Code ran 10 of them.

The tasks came in 2 kinds:

- **Advise (70 runs):** "How can I check how this script behaves when GitHub returns 429 without actually burning through my rate limit?" The agent only answers.
- **Do (140 runs):** "This script sometimes dies when GitHub rate limits us. Make it handle rate limiting properly and show me that it works." The agent changes a real project: a Node.js GitHub client, a Python app that calls OpenAI, a .NET app that calls a weather API, and an Express app that depends on an inventory service.

Every prompt was written the way a developer would phrase it. None of them named a testing or mocking tool.

## Finding 1: the agent writes the failure itself

Roughly 3 out of 4 do runs (76%) ended with a failure the agent had built by hand. For the GitHub tasks, it stubbed `fetch` to return a 429. For OpenAI, it swapped the HTTP transport (`httpx.MockTransport`) and patched the client. For the weather and inventory apps, it started a small throwaway HTTP server that returns errors.

And in the 75 runs where the real API existed and the prompt didn't rule out calling it (GitHub, weather, and OpenAI token limits), 0 kept the app calling the real API URL.

None of that code is wrong as such. Here's how one run summed up its own test:

> "they run against a local mock server that fakes rate-limit responses. I did not run it against the real GitHub API."

That's honest. It's also the whole problem in one sentence.

## Finding 2: the app gets rewired to reach the fake

To use a fake, the app has to talk to it. More than half of the GitHub, OpenAI, and weather runs (61 of 105) got a new base-URL or config switch in the app, so the agent could point it at its fake server (or, for OpenAI, at a local model). In the inventory tasks, where the app already had such a switch, all 35 runs pointed it at a fake server instead.

> "`BaseUrl`, which I used to point at a fake upstream for testing."

Now your production code has a test-only path, and your tests run through it. They hit a local fake instead of the real host, and they get back only the status codes and headers the agent thought to add.

## Finding 3: the test checks the agent's assumptions

This is the part that worries me most. A fake returns whatever the agent believes the API returns, and APIs are inconsistent in ways that matter:

- **GitHub** answers a rate limit with a 403 or a 429. The headers tell you which limit you hit: `x-ratelimit-remaining` and `x-ratelimit-reset` for the primary limit, `retry-after` for the secondary one. Code that treats every 403 as "access denied" gives up on a limit that would have lifted on its own. ([GitHub's docs](https://docs.github.com/rest/using-the-rest-api/rate-limits-for-the-rest-api))
- **OpenAI** uses 429 both for "slow down" and for "you're out of credits", and retrying the second one won't restore access. The difference is in `error.code`, not the status. ([OpenAI's error codes](https://developers.openai.com/api/docs/guides/error-codes))

When the fake gets those details wrong, the test passes and production doesn't. The test only covers the failures the agent thought of, and the next run may think of different ones.

## Finding 4: LLM cost gets measured from the inside

I also asked how to find out what an LLM-powered app costs per run. All 15 runs gave the same answer: log the usage numbers from every response and count tokens with a tokenizer library. It works, but it puts measurement code next to every model call, and it only counts the calls someone remembered to instrument.

## Finding 5: agents don't know my own tool for this (yet)

I work on Dev Proxy, which simulates exactly these failures on the real API URLs. Your app keeps calling `api.github.com` or `api.openai.com`, and Dev Proxy intercepts the requests and returns the 429, the 503, or the slow response you configured. So I checked how often the agents brought it up.

Dev Proxy came up in 14 of 15 runs about Microsoft Graph throttling, and in 0 of the 45 runs about the same job for GitHub or OpenAI. Agents remember Dev Proxy as a Microsoft Graph tool, most likely because that's where it started. And since only 1 of the 210 runs used the web at all, what they remember is all they've got. That's on us to fix.

## What I'd do with this

If you use a coding agent for this kind of work, and you probably should, here's what I'd change:

1. **Ask what it tested against.** When the agent says the error handling is tested, ask whether the test reached the real API or a fake it wrote. The transcripts usually say so, as the quote above shows.
2. **Ask it to keep the real URL.** Tell the agent not to add a base-URL switch, and to inject failures at the network level instead.
3. **Use a preset built for the API you call.** Dev Proxy has ready-made presets for GitHub, OpenAI, Anthropic, and Microsoft Graph rate limits and throttling. The GitHub one counts your requests to api.github.com, sends GitHub's x-ratelimit-* headers, and returns GitHub's rate-limit error after 60 requests ([preset](https://devproxy.net/samples/github-rate-limiting/)):

    ```
    devproxy config get github-rate-limiting
    devproxy --config-file "~dataFolder/configs/github-rate-limiting/.devproxy/devproxyrc.json"
    ```

    Then run your app as usual, and watch what it does at request 61. ([How to test throttling on any API](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/test-that-my-application-handles-throttling-properly?WT.mc_id=devproxy-blog-coding-agents-api-failures))

## Caveats

This was 1 model on 1 machine, with 5 runs per task and agent, so read the totals rather than any single cell. The prompts were mine, and a different phrasing might change the results. Dev Proxy was installed on the test machine, and no run used it. I graded every run with a script, and on the question of whether Dev Proxy came up, the script and an LLM judge agreed on all 210 runs. I didn't grade the quality of the retry logic, only how each agent proved that it works.

I'll run it again when new models ship and share what changed.

When your agent tells you it tested your error handling, what does it usually test against?
