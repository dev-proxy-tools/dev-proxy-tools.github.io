---
title: "Dev Proxy v1.2 with mock response mirroring and improved performance"
description: "We're thrilled to announce the release of Dev Proxy v1.2! This update introduces mock response mirroring capabilities that make API simulation more..."
date: 2025-09-23
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're thrilled to announce the release of Dev Proxy v1.2! This update introduces mock response mirroring capabilities that make API simulation more realistic. Whether you're building complex applications that need dynamic responses or optimizing your development workflow, this release delivers the tools you need to create authentic API experiences.

**In this version:**

- Mock response mirroring for dynamic API simulation
- Optimized Microsoft Graph OpenAPI specs caching with e-tag support
- Security and performance updates

## Mock response mirroring for dynamic API simulation

The main feature of this release transforms how you handle API responses that mirror request data. No more static mock responses that break the illusion of working with real APIs!

Many real-world APIs return responses that contain data from the original request – think POST endpoints that return the created resource, or PATCH operations that echo back updated fields. Until now, creating these dynamic responses required complex workarounds or manual response crafting for each scenario.

Starting from this release, using the new mirroring syntax, you can now create intelligent mock responses that automatically populate fields with data from the incoming request.

When you send a POST request with user data, Dev Proxy automatically mirrors the relevant fields in the response, creating a seamless, realistic API experience. This means:

- **Faster development cycles** – No need to manually craft responses for every test scenario
- **More realistic testing** – Your app behaves exactly as it would with the real API
- **Simplified maintenance** – One mock configuration handles countless request variations
- **Better team collaboration** – Share mock configurations that work for everyone's test data

## Optimized Microsoft Graph OpenAPI specs caching with e-tag support

Performance matters, especially when you're iterating quickly during development. We've improved the Microsoft Graph OpenAPI specs caching system with intelligent e-tag support.

This optimization means:

- Faster startup times when specs haven't changed
- Reduced bandwidth usage through intelligent caching
- Always up-to-date specs when Microsoft releases updates
- Seamless offline development with robust local caching

Your development workflow just got smoother and faster.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.4.0.

In this version, we've updated all JSON snippets to use v1.2.0 schemas

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Why this release matters for your development workflow

Dev Proxy v1.2 isn't just about new features – it's about transforming how you think about API development.

With response mirroring, you can:

- Test edge cases effortlessly by sending varied request data and seeing realistic responses
- Build confidence in your error handling with dynamic error scenarios
- Accelerate integration testing with responses that match your exact request patterns
- Create comprehensive demo scenarios that work with any sample data

Combined with performance optimizations and enhanced reliability, this release empowers you to build better API-connected applications faster than ever.

## Try it now

Download Dev Proxy v1.2 today and benefit from the latest features! The new mirroring capabilities alone will save you hours of manual mock configuration. Thanks to [Artem Azaraev](https://github.com/bartizan) for contributing to this release.

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
