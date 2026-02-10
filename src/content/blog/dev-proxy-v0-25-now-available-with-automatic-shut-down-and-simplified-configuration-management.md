---
title: "Dev Proxy v0.25, now available, with automatic shut down and simplified configuration management"
description: "We're excited to announce the release of Dev Proxy v0.25. This update brings significant improvements to configuration management, plugin support, and..."
date: 2025-02-27
author: "Garry Trinder, Waldek Mastykarz"
tags: ["release"]
---

We're excited to announce the release of Dev Proxy v0.25. This update brings significant improvements to configuration management, plugin support, and usability, making it easier than ever to simulate APIs and test applications under real-world conditions.

**In this version:**

- Automatically closing Dev Proxy when inactive
- A new command to create a config file
- Improved discoverability of plugin options
- Smarter handling of –urls-to-watch
- JSON schema support for plugin configurations
- …and more!

## Automatically closing Dev Proxy when inactive

Ever left Dev Proxy running longer than intended? In this release, we're introducing the `timeout` option that allows you to specify how long Dev Proxy should run when inactive before automatically stopping.

For example, to have Dev Proxy automatically shut down after it's been inactive for 30 seconds, run:

```
devproxy --timeout 30
```

Each time Dev Proxy intercepts a request, it resets the inactivity timer.

Thanks to [Joshua](https://github.com/joshua-siw) for contributing this feature!

## A new config new command

Storing Dev Proxy settings in dedicated configuration files allows you to easily switch in using it for different scenarios. In this version, we introduce a new command that allows you to quickly create a new configuration file in the current folder.

To create a new configuration file, run:

```
devproxy config new
```

![Easily create a new Dev Proxy configuration file using the new config new command](/blog/images/word-image-23844-1.png)

If you don't specify a name, this command creates a file with the default devproxyrc.json name. If a file with the same name exists, Dev Proxy will append a number (e.g., devproxyrc_2.json) to ensure uniqueness.

By default, new configuration files include the current schema reference, a section for adding plugins, URLs to watch, and default settings, in short, everything to help you get started configuring Dev Proxy to your needs.

## Improved discoverability of plugin options

When running devproxy -h, options provided by plugins were not displayed due to optimizations that prevented plugin loading for global options. This made it harder for you to discover available plugin-specific configurations.

With this update, Dev Proxy loads plugins when displaying help (-h), making it easier to see the available commands and options.

![Dev Proxy showing plugins' options in its help information](/blog/images/word-image-23844-2.png)

## Smarter handling of –urls-to-watch

Previously, the –urls-to-watch argument allowed you to override URLs specified in the configuration file when using the MockResponsePlugin. However, with the recent update to the mock file format—where request URLs are explicitly defined—this behavior became inconsistent.

By updating the URL of the requests in random errors file to `https://*/*` you retain the ability to override URLs to watch from command line.

![Make request URLs in random errors file generic to allow overriding them from command line](/blog/images/word-image-23844-3.png)

We've updated the default errors file that we include with Dev Proxy to reflect this change and show you how it works in action.

## Breaking changes

This version includes several breaking changes.

### Better rate configuration for error simulation

Previously, the `rate` option, that defines the request failure rate, was exposed as a global configuration property, but in practice, it only applied to the Graph- and GenericRandomError plugins. In this release, we've moved the `rate` setting to these plugins specifically, preventing confusion and keeping configurations cleaner.

![rate option moved to be a plugin setting](/blog/images/word-image-23844-4.png)

The `rate` option defined as a global property is ignored.

### Renamed `preset get` to `config get` and moved `config` to `config open`

To unify all commands related to managing configuration, we renamed the `preset get` command to `config get`. We also moved the functionality of the `config` command, which opens the currently used configuration file in a code editor, to `config open`.

![Dev Proxy config options](/blog/images/word-image-23844-5.png)

## JSON schema support for plugin configurations

To improve IntelliSense and real-time feedback, we're introducing JSON schemas for plugin configuration. In each configuration block, you can now add a `$schema` property which references the corresponding schema.

In the future versions of Dev Proxy, we'll add validating the config based on the provided schemas to let you know as soon as possible if there's something wrong with your configuration.

![Plugin configuration section with a schema reference](/blog/images/word-image-23844-6.png)

To avoid naming conflicts and align the names, we renamed the previously released schemas for random errors, mock responses and API configuration.

## Bug fixes and improvements

In this version, we fix several bugs.

- Fixed an issue with GraphMinimalPermissionsPlugin where retrieving minimal permissions failed due to an exception.
- Fixed a bug where watchProcessNames was not set from the config file due to unexpected empty collections overwriting user-defined values.
- Fixed missing RC schema properties to include languageModel and filterByHeaders, ensuring configurations align with recent feature updates.
- Changed the default language model to llama3.2 for improved generation of operation ID and description when using Dev Proxy to generate OpenAPI specs.

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.18.0.

In this version, we've updated all code snippets to use the latest schema and reflect the breaking changes in v0.25.0 release.

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Dev Proxy joins .NET Foundation

We're excited to share that the Dev Proxy project has joined the .NET Foundation. The .NET Foundation is an independent, non-profit organization established to support an innovative, commercially friendly, open-source ecosystem around the .NET platform. We're thankful for this opportunity and are looking forward to engaging with the community.

## There's more

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.25.0) for the complete list of changes in this version.

## Try it now

[Download Dev Proxy v0.25](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started/set-up) today and build better API-connected applications!

Have questions or feedback? Join our [Discord community](https://aka.ms/devproxy/discord) and let us know what you think.

Follow us on [X / @Microsoft365Dev](http://twitter.com/microsoft365dev), [LinkedIn](http://linkedin.com/showcase/microsoft365dev), and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
