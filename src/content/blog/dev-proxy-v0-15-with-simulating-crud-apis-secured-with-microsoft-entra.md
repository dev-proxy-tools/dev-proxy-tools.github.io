---
title: "Dev Proxy v0.15 with simulating CRUD APIs secured with Microsoft Entra"
description: "We're excited to announce the release of Dev Proxy v0.15, with new features that allow you to spend more time building your app and less time on things you..."
date: 2024-02-28
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/og-image-dev-proxy-v0-15-with-simulating-crud-apis-secured-with-microsoft-entra.jpg"
---

We're excited to announce the release of Dev Proxy v0.15, with new features that allow you to spend more time building your app and less time on things you won't be shipping.

**In this updated version:**

- Simulate CRUD APIs secured with Microsoft Entra
- Simulate OAuth flows
- Improved monitoring URLs
- Add multiple instances of the same plugin
- More flexible simulating throttling
- Improved support for CORS
- Choose how to start Dev Proxy
- Extend Dev Proxy with custom commands
- Get notified about new beta versions
- …and more!

## Simulate CRUD APIs secured with Microsoft Entra

Using the CrudApiPlugin Dev Proxy, you can simulate CRUD APIs. This is invaluable when you build apps while the underlying APIs aren't available yet.

In this version, we extend the CrudApiPlugin with support for simulating APIs secured with Microsoft Entra. When building enterprise apps, the APIs you connect to are secured with Microsoft Entra. This feature allows you to easily simulate secured APIs without having to spend time on setting up resources you won't be shipping to production.

When defining your CRUD API, you can choose which aspect of the access token you want to validate, like the audience, issuer, permissions or token lifetime, which is perfect for working with simulated access tokens. You can also choose to validate the token signature to ensure that the app is using a real token!

![Dev Proxy simulating a CRUD API secured with Microsoft Entra](/blog/images/TODAY_01.png)

Learn more about [simulating CRUD APIs with Dev Proxy](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/simulate-crud-api).

## Simulate OAuth flows

Many apps built on Microsoft cloud are secured with Microsoft Entra. Before you can access them, you need to sign in and get an access token.

In this version we introduce the new EntraMockResponsePlugin which allows you to simulate OAuth flows. After detecting an OAuth flow, the plugin updates auth codes and simulated access tokens so that they're accepted by Microsoft Identity libraries.

![Dev Proxy simulating OAuth flow for an app built using Microsoft Graph Toolkit](/blog/images/Screenshot-2024-02-27-141313.png)

Stay tuned for more information and examples of using this plugin in the coming weeks.

## Improved monitoring URLs

To help you reuse your presets like generating OpenAPI specs, generating mocks, and execution summaries with different APIs, in this release we introduce a new option – urlsToWatch. This option enables you to provide URLs to watch from the command line. Simply use `-u` or `–urls-to-watch` and specify the URLs you want to monitor, without having to change your presets!

![Starting Dev Proxy with specifying URLs to monitor from the command line](/blog/images/TODAY_03.png)

In this version, we also introduce support for monitoring URLs on a specific port only! This is invaluable if you build apps, for example using .NET Aspire, where you have several APIs running locally and want to watch requests to one of them. This feature gives you fine-grained control over URL watching for a more precise developer experience.

Learn more about [Dev Proxy configuration options](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/proxy-settings).

## Add multiple instances of the same plugin

Plugins in Dev Proxy give you the ability configure it to your specific needs. Whether it's simulating specific behaviors or monitoring URLs, you're in control of how you want Dev Proxy to help you.

Previously, we introduced the ability to add multiple instances of the same plugin. This is invaluable in cases where you want to, for example define multiple instances of CRUD APIs or define mocks which you can reuse across different presets. In this version, we improved this ability further by changing how plugins expose their command-line options, to avoid conflicts between the different instances.

![Sample Dev Proxy configuration with multiple instances of the same plugin](/blog/images/TODAY_04.png)

## More flexible simulating throttling

Throttling is one of the hardest API behaviors to simulate because it's elusive: it happens only when the server runs out of resources. This is one of the scenario's where using Dev Proxy is invaluable. You can simulate throttling on-demand without incurring unnecessary load on your production APIs and see how your app handles it.

In this version, we extend the GenericRandomErrorPlugin and GraphRandomErrorPlugin with the ability to configure the retry-after value on throttled responses. This allows you to simulate different scenarios and delays and see how they impact your application.

Learn more about [simulating random errors with Dev Proxy](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/test-my-app-with-random-errors).

## Improved support for CORS

When building client-side apps, you typically call APIs located on other domains. For these requests to work, the API needs to support CORS (Cross-Origin Resource Sharing).

In this release, we update the RateLimitingPlugin and RetryAfterPlugin to expose throttling information for cross-origin requests, which allows your app to properly handle throttling.

Learn more about [simulating rate limiting with Dev Proxy](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/simulate-rate-limit-api-responses).

## Choose how to start Dev Proxy

When you start Dev Proxy, it automatically registers itself as your system-wide proxy. It also registers an SSL certificate so that it can intercept and inspect HTTPS API requests. We do this so that you can start using Dev Proxy right away with as little setup as possible.

In this version we introduce two new options that you can use to control how you want to start Dev Proxy. By starting Dev Proxy with `–as-system-proxy false` you won't register it as your system proxy. By using `–install-cert false` Dev Proxy won't install its SSL certificate.

Both options give you more flexibility when using Dev Proxy with different scenarios such as using Dev Proxy in a Docker container.

Learn more about [Dev Proxy configuration options](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/proxy-settings).

## Extend Dev Proxy with custom commands

You keep providing us with great feedback and new ideas. In preparation for building some of them, we extend Dev Proxy with the ability for plugins to add new commands to Dev Proxy. We see this as a great way to add functionality that doesn't depend on monitoring requests but is related to Dev Proxy. Stay tuned for more updates!

## Get notified about new beta versions

We strive to respond as quickly as possible to your feedback and ship new features and improvements as soon as they're ready. We find it invaluable to hear from you and want to make it as easy as possible for you to try our latest releases.

Starting from this version, you can subscribe to new beta version notifications. Each time you start Dev Proxy, it'll check if there's a new beta version available and let you know if you can upgrade.

Learn more about [Dev Proxy configuration settings](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/proxy-settings).

## Breaking changes

In this version, we introduce several breaking changes:

- [We've changed how plugins expose options](https://github.com/microsoft/dev-proxy/pull/557) to support the ability of adding multiple instances of the same plugin
- We've changed [how we keep track of throttled requests](https://github.com/microsoft/dev-proxy/pull/523)
- We've changed [logging and renamed logging levels](https://github.com/microsoft/dev-proxy/pull/564)

These changes mostly affect you if you've built custom plugins. Check out [our latest code](https://github.com/microsoft/dev-proxy) for examples of how to update your code.

## There's more

There's more! This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.15.0) for the complete list of changes in this version.

## Try it now

Download Dev Proxy v0.15 today and build better apps connected to APIs!

Thanks to [Stephan van Rooij](https://github.com/svrooij), [Oliver Haucke](https://github.com/ohaucke), [Ramesh Adhikari](https://github.com/SilentSobs) and [excelsiorvita](https://github.com/excelsiorvita) for contributing to this release.

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
