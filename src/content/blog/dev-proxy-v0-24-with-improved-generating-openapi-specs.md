---
title: "Dev Proxy v0.24 with improved generating OpenAPI specs"
description: "We're thrilled to announce the release of Dev Proxy v0.24. If you're looking to simulate APIs and test your applications under real-world conditions, you..."
date: 2025-01-29
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're thrilled to announce the release of Dev Proxy v0.24. If you're looking to simulate APIs and test your applications under real-world conditions, you should try Dev Proxy!

**In this version:**

- Generate OpenAPI specs in JSON and YAML
- Generate OpenAPI specs for use with Microsoft Power Platform
- Easily find URLs to watch
- View timestamps for intercepted requests
- Use Dev Proxy in scripts
- …and more!

## Generate OpenAPI specs in JSON and YAML

Developers often have strong preferences when it comes to file formats. While some prefer generating OpenAPI specs in JSON, others use YAML.

In this version, we introduce support for allowing you to choose in which format you'd like to generate OpenAPI specs. You can control the format using the specFormat option in the OpenApiSpecGeneratorPlugin configuration.

This new configuration option gives you more flexibility for generating OpenAPI specs and getting them in the format you and your team prefer.

Learn more about [generating OpenAPI specs](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/generate-openapi-spec) using Dev Proxy.

## Generate OpenAPI specs for use with Microsoft Power Platform

OpenAPI specifications are a cornerstone for creating custom connectors in the Power Platform. Right now, Power Platform supports OpenAPI specs v2. However, until now, Dev Proxy's OpenApiSpecGeneratorPlugin only supported OpenAPI v3.

In this version, we introduce support for allowing you to choose if you want to generate a v2 or a v3 OpenAPI spec when using the OpenApiSpecGeneratorPlugin. You can control the version using the new specVersion property in the plugin's configuration.

This new option allows you to quickly generate OpenAPI specs compatible with Power Platform so that you can rapidly build solutions on Power Automate, Power Apps, and of course using Copilot Studio!

## Easily find URLs to watch

Dev Proxy allows you to simulate behaviors for APIs. To do that, you need to know which URLs your app is calling and configure Dev Proxy to intercept them.

To help you find out which URLs your app is calling, we're introducing a new configuration preset. Using this preset, you quickly get a list of all unique URLs that your app is calling, which you can then add to your Dev Proxy configuration file.

To use the new preset, specify it when starting Dev Proxy. For example, to discover URLs for a client-side app running in Microsoft Edge run:

```
devproxy --config-file "~appFolder/presets/urls-to-watch.json" --watch-process-names msedge
```

Dev Proxy tracks all unique URLs and gives you a list that you can easily copy to your Dev Proxy config file.

![Now you can use Dev Proxy to discover URLs to watch](/blog/images/word-image-23729-1.png)

**Tip:** To ensure that Dev Proxy only intercepts URLs from your app, we recommend that you only watch for requests from a specific process, specifying it either by name or ID.

We believe that this new preset will save you from figuring out which URLs to configure with Dev Proxy either manually or by using other apps. Now, you can use Dev Proxy itself to find out which URLs your app is calling!

Learn more about [discovering which URLs to watch](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/discover-urls-watch).

## View timestamps for intercepted requests

In the past, when you used Dev Proxy with an application that issues many API requests, you might've found it hard to relate Dev Proxy output to your application's activity. Following the feedback from our customers, in this version we release printing the timestamp of each intercepted request using a new time message.

![Dev Proxy shows the timestamp of the intercepted request making it easier to correlate it with the application activity](/blog/images/word-image-23729-2.png)

We believe that this feature will help you associate requests from your application with Dev Proxy's output. Also, if you use Dev Proxy for longer time, you no longer need to restart it and can more easily see which messages relate to your latest activity.

Try it and tell us what you think!

## Use Dev Proxy in scripts

Previously, starting Dev Proxy via an npm script could throw an exception, derailing your workflow. You'd see errors like this:

```
> demo-randomerror-js@1.0.0 start
> npx concurrently "npx http-server -p 3000 -s" "devproxy -c randomerror.devproxyrc.json"

[1] fail: Hosting failed to start
[1] System.InvalidOperationException: Cannot see if a key has been pressed...
```

The bug was caused by Dev Proxy monitoring key presses even when you'd start it in a non-interactive way, like a background process. In this release we've fixed this issue, and you should be able to use Dev Proxy in both interactive and non-interactive way.

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.16.0.

In this version, we've updated all code snippets to use the latest schema and reflect the changes in v0.24.0 release.

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## There's more

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.24.0) for the complete list of changes in this version.

## Try it now

[Download Dev Proxy v0.24](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started/set-up#install-dev-proxy) today and build better apps connected to APIs!

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev), [LinkedIn](https://www.linkedin.com/showcase/microsoft365dev), and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
