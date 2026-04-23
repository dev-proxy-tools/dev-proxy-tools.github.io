---
title: "Dev Proxy v2.3.2 with fixed Chrome DevTools inspection"
description: "Dev Proxy v2.3.2 fixes Chrome DevTools inspection broken on Chromium 146+ (Chrome and Edge) by updating the WebSocket connection to use the IPv4 loopback address."
date: 2026-04-23
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v2-3-2.png"
---

We've just released **Dev Proxy v2.3.2** - a patch release that fixes Chrome DevTools inspection broken on Chromium 146+.

### **In this version:**

- Fixed **DevToolsPlugin** WebSocket connection failing on Chromium 146+ (Chrome and Edge)

### **Fixed Chrome DevTools inspection**

If you use the **DevToolsPlugin** to inspect intercepted requests in Chrome DevTools, you may have noticed that the WebSocket connection stopped working after updating Chrome or Edge to version 146 or later. DevTools would open but fail to connect, leaving you unable to inspect requests:

![Chrome DevTools WebSocket connection error](https://private-user-images.githubusercontent.com/1331392/581223512-0e7bfaee-b88e-470a-8024-c9c59ef91d59.png)

The issue? Starting with Chromium 146, the browser resolves `localhost` differently for WebSocket connections. Dev Proxy's internal WebSocket server was binding to `localhost`, which no longer worked reliably with the updated Chromium network stack.

**What changed:**

We updated the WebSocket server and the DevTools inspector URL to use the IPv4 loopback address (`127.0.0.1`) instead of `localhost`. This small but important change restores full compatibility with Chromium 146+ while continuing to work with older browser versions.

Thanks to [@AndresAFaes](https://github.com/AndresAFaes) for reporting the issue and contributing the fix, and to [@MarcusKohnert](https://github.com/MarcusKohnert) for bringing it to our attention!

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.20.0.

In this version, we've:

- Updated all JSON snippets to use v2.3.2 schemas

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### **Why upgrade to v2.3.2?**

✅ **Working DevTools inspection** - Chrome and Edge DevTools connect reliably again on Chromium 146+

### **Try it now**

Download **Dev Proxy v2.3.2** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
