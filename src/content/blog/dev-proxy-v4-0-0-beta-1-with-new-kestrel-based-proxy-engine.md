---
title: "Dev Proxy v4.0.0-beta.1 with a new Kestrel-based proxy engine"
description: "Dev Proxy v4.0.0-beta.1 moves the proxy engine to Kestrel. Try the beta with your existing configurations and report any differences from v3."
date: 2026-09-21
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v4-0-0-beta1.png"
---

We're releasing **Dev Proxy v4.0.0-beta.1**, the first beta built on our new Kestrel-based proxy engine. It retains the Dev Proxy functionality you use today while replacing the Titanium-/Unobtanium-based engine that handled network traffic in v3.

We've added parity tests for the proxy engine and integration tests for individual plugins. The beta gives you time to check v4 against your applications and configurations before the stable release at the end of October.

### **In this version:**

- A new Kestrel-based proxy engine replacing the previous Titanium-/Unobtanium-based engine
- Existing Dev Proxy functionality migrated to the new engine and covered by integration tests
- Support for inspecting and mocking WebSocket traffic
- A canonical plugin API that decouples plugins from the underlying proxy engine

### **A new foundation for Dev Proxy**

Since its first release, Dev Proxy has used Titanium.Web.Proxy, later maintained as Unobtanium, to inspect and manipulate API traffic. It served us well, but its limitations made it harder to support newer protocols and evolve Dev Proxy.

In v4, we've rebuilt the proxy engine on Kestrel. Kestrel is part of .NET and maintained by the .NET team. By using it directly, Dev Proxy no longer depends on a separate proxy library and can support protocols that the previous engine couldn't handle.

WebSocket support is the first new capability enabled by the change. Dev Proxy v4 can relay and inspect WebSocket traffic, and include it in generated HAR files. With **WebSocketMockResponsePlugin**, you can also return mocked responses to individual WebSocket messages.

### **Breaking change for custom plugins**

Following semantic versioning (SemVer), we're moving to a new major version because the migration changes the API used by custom plugins. This API change is the breaking change behind the v4 version number.

**What changed:**

Plugins now work with Dev Proxy's HTTP model instead of types from the previous proxy library. As a result, plugin code no longer depends on a specific proxy engine.

**Impact:** If you maintain a custom plugin, you'll need to update it for v4. Use the beta to verify your plugin against the new API before the stable release.

### **Test your existing scenarios**

Dev Proxy v4 is intended to retain the behavior of v3, but replacing the proxy engine is a significant architectural change. Automated tests cover the engine and individual plugins, while the beta checks how they behave with real applications and traffic. When you test the beta:

- Run your existing Dev Proxy configuration without changing it
- Exercise the API traffic you use in development and tests
- Try workflows such as recording, mocking, throttling, and generating reports
- Test custom plugins and WebSocket scenarios if you use them

Compare the results with v3. If requests fail or output changes, [open an issue](https://github.com/dotnet/dev-proxy/issues) with your operating system and configuration, along with the steps to reproduce the difference. Keep using v3.x for critical work until v4 reaches stable.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. The latest released version is v1.37.1.

In this version, we've:

- Updated all snippets that reference schemas to use the Dev Proxy v4.0.0 schema

Checkout out the [changelog](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### **Try it now**

Download [Dev Proxy v4.0.0-beta.1](https://github.com/dotnet/dev-proxy/releases/tag/v4.0.0-beta.1) and run it with your existing configurations. If you find a difference from v3, [open an issue](https://github.com/dotnet/dev-proxy/issues). For questions and ideas, [join the discussion](https://github.com/dotnet/dev-proxy/discussions).