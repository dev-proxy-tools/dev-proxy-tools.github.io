---
title: "Dev Proxy v2.0 with improved AI telemetry, and small breaking changes"
description: "We're excited to announce the release of Dev Proxy v2.0. Following semantic versioning (SemVer), we're bumping the major version due to breaking changes in..."
date: 2025-12-04
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're excited to announce the release of Dev Proxy v2.0. Following semantic versioning (SemVer), we're bumping the major version due to breaking changes in this release. While these changes are small, they improve Dev Proxy's accuracy and behavior – and we want you to be aware of them.

This release also brings .NET 10 support, enhanced AI telemetry capabilities, and important fixes that make your API simulations more reliable.

**In this version:**

- Breaking changes in date formatting and telemetry behavior
- .NET 10 support
- Improved AI telemetry with cached tokens tracking
- Bug fixes and improvements

## Breaking changes

We've made small but important changes that could affect your existing workflows:

### Culture-invariant date formatting in Graph mocks

Previously, `GraphMockResponsePlugin` formatted dates using your system's culture settings (e.g., 13/11/2025 14:30:00 on French systems vs. 11/13/2025 2:30 PM on US systems). This was a bug – Dev Proxy wasn't accurately emulating how Microsoft Graph actually works. Graph always returns dates in standardized formats, regardless of where it's running.

**What changed:**

All mocked Graph responses now use consistent, culture-invariant formats that align with how Microsoft Graph actually behaves:

- HTTP Date headers use RFC 1123 format: `Sun, 16 Nov 2025 11:16:59 GMT` (per RFC 7231)
- InnerError.Date properties use ISO 8601 format: `2025-11-16T11:16:59`

**Impact:** If you parse dates from mocked responses, you may need to update your code to handle these standardized formats. The upside? Dev Proxy now accurately emulates Microsoft Graph's real behavior, giving you consistent responses across all environments – just like the actual Graph API does.

### Smarter telemetry recording behavior

We've improved how the `OpenAITelemetryPlugin` and `OpenAIUsageDebuggingPlugin` handle their outputs, making them more consistent with other Dev Proxy recording plugins.

**What changed:**

- `OpenAITelemetryPlugin` now only includes requests captured while recording is active in its generated report – aligning with how other recording plugins work
- `OpenAIUsageDebuggingPlugin` now only creates CSV files when Dev Proxy intercepts relevant OpenAI requests
- Running `devproxy –version`, or other sub-commands, no longer creates unnecessary output files

**Impact:** If your automation relies on these files always being created, you'll need to check for their existence before processing them. This change keeps your workspace clean and ensures you only get reports with actual data.

## .NET 10 support

Future-proof your development workflow with .NET 10. Dev Proxy now runs on the latest .NET runtime, giving you access to the newest performance improvements, security patches, and language features.

Upgrading to .NET 10 ensures Dev Proxy stays aligned with Microsoft's latest development platform, providing you with a faster, more secure, and more capable API simulation tool.

## Enhanced AI telemetry with cached tokens tracking

Understanding how your AI-powered applications use tokens is crucial for managing costs and optimizing performance. The `OpenAITelemetryPlugin` now tracks cached tokens alongside standard token usage, giving you complete visibility into your AI API consumption.

### Why this matters:

When your app uses cached prompts, AI providers typically charge significantly less for those tokens. Without tracking cached tokens separately, you couldn't accurately measure cost savings or optimize your caching strategy. Now you can see exactly how much you're benefiting from prompt caching, helping you make data-driven decisions about your AI implementation.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.10.0. In this version, we've updated all JSON snippets to use v2.0.0 schemas.

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Why upgrade to v2.0?

While the breaking changes are small, they make Dev Proxy more accurate and reliable. Dev Proxy v2.0 ensures:

- **Consistent behavior** – Culture-invariant dates work the same everywhere
- **Accurate cost tracking** – Complete visibility into cached tokens
- **Cleaner workflows** – No more empty telemetry files cluttering your workspace
- **Future-ready** – .NET 10 support keeps you on the latest platform

## Try it now

Download Dev Proxy v2.0 today and build better API-connected applications with confidence!

Thanks to [Artem Azaraev](https://github.com/bartizan) for contributing to this release.

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
