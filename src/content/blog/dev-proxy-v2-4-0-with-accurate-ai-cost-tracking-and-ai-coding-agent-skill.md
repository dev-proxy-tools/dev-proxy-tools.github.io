---
title: "Dev Proxy v2.4.0 with accurate AI cost tracking and AI coding agent skill"
description: "Dev Proxy v2.4.0 brings accurate cached token pricing, model tagging for OpenTelemetry, upgrade-safe configuration downloads, improved LLM failure simulation, and a new skill for AI coding agents."
date: 2026-05-05
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v2-4-0.png"
---

We're excited to announce the release of **Dev Proxy v2.4.0!** This release focuses on making your AI cost tracking more accurate, improving LLM failure simulation, and introducing a brand new way for AI coding agents to work with Dev Proxy.

### **In this version:**

- Accurate cached token pricing in cost calculations
- OpenTelemetry model tagging for requests and responses
- Upgrade-safe configuration downloads
- Improved LLM failure simulation
- New Dev Proxy skill for AI coding agents

### **Accurate cached token pricing**

When your AI-powered app uses cached prompts, OpenAI charges significantly less for those tokens. Until now, the **OpenAITelemetryPlugin** treated all input tokens the same when calculating costs - meaning your reports overstated what you were actually spending.

Dev Proxy v2.4.0 adds full support for cached token pricing. The plugin now distinguishes between regular and cached input tokens, applies their distinct pricing rates, and reports costs accurately in telemetry and exported reports.

**Why this matters:** If your app benefits from prompt caching, you can now see exactly how much you're saving. No more guessing - just accurate, actionable cost data that helps you optimize your AI spending.

### **OpenTelemetry model tagging**

The **OpenAITelemetryPlugin** now tags spans with OpenTelemetry GenAI semantic conventions for the model used in each request and response:

- `gen_ai.request.model` - the model specified in the request
- `gen_ai.response.model` - the model returned in the response

This improves trace and metric correlation in your observability stack, making it easier to filter, group, and analyze telemetry data by model.

### **Upgrade-safe configuration downloads**

Previously, `config get` downloaded configurations to a `config` subfolder inside the Dev Proxy installation folder. Every time you upgraded Dev Proxy, those downloaded configs were wiped out because installers overwrite the entire installation directory.

Starting with v2.4.0, `config get` downloads configurations to the user data folder instead:

| Platform | Location |
|----------|----------|
| macOS | `~/Library/Application Support/dev-proxy/configs/` |
| Linux | `~/.config/dev-proxy/configs/` |
| Windows | `%LocalAppData%\dev-proxy\configs\` |

Your downloaded configurations now survive upgrades, and there's a clear separation between built-in presets and your custom configs.

### **Improved LLM failure simulation**

We've fixed two issues in the **LanguageModelFailurePlugin** that affected how it simulates failures in OpenAI-style APIs:

- **Body encoding** - the plugin now correctly decodes request body bytes for proper OpenAI request detection and parsing
- **Prompt role** - injected failure prompts now use the `"system"` role instead of `"user"` for chat completions and Responses API requests, better matching how real system-level failures would appear

These fixes make the failure simulation more realistic, helping you build more resilient AI-powered applications.

### **Dev Proxy skill for AI coding agents**

We've added a new Dev Proxy skill - a structured knowledge package that teaches AI coding agents (like GitHub Copilot, Claude, Cursor, and others) how to use Dev Proxy effectively.

The skill covers scenario-based workflows including mocking API responses, testing API resilience, testing LLM integrations, analyzing API usage, and setting up CI/CD pipelines. Instead of figuring out Dev Proxy configuration from scratch, your AI coding agent can now follow proven patterns and best practices.

You'll find the skill in the [`skills/dev-proxy/`](https://github.com/dotnet/dev-proxy/tree/main/skills/dev-proxy) folder in the Dev Proxy repository.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.26.0.

In this version, we've:

- Updated all JSON snippets to use v2.4.0 schemas

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### **Why upgrade to v2.4.0?**

✅ **Accurate cost insights** - Cached token pricing gives you real numbers, not inflated estimates  
✅ **Better observability** - Model tagging improves filtering and analysis in your telemetry stack  
✅ **Upgrade-safe configs** - Downloaded configurations survive Dev Proxy upgrades  
✅ **Realistic failure simulation** - Improved body encoding and prompt roles for LLM failure testing  
✅ **AI-assisted workflows** - Teach your coding agent how to use Dev Proxy with the new skill

### **Try it now**

Download **Dev Proxy v2.4.0** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
