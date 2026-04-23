---
title: "Dev Proxy v2.3.4 with accurate HAR timestamps"
description: "Dev Proxy v2.3.4 fixes HAR entry timestamps to reflect actual request times in proper UTC format, making your API recordings more reliable."
date: 2026-04-23
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v2-3-2.png"
---

We've just released **Dev Proxy v2.3.4** - a cleanup release that perfects the HAR timestamp fix introduced in v2.3.3.

**In this version:**

- Fixed HAR entry timestamps to reflect actual request times in proper UTC format

## Accurate HAR timestamps

When Dev Proxy generates HAR files, each entry includes a `startedDateTime` field that records when the request was made. Before v2.3.3, this timestamp was set at HAR export time - meaning all entries showed the same time regardless of when the requests actually happened. Not great when you're trying to analyze request timing or debug race conditions.

In v2.3.3, we fixed this by recording the actual request timestamp. However, the fix introduced a subtle formatting issue - timestamps used the `+00:00` offset format instead of the standard `Z` UTC suffix that HAR tooling expects.

In v2.3.4, we've cleaned this up. HAR entry timestamps now correctly use the `Z`-suffixed UTC format, giving you accurate request times in the format that tools expect.

If you're analyzing request sequences, debugging timing-sensitive issues, or feeding HAR data into monitoring tools, you now get timestamps that reflect when each request actually happened - not when you exported the file.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.20.0.

In this version, we've:

- Updated all JSON snippets to use v2.3.4 schemas

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Try it now

Download Dev Proxy v2.3.4 today and get accurate HAR recordings for your API testing workflows!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
