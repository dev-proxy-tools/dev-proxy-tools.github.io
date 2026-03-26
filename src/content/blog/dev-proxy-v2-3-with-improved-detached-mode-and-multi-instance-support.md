---
title: "Dev Proxy v2.3 with improved detached mode and multi-instance support"
description: "We're excited to announce the release of Dev Proxy v2.3. This release brings significant improvements to detached mode, including proper JSON output, multi-instance support, and proxy URL visibility."
date: 2026-03-26
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v2-3-0.png"
---

We're excited to announce the release of **Dev Proxy v2.3.0!** This release is all about making Dev Proxy work better with AI agents, automation, and CI/CD pipelines. Whether you're using agents to test your APIs and improve your app's quality, running parallel test suites, or integrating Dev Proxy into your build scripts, v2.3.0 has you covered. We've improved detached mode with proper JSON output that agents and scripts can parse, added support for running multiple instances side by side, and made it easier to discover the proxy URL when starting Dev Proxy in the background.

### **In this version:**

- **Proper JSON output** in detached mode with `--output json`
- **Multi-instance support** when running without system proxy
- **Proxy URL visibility** when starting Dev Proxy in detached mode

### **Proper JSON output in detached mode**

If you're building an AI agent or automation around Dev Proxy, you've likely used `--output json` to get machine-readable output. But when running in detached mode (`--detach`), Dev Proxy would still return plain text - even with `--output json` specified. Not great when your agent or script expects JSON.

This happened because the detached startup code wrote directly to the console before the logging infrastructure was initialized, completely bypassing the JSON formatter.

**What changed:**

Dev Proxy now properly detects `--output json` during detached startup and emits consistent JSONL output:

```json
{"type":"result","data":{"pid":6456,"apiUrl":"http://127.0.0.1:8897","logFile":"/path/to/logs/devproxy-6456-2026-03-05.log"},"timestamp":"2026-03-05T14:22:42.0000000Z"}
```

Error messages also use structured JSONL on stderr:

```json
{"type":"log","level":"error","message":"Dev Proxy is already running (PID: 6456). Use 'devproxy stop' to stop it first.","timestamp":"2026-03-05T14:22:42.0000000Z"}
```

**Why this matters:** AI agents need structured data to make decisions. If your agent starts Dev Proxy, it can now reliably parse the startup output to extract the PID and API URL. Same goes for CI/CD pipelines and build scripts - no more special-casing the startup phase in your automation.

### **Multi-instance support**

Previously, Dev Proxy blocked starting a second instance - even when neither instance was registered as the system proxy. This made it impossible to have an AI agent spin up dedicated proxy instances per task, or run parallel test suites, each with their own Dev Proxy instance pointing at different API configurations.

**What changed:**

When `asSystemProxy` is `false`, Dev Proxy now allows multiple instances to run simultaneously. Each instance gets its own state file, so they don't interfere with each other.

To help you manage multiple instances, we've also added a `--pid` option to the `logs`, `status`, and `stop` commands:

```bash
# Start two instances on different ports
devproxy --detach --as-system-proxy false --port 8080
devproxy --detach --as-system-proxy false --port 9090

# Check status of all running instances
devproxy status

# Stop a specific instance
devproxy stop --pid 1234

# Stop all instances
devproxy stop
```

**Why this matters:** Building an agent that tests multiple API scenarios simultaneously? Running parallel test suites? Need different API configurations for different microservices? You can now spin up as many Dev Proxy instances as you need, each with its own configuration, and manage them independently.

### **Proxy URL in detached mode output**

When starting Dev Proxy in detached mode, especially with `--port 0` for OS-assigned ports, there was no way to know which port the proxy was actually listening on without checking the state file.

**What changed:**

The detached mode startup output now includes the proxy URL with the actual resolved port:

```
Dev Proxy started in background.

  PID:       4588
  Proxy URL: http://127.0.0.1:63860
  API URL:   http://127.0.0.1:64123
  Log file:  /path/to/logs/devproxy-4588-2026-03-11.log
```

This also works with `--output json`, where the proxy URL is included in the JSONL result.

**Why this matters:** When an agent or script starts Dev Proxy with dynamic port assignment, it can now immediately discover the proxy address from the startup output - no need to poll the state file or guess the port.

## Dev Proxy Aspire extensions

If you're using Dev Proxy with .NET Aspire, we've got good news. Community contributor [Meir Blachman](https://github.com/Meir017) upgraded the [Dev Proxy Aspire extensions](https://github.com/dev-proxy-tools/aspire) to Aspire 13.2.0 and added .NET 10 support. The previous version relied on Aspire 9, which is now out of support.

The updated extensions are available as v0.3.0 on NuGet. If you're using Dev Proxy in your Aspire projects, update your packages to get on the supported version of Aspire.

Thanks, Meir! 🙏

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.16.0.

In this version, we've:

- Updated the extension icon to the new purple design
- Updated all JSON snippets to use v2.3.0 schemas

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### **Why upgrade to v2.3.0?**

✅ **Agent-ready** - Structured JSONL output that AI agents can parse and act on  
✅ **Parallel instances** - Agents and scripts can spin up multiple Dev Proxy instances side by side  
✅ **Better discoverability** - See the actual proxy URL immediately on startup  
✅ **Streamlined CI/CD** - Reliable automation from agents to build pipelines

### **Try it now**

Download **Dev Proxy v2.3.0** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
