---
title: "Dev Proxy v2.1 with configuration hot reload and stdio proxying"
description: "We're excited to announce the release of Dev Proxy v2.1.0! This release brings two major productivity features that developers have been asking for: automatic configuration hot reload and stdio traffic proxying."
date: 2026-01-29
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/og-image-dev-proxy-v2-1-with-configuration-hot-reload-and-stdio-proxying.webp"
---

We're excited to announce the release of Dev Proxy v2.1.0! This release brings two major productivity features that developers have been asking for: automatic configuration hot reload and stdio traffic proxying – perfect for testing MCP servers and other stdio-based tools. In this version:

- **Configuration hot reload** – Dev Proxy automatically restarts when you change the config file
- **Stdio traffic proxying** – Intercept, inspect, and mock stdin/stdout/stderr traffic
- **New `--api-port` command-line option**
- **LatencyPlugin** now supports delays greater than 10 seconds
- **CORS support** for the Dev Proxy web API
- Multiple bug fixes and improvements

## Configuration hot reload

No more manual restarts when tweaking your proxy configuration. Dev Proxy now watches your configuration file and automatically restarts when you save changes.

This was one of our oldest feature requests – dating back to April 2023. Whether you're adjusting failure rates, adding plugins, or changing URL patterns, your changes take effect immediately. Just save the file and keep working.

### Why this matters

When you're iterating on your proxy configuration – fine-tuning error rates, adjusting mock responses, or testing different plugin combinations – stopping and restarting the proxy breaks your flow. With hot reload, your development loop gets tighter and more productive.

## Stdio traffic proxying

Modern AI development increasingly relies on tools that communicate via stdin/stdout/stderr – particularly MCP (Model Context Protocol) servers. Now you can intercept and manipulate this traffic just like you do with HTTP.

### How it works

Wrap any executable with Dev Proxy: `devproxy stdio npx my-mcp-server`

Dev Proxy proxies all stdin, stdout, and stderr traffic, letting you:

- **Inspect messages** in Chrome DevTools Network tab (appear as `stdio://` URLs)
- **Mock responses** using the new MockStdioResponsePlugin
- **Simulate latency** with the existing LatencyPlugin
- **Use placeholders** like `@stdin.body.id` in your mock responses

This opens up Dev Proxy to an entirely new category of applications – anywhere you need to test, debug, or mock stdio-based communication.

## New `--api-port` command-line option

Running multiple Dev Proxy instances? Need the default port 8897 for something else? You can now configure the API port directly from the command line: `devproxy --api-port 9000`

No need to create a separate config file just to change the port.

## LatencyPlugin improvements

Previously, the LatencyPlugin schema artificially limited `maxMs` to 10,000 milliseconds (10 seconds). This restriction never existed in the actual code – it was just a schema limitation.

### What changed

The schema now allows any value for `maxMs`, letting you simulate delays of any duration – useful for testing timeout handling and slow network conditions.

## CORS support for Dev Proxy web API

Building browser-based developer tools that interact with Dev Proxy? The API on port 8897 now supports cross-origin requests, so your web applications can call endpoints like `/proxy/jwtToken` without CORS errors.

## Bug fixes

- **`-e` flag now works correctly** – Starting Dev Proxy with environment variable presets no longer throws a `FormatException`
- **AuthPlugin ApiKey validation fixed** – The plugin no longer incorrectly reports missing `ApiKey.Parameters` when they're properly configured
- **GenericRandomErrorPlugin method matching** – Error responses without a specified HTTP method now correctly match all methods (GET, POST, PUT, DELETE, etc.) instead of only GET
- **MockResponsePlugin Content-Type handling** – No more spurious JSON parsing warnings when using form data or other non-JSON content types
- **CRUD API data file hot reload** – Data file changes now take effect immediately without restarting Dev Proxy

## Dev Proxy Toolkit 1.12.0

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. This release focuses on configuration validation and developer experience improvements:

- **Custom installation paths** — New `devProxyPath` setting for non-standard Dev Proxy locations
- **Smarter config validation** — Config section properties are now validated against the Dev Proxy schema, catching invalid values, unknown properties, and schema version mismatches
- **Enhanced diagnostics** — More precise highlighting, unique diagnostic codes with documentation links, and new warnings for empty `urlsToWatch` and optional plugin configurations
- **More quick fixes** — Add optional or missing plugin config sections, update schema versions across files, and remove unknown properties
- **Better plugin support** — `AuthPlugin` and `LanguageModelFailurePlugin` fixes, plus new snippets for `GraphConnectorGuidancePlugin` and `MockStdioResponsePlugin`

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Why upgrade to v2.1.0?

- **Faster iteration** – Configuration hot reload means no more manual restarts
- **MCP server testing** – Inspect, mock, and debug stdio traffic with familiar workflows
- **More flexibility** – Runtime port configuration and unlimited latency simulation
- **Cleaner experience** – Multiple bug fixes reduce friction and noise

## Try it now

Download **Dev Proxy v2.1.0** today and build better API-connected applications with confidence!

Thanks to [Nitesh Singhal](https://github.com/niteshsinghal85) for contributing to this release.

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
