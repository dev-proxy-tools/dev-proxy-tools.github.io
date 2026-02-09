---
title: "Dev Proxy v0.17 includes integration with Azure API Center"
description: "Achieve more with APIs in your organization. We're excited to share with you a new version of Dev Proxy that helps you to build robust apps connected to APIs."
date: 2024-04-28
author: "Garry Trinder, Waldek Mastykarz"
tags: ["release"]
---

Achieve more with APIs in your organization. We're excited to share with you a new version of Dev Proxy that helps you to build robust apps connected to APIs.

**In this version:**

- Check if the APIs used in your app are registered with Azure API Center
- Check if your app uses production APIs as registered with Azure API Center
- Improved mocking requests
- Simplified acquisition and setup for Windows and macOS
- Easily manage Dev Proxy configuration using Dev Proxy Toolkit
- …and more!

## Check if the APIs used in your app are registered with Azure API Center

[Azure API Center](https://learn.microsoft.com/azure/api-center/overview) helps you catalog APIs that you use in your organization. Using API Center, you create a single location to keep track of which APIs you use, where they're located and documented, and who their owner is. API Center also allows you to validate APIs against your organizational rules so that you can stay compliant.

To help you onboard your APIs to API Center, we're excited to announce the new ApiCenterOnboardingPlugin. The plugin allows you to connect Dev Proxy to your API Center instance. When Dev Proxy intercepts an API request, it'll compare if the API is registered in API Center. If it's not registered, it'll show you which endpoints and operations are not registered. Optionally, it'll also create a new API with all discovered endpoints and operations.

![Dev Proxy showing a list of APIs used in an app, and which aren't registered in API Center.](/web/blog/images/Screenshot-2024-04-23-204100.png)

Using Dev Proxy to detect and onboard APIs used in your applications to API Center saves you time and helps you quickly get insights into what APIs are actually used in your organization.

Learn more about the [ApiCenterOnboardingPlugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/apicenteronboardingplugin) in the docs.

## Check if your app uses production APIs as registered with Azure API Center

API Center lets you track APIs used in your organization throughout their whole lifecycle. As the APIs you use evolve, you'll be tracking their different versions: from experimental prereleases to outdated versions marked to be decommissioned.

To get the most out of your apps, you want them to use the latest production versions of the available APIs. To help you detect if that's indeed the case, we're excited to introduce the new ApiCenterProductionVersionPlugin. The plugin connects Dev Proxy to your API Center instance. For every recorded API request, the plugin checks if it matches a production version of the API. When the API request matches a non-production API, the plugin not only warns you about it, but also recommends upgrading to a production version!

![Dev Proxy warning of non-production APIs used in an app and suggesting their production equivalents as listed in API Center.](/web/blog/images/Screenshot-2024-04-23-203919.png)

Using Dev Proxy, you can easily ensure that your apps use production APIs which are governed by SLAs and actively managed. This makes your apps more robust and reliable.

Learn more about the [ApiCenterProductionVersionPlugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/apicenterproductionversionplugin) in the docs.

## Improved mocking requests

Using Dev Proxy, you can easily mock API requests, simulating any scenario: from successful responses relevant for different use cases to errors that let you verify that your app can handle them properly. Dev Proxy allows you to create mocks without having to change your app's code or write any code that you won't be shipping.

In this release we extended the existing MockResponsePlugin with the ability to match mock responses based on request bodies. This ability is invaluable for mocking different POST requests which differ only by the request body, such as requesting an access token.

To create a mock response for a request matching it request body, use the new bodyFragment property.

![The new bodyFragment property that allows you to match mock responses based on request body.](/web/blog/images/word-image-20719-3.png)

When finding the matching mock response, the MockResponsePlugin will check if the request body contains the specified fragment and return the specified mock response if it does.

This addition further improves Dev Proxy's ability to simulate API responses and makes it suitable for even more scenarios!

## Easily manage Dev Proxy configuration using Dev Proxy Toolkit

We keep extending Dev Proxy with new features to help you save time and focus on what's most important: building apps that solve business problems for your colleagues and customers. To help you get the most out of Dev Proxy, we're excited to announce the Dev Proxy Toolkit VSCode extension!

The Dev Proxy Toolkit extension helps you create Dev Proxy configuration files. It guides you through the different configuration options and warns you if something's incorrect. It helps you catch any potential issues early and provides you with contextual documentation keeping you in focus. It also notifies you when there's a new version of Dev Proxy available, so that you can benefit from our latest work.

[Install the Dev Proxy Toolkit VSCode extension](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) and we'd love to [hear from you](https://github.com/garrytrinder/dev-proxy-toolkit) how we could make it better!

## Simplified acquisition and setup for Windows and macOS

To simplify acquiring, setting up and upgrading Dev Proxy, we're excited to announce that Dev Proxy is now available on winget for Windows, and Homebrew for macOS and Linux!

To install Dev Proxy on Windows using winget, run:

```
winget install Microsoft.DevProxy --silent
```

To install Dev Proxy using Homebrew, run:

```
brew tap microsoft/dev-proxy
brew install dev-proxy
```

If you prefer, you can still install Dev Proxy manually from ZIP files that we publish on each release. We hope that these new ways of installing Dev Proxy will encourage you to give it a try, and we'd love to hear from you how we can make it better.

## Try it now

[Install Dev Proxy v0.17](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started?tabs=automated#install-dev-proxy) today and build better apps connected to APIs!

Thanks to Elio Struyf and Adam Wójcik for their feedback on improving handling mock responses. Also, thanks to our recent focus group participants whose feedback led to many improvements around Dev Proxy acquisition and setup, and documentation.

- Andrew Connell
- Armin Tenge
- Charven Ligan
- Debolina Dasgupta
- Dwaipayan Das
- Hamza Haddad
- James Hawkins
- Johnson Carnegie
- Jonathan Webster
- Mike Ott
- Nilesh Pagare
- Sanford Mosby
- Stephanie Marshall
- Stew Waring
- Tom Moody

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
