---
title: "Dev Proxy v0.16 with simulated handling Teams Admin Center notifications for Microsoft Graph connectors"
description: "Focus on developing your app and not on things that won't go into production. See how your apps deal with API errors. We're excited to share the launch of..."
date: 2024-03-28
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

Focus on developing your app and not on things that won't go into production. See how your apps deal with API errors. We're excited to share the launch of Dev Proxy v0.16, which has new features that help you create better apps.

**In this version:**

- Simulate Teams Admin Center notifications for Microsoft Graph connectors
- Microsoft Graph connectors guidance for Copilot for Microsoft 365
- Simulate webhooks
- Support for including comments in Dev Proxy config files
- Improved UI
- …and more!

## Simulate Teams Admin Center notifications for Microsoft Graph connectors

Microsoft Graph connectors allow you to bring your organizational content to Microsoft 365. This allows you to find your content from one place, no matter where it's stored. What's more, it gives Copilot for Microsoft 365 access to the content, so that it can help you get more relevant answers.

When deploying Graph connectors in your organization, you should consider packaging them as Microsoft Teams app. That way, they'll be deployed to the Teams Admin Center, from which admins can control them in a familiar way. To package a Graph connector as a Teams app, you need to extend it with an API that receives the webhook from Teams Admin Center.

In this release of Dev Proxy, we're excited to ship the ability for you to simulate the Teams Admin Center notification for enabling and disabling Graph connectors. With the new feature, you can test your code locally end to end: from validating the token, to creating the connection with the ticket from the notification. And you can do all of this locally without deploying anything to Microsoft 365!

![Dev Proxy simulating the Teams Admin Center notification for Graph connectors and mocking subsequent requests for validating the token and creating the external connection.](/web/blog/images/word-image-19958-1.png)

We not only simulate the Teams Admin Center notification. We also check if your code correctly implements the different steps, like properly responding to the notification request or including the ticket from the notification on the external connection creation request. If we see that one of the required steps is missing or implemented incorrectly, we'll warn you about it. This way you can find potential issues earlier and deploy your Graph connector with confidence.

![Dev Proxy warning about the lack of ticket on the request to create an external connection after receiving a Teams Admin Center notification](/web/blog/images/word-image-19958-2.png)

Learn more about [simulating the Teams Admin Center notification for Graph connectors using Dev Proxy](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/mock-teams-admin-center-notification-graph-connectors).

## Microsoft Graph connectors guidance for Copilot for Microsoft 365

Using Microsoft Graph connectors, you can bring your organizational content to Microsoft 365. The ingested content shows up in several user experiences including Microsoft Search, ContextIQ and of course Copilot for Microsoft 365.

There are [several requirements](https://learn.microsoft.com/graph/connecting-external-content-experiences#microsoft-365-copilot) that you have to meet for the content you ingest using your Graph connector to show up in Copilot for Microsoft 365.

In this version of Dev Proxy, we're introducing a new Graph connector guidance plugin, which checks if your external connection is configured properly for use with Copilot for Microsoft 365. We start with validating if your external connection contains the required semantic labels. If it doesn't, we'll warn you and tell you which labels are missing.

![Dev Proxy showing an error after detecting a missing semantic label in an external connection schema provisioning request.](/web/blog/images/word-image-19958-3.png)

We'll be expanding our checks in the future and hope that they'll help you deploy your Graph connectors with confidence.

Learn more about the new [GraphConnectorGuidancePlugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/graphconnectorguidanceplugin).

## Simulate webhooks

Many applications these days rely on webhooks. Webhooks are a common way for systems to notify each other of changes.

A common challenge for working with webhooks is simulating the change in the external system that triggers the webhook. In this version of Dev Proxy, we're introducing the MockRequestPlugin that allows you to send a preconfigured notification to your application with a single key press.

![Dev Proxy simulating a webhook notification request to a local API.](/web/blog/images/word-image-19958-4.png)

By itself, the MockRequestPlugin is a convenient method to send webhook notifications to your app. You can configure the different requests in an easy way in your project and share them with your colleagues. The plugin is also a powerful building block for implementing specialized plugins which encapsulate some additional logic and guidance, such as the one we've just mentioned that simulates Teams Admin Center notifications for Graph connectors.

Learn more about the new [MockRequestPlugin](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/mockrequestplugin).

## Support for including comments in Dev Proxy config files

Over the last year, Dev Proxy evolved into a powerful API simulator that supports many different scenarios. While some require little to no configuration, others are more advanced and use elaborate configuration.

To help you document your settings, we now introduce support for including comments in Dev Proxy configuration and plugin files.

![Dev Proxy configuration file with a comment](/web/blog/images/word-image-19958-5.png)

We hope that it'll help you keep relevant notes next to your configuration so that you can easily share it with your colleagues. Oh, and if you happen to use VSCode, use .jsonc as the file extension for your config files. It'll keep VSCode from highlighting comments as errors.

## Improved UI

As we keep extending Dev Proxy with new features, we want to help you get the most out of it. In this version, we extend the UI with a list of hotkeys that you can use with Dev Proxy to invoke its different features.

![Dev Proxy running in the terminal showing its hotkeys](/web/blog/images/word-image-19958-6.png)

## There's more

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.16.0) for the complete list of changes in this version.

## Try it now

[Download Dev Proxy v0.16](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started#install-dev-proxy) today and build better apps connected to APIs!

Thanks to [Ramesh Adhikari](https://github.com/SilentSobs), and [Oleg Guchok](https://github.com/oleguchok) for contributing to this release.

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
