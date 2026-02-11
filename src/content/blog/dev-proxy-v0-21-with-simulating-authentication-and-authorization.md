---
title: "Dev Proxy v0.21 with simulating authentication and authorization"
description: "Achieve more with APIs in your organization. We're excited to share with you a new version of Dev Proxy that helps you to build robust apps connected to APIs."
date: 2024-09-30
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/og-image-dev-proxy-v0-21-with-simulating-authentication-and-authorization.jpg"
---

Achieve more with APIs in your organization. We're excited to share with you a new version of Dev Proxy that helps you to build robust apps connected to APIs.

**In this version:**

- Easily simulate authentication and authorization using API keys and OAuth2
- Quickly generate JWT tokens for testing
- …and more!

## Easily simulate authentication and authorization using API keys and OAuth2

When building APIs on the Microsoft Cloud, you can easily secure them using various methods: from API keys to OAuth2. By using Microsoft's service-level authentication and authorization features, you can configure security for your APIs without having to write custom code for it. For example, when you publish your APIs to Azure Functions, you can use access keys or Easy Auth to secure API access. If you publish your APIs through Azure API Management, you get additional security controls for managing access to your APIs. Using service-level security settings significantly simplifies building APIs and allows you to ensure that your APIs are secure.

When securing your APIs using service-level authentication and authorization, security settings are enforced only when your APIs are published to Microsoft's services. While building your APIs, when you run them locally, they're anonymous. This is convenient for testing the API but prevents you from testing the end-to-end flow including security when you integrate your APIs with other services, such as when building Microsoft 365 Copilot plugins or Power Platform connectors.

In this version of Dev Proxy, we introduce a new plugin (AuthPlugin) that allows you to easily add authentication and authorization capabilities to any URL. Say, you're building an API on Azure Functions, and you want to verify API (access) key security on your local machine. Using the following Dev Proxy configuration file, you can apply access key security with the specified keys to the Azure Function running on your local machine:

```json
{
  "$schema": "https://raw.githubusercontent.com/microsoft/dev-proxy/main/schemas/v0.21.0/rc.schema.json",
  "plugins": [
    {
      "name": "AuthPlugin",
      "enabled": true,
      "pluginPath": "~appFolder/plugins/dev-proxy-plugins.dll",
      "configSection": "auth"
    }
  ],
  "urlsToWatch": [
    "http://localhost:7071/api/*"
  ],
  "auth": {
    "type": "apiKey",
    "apiKey": {
      "parameters": [
        {
          "in": "header",
          "name": "x-functions-key"
        },
        {
          "in": "query",
          "name": "code"
        }
      ],
      "allowedKeys": [
        "abc123"
      ]
    }
  }
}
```

*Dev Proxy simulating API key authentication for a locally running Azure Function*

By updating the AuthPlugin's configuration, you can use OAuth2-based security, either with Microsoft Entra ID or any other OAuth2 identity provider. For more information about the configuration options and examples see the [plugin's documentation](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/authplugin).

We're excited about this new plugin and hope that it'll help you more easily test end to end flows with security in your applications.

## Quickly generate JWT tokens for testing

Continuing our work on authentication and authorization, we introduce a new command that allows you to quickly generate a JWT token for testing your code.

When working with APIs secured with OAuth2, you often need an access token to call and test the API. Getting a JWT token outside of your app isn't trivial. It requires you to thoroughly understand the OAuth flow you need to use and know how to call your identity provider's APIs. In many cases when testing though, you don't need an actual token issued by your provider. Instead, a string that resembles a token and has the necessary claims might be sufficient.

To help you create JWT tokens for testing, we introduce the `jwt create` command. To create a JWT token, in the command line run: `devproxy jwt create`. The command generates a JWT token with default values programmed in Dev Proxy.

![JWT token for testing generated using Dev Proxy](/blog/images/word-image-23046-2.png)

To specify custom values and claims, use the command's arguments. For more information on what's possible, see the [command's documentation](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/jwt-create).

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.10.0.

In this version, we've included the ability for you to start and control Dev Proxy from Visual Studio Code.

![Dev Proxy Toolkit in VS Code](/blog/images/word-image-23046-3.png)

We've made it easy for you to interact with Dev Proxy using global commands, or editor actions. Editor actions appear when you open a Dev Proxy configuration file.

We've added commands and editor actions to:

- Start Dev Proxy
- Stop Dev Proxy
- Start recording
- Stop recording
- Raise a mock request

In this version, we've also:

- Updated all code snippets to use the latest schema, v0.21.0
- Added support for code snippets in JSONC files
- Added new snippets for:
  - AuthPlugin instance
  - AuthPlugin API Key config section
  - AuthPlugin OAuth2 config section
  - Dev Proxy error
  - MinimalPermissionsGuidancePlugin config section

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.21.0) for the complete list of changes in this version.

## What's next

We keep evolving Dev Proxy to make it an even more helpful tool, that keeps you in the flow and helps you build more robust apps connected to APIs. Here's what you can expect in the next version.

### Detecting minimal permissions for any API

In the next version of Dev Proxy, we're going to introduce a new plugin that allows you to [check the minimal permissions for any API using local API specs](https://github.com/microsoft/dev-proxy/pull/889). The new plugin will be named MinimalPermissionsPlugin. The existing plugins that check minimal permissions for Microsoft Graph APIs will be renamed from MinimalPermissionsPlugin to GraphMinimalPermissionsPlugin, and from MinimalPermissionsGuidancePlugin to GraphMinimalPermissionsGuidancePlugin.

### Improved request logging

As we're introducing more plugins, we want to help you understand how each plugin you enable in the configuration processes the intercepted request and response. Starting from the next version, [each logged message will begin with the plugin's name](https://github.com/microsoft/dev-proxy/pull/890). Additionally, we'll introduce a new message type named skip which shows information about plugins that have not affected the request and the reason why. Using configuration, you'll be able to disable showing skip-messages.

![Updated Dev Proxy logs showing how each enabled plugin processes the intercepted request](/blog/images/word-image-23046-4.png)

## Dev Proxy Toolkit pre-release

![Dev Proxy Toolkit pre-release](/blog/images/word-image-23046-5.png)

We will be releasing pre-release versions of the Dev Proxy Toolkit designed to be used with the latest Dev Proxy Beta releases. Try the latest features, before we release them.

## Try it now

[Download Dev Proxy v0.21](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started#install-dev-proxy) today and build better apps connected to APIs!

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
