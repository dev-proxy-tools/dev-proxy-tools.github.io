---
title: "Dev Proxy v0.20 with improved simulating API errors and a new API for building integrations"
description: "We're excited to share with you a new version of Dev Proxy to help you build robust apps connected to APIs."
date: 2024-08-27
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're excited to share with you a new version of Dev Proxy to help you build robust apps connected to APIs.

**In this version:**

- Match simulating random API errors with request
- Ignore specific permissions when detecting minimal permissions for calling Microsoft Graph APIs
- Remotely control Dev Proxy using its new web API
- Easily open Dev Proxy configuration
- …and more!

## Match simulating random API errors with requests

The ability to simulate API errors is fundamental to building resilient apps connected to cloud APIs. It enables you to ensure that your app properly handles API errors, which will happen, it's a matter of 'when' rather than 'if'. Using Dev Proxy, you can simulate all possible API errors and see for yourself how your app handles them, all without changing a line of your app's code!

In this version, we further improve the ability to simulate random errors. Previously, you'd specify an array of errors for a URL pattern. In this version, we align simulating random API errors with mock responses. This allows you to specify the URL and method for each collection of errors.

Learn more about [simulating API errors](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/test-my-app-with-random-errors) using Dev Proxy.

## Ignore specific permissions when detecting minimal permissions for calling Microsoft Graph APIs

Using Dev Proxy, you can improve the security posture of your application. Dev Proxy allows you to effortlessly check if your app is using minimal permissions using Microsoft Graph and custom APIs. You can check this at virtually no cost, which makes it a perfect solution to use regularly as your app evolves.

In this version, we improve detecting minimal permissions for calling Microsoft Graph APIs. We introduce the ability to exclude specific permissions from the check, decreasing the likelihood of false positives. This is extremely helpful when your app is for example enabled to retain offline access, which adds an extra scope to your access token, but which isn't a part of minimal permissions to perform Microsoft Graph API operations.

Have you checked if your app is using minimal permissions to call Microsoft Graph APIs? [Learn more](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/check-if-you-are-using-excessive-microsoft-graph-api-permissions).

## Remote control Dev Proxy using its new web API

Originally, we released Dev Proxy as a console application that you can interact with in command line. As we're introducing new features that are invaluable in CI/CD integrations, we realized that we need to offer an ability for you to control API outside of command line.

In this version, we're introducing Dev Proxy web API, which allows you to get information about the currently active Dev Proxy instance and gives you the ability to control Dev Proxy such as starting and stopping recording.

We're planning to expand the Dev Proxy web API with additional information and features. Meanwhile, try it for yourself and tell us what you think.

Learn more about [Dev Proxy web API](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/proxy-api).

## Easily open Dev Proxy configuration

When working with Dev Proxy, you need to regularly open its configuration to update settings to match your scenario. In the past, this was a manual process, requiring you to locate the Dev Proxy configuration file and opening it in your text editor.

For this release, Marco Wiedemeyer contributed the `devproxy config` command which automatically detects if Dev Proxy uses local or global config and opens the corresponding file in the code editor!

This convenience command simplifies using Dev Proxy and managing its settings. Learn more about the [config command](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/config).

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.7.0.

In this version we've updated the code snippets to use the latest schema v0.20.0.

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information.

## There's more

This release also includes several bug fixes and improvements. The most noteworthy include improved launching DevTools on Windows, contributed by Matteo Pagani, and a new base layer – Unobtanium Web Proxy – an updated version of Titanium Web Proxy, managed by Stephan van Rooij.

Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.20.0) for the complete list of changes in this version.

## Try it now

[Download Dev Proxy v0.20](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started#install-dev-proxy) today and build better apps connected to APIs!

Thanks to [Stephan van Rooij](https://github.com/svrooij) for his support in maintaining the base proxy library and his continuous feedback on Dev Proxy. Thanks to [Matteo Pagani](https://github.com/qmatteoq) and [Marco Wiedemeyer](https://github.com/mwiedemeyer) for contributing improvements to this release!

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
