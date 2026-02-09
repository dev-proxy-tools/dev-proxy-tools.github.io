---
title: "Dev Proxy v0.29 with refactored architecture, MCP server, and exposed LM prompts"
description: "We're excited to introduce Dev Proxy v0.29, with a major architectural overhaul, control over language model prompts, and improved diagnostics. Whether..."
date: 2025-06-25
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

We're excited to introduce Dev Proxy v0.29, with a major architectural overhaul, control over language model prompts, and improved diagnostics. Whether you're building, debugging, or customizing your API simulations, this version gives you more power and clarity than ever before.

**In this version:**

- Architectural refactoring to better align with .NET
- Dev Proxy MCP Server
- Exposed Dev Proxy language model prompts
- Improved logging with logger categories
- Certificate cleanup on uninstall (Windows)
- Bug fixes and improvements

## Architectural refactoring

This release introduces a major refactor of Dev Proxy's architecture to better align with .NET features. We've:

- Adopted .NET Dependency Injection to simplify object management
- Reorganized project structure for better clarity
- Replaced event-based plugin architecture with base methods
- Improved code consistency and alignment with .NET conventions

This change allows us to set the foundation for a more scalable and maintainable project going forward.

### Breaking changes

As a result of the refactoring, we have the following breaking changes:

- The assembly with standard Dev Proxy plugins is now named `DevProxy.Plugins.dll`. The assembly with shared code for building custom plugins is named `DevProxy.Abstractions.dll`.
- Custom plugin architecture has changed, introducing a different base class. We also no longer use events, but virtual methods which you can override in your custom plugins.
- Changed organization of shared code and other utilities in the `DevProxy.Abstractions` assembly.

## Dev Proxy MCP server

We're excited to announce the release of the Dev Proxy MCP server! Use our server to:

- Create Dev Proxy configurations using natural language
- Get contextual help for working with Dev Proxy
- Discover Dev Proxy features and capabilities

For a long time, we've wanted to let you configure Dev Proxy using natural language. Dev Proxy offers many features and supports a wide range of scenarios, but if you're not using it regularly, it might take you a while to discover what's possible and how to correctly configure Dev Proxy.

With the advancements in LLMs we've been getting closer and closer to this ability. The recent support for MCP (Model Context Protocol) servers was the final piece of the puzzle that we needed. Using a custom MCP server, we can provide AI agents with the necessary information about Dev Proxy to help you configure it for your needs!

Here are some examples of how you can use our MCP server with the GitHub Copilot agent in Visual Studio Code:

![GitHub Copilot in Agent mode creating a Dev Proxy configuration for simulating Microsoft Graph behaviors using the Dev Proxy MCP server](/blog/images/word-image-24434-1-2-scaled.png)

![GitHub Copilot in Agent mode creating a Dev Proxy configuration for simulating latency on a public API using the Dev Proxy MCP server](/blog/images/word-image-24434-2-2-scaled.png)

If you use Visual Studio Code, you can get our MCP server by installing [Dev Proxy Toolkit](https://aka.ms/devproxy/toolkit) from the extension marketplace. Otherwise, get it from [npm](https://www.npmjs.com/package/@devproxy/mcp) and follow the instructions for your MCP host to use it.

Try it and let us know! We'd love to hear from you what's working and what else we should consider to make it better for you.

## Exposed Dev Proxy LM prompts

Dev Proxy uses language models to improve some of its features, such as generating OpenAPI specs or TypeSpec files. By default, we use llama3.2 on Ollama, but you can switch to any other language model and host. While researching language models we realized that when you use a different language model, you also need to update the prompt.

Dev Proxy now exposes the language model prompts used in features like OpenAPI and TypeSpec generation. This gives you full control to tailor prompts when switching models. Our prompts are exposed in the `prompt` folder in Dev Proxy's installation directory. To let you easily test them, we store them as [Prompty](https://prompty.ai/) files.

![Prompty files in Dev Proxy installation directory](/blog/images/word-image-24434-3-2-scaled.png)

## Improved logging with logger categories

Debugging just got easier. Dev Proxy now prints the logger category for debug and trace messages, helping you quickly identify where logs originate in the application.

![Dev Proxy logging with logger categories](/blog/images/word-image-24434-4-1.png)

## Certificate cleanup on uninstall (Windows)

Uninstalling Dev Proxy on Windows now removes the root certificate that Dev Proxy uses for decrypting HTTPS traffic, ensuring a clean uninstall experience.

## New version of Dev Proxy Toolkit

Dev Proxy Toolkit is a Visual Studio Code extension that makes it easy to create and update configuration files. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v0.26.0.

In this version, we've included:

- Dev Proxy MCP Server
- Updated snippets with 0.29 schema and new plugin DLL name
- Plugin path guidance and code action to identify and update old DLL references
- Generate JWT command

We've also updated the way we handle upgrades. When you choose to upgrade Dev Proxy via the upgrade toast notification, if you installed Dev Proxy via a package manager, we now upgrade Dev Proxy in the background for you.

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Try it now

Download Dev Proxy v0.29 and try the new architecture, better customization, and improved diagnostics. Thanks again to [Artem Azaraev](https://github.com/bartizan) for contributing to this release.

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.

Follow us on [X](http://twitter.com/microsoft365dev), [LinkedIn](http://linkedin.com/showcase/microsoft365dev), and subscribe to our [YouTube](https://www.youtube.com/microsoft365developer) channel to stay up to date on the latest developer news and announcements.
