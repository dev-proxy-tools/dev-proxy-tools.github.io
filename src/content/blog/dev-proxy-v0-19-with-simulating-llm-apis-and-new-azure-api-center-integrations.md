---
title: "Dev Proxy v0.19 with simulating LLM APIs and new Azure API Center integrations"
description: "Achieve more with APIs in your organization. We're excited to share with you a new version of Dev Proxy that helps you to build robust apps connected to APIs."
date: 2024-06-25
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

Achieve more with APIs in your organization. We're excited to share with you a new version of Dev Proxy that helps you to build robust apps connected to APIs.

**In this version:**

- Check if your app calls APIs using minimal permissions
- Simulate Azure OpenAI- and OpenAI APIs
- Generate HTTP files
- Filter requests by headers
- Improved generating OpenAPI specs
- …and more!

## Check if your app calls APIs using minimal permissions

When building your app, you likely integrate with several APIs and operations. To ensure that your app is secure and follows the principle of least privilege, you should check if your app is calling APIs with minimal permissions. By using minimal permissions, you reduce the risk of unauthorized access to your data and resources.

What's hard about checking if your app is calling APIs with minimal permissions though, is that each time you integrate a new operation, you need to evaluate the set of permissions you use in your app. Manually tracking all operations and permissions is time-consuming and error prone.

In this version, we're excited to introduce a new feature that helps you automate checking if your app is calling APIs with minimal permissions by combining Dev Proxy and Azure API Center.

For more information, see the [documentation](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/check-minimal-api-permissions).

## Simulate Azure OpenAI- and OpenAI APIs

When you build apps connected to Azure OpenAI, often, only a portion of the app interacts with the Azure OpenAI API. When you work on the portions of the app that don't require real replies from Azure OpenAI API, you can simulate the responses using Dev Proxy. Using simulated responses allows you to avoid incurring unnecessary costs.

In this version, we introduce the new OpenAIMockResponsePlugin that allows you to simulate Azure OpenAI- and OpenAI API responses, using Ollama and a local language model.

![Dev Proxy simulating Azure OpenAI API responses using a local language model running on Ollama](/blog/images/word-image-21968-1.png)

To learn more about simulating Azure OpenAI- and OpenAI APIs, see the [documentation](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/simulate-azure-openai).

## Generate HTTP files

HTTP files are a very lightweight and convenient way to test APIs. Using HTTP files, you can define single requests as well as complete API workflows. You can also define variables to easily reuse values across multiple requests. They're natively supported in Visual Studio and there are great extensions available for Visual Studio Code as well.

In this version, we introduce a new plugin that generates an HTTP file with the requests that Dev Proxy intercepted.

![An HTTP file that Dev Proxy generated based on API requests that it intercepted.](/blog/images/Screenshot-2024-06-25-105008.png)

HTTP files are a great companion when building apps. They allow you to easily run specific API requests without having to debug the whole app and step through its code.

Learn more about the new HttpFileGeneratorPlugin.

## Filter requests by headers

When using Dev Proxy, you specify which URLs Dev Proxy should intercept and process. While it's sufficient for most scenarios, if your solution is embedded in another web app, like SharePoint Framework solutions, or if you only want Dev Proxy to intercept requests from a specific component in your app, you need more granularity.

Following your feedback, in this version we introduce the ability to filter requests to process by requests headers. In Dev Proxy configuration you can specify a combination of request headers and values, or just request headers. When Dev Proxy sees a request, it checks if it contains one of the specified request headers and only processes the request if it does.

Learn more about [filtering requests to intercept by headers](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/intercept-requests-specific-headers).

## Integration with local language models

Language models offer great benefits when it comes to working with natural language. When embedded in existing workflows, they can meaningfully improve the user experience.

In this version, we introduce the integration with local language models via Ollama. Select Dev Proxy features use local language models to improve their functionality. By default, the integration is disabled, and you can choose to enable it in the Dev Proxy config file.

What's great about integrating with local language models is that you get to benefit from the power of language models without incurring any costs. This allows you to use Dev Proxy and experiment as much as you want without worrying about the bill.

For more information about using local language models with Dev Proxy see the [documentation](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/use-language-model).

## Improved generating OpenAPI specs

APIs are the gateway to data and insights in your organization. To benefit from them, and integrate with cloud services and tooling, you typically need an OpenAPI spec that describes your API and its operations. Previously, we introduced in Dev Proxy the ability to generate OpenAPI specs from the API requests your app issues. In this version, we further improve the ability.

### Generate better IDs and descriptions using a local language model

Generating OpenAPI specs is one of the first features that benefits from integrating Dev Proxy with local language models. Using a language model, you can have Dev Proxy generate OpenAPI specs that are not only more readable for you and your colleagues but also for other LLMs!

![Comparison of an OpenAPI spec that Dev Proxy generated without (left) and with (right) a local language model](/blog/images/word-image-21968-3.png)

### Exclude OPTIONS request

Starting from this version, when generating OpenAPI specs, Dev Proxy excludes OPTIONS requests by default. In most cases you won't need to include them in your spec. And if you do, you can choose to do so using the Dev Proxy configuration.

Learn more about [generating OpenAPI specs](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/generate-openapi-spec) using Dev Proxy.

## Improved integration with Azure API Center

[Azure API Center](https://learn.microsoft.com/azure/api-center/overview) helps you catalog APIs that you use in your organization. Using API Center, you create a single location to keep track of which APIs you use, where they're located and documented, and who their owner is. API Center also allows you to validate APIs against your organizational rules so that you can stay compliant.

Previously, we introduced integration with Azure API Center to help you [discover and onboard shadow APIs](https://devblogs.microsoft.com/microsoft365dev/dev-proxy-v0-17-includes-integration-with-azure-api-center/#check-if-the-apis-used-in-your-app-are-registered-with-azure-api-center) and ensure that your [apps use production-level APIs](https://devblogs.microsoft.com/microsoft365dev/dev-proxy-v0-17-includes-integration-with-azure-api-center/#check-if-your-app-uses-production-apis-as-registered-with-azure-api-center). In this version we further improve these integrations, making them more efficient and accurate.

Integrating Dev Proxy and API Center is a powerful combination that helps you implement your API governance and compliance plan. [Combined with a CI/CD setup](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/use-dev-proxy-in-ci-cd-overview), it will also help you enforce your strategy creating a quality gateway.

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.5.0.

In this version:

- New snippets for ApiCenterMinimalPermissions, HttpFileGenerator and OpenAIMockResponse plugins
- Snippets updated to use the latest schema v0.19.0
- Schema version check is expanded to additional files making it easy to identify files using out of data schema and update them
- Bug fixes

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information.

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.19.0) for the complete list of changes in this version.

## Try it now

[Download Dev Proxy v0.19](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started#install-dev-proxy) today and build better apps connected to APIs!

Thanks to [Jim Love](https://github.com/jimmywim) and [Mark Cherry](https://github.com/MChez) for their feedback and contributing to this release. Also, thanks to [Stephan van Rooij](https://github.com/svrooij) for working together with us on a few improvements.

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
