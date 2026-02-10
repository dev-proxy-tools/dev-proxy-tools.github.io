---
title: "Dev Proxy v1.3 with exporting to HAR, LLM usage tracking, and enhanced permissions analysis"
description: "We're thrilled to announce the release of Dev Proxy v1.3.0! This update introduces two powerful new plugins: HAR file generation for universal debugging and..."
date: 2025-10-30
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're thrilled to announce the release of Dev Proxy v1.3.0! This update introduces two powerful new plugins: HAR file generation for universal debugging and LLM usage tracking for cost optimization, along with enhanced permissions analysis and improved OpenAPI spec generation for complex testing scenarios.

**In this version:**

- New HarGeneratorPlugin for HTTP Archive file generation
- New OpenAIUsageDebuggingPlugin for language model usage tracking
- Enhanced minimal permissions plugins with authentication scheme support
- Improved OpenAPI spec generation for multi-port scenarios
- Better CSV logging for API activity tracking
- Bug fixes and improvements

## New HarGeneratorPlugin for HTTP Archive file generation

We're introducing the `HarGeneratorPlugin`, a powerful new addition that generates industry-standard HTTP Archive (HAR) files from intercepted API requests and responses.

![Screenshot of VSCode with the generated HAR file open](/blog/images/image-scaled.png)

### What are HAR files?

HTTP Archive files are the universal standard for recording network activity. They're compatible with virtually every debugging tool, browser, and development environment, making them perfect for:

- **Cross-team collaboration:** Share reproducible network traces with developers, QA, and support teams
- **Integration with existing tools:** Import directly into Chrome DevTools, Fiddler, or any HAR-compatible tool
- **Troubleshooting and diagnostics:** Provide complete network activity logs when reporting issues
- **Performance analysis:** Analyze timing, headers, and payload data across multiple tools

**Why this matters:** If you're working with teams that use different debugging tools, or need to share network traces with support teams, HAR files are the lingua franca of web debugging. The HarGeneratorPlugin makes it effortless to capture comprehensive network activity in a format everyone can use, without vendor lock-in.

## New OpenAIUsageDebuggingPlugin for language model usage tracking

For developers building AI-powered applications, we've added the `OpenAIUsageDebuggingPlugin` – a specialized tool that logs OpenAI API usage metrics real-time to CSV files for debugging and cost analysis.

![Screenshot of a CSV file with information about LLM usage](/blog/images/image2-scaled.png)

**Key capabilities:**

- **Detailed usage metrics:** Track token consumption, model usage, and request patterns
- **Debugging support:** Understand how your application consumes language model resources, specifically focusing on token and request limits
- **CSV format:** Easy integration with spreadsheet tools and data analysis workflows

**Perfect for:**

- Monitoring language model consumption during development and testing
- Identifying unexpected token usage patterns before they hit production
- Building cost projections based on actual usage data
- Debugging integration issues with OpenAI-compatible APIs

**Why this matters:** Language model costs can add up quickly, and understanding your usage patterns is critical for building cost-effective AI applications. This plugin gives you visibility into your consumption patterns before they become expensive surprises in production.

## Improved OpenAPI spec generation for multi-port scenarios

The `OpenApiSpecGeneratorPlugin` now handles complex testing scenarios more intelligently. Previously, when running integration tests across multiple services on different localhost ports, the plugin would create a filename based only on hostname and timestamp—causing subsequent calls to overwrite the same target file.

**What's changed:**

- OpenAPI spec files now include port information in the filename or intelligently aggregate calls
- Multiple services running simultaneously will no longer overwrite each other's specifications

**Why this matters:** If you're running comprehensive integration test suites with services on random ports, you can now confidently capture complete OpenAPI specifications without losing data. This is especially valuable for microservices architectures and complex testing scenarios.

## Enhanced minimal permissions plugins with authentication scheme support

We've extended our minimal permissions plugins with the ability to specify authentication schemes, giving you more precise control when working with APIs that support multiple authentication methods.

The `MinimalPermissionsPlugin`, `ApiCenterMinimalPermissionsPlugin` and `MinimalPermissionsGuidancePlugin` include `schemeName` configuration to specify the authentication scheme.

**Why this matters:** APIs often support multiple authentication schemes (eg. application vs. delegated permissions). When analyzing permissions, you can now specify which authentication scheme you're using, ensuring the plugin evaluates permissions accurately for your specific authentication context. This is especially valuable when an API defines different permission requirements based on the authentication method used.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.8.0.

In this version, we've:

- Updated all JSON snippets to use v1.3.0 schemas
- Added OpenAIUsageDebugPlugin snippets
- Added HarGeneratorPlugin snippets

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Try it now

Download Dev Proxy v1.3 today and benefit from the latest improvements!

Thanks to [Artem Azaraev](https://github.com/bartizan) and [Oliviero Chiodo](https://github.com/mexmirror) for contributing to this release.

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
