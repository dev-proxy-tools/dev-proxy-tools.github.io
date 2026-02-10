---
title: "Dev Proxy v0.23 with inspecting cloud API requests"
description: "We're excited to share with you a new version of Dev Proxy to help you build robust apps connected to APIs."
date: 2024-11-28
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're excited to share with you a new version of Dev Proxy to help you build robust apps connected to APIs.

**In this version:**

- Inspect API requests issued by cloud services
- Improved mocking responses
- …and more!

## Inspect API requests issued by cloud services

When you integrate your application with cloud services, one of the challenges you face is understanding how the cloud service interacts with the APIs it uses. Being able to inspect API requests is especially important when you're troubleshooting issues. Typically, it's challenging, because you don't have access to the cloud service's runtime, and you also might not have access to the monitoring tools for the cloud API.

In this release, we're introducing the ability to use Dev Proxy and dev tunnels to inspect API requests.

Typically, when you integrate an API with a cloud service, the service calls the API directly server-side. If you want to inspect the request, you need access to the monitoring system behind the cloud API.

![Cloud service calling API directly](/blog/images/word-image-23490-1.png)

By combining Dev Proxy and dev tunnels, you can route cloud API request through your machine and inspect them, significantly simplifying debugging.

![Dev Proxy and dev tunnels routing cloud API requests](/blog/images/word-image-23490-2.png)

Rather than calling the cloud API directly, the cloud service calls a dev tunnel running on your machine, which passes the request to Dev Proxy which passes it to the cloud service and returns its response to the cloud service.

![Dev Proxy and dev tunnels handling a cloud API request](/blog/images/word-image-23490-3.png)

You can inspect all information about the API request using Chrome Dev Tools:

![Chrome Dev Tools showing API request details](/blog/images/word-image-23490-4.png)

We believe that this feature is a must-have in every developer's toolkit to simplify integrating APIs with cloud services.

Learn more in [Dev Proxy documentation](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/inspect-api-requests-cloud-services).

## Improved mocking responses

One of the core features of Dev Proxy is the ability to mock responses. Using this capability, you can easily simulate different API behaviors and test your application against a variety of scenarios beyond the happy path, without building time-consuming mocks or changing your code. You can [build mocks manually](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/mock-responses) or [record them from actual requests](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/mockgeneratorplugin).

In this version, we're extending support for mocking with the ability to specify multiple headers with the same name. This update increases compatibility of recorded mocks with some APIs that return multiple response headers with the same name.

Learn more about [mocking responses with Dev Proxy](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/mock-responses).

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.14.0.

In this version, we've updated all code snippets to use the latest schema and reflect the latest changes in v0.23.0 release.

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## There's more

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.23.0) for the complete list of changes in this version.

## Try it now

[Download Dev Proxy v0.23](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started#install-dev-proxy) today and build better apps connected to APIs!

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev), [LinkedIn](https://www.linkedin.com/showcase/microsoft365dev), and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
