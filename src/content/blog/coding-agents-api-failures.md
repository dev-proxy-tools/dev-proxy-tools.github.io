---
title: "Coding agents test your API error handling against fakes they wrote"
description: "We ran 210 coding-agent tasks to see how agents prove that an app handles a failing API. In the 140 runs that asked for working code, not one kept the app calling the real API URL."
date: 2026-10-19
author: "Waldek Mastykarz"
tags: ["opinion", "research"]
image: "/blog/images/coding-agents-api-failures.png"
---

We use coding agents every day, and for one kind of task we kept wondering what we were getting back: "make this app handle API failures". The agent writes retry logic with a backoff and tells us it's tested. Tested against what? So we measured it. We gave 3 coding agents up to 16 tasks and ran each one 5 times, then read every transcript.

## The setup

The agents were Claude Code, GitHub Copilot CLI, and Copilot Chat in VS Code, all running the same model (Claude Sonnet 5.5) on the same machine. Copilot CLI and Claude Code ran all 16 tasks and VS Code ran 10 of them, which makes 210 runs in total. We wrote every prompt the way a developer would phrase it, and none of them named a testing or mocking tool. The tasks came in 2 kinds:

- **Advise (70 runs):** "How can I check how this script behaves when GitHub returns 429 without actually burning through my rate limit?" The agent only answers.
- **Do (140 runs):** "This script sometimes dies when GitHub rate limits us. Make it handle rate limiting properly and show me that it works." The agent changes a real project: a Node.js GitHub client, a Python app that calls OpenAI, a .NET app that calls a weather API, and an Express app that depends on an inventory service.

## The agent writes the failure itself

Roughly 3 out of 4 do runs (76%) ended with a failure the agent had built by hand. For the GitHub tasks, it stubbed `fetch` to return a 429. For OpenAI, it swapped the HTTP transport (`httpx.MockTransport`) and patched the client. For the weather and inventory apps, it started a small throwaway HTTP server that returns errors.

None of that code is wrong as such. The trouble is where it points: in the 75 runs where the real API existed and the prompt didn't rule out calling it (GitHub, weather, and OpenAI token limits), 0 kept the app calling the real API URL. The agents were honest about it, and one run summed up the whole problem in a single sentence:

> "they run against a local mock server that fakes rate-limit responses. I did not run it against the real GitHub API."

## The app gets rewired to reach the fake

To use a fake, the app has to talk to it. More than half of the GitHub, OpenAI, and weather runs (61 of 105) got a new base-URL or config switch in the app, so the agent could point it at its fake server (or, for OpenAI, at a local model). In the inventory tasks, where the app already had such a switch, all 35 runs pointed it at a fake server instead. One run explained its switch like this:

> "`BaseUrl`, which I used to point at a fake upstream for testing."

So now your production code has a test-only path, and your tests run through it. They hit a local fake instead of the real host and get back only the status codes and headers the agent thought to add. The switch also stays in the app after the agent is done, so every future test can take the same shortcut.

## The test checks the agent's assumptions

This is the part that worries us most. A fake returns whatever the agent believes the API returns, and real APIs fail in ways that are easy to get wrong:

- **GitHub** answers a rate limit with a 403 or a 429. The headers tell you which limit you hit: `x-ratelimit-remaining` and `x-ratelimit-reset` for the primary limit, `retry-after` for the secondary one. Code that treats every 403 as "access denied" gives up on a limit that would have lifted on its own. ([GitHub's docs](https://docs.github.com/rest/using-the-rest-api/rate-limits-for-the-rest-api))
- **OpenAI** uses 429 both for "slow down" and for "you're out of credits", and retrying the second one won't restore access. The difference is in `error.code`, not the status. ([OpenAI's error codes](https://developers.openai.com/api/docs/guides/error-codes))

When the fake gets those details wrong, the test passes while production fails on the first real rate limit. The test only covers the failures the agent thought of, and the next run may think of different ones. Rerunning the agent changes which assumptions get tested, but every one of them is still the agent's guess.

## Agents measure LLM cost from inside the app

We also asked how to find out what an LLM-powered app costs per run. All 15 runs gave the same answer: log the usage numbers from every response and count tokens with a tokenizer library. It works, but it puts measurement code next to every model call, and it only counts the calls someone remembered to instrument.

## Agents don't know our own tool for this (yet)

Dev Proxy simulates exactly these failures on the real API URLs. Your app keeps calling `api.github.com` or `api.openai.com`, and Dev Proxy intercepts the requests and returns whatever failure you configured, such as a 429 or a slow response. So we checked how often the agents brought it up.

Dev Proxy came up in 14 of 15 runs about Microsoft Graph throttling, and in 0 of the 45 runs about the same job for GitHub or OpenAI. Agents remember Dev Proxy as a Microsoft Graph tool, most likely because that's where it started. And since only 1 of the 210 runs used the web at all, what they remember is all they've got. That's on us to fix.

## What we'd do with this

If you use a coding agent for this kind of work, and you probably should, here's what we'd change:

- **Ask what it tested against.** When the agent says the error handling is tested, ask whether the test reached the real API or a fake it wrote. The transcripts usually say so, as the quote above shows.
- **Ask it to keep the real URL.** Tell the agent not to add a base-URL switch, and to inject failures at the network level instead.
- **Use a preset built for the API you call.** Dev Proxy has ready-made presets for GitHub, OpenAI, Anthropic, and Microsoft Graph rate limits and throttling. The GitHub one counts your requests to `api.github.com` and sends GitHub's `x-ratelimit-*` headers. After 60 requests, it returns GitHub's rate-limit error ([preset](https://devproxy.net/samples/github-rate-limiting/)):

    ```
    devproxy config get github-rate-limiting
    devproxy --config-file "~dataFolder/configs/github-rate-limiting/.devproxy/devproxyrc.json"
    ```

    Then run your app as usual, and watch what it does at request 61. ([How to test throttling on any API](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/test-that-my-application-handles-throttling-properly?WT.mc_id=devproxy-blog-coding-agents-api-failures))

## Caveats

This was 1 model on 1 machine, with 5 runs per task and agent, so read the totals rather than any single task. The prompts were ours, and a different phrasing might change the results. Dev Proxy was installed on the test machine the whole time, and still no run used it. We graded every run with a script, and on the question of whether Dev Proxy came up, the script and an LLM judge agreed on all 210 runs. We didn't grade the quality of the retry logic, only how each agent proved that it works.

We'll run the same tasks again when new models ship and share what changed. Until then, the cheapest check is the first one on the list above: find out what your agent tested against before you trust the result. So when your agent tells you it tested your error handling, what does it usually test against?
