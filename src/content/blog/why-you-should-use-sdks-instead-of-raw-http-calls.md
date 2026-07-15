---
title: "Why you should use SDKs instead of raw HTTP calls"
description: "Ditching SDKs for raw fetch sounds productive until you realize you're rebuilding everything they already handle. Each API is different, and that's the problem."
date: 2026-07-15
author: "Waldek Mastykarz"
tags: ["opinion"]
image: "/blog/images/why-you-should-use-sdks-instead-of-raw-http-calls.png"
---

Ditching SDKs for raw HTTP calls sounds like a power move. You take back control, you see every header, you cut the bloat. It's just fetch, right? How hard can it be? Well, let's find out.

I've been seeing a lot of talk lately about teams replacing vendor SDKs with thin HTTP wrappers and calling it a win. The argument sounds good: SDKs hide details and carry bloat, so why not write a neat `HttpBaseClient`, model exactly the endpoints you use, and move on with your life? Especially now that LLMs can write it for you! Here's why. **It underestimates how messy real APIs are, and how much work SDKs quietly absorb on your behalf.**

## The easy part is easy

Getting a basic integration working with raw fetch is trivial. You read the docs, you construct the URL, you set the headers, you parse the JSON. Done. If every API behaved the same way and every failure looked identical, we'd all be writing thin wrappers and life would be great.

But APIs don't behave the same way. Not even close. One vendor returns `429` for throttling, as they should. But another returns `403`! Some return `200 OK` with an error buried in the response body. Some rate-limit per endpoint, others per tenant, others per token bucket with sliding windows you can't observe. Some use `Retry-After` as seconds, others as an HTTP date. Some APIs use custom headers, or don't include it at all. Is this bad API design? Absolutely. Should these providers fix their APIs? Totally. But _your app needs to work today_, with APIs _as they are_, not as they should be.

## Your thin wrapper won't stay thin

You start with something clean. A base class, a central place for auth, retries, logging. It looks elegant in the PR. Then you integrate your second API and discover it needs form encoding instead of JSON. Your third API returns `200` for errors and you need to inspect the body. Your fourth API requires exponential backoff with jitter, but only on specific status codes that aren't even standard HTTP errors. Your fifth API sends throttling responses from a gateway that doesn't match the shape of the API's own error format. Not to mention working with binary payloads.

Each integration adds another conditional, another special case, another "well, _this_ API does it differently" comment in the code. Six months in, your beautiful thin wrapper is a soup of vendor-specific branches that no one wants to touch. You've rebuilt an SDK, except yours isn't documented, isn't tested against the vendor's edge cases, and isn't maintained by people who know the API inside out.

## API providers know their APIs better than you do

The team that built the API knows **how their APIs behave when they fail**. They know about the undocumented quirks, the gateway behaviors, the pagination cursors that expire after 30 seconds. They encode that knowledge into their SDK. It turns out, that the runtime behavior SDKs encode (retry logic, error mapping, auth token refresh) represents real production knowledge. Knowledge you'd otherwise have to rediscover the hard way, one Sentry alert at a time.

The article that inspired this piece literally describes a "whack-a-mole" game of patching failures. But the proposed solution, a centralized HTTP wrapper, doesn't eliminate the moles. It just moves them to a different lawn. You'll still encounter malformed responses from gateways. You'll still get HTML from Cloudflare when you expected JSON. An SDK maintainer has already seen that failure mode and handled it. Your wrapper hasn't.

If you're building a simple CRUD app, that integrates with one API that you know inside out, and only need one or two endpoints, then sure, a thin wrapper could work. But if you're building anything more complex, that integrates with multiple APIs, you need to be prepared for the real-world behaviors of those APIs. SDKs are there to help you do that, so that you can focus on solving your customers' problems instead of reinventing the wheel.

## The real problem isn't SDKs

The frustration described in "why we stopped using SDKs" is legitimate. SDKs that swallow errors and throw generic parse failures are genuinely painful. But the fix for a bad SDK isn't "no SDK." It's a _better_ SDK, a thin focused library that wraps the HTTP client you already use, adds the vendor-specific behavior handling, and gets out of your way. Good SDKs should be encoded API knowledge, not opaque black boxes.

## Trust but verify

No matter if you agree with me or not, and you choose to use the API provider's SDK or build your own wrapper, you need to verify that your app handles real-world API behaviors correctly: throttling, server errors, malformed responses, the exact way the API behaves, and how your app reacts to it.

Emulating these behaviors, especially on an API you don't own is hard. This is exactly why we've built Dev Proxy: to simulate these behaviors against your app without touching the real API. Configure throttling responses, inject failures, and watch what your code actually does. Notice, that each API is different. The way Stripe throttles is not the way Microsoft Graph throttles is not the way Slack throttles. Don't assume uniform behavior across vendors. Test each integration specifically. Don't let anyone tell you otherwise.

Try it and let me know what you think!
