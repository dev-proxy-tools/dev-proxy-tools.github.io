---
title: "Dev Proxy v0.22 with improved checking minimal API permissions and logging"
description: "We're excited to share with you a new version of Dev Proxy that helps you build robust apps connected to APIs."
date: 2024-11-03
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're excited to share with you a new version of Dev Proxy that helps you build robust apps connected to APIs.

**In this version:**

- Detecting minimal permissions for any API without Azure API Center
- Improved logging
- …and more!

## Detecting minimal permissions for any API without Azure API Center

Previously, we introduced the ability to [verify if your app is calling APIs with minimal permissions](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/check-minimal-api-permissions). By connecting Dev Proxy to Azure API Center, you allow it to load API definitions for detected APIs and verify the use of minimal permissions.

In this release, we extend this feature and introduce a new plugin, named MinimalPermissionsPlugin, that allows you to verify if your app is calling APIs with minimal permissions, without having to use Azure API Center. Instead, you configure the plugin to point to a folder with all API specifications.

![Dev Proxy detecting the use of minimal permissions based on API specs in a local folder](/web/blog/images/word-image-23319-1.png)

We recommend that organizations and larger teams continue to use the plugin that integrates with Azure API Center. It allows them to benefit from their centralized API records and use them to verify the use of minimal API permissions. The new plugin is more suited for single developers, single teams and open-source projects that often don't have access to API Center.

Learn more in [Dev Proxy documentation](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/minimalpermissionsplugin).

## Improved request logging

As we're introducing more plugins, we want to help you understand how each plugin you enable in the configuration processes the intercepted request and response. Starting from this version, each logged message begins with the plugin's name. Additionally, we introduce a new message type named skip which shows information about plugins that have not affected the request and the reason why. Using configuration, you can disable showing skip-messages and make the output less verbose.

![Updated Dev Proxy logs showing how each enabled plugin processes the intercepted request](/web/blog/images/word-image-23319-2.png)

## Improved generating JWT tokens for testing

In the previous version, we introduced the ability to quickly generate JWT tokens for testing. Using the `devproxy jwt create` command you can easily generate a token with specified claims for use with your API.

![JWT token for testing generated using Dev Proxy](/web/blog/images/word-image-23319-3.png)

In this version, we extend the feature by allowing you to specify a custom signing key for the generated token. Specifying your own key allows you to validate the token in your code and more easily verify your security-related code.

## Breaking changes

As Dev Proxy evolves, we introduce a breaking change in this version.

### Renaming minimal permission plugins

In this version, we introduce the new MinimalPermissionsPlugin that allows you to check if your app is calling any API using minimal permissions. To more clearly differentiate it from plugins specific to Microsoft Graph, we've renamed the existing plugins. Following is the mapping between the old and new plugin names.

| Old name | New name |
|----------|----------|
| MinimalPermissionsPlugin | GraphMinimalPermissionsPlugin |
| MinimalPermissionsGuidancePlugin | GraphMinimalPermissionsGuidancePlugin |

If you're using Dev Proxy to verify the use of minimal permissions with Microsoft Graph, be sure to update your Dev Proxy configuration to refer to the plugins using their new names. The functionality of the plugins stays unchanged, and you only need to update the plugin name.

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.12.0.

In this version, we've updated all code snippets to use the latest schema and reflect the breaking changes in v0.22.0 release.

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## There's more

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.22.0) for the complete list of changes in this version.

## Try it now

[Download Dev Proxy v0.22](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started#install-dev-proxy) today and build better apps connected to APIs!

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
