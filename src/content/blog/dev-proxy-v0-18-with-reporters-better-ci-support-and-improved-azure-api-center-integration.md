---
title: "Dev Proxy v0.18 with reporters, better CI support, and improved Azure API Center integration"
description: "Achieve more with APIs in your organization. We're excited to share with you a new version of Dev Proxy that helps you to build robust apps connected to APIs."
date: 2024-05-29
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

Achieve more with APIs in your organization. We're excited to share with you a new version of Dev Proxy that helps you to build robust apps connected to APIs.

**In this version:**

- Get better reports with Reporters
- Easily integrate Dev Proxy in CI/CD scenarios
- Improved Azure API Center integration
- Improved OpenAPI spec generation
- Improved console output
- …and more!

## Get better reports with Reporters

In the previous versions of Dev Proxy, each plugin produced its own output. For example, the [Execution Summary Plugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/executionsummaryplugin) produced a markdown report, and the [Minimal Permission Plugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/minimalpermissionsplugin) produced plain-text output. All output was printed to the console. This was limiting, specifically in integration scenarios when you wanted to use plugin output for further processing and had to not only intercept the output but also scrape the relevant portion of it.

In this release, we introduce Reporters: a new sort of plugin capable of turning structured output from plugins into a specific format, such as markdown or JSON. Plugins that process recorded requests, next to standard console output, produce now an object with a report of their output. One or more reporters can then take this report and convert it into a specific format.

![Dev Proxy configuration including the ApiCenterOnboardingPlugin and the MarkdownReporter](/blog/images/word-image-21678-1.png)

After running Dev Proxy, the Markdown reporter produces a report named ApiCenterOnboardingPlugin_MarkdownReporter.md.

![GitHub workflow log showing the step of writing the API Center onboarding report to the job summary](/blog/images/word-image-21678-2.png)

You can easily use the contents of the generated report for example in a workflow summary:

![Dev Proxy API Center onboarding report displayed in GitHub job summary](/blog/images/word-image-21678-3.png)

We offer reporters for markdown, JSON and plain-text output. Each reporter creates a separate file for the reports it generated. Because these files have predictable names, you can easily integrate them in your processes for further processing.

