---
title: "Dev Proxy v1.0 with new features for building robust AI-powered apps"
description: "We're excited to announce Dev Proxy v1.0, with new language model-specific testing capabilities. This release introduces tools to help developers build more..."
date: 2025-08-05
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're excited to announce Dev Proxy v1.0, with new language model-specific testing capabilities. This release introduces tools to help developers build more reliable AI-powered applications by simulating real-world scenarios and tracking resource usage.

**In this version:**

- Language model failure simulation with 15 realistic failure types
- Token-based rate limiting simulation
- Improved language model token usage tracking and cost reporting
- Improved OpenAPI spec generation
- New releases of Dev Proxy tools
- Bug fixes and improvements

## V1.0

We're excited to announce the first major version of Dev Proxy! Over the last few years, we shipped functionality that we believe helps developers build more robust apps. After the recent refactorings, we've reached what we believe is a solid foundation for our future work. That said, we keep improving our code base and are open to any changes. Moving forward, we're going to use [SemVer](https://semver.org/) to communicate the scope of changes in each release. We'll keep publishing regular releases and should we ship some breaking changes, we'll clearly communicate what's changed and how it affects you.

## Simulate language model failures

When integrating language models in applications, you need to consider that their responses might be incorrect. Common types of LLM failures include:

- **Hallucinations** – Factually incorrect but plausible responses
- **Bias & Stereotyping** – Inappropriate or biased content
- **Misinterpretation** – When AI misunderstands the request
- **Contradictory Information** – Self-conflicting responses
- **Ambiguity** – Vague or unclear answers

The new `LanguageModelFailurePlugin` helps you test how your application handles unpredictable AI responses. It simulates [the 15 most common LLM failure patterns](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/languagemodelfailureplugin#available-failure-types) and allows you to add your own types of failures too.

Using this plugin allows you to verify your application's error handling and user experience when AI responses are unreliable.

![Dev Proxy simulating a language model failure when calling Ollama](/blog/images/LanguageModelFailurePlugin.png)

Learn more about [testing your app with language model failures](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/test-my-app-with-language-model-failures).

## Simulate token-based rate limiting

When you integrate language models in your applications, you're often bound by limits or budgets. These limits are typically expressed as the number of requests or tokens per unit of time.

The `LanguageModelRateLimitingPlugin` extends our support for simulating rate limits by simulating token-based throttling that mirrors how LLM providers actually implement rate limits:

![Dev Proxy simulating exceeding a token limit for an LLM request](/blog/images/LanguageModelRateLimitingPlugin.png)

Using the plugin, you can configure different limits for input and completion token and the timeframe for which those limits apply allowing you to realistically simulate the limits of your language model host.

Learn more about [testing your app with token limits](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/test-language-model-token-limits).

## Improved language model token usage tracking and reporting

Previously, we introduced the ability to [track the usage and costs of language model tokens](https://devblogs.microsoft.com/microsoft365dev/dev-proxy-v0-28-with-llm-usage-and-costs-tracking/). In this version we extend the `OpenAITelemetryPlugin` with:

- Support for getting token usage information from streamed responses
- Summary report in Markdown, JSON and plain text to quickly understand the usage and costs for a session

Monitor your development and testing usage to better understand production costs.

## Improved OpenAPI generation

Using Dev Proxy is probably the easiest way out there to generate an OpenAPI spec for your API. By simply calling the API, you can have Dev Proxy generate an API spec for you. Having an up-to-date API spec is prerequisite for integrating the API with many cloud services including language models.

In this version, we extended the `OpenApiSpecGeneratorPlugin` with several enhancements:

- Ignore response types in the generated spec, which is helpful for generating API spec for use with AI agents, which often ignore response type information.
- Capture default parameter values, which helps instructing AI agents how to use the API

## New releases of Dev Proxy tools

To simplify using Dev Proxy we offer several tools. Here are some latest improvements:

### Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.0.2.

In this version, we've:

- Updated all snippets to use v1.0.0 schemas
- Added new snippets
  - Language Model Failure plugin and config section
  - Language Model Rate Limiting plugin and config section
- Added JSONC support for code lens and code diagnostics
- Updated config new command to create files in .devproxy folder
- Added a warning if using a language model plugin but `languageModel.enabled` has not been set in the config file
- Added quick action to add `languageModel.enabled` property to config file

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### Dev Proxy Visual Studio Code Tasks

Dev Proxy Toolkit contributes tasks and watchers to easily integrate Dev Proxy into your Visual Studio Code debug configurations. These tasks make it possible for you to start and stop Dev Proxy automatically when you start and stop a debug session. Check out the [documentation](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/use-dev-proxy-with-vs-code-debug-configurations) to learn how to integrate Dev Proxy into your debug configurations.

### Dev Proxy GitHub Actions

[Dev Proxy GitHub Actions](https://github.com/dev-proxy-tools/actions) significantly simplify using Dev Proxy in GitHub workflows. They encapsulate starting and controlling Dev Proxy into convenient to use actions that you can easily integrate in your workflows. Check out the documentation in the repo and see the updated [GitHub Actions integration walkthrough](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/use-dev-proxy-with-github-actions).

### Dev Proxy .NET Aspire extensions

Using the [Dev Proxy .NET Aspire extensions](https://github.com/dev-proxy-tools/aspire) you easily integrate Dev Proxy into your .NET Aspire applications. You can either use your locally installed version of Dev Proxy or run it from a Docker container. Over the last weeks, we simplified using the extensions and added support for .NET 8. For more information about using the extensions, [see the walkthrough](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/use-dev-proxy-with-dotnet-aspire).

### Dev Proxy MCP Server

The [Dev Proxy MCP server](https://github.com/dev-proxy-tools/mcp) gives coding agents access to the latest Dev Proxy documentation and schemas. It's a must-have for using coding agents for building and editing Dev Proxy configurations, which is why we automatically include it in the Dev Proxy Toolkit VSCode extension.

In the latest release of the MCP server, we introduced a new tool which provides coding agents with best practices and recommendations for building Dev Proxy configurations. We've seen significant improvements after introducing this extension and you should definitely try it too.

For your convenience, all Dev Proxy tools are now available in a [single GitHub organization](https://github.com/dev-proxy-tools). Don't hesitate to let us know if something's missing or could be better.

## Bug fixes and improvements

- The `DevToolsPlugin` now properly displays streaming responses in Chrome DevTools, providing complete visibility into API interactions including real-time data streams.
- The `AuthPlugin` now supports custom OIDC metadata URLs, making it compatible with identity providers beyond Microsoft's standard endpoints.
- Linux setup scripts now use more intuitive defaults, allowing users to press Enter to continue through installation steps instead of requiring explicit 'y' responses.
- Enhanced error handling for edge cases
- Improved configuration validation

## There's more

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/dotnet/dev-proxy/releases/tag/v1.0.0) for the complete list of changes in this version.

## Try it now

Download Dev Proxy v1.0 to take advantage of these new testing capabilities for AI-powered applications. Thanks to [Artem Azaraev](https://github.com/bartizan), and [Stefan Gilca](https://github.com/stefang931) for contributing to this release.

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
