---
title: "Dev Proxy v3.1.0 with fixed HAR encoding and smarter plugin initialization"
description: "Dev Proxy v3.1.0 fixes HAR export encoding to properly handle character sets, and stops plugins from unnecessarily initializing when running CLI subcommands."
date: 2026-07-01
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v3-1-0.png"
---

We're happy to announce the release of **Dev Proxy v3.1.0!** This release focuses on reliability - fixing how Dev Proxy exports HAR files and making CLI subcommands snappier by preventing plugins from running when they shouldn't.

### **In this version:**

- Fixed HAR response body encoding
- Smarter plugin initialization for CLI subcommands
- Updated dependencies

---

### **Fixed HAR response body encoding**

If you've ever exported a HAR file from Dev Proxy and noticed garbled or incorrectly encoded response bodies, this one's for you.

**What changed:**

Dev Proxy now properly reads the `Content-Type` charset when decoding request and response bodies. We've introduced a shared decoding helper that uses the charset specified in the response headers, falling back to strict UTF-8, then Latin-1 for binary-safe handling. The **HarGeneratorPlugin** and **DevToolsPlugin** both use this shared helper now, and HAR size fields correctly report raw byte lengths instead of string lengths.

**Why this matters:**

APIs that return non-UTF-8 content (like ISO-8859-1 or Windows-1252 encoded responses) would previously produce corrupted HAR entries. You'd see broken characters in the exported file, making it unreliable for debugging or replaying. Now HAR exports faithfully represent the actual response data regardless of encoding, giving you reliable captures you can trust when troubleshooting API integrations.

---

### **Smarter plugin initialization for CLI subcommands**

Running `devproxy jwt create` with a `DevToolsPlugin` in your config? Previously, that would pop open a browser window. Not anymore.

**What changed:**

Plugins now know whether Dev Proxy is running as a proxy or executing a CLI subcommand. When you run commands like `devproxy jwt create` or `devproxy config validate`, plugins that only make sense during proxy operation (like **DevToolsPlugin** opening a browser or **OpenAITelemetryPlugin** starting telemetry exporters) skip their initialization entirely.

**Why this matters:**

No more random browser windows appearing when you just want to generate a JWT token. CLI subcommands now feel instant and focused, without the overhead of initializing plugins that aren't relevant to what you're doing. If you're building custom plugins, the new `IsProxyCommand` flag on `InitArgs` lets you implement the same behavior - it defaults to `true` for backwards compatibility, so existing plugins continue working unchanged.

---

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.32.0.

In this version, we've:

- Updated all JSON snippets to use v3.1.0 schemas

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

---

### **Why upgrade to v3.1.0?**

✅ **Reliable HAR exports** - response bodies are decoded correctly regardless of charset  
✅ **Faster CLI commands** - no more unnecessary plugin initialization or stray browser windows  
✅ **Updated dependencies** - latest security patches and performance improvements across the board

### **Try it now**

Download **Dev Proxy v3.1.0** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