Learn more about [Dev Proxy Reporters](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/technical-reference/plugin-architecture#reporters).

## Easily integrate Dev Proxy in CI/CD scenarios

Dev Proxy is a great tool that lets you easily simulate different API scenarios on your machine. But it gets even more powerful when integrated with your CI/CD setup for continuous analysis!

Recently, we've been researching several CI/CD integration scenarios for Dev Proxy, such as:

- Detect shadow APIs, in combination with Azure API Center
- Detect non-production APIs in combination with Azure API Center
- Verify that your app uses minimal Microsoft Graph permissions

Following our exploration, in this version we introduce several improvements that make it easier to integrate Dev Proxy in CI/CD scenarios.

### Non-interactive mode

When you start Dev Proxy in a CI/CD environment, as detected by checking for the presence of the CI environment variable, it now runs in a non-interactive mode. This means that it doesn't wait for you to press any key. This is important, because it now allows you to gracefully close Dev Proxy using SIGINT. When you close Dev Proxy by sending SIGINT, you stop recording and let recording plugins process recorded requests and produce output. In comparison, if you close Dev Proxy forcefully by sending a SIGKILL, it stops immediately. This feature is fundamental for letting you use recording and analyzing recorded requests in CI/CD scenarios. You need recording for scenarios such as detecting minimal Microsoft Graph permissions, detecting APIs onboarded in Azure API Center, or generating an OpenAPI spec.

### Reading Azure API Center plugins configuration from environment variables

When using Dev Proxy plugins for Azure API Center integration, you need to specify several values such as subscription ID or API Center instance name. If you want to keep these values private, you can now define them as secrets in your repository. Then, in your workflow, you can map them to environment variables. In Dev Proxy configuration, rather than specifying the values, you specify the names of the environment variables. When connecting to API Center, Dev Proxy retrieves the values from environment variables, keeping them private.

### Markdown and JSON reporters

We've just mentioned the new Reporters that we introduce in this version. We believe that Markdown and JSON reporters are key for CI/CD integration. Markdown reporters give you ready-to-use content that you can put in your workflow summary. If you need to do some additional processing, such as creating issues or submitting PRs, you can use JSON reports produced by the JSON reporter. JSON reports contain structured data which you can easily process using tools such as jq or directly in PowerShell.

## Improved Azure API Center integration

[Azure API Center](https://learn.microsoft.com/azure/api-center/overview) helps you catalog APIs that you use in your organization. Using API Center, you create a single location to keep track of which APIs you use, where they're located and documented, and who their owner is. API Center also allows you to validate APIs against your organizational rules so that you can stay compliant.

In the previous version of Dev Proxy, we introduced two Azure API Center plugins that help you track the usage of APIs in your apps:

1. [API Center Onboarding Plugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/apicenteronboardingplugin), which checks if APIs used in your app are registered in API Center (shadow API discovery)
2. [API Center Production Version Plugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/apicenterproductionversionplugin), which checks if your app uses production-level APIs

In this version, we improve the accuracy of discovery and matching API requests issued from your app to APIs registered in API Center, to give you more accurate results. We also integrate the [OpenApiSpecGeneratorPlugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/openapispecgeneratorplugin) with the [ApiCenterOnboardingPlugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/apicenteronboardingplugin) so that when Dev Proxy detects shadow APIs, and you choose to onboard them to API Center automatically, you can also include an auto-generated OpenAPI spec.

## Improved OpenAPI spec generation

APIs are becoming more and more important. Especially in this era of AI, where APIs are the gateway to organizational data and insights, having well-designed and described APIs is necessary for you to benefit from the latest advancements. But what if you don't have an OpenAPI spec for your APIs?

Previously, we introduced the ability for Dev Proxy to generate an OpenAPI spec for your API. All you need to do is start Dev Proxy and call your API. Dev Proxy records the requests and responses and generates an OpenAPI spec for you!

![Dev Proxy generating an OpenAPI spec based on intercepted API requests](/blog/images/word-image-21678-4.png)

In this version, we further improve the ability to generate OpenAPI specs. You can now generate an OpenAPI spec for an API simulated using the [CRUD API plugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/crudapiplugin). This combination is perfect for when your API is still in development, and you need an API spec for integrating it.

Learn more about [generating OpenAPI specs](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/generate-openapi-spec) using Dev Proxy.

## Improved console output

In this version, we refactored logging to console. The most notable change is that messages related to the same request are now grouped, so that you no longer need to manually match them together.

![Updated logging to console in Dev Proxy v0.18](/blog/images/word-image-21678-5.png)

We've also shortened the labels and made logging more compact to fit more content in the terminal window.

Internally, we moved our custom logging implementation to the standard .NET ILogger. It allows us to minimize the amount of custom code, make better use of .NET features and, in the future, it will allow us to integrate additional loggers.

## Improved Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.4.0.

In this version:

- Improved flow for installing Dev Proxy
- Updated snippets to use the latest schema
- Bug fixes

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information.

## Dev Proxy at the European Collaboration Summit and Build 2024

In May, there were two big conferences: the [European Collaboration Summit](https://collabsummit.eu/) and of course, [Microsoft Build](https://build.microsoft.com/). At both conferences we had the opportunity to showcase Dev Proxy and how it helps you build better apps.

### European Collaboration Summit

In the session, [Build apps that don't fail in production](https://collabsummit.eu/en/session/?guid=69a4631e-9878-44b9-ac36-750ce6d99d76), Garry Trinder demonstrated how Dev Proxy can help developers build more resilient applications by improving robustness, performance and security.

The session was packed full of demos, starting with the basics of installing, configuring and running Dev Proxy on Windows, then showing how to simulate API errors and behaviors like throttling. Next, how to use presets, like the preset designed specifically for Microsoft 365 app development like mocking Microsoft Graph responses and checking whether applications are using the correct permission scopes. And finally, how you can simulate CRUD APIs to speed up development that relies on APIs that are in the process of being updated, or even have not yet been built.

![Garry Trinder on stage at European Collaboration Summit in Wiesbaden, Germany.](/blog/images/no-alt-text-provided-for-this-image.jpeg)

*Photo: SeyedMojtaba SeyedHosseini*

Thank you to everyone who attended the session and shared their insights and feedback with us. Your feedback is invaluable.

### Microsoft Build

First, Bob German and David Rousset delivered a [deep dive on building plugins for Microsoft Copilot](https://build.microsoft.com/en-US/sessions/8822feb4-ebb8-4427-9e93-67011e4d0620?source=sessions). Along with some invaluable tips and tricks they showed how you can use Dev Proxy to generate an OpenAPI spec for your API and speed up building Copilot plugins for your existing APIs.

Then, Mark Weitzel, in his [session about platform engineering](https://build.microsoft.com/en-US/sessions/05883e89-2458-4a3b-94a8-c4472d6e8a2a?source=sessions), showed an awesome demo of combining GitHub Copilot, Azure API Center, Dev Proxy, Playwright and GitHub Actions to discover shadow APIs!

Check out both sessions for more information and demos.

## Try it now

Download Dev Proxy v0.18 today and build better apps connected to APIs!

Thanks to Stephan van Rooij for his invaluable help in improving Dev Proxy logging and feedback on Dev Proxy architecture. Thanks to Elio Struyf for his exploration of integrating Dev Proxy in CI/CD scenarios and integration with Playwright. Thanks to Ramesh Adhikari for improving logging in Dev Proxy.

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
