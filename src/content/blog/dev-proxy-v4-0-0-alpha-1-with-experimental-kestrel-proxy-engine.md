---
title: "Dev Proxy v4.0.0-alpha.1 with an experimental Kestrel-based proxy engine"
description: "Dev Proxy v4.0.0-alpha.1 is an experimental release that rebuilds the proxy engine on top of Kestrel, unlocking WebSocket inspection and more. It's an early alpha, and we'd love you to try it on your scenarios and tell us what breaks."
date: 2026-07-02
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v4-0-0-alpha1.png"
---

**Dev Proxy v4.0.0-alpha.1** is here, and it's unlike our usual releases. It's the first experimental build of Dev Proxy running on a brand-new proxy engine built on **Kestrel**, the web server that powers ASP.NET Core.

This is an **alpha**, and we want to be upfront about what that means. We rebuilt the core of Dev Proxy, so things are still in flux and some edges are rough. We're publishing it now because the best way to make this rewrite solid is to get it into your hands early. If you run Dev Proxy against real APIs and real apps, your feedback is exactly what we need to get v4.0.0 right.

### **In this version:**

- A new proxy engine built on Kestrel, replacing the previous Unobtanium/Titanium-based engine
- Early support for inspecting and mocking WebSocket traffic
- A canonical plugin API that decouples plugins from the underlying proxy library

### **Why we moved to Kestrel**

Since its inception, Dev Proxy relied on Titanium.Web.Proxy to intercept and manipulate HTTP traffic. [Stephan van Rooij](http://github.com/svrooij) kindly helped us upgrade and maintain the library, which became [Unobtanium](https://github.com/svrooij/unobtanium-web-proxy). It served us well, but we hit some limitations blocking us in keeping Dev Proxy relevant for today's needs. Looking at alternatives, we chose [Kestrel](https://learn.microsoft.com/aspnet/core/fundamentals/servers/kestrel). Kestrel is the web server that ships with .NET and is maintained by the .NET team, so it gets continuous performance and security work. By moving Dev Proxy onto it, we get to build on the same foundation that runs production ASP.NET Core apps.

Here's what that means for you:

- **A future-proof foundation.** Kestrel is a first-party, actively maintained part of .NET. Security fixes and performance improvements land with every .NET release, and Dev Proxy benefits automatically.
- **Broader protocol support.** Kestrel natively speaks HTTP/1.1, HTTP/2, and WebSockets, which opens the door to inspecting and simulating traffic we simply couldn't reach before.
- **Better performance and reliability.** Kestrel is optimized to handle large numbers of concurrent connections efficiently, so Dev Proxy stays responsive even when your app is chatty.
- **Room to grow.** With direct access to the request pipeline, we can add the behaviors you've been asking for without fighting the abstractions of an external library.

The point of this migration isn't the plumbing itself. It's everything the new foundation lets us build next.

### **Inspecting and mocking WebSockets**

The first capability this rewrite unlocks is WebSocket support. Dev Proxy can now relay WebSocket connections transparently, which means you can watch the frames flowing between your app and a WebSocket API. There's also an early `WebSocketMockResponsePlugin` that lets you react to incoming frames and send back mocked responses, so you can develop and test WebSocket-based features without depending on a live backend.

This is brand-new and still evolving, so expect gaps. If you work with WebSocket APIs, this is a great area to put through its paces and tell us where it falls short.

### **A canonical plugin API**

Under the hood, we introduced a canonical HTTP model that plugins work against, instead of talking to the proxy library directly. This is what makes it possible to swap the engine without rewriting every plugin, and it gives us a cleaner surface to evolve going forward.

If you build custom plugins, this is a **breaking change**, and it's the reason v4 is a new major version following [semantic versioning](https://semver.org/). We'll share migration guidance as the API settles. For now, if you maintain plugins, we'd love your early input on the new model while there's still room to shape it.

### **This is where we need you**

An alpha lives or dies by the feedback it gets. We've tested Dev Proxy v4 against our own scenarios, but we can't cover the range of APIs and setups you work with every day. So here's our ask:

- Point Dev Proxy v4 at the APIs and apps you already test with today.
- Try your existing configurations and plugins, and see what works and what doesn't.
- If you use WebSockets, exercise the new inspection and mocking capabilities.
- Tell us what breaks and what behaves differently from v3.

Because this is an experimental build, we don't recommend it for critical workflows yet. Keep using v3.x for your day-to-day work, and run v4 alongside it to explore. The more scenarios you throw at it, the faster we can get to a stable v4.0.0.

### **Try it now**

Download **Dev Proxy v4.0.0-alpha.1** from the [releases page](https://github.com/dotnet/dev-proxy/releases/tag/v4.0.0-alpha.1) and see how it holds up against your own scenarios.

Found a bug or something that just feels wrong? That's precisely what we're hoping for. [Open an issue](https://github.com/dotnet/dev-proxy/issues) or [join the discussion](https://github.com/dotnet/dev-proxy/discussions) and help us shape Dev Proxy v4. Try it and let us know what you think!
