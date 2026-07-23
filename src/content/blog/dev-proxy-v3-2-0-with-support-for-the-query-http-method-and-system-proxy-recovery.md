---
title: "Dev Proxy v3.2.0 with support for the QUERY HTTP method and system proxy recovery"
description: "Dev Proxy v3.2.0 adds support for the new QUERY HTTP method across generic plugins and recovers your system proxy after a crashed instance, so you never lose network access."
date: 2026-07-23
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v3-2-0.png"
---

We're excited to announce the release of **Dev Proxy v3.2.0!** This release brings support for the new QUERY HTTP method to Dev Proxy's generic plugins, and fixes a frustrating failure mode where a crashed instance could leave your machine without working network access.

### **In this version:**

- Support for the QUERY HTTP method
- Recover your system proxy after a crashed instance
- Updated dependencies

### **Support for the QUERY HTTP method**

Building against APIs that use the new QUERY HTTP method? Dev Proxy now understands it.

**What changed:**

QUERY (defined in the IETF `draft-ietf-httpbis-safe-method-w-body`) is a safe, idempotent method that behaves like `GET` but carries a request body. It's exposed in .NET 10 as `HttpMethod.Query`. We've extended Dev Proxy's generic, API-agnostic plugins and their config schemas to recognize it:

- **OpenApiSpecGeneratorPlugin** now maps `QUERY` correctly, so recorded QUERY traffic generates a valid spec instead of throwing an error. Microsoft.OpenApi serializes it as a `query` path item field in OpenAPI 3.2 and as `x-oai-additionalOperations` in 3.0 and 3.1.
- The minimal-permissions plugins now match QUERY requests against `query` operations, so permission checks work as expected.
- **TypeSpecGeneratorPlugin** skips QUERY gracefully, since TypeSpec's `@http` library has no verb decorator for it yet. Previously this would crash generation.
- The **MockResponsePlugin**, **MockRequestPlugin**, **GenericRandomErrorPlugin**, and **CrudApiPlugin** now accept `QUERY` in their `method` enums, so you can mock and simulate QUERY endpoints just like any other method.

**Why this matters:**

As APIs start adopting QUERY to send complex queries with a request body, you need your tooling to keep up. Dev Proxy now generates accurate specs, validates permissions, and mocks responses for QUERY endpoints, so you can build and test against modern APIs without hitting `NotSupportedException` errors or broken generation. Graph-specific plugins are intentionally left unchanged, because Microsoft Graph doesn't support QUERY.

Want to try it? The [Mock the HTTP QUERY method](https://devproxy.net/samples/http-query-method-mocks/) sample mocks a fictitious product catalog API that answers QUERY requests, so you can experiment with how your app could use QUERY before you change your API. It even includes a small browser app that sends both QUERY and GET requests, letting you compare the two side by side and decide whether adding QUERY support to your own API is worth it.

### **Recover your system proxy after a crashed instance**

If a detached Dev Proxy instance ever crashed while acting as your system proxy, you might have found yourself without working network access. This release fixes that.

**What changed:**

When you run Dev Proxy detached with `--as-system-proxy true` and the instance is terminated uncleanly (a crash, `kill -9`, an out-of-memory kill, or power loss), the OS proxy is left pointing at a now-dead port. Previously, `devproxy stop --force` couldn't recover it. It printed `Dev Proxy is not running.` and exited with an error, leaving your machine unable to reach the network. The root cause was that Dev Proxy pruned the crashed instance's state record before the stop command could read it, so it never knew to restore the OS proxy.

We've decoupled "restore the OS proxy" from "find a live instance." Dev Proxy now detects orphaned system-proxy records left by crashed instances and reconciles them: `devproxy stop` restores the OS proxy and cleans up the stale record, and a startup self-heal recovers a stale registration on the next run. The reconciliation is cross-platform and idempotent, covering Windows, macOS, and Linux.

**Why this matters:**

Losing network access because a background process crashed is exactly the kind of mystery failure nobody wants to debug. Now Dev Proxy heals itself. Your system proxy is restored automatically, and you get your connectivity back without manually digging through OS proxy settings. The reconciliation only ever touches a proxy that Dev Proxy itself set with `asSystemProxy: true`, so a corporate or third-party proxy is never disabled, and the global OS proxy is only turned off when no live instance still owns it.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.34.0.

In this version, we've:

- Updated all JSON snippets to use v3.2.0 schemas

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### **Why upgrade to v3.2.0?**

✅ **Modern API support** - generate specs, check permissions, and mock responses for QUERY endpoints  
✅ **Self-healing system proxy** - never lose network access to a crashed instance again  
✅ **Updated dependencies** - latest security patches and performance improvements across the board

### **Try it now**

Download **Dev Proxy v3.2.0** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
