---
title: "Dev Proxy v0.27 with generating TypeSpec files and configuring using natural language"
description: "We're excited to announce the release of Dev Proxy v0.27. This version focuses on making Dev Proxy even more developer-friendly, helping you generate API..."
date: 2025-04-29
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're excited to announce the release of Dev Proxy v0.27. This version focuses on making Dev Proxy even more developer-friendly, helping you generate API specs faster, improving suggestions while editing, and laying the foundation for more flexible AI integrations.

**In this version:**

- Generate TypeSpec definitions from requests
- Experimental Dev Proxy MCP server
- Refactored local language model connection for more hosts
- Extended JSON schemas with descriptions
- Improved intercepting URLs and reloading mocks on change

## Generate TypeSpec definitions from requests

In addition to generating OpenAPI specifications from intercepted requests, Dev Proxy can now generate TypeSpec definitions!

[TypeSpec](https://typespec.io/) is a new way to model APIs and generate code across ecosystems. The more your API evolves, the more benefit you get from using TypeSpec. With this update, you can use Dev Proxy to quickly scaffold TypeSpec definitions from real traffic—helping you get started with API modeling even faster.

![Dev Proxy generates a TypeSpec definition for an API](/blog/images/Screenshot-2025-04-29-151434.png)

Generating TypeSpec definitions using Dev Proxy works the same way as generating OpenAPI specs. Also here, for the best results, we suggest that you use a language model to get more accurate and readable operation descriptions.

Learn more about [generating TypeSpec definitions](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/technical-reference/typespecgeneratorplugin) using Dev Proxy.

Thanks to [Tom Morgan](https://github.com/tomorgan) and [Paul Bullock](https://github.com/pkbullock) for early testing this feature and feedback.

## Experimental Dev Proxy MCP server

We're excited to announce an experimental Dev Proxy MCP server! Use our server to:

- Create Dev Proxy configurations using natural language
- Get contextual help for working with Dev Proxy
- Discover Dev Proxy features and capabilities

For a long time, we've wanted to let you configure Dev Proxy using natural language. Dev Proxy offers many features and supports a wide range of scenarios, but if you're not using it regularly, it might take you a while to discover what's possible and how to correctly configure Dev Proxy. With the advancements in LLMs we've been getting closer and closer to this ability. The recent support for MCP (Model Context Protocol) servers was the final piece of the puzzle that we needed. Using a custom MCP server, we can provide AI agents with the necessary information about Dev Proxy to help you configure it for your needs!

Here are some examples of how you can use our MCP server with the GitHub Copilot agent in Visual Studio Code:

![GitHub Copilot in Agent mode creating a Dev Proxy configuration for simulating Microsoft Graph behaviors using the Dev Proxy MCP server](/blog/images/word-image-24124-2.png)

![GitHub Copilot in Agent mode creating a Dev Proxy configuration for simulating latency on a public API using the Dev Proxy MCP server](/blog/images/word-image-24124-3.png)

If you use Visual Studio Code insiders, you can get our MCP server from an [experimental version of the Dev Proxy Toolkit](https://github.com/garrytrinder/dev-proxy-toolkit/releases/tag/mcp.1). Otherwise, get it from [npm](https://www.npmjs.com/package/@devproxy/mcp) and follow the instructions for your MCP host to use it.

Try it and let us know! We'd love to hear from you what's working and what else we should consider to make it better for you.

## Refactored local LLM connection for broader AI host support

We've refactored the local Language Model (LM) connection to make it generic. Previously, the connection logic was tightly coupled to Ollama. With this update, we're introducing support for connecting Dev Proxy to any language model client that exposes OpenAI-compatible APIs, making it easier to connect to the AI providers you prefer.

By default, Dev Proxy uses Ollama, but you can specify the [URL](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/use-language-model#configure-dev-proxy-to-use-a-local-language-model) of a different language model client in Dev Proxy's configuration settings.

## Enhanced JSON schemas with descriptions and markdown

We've updated our JSON schemas to include descriptions. When editing your Dev Proxy configuration in Visual Studio Code, you'll now see additional information about each property – making it easier to understand each property and configure Dev Proxy correctly.

![Additional information about properties visible thanks to updated schemas](/blog/images/word-image-24124-4.png)

## Improved intercepting URLs and reloading mocks on change

When changing a mock file while Dev Proxy was running on Windows, the file watcher would previously reload the mock multiple times. We've fixed this issue to ensure that Dev Proxy now reloads the mock file just once, improving performance and stability. We've also improved defining URLs to follow and exclude.

## There's more

This release also includes several bug fixes and improvements. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.27.0) for the complete list of changes in this version.

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.22.0.

In this version, we've included:

- Added two new commands
  - Create a new configuration file
  - Restart Dev Proxy
- Updated all code snippets to use the latest schema
- Added snippets for the TypeSpecGeneratorPlugin and its related configuration section

Checkout the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Try it now

[Download Dev Proxy v0.27](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started/set-up) or pull the new Docker image and build better, more secure apps faster than ever.

Have questions or feedback? Join our [Discord community](https://aka.ms/devproxy/discord) and let us know what you think.

Follow us on [X](http://twitter.com/microsoft365dev), [LinkedIn](http://linkedin.com/showcase/microsoft365dev), and subscribe to our [YouTube](https://www.youtube.com/microsoft365developer) channel to stay up to date on the latest developer news and announcements.
