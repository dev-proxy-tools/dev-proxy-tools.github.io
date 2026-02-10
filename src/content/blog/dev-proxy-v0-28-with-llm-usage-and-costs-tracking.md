---
title: "Dev Proxy v0.28 with LLM usage and costs tracking"
description: "We're thrilled to announce the release of Dev Proxy v0.28. This version introduces a new ability to help you understand language models' usage and costs in..."
date: 2025-06-03
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're thrilled to announce the release of Dev Proxy v0.28. This version introduces a new ability to help you understand language models' usage and costs in your applications, alongside many improvements to mocking, TypeSpec generation, and plugin flexibility.

**In this version:**

- New OpenAITelemetryPlugin to track language models' usage and costs
- Expanded OpenAI payload support
- New Dev Proxy extensions for .NET Aspire
- Improved generating PATCH operations for TypeSpec
- Support for JSONC in mock files
- Improved logging
- CRUD plugin CORS and JSON response fixes
- …and more!

## Track OpenAI usage with the new OpenAITelemetryPlugin

LLMs are powerful. When integrated thoughtfully with applications, they can support new scenarios and significantly improve existing ones. Using LLMs typically incurs costs. But how much does it cost exactly? The new Dev Proxy OpenAITelemetryPlugin gives you visibility into how your apps interact with OpenAI or Azure OpenAI endpoints.

This plugin intercepts LLM requests from your application, and for each request tracks:

- Model used
- Token count (prompt, completion, total)
- Cost estimation per request
- Grouped summaries per model

You can visualize the usage patterns and costs using specialized solutions such as [OpenLIT](https://openlit.io/):

![OpenLIT visualizing language model usage data emitted by Dev Proxy](/blog/images/word-image-24354-1.png)

Or generic Open Telemetry dashboards such as .NET Aspire:

![The .NET Aspire dashboard visualizing language model usage information emitted by Dev Proxy](/blog/images/word-image-24354-2.png)

Use Dev Proxy and the new OpenAITelemetryPlugin and [understand how your application is using language models](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/understand-language-model-usage?tabs=aspire), before you go live.

## Try Dev Proxy with Foundry Local

At the recent Build conference, Microsoft announced [Foundry Local](https://devblogs.microsoft.com/foundry/unlock-instant-on-device-ai-with-foundry-local/) – the high-performance local AI runtime stack that brings Azure AI Foundry's power to client devices. We're excited to share that you can configure Dev Proxy to use Foundry Local as the local language model provider. By enabling the integration, you can improve [generating OpenAPI specs](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/generate-openapi-spec) and [TypeSpec files](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/generate-typespec-file), and [redirect cloud LLM requests to your local machine](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/simulate-azure-openai) to save costs and enable offline development.

Our initial tests show significant improvements using Phi-4 mini on Foundry Local compared to other models we've used in the past. We're planning to integrate with Foundry Local by default, in the future versions of Dev Proxy. Meanwhile, try it today!

## Dev Proxy .NET Aspire extensions

To simplify integrating Dev Proxy with .NET Aspire applications, we released a preview version of Dev Proxy extensions for .NET Aspire. Using the extensions, you can integrate Dev Proxy with your .NET Aspire application with just a few lines of code. The extensions allow you to integrate the locally installed Dev Proxy instance or run it from a Docker container for easier portability across your team.

[Learn more about using the Dev Proxy .NET Aspire extensions](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/use-dev-proxy-with-dotnet-aspire) and let us know how we could make it better.

## Bug fixes and improvements

In this version, we include several bug fixes and improvements.

### Expanded OpenAI payload support

Continuing our work related to AI, we've expanded our support for OpenAI payloads. Previously, when redirecting OpenAI-compatible requests, we only supported text completions. In this version, we introduce support for other types of completions as well.

### Improved generating PATCH operations for TypeSpec

In the previous version, we introduced support for [generating TypeSpec files](https://devblogs.microsoft.com/microsoft365dev/dev-proxy-v0-27-with-generating-typespec-files-and-configuring-using-natural-language/#generate-typespec-definitions-from-requests): a new language for describing APIs. In this version, we improved generating PATCH operations, aligning with TypeSpec v1.0 features, so that merge patch operations are designated with MergePatchUpdate.

### Support for JSONC in all Dev Proxy files

In this version, we introduce support for JSONC in all Dev Proxy files. With support for JSONC, you can annotate Dev Proxy's config files with additional information. Including comments right in Dev Proxy files is highly convenient for sharing configuration with others in the team and picking it up after a while.

### Concurrency fixes for mocking and logging

We resolved several issues related to logging, when Dev Proxy was processing parallel requests. Thanks to these fixes, logs are displayed properly showing all information related to the specific request together, making it easier for you to understand how Dev Proxy processed each request.

### CRUD API plugin enhancements

We've improved how the CrudApiPlugin supports CORS and returns JSON responses. With these changes, you can reliably use it in client-side applications that issue cross-domain API calls.

## Breaking changes

In this version, we're also introducing two breaking changes.

First, we removed the GraphConnectorNotificationPlugin. As deploying Graph connectors using Microsoft Teams apps has been deprecated, we removed the plugin which is no longer necessary. We still offer [guidance to help you build Graph connectors](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/graphconnectorguidanceplugin).

The second change is related to the `devproxy jwt create` command which you can use to create mock JWT tokens. In the command, we renamed the `–audience` option to `–audiences` (plural) to more accurately reflect the fact that it supports multiple audiences. Using the short `-a` alias to specify audiences is unaffected by this change.

## There's more

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/dotnet/dev-proxy/releases/tag/v0.28.0) for the complete list of changes in this version.

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.24.0.

In this version, we've included:

- New command
  - Discover URLs to watch starts Dev Proxy in discovery mode
- New snippets
  - OpenAITelemetryPlugin instance
  - OpenAITelemetryPlugin config section
  - OpenAITelemetryPlugin prices file
  - OpenAITelemetryPlugin model price
- Updated all snippets to use latest v0.28.0 schemas
- Improved support for Dev Proxy Beta
- Improved Dev Proxy process detection

Check out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Try it now

Download Dev Proxy v0.28 and start building resilient apps and AI solutions. Thanks to [Artem Azaraev](https://github.com/bartizan) for contributing to this release.

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.

Follow us on [X](http://twitter.com/microsoft365dev), [LinkedIn](http://linkedin.com/showcase/microsoft365dev), and subscribe to our [YouTube](https://www.youtube.com/microsoft365developer) channel to stay up to date on the latest developer news and announcements.
