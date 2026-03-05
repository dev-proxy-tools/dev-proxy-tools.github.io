---
title: "Dev Proxy v2.2 with YAML config, detached mode, and OpenAI Responses API"
description: "Dev Proxy v2.2 brings YAML configuration support, detached background mode, OpenAI Responses API support, structured JSON output, and major CLI improvements for agents and automation."
date: 2026-03-05
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v2-2-0.png"
---

We're excited to announce the release of **Dev Proxy v2.2.0!** This is a big one. We've added first-class YAML configuration support, a detached mode for running Dev Proxy in the background, and rebuilt the CLI experience from the ground up for automation and AI agents.

### **In this version:**

- **YAML configuration** with anchors and merge keys for all config files
- **Detached mode** - run Dev Proxy in the background with `--detach`
- **Built for automation** - structured JSON output, TTY detection, proper exit codes, and more
- **OpenAI Responses API** support across all OpenAI plugins
- Improved error simulation and mocking
- Bug fixes and polish

---

### **YAML configuration support**

Tired of wrestling with JSON commas and missing brackets? Dev Proxy now supports **YAML as a first-class alternative to JSON** for all configuration files - not just the main config, but also mocks, CRUD API definitions, error responses, rate limiting configs, and everything else.

Just use a `.yaml` or `.yml` extension, and Dev Proxy picks it up automatically. Your existing JSON configs continue to work unchanged.

The real power? **YAML anchors and merge keys**. Define reusable configuration blocks once and reference them everywhere:

```yaml
throttled: &throttled
  statusCode: 429
  body: '{"error": "Too many requests"}'

mocks:
  - request:
      url: https://graph.microsoft.com/v1.0/users
    response:
      <<: *throttled
  - request:
      url: https://graph.microsoft.com/v1.0/groups
    response:
      <<: *throttled
```

No more copying the same error response across dozens of mock entries. Define it once, reuse it everywhere.

You can also create new YAML configs from the start by naming your config file with a `.yaml` extension when running `devproxy config new my-config.yaml`.

---

### **Detached mode**

No more sacrificing a terminal window. The new `--detach` flag starts Dev Proxy as a background daemon:

```bash
devproxy --detach
```

Dev Proxy starts, writes its state to disk, and returns control to your terminal. Manage it with the new companion commands:

- `devproxy status` - check if Dev Proxy is running and see its configuration
- `devproxy logs` - stream or read the daemon's output
- `devproxy stop` - cleanly shut down the background instance

Whether you're running Dev Proxy alongside your development workflow or embedding it in a CI/CD pipeline, detached mode keeps it out of your way while staying fully controllable.

---

### **Built for automation**

This release makes Dev Proxy a first-class citizen for CI/CD pipelines and AI agents. We've made a series of changes that together transform how Dev Proxy works in automated environments.

#### **Structured JSON output**

The new `--output json` flag gives you machine-readable JSONL output across all commands:

```bash
devproxy --output json
devproxy outdated --output json
devproxy config get --output json
```

All output follows a consistent envelope format that agents can dispatch on via the `type` field:

```json
{"type":"log","level":"info","message":"...","timestamp":"..."}
{"type":"request","method":"GET","url":"...","timestamp":"..."}
{"type":"result","data":{...},"timestamp":"..."}
```

This replaces the previous `--log-for` flag with an industry-standard pattern used by CLIs like `az`, `gh`, and `kubectl`.

#### **Config validation**

The new `devproxy config validate` command lets you catch configuration errors before starting Dev Proxy:

```bash
devproxy config validate
devproxy config validate --config-file my-config.json
```

No more starting Dev Proxy only to discover a typo in your config.

#### **CLI polish**

- **TTY detection** - Dev Proxy detects non-interactive terminals and skips interactive prompts, preventing agent hangs
- **Exit codes** - exit code 2 for input errors, properly documented in help output
- **NO_COLOR support** - respects `NO_COLOR`, `TERM=dumb`, and `--no-color` for clean log parsing
- **--no-watch flag** - disables config file auto-restart, useful in CI/CD where config doesn't change
- **Concrete examples** in all `--help` screens
- **Compact error output** with improved error messages
- **`devproxy api show`** command to display API endpoint information
- **Suppressed startup noise** - filtered internal proxy library log messages that cluttered output

---

### **OpenAI Responses API support**

OpenAI recommends the [Responses API](https://platform.openai.com/docs/api-reference/responses) (`/v1/responses`) over Chat Completions for new projects. Dev Proxy now supports it across all OpenAI-related plugins:

- **OpenAIMockResponsePlugin** - mocks Responses API by converting to/from chat completion format
- **OpenAITelemetryPlugin** - records telemetry for Responses API operations
- **LanguageModelFailurePlugin** - injects fault prompts into Responses API requests
- **LanguageModelRateLimitingPlugin** - tracks rate limits for Responses API calls

Whether your app uses the newer Responses API or the classic Chat Completions API, Dev Proxy has you covered.

---

### **Improved error simulation and mocking**

#### **Per-response retry-after values**

The **GenericRandomErrorPlugin** now supports the `@dynamic=N` syntax for `Retry-After` headers, letting you configure different retry-after values per response:

```json
{
  "statusCode": 429,
  "headers": [
    {
      "name": "Retry-After",
      "value": "@dynamic=17"
    }
  ]
}
```

This response uses 17 seconds for its `Retry-After` countdown, regardless of the plugin's global `retryAfterInSeconds` setting. The plain `@dynamic` token still works and falls back to the global config.

#### **Regex body matching in MockStdioResponsePlugin**

The **MockStdioResponsePlugin** now supports `bodyRegex` for regex-based request body matching, solving a common problem where string-contains matching (`bodyFragment`) could produce false positives - like `"initialized"` matching both the `initialized` method and `notifications/initialized`.

Use `bodyRegex` for precise matching and `bodyFragment` for simple contains matching. If both are specified, `bodyRegex` takes precedence.

---

### **Bug fixes and polish**

- Fixed emoji encoding in recorded `.har` files
- Fixed response body decoding as UTF-8 when no charset specified in **DevToolsPlugin**
- Graceful handling of permissions API errors in `UpdateUserScopesAsync`
- Log actual API port when configured with port 0
- Normalized enum names to lowercase in **GraphMinimalPermissionsPlugin** schema
- Updated logo to use the official .NET brand color (`#512bd4`)

---

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.14.0.

In this version, we've:

- Added a "Start with Options..." command to launch Dev Proxy with interactive prompts for CLI settings
- Added automated install and upgrade support for Linux
- Added prompt to recommend Dev Proxy Toolkit when a project contains Dev Proxy config files but doesn't have it listed in recommended workspace extensions
- Added an "Upgrade Configs" command that uses Copilot Chat with Dev Proxy MCP tools
- Added quick fixes for orphaned config sections (remove or link to a plugin)
- Updated all JSON snippets to use v2.2.0 schemas
- Introduced improved logging output
- Fixed incorrect diagnostics

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

---

### **Why upgrade to v2.2.0?**

✅ **YAML-first config** - Write cleaner, more maintainable configs with anchors and merge keys  
✅ **Background mode** - Run Dev Proxy as a daemon without tying up a terminal  
✅ **Built for automation** - Structured JSON output, TTY detection, config validation, and proper exit codes  
✅ **OpenAI Responses API** - Test apps using OpenAI's recommended API  
✅ **Fine-grained error simulation** - Per-response retry-after values and regex body matching

### **Try it now**

Download **Dev Proxy v2.2.0** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
