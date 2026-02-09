---
title: "Dev Proxy v0.26 with improved mocking, plugin validation, and Docker support"
description: "We're excited to announce the release of Dev Proxy v0.26. This version brings improved validation, plugin reliability, an improved developer experience, and..."
date: 2025-04-02
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're excited to announce the release of Dev Proxy v0.26. This version brings improved validation, plugin reliability, an improved developer experience, and a brand-new Docker image to make Dev Proxy even easier to use in isolated and automated environments.

**In this version:**

- New Dev Proxy Docker image
- Check minimal permissions for using SharePoint CSOM APIs
- Easier URL discovery with –discover
- Pass API spec variables values
- Validate mock URLs against urlsToWatch
- Validate plugin config using JSON schemas
- Tons of bug fixes and quality improvements

## Run Dev Proxy in Docker

We're excited to share that we've published [Dev Proxy as a Docker image](https://github.com/dotnet/dev-proxy/pkgs/container/dev-proxy). The image allows you to run Dev Proxy without installing anything locally. The image exposes a volume to easily mount config files from your host. It also exposes ports to connect both to Dev Proxy and its API for remote control. To learn more about how to use Dev Proxy in a Docker container, read our [guidance](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/use-dev-proxy-in-docker-container).

Thanks to [Thomas Ploch](https://github.com/tPl0ch) and [Stephan van Rooij](https://github.com/svrooij) for working with us to shape this feature.

## Check minimal permissions for using SharePoint CSOM APIs

There are many solutions out there that use SharePoint Client-Side Object Model (CSOM) APIs to integrate with SharePoint. To help organizations tighten their security, we're releasing [a new plugin that analyzes CSOM requests](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/minimalcsompermissionsplugin) and determines the minimal permissions needed for these operations.

![Dev Proxy listing minimal permissions required to get a list of SharePoint sites](/web/blog/images/word-image-24007-1.png)

## Easily discover and configure URLs to watch

Configuring urlsToWatch just got easier:

- Use the new –discover option to start Dev Proxy in discovery mode. In discovery mode, Dev Proxy listens to all traffic on your machine, without changing its behavior, and makes a list of unique URLs, which you can then configure in your config file.
- Want to intercept everything? Set urlsToWatch to `*` and Dev Proxy will watch all traffic.

We've removed the old urls-to-watch preset, since it's now built-in behind the `–discover` option and easier to use.

## Configure variables

In this version, we release support for specifying variables for Dev Proxy. Variables significantly simplify reusing Dev Proxy configuration files across different tenants.

Right now, we use variables only for replacing server variables in OpenAPI specs when detecting minimal permissions for a set of requests. For example, say you have an API spec for the SharePoint REST API.

Each SharePoint tenant has a unique URL which is parametrized in the API spec. By starting Dev Proxy using `devproxy –env tenant=my-tenant` you can provide the name of your tenant on runtime, without having to store a separate copy of the spec for each team member or environment.

We plan to use variables in other plugins in the future as well. If you have suggestions where it would be helpful, please, let us know!

## Validate mock URLs against urlsToWatch

When using mock responses, Dev Proxy now checks that all mocked URLs are covered by your configured urlsToWatch. Any uncovered URLs will be listed as warnings—helping you spot configuration gaps early and quickly without wondering why things aren't working as expected.

## Validate plugin configs using schemas

In each plugin config, including plugins that we ship with Dev Proxy and custom plugins that you build, you can now add `$schema`. At startup, Dev Proxy will validate each config section against the specified schema. This helps you quickly spot and fix any misconfigurations.

![Dev Proxy showing an error in a plugin configuration](/web/blog/images/word-image-24007-2.png)

## Breaking changes

This version includes several breaking changes.

- Relative paths specified in the apiSpecsFolderPath property in MinimalPermissionsPlugin are now relative to devproxyrc.json aligning it with other similar properties.
- Dev Proxy API is now bound to the same IP address as Dev Proxy. Previously, it was fixed to 127.0.0.1 making it available only on the local host.
- Renamed MinimalPermissionsPlugin to MinimalPermissionsGuidancePlugin. Released new plugin named MinimalPermissionsPlugin which only shows minimal permissions without comparing them to the scopes on the token (guidance).
- Removed the obsolete urls-to-watch preset. You can now use the `–discover` option instead.
- We've updated the Dev Proxy API to make the endpoint names and response shapes consistent with each other and make a better use of standard .NET features.

## There's more

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.26.0) for the complete list of changes in this version.

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.20.0.

In this version, we've updated all code snippets to use the latest schema and reflect the breaking changes in v0.26.0 release.

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Try it now

[Download Dev Proxy v0.26](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started/set-up) or pull the new Docker image and build better, more secure apps faster than ever.

Have questions or feedback? Join our [Discord community](https://aka.ms/devproxy/discord) and let us know what you think.
