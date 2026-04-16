---
title: "Dev Proxy v2.3.1 with fixes for permissions guidance and Entra mocking"
description: "Dev Proxy v2.3.1 fixes GraphMinimalPermissionsGuidancePlugin not evaluating all application endpoints and EntraMockResponsePlugin crashing on startup."
date: 2026-04-14
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v2-3-1.png"
---

We've just released **Dev Proxy v2.3.1** - a patch release that fixes two bugs affecting permission analysis and Entra ID mocking.

### **In this version:**

- Fixed **GraphMinimalPermissionsGuidancePlugin** not evaluating all application endpoints
- Fixed **EntraMockResponsePlugin** crashing on startup

### **Fixed permissions guidance for application endpoints**

If you use the **GraphMinimalPermissionsGuidancePlugin** to check which application permissions your app actually needs, you might have run into a bug where only the first Microsoft Graph endpoint was evaluated. The rest were silently skipped, and you'd see "No permissions found" in the output:

```
 info    Evaluating application permissions for: GET /groups
 fail    Couldn't determine minimal permissions for the following URLs: -  (No permissions found.)
```

The root cause? The plugin coupled collecting endpoints with capturing role claims from the access token. Once it captured roles from the first request, it stopped adding subsequent endpoints to the evaluation list.

**What changed:**

We decoupled endpoint collection from role capture. Every application-typed Microsoft Graph request is now added to the evaluation list, regardless of when roles are first encountered. The result: all your Graph API calls are properly analyzed for minimal permissions.

### **Fixed EntraMockResponsePlugin startup crash**

Starting Dev Proxy with **EntraMockResponsePlugin** enabled caused an immediate crash on all v2.x versions:

```
fail    An error occurred while running Dev Proxy
Exception Details: System.InvalidOperationException: Unable to resolve service
for type 'System.Security.Cryptography.X509Certificates.X509Certificate2'
while attempting to activate 'DevProxy.Plugins.Mocking.EntraMockResponsePlugin'.
```

The plugin tried to resolve the root certificate during construction - before the certificate was registered in the dependency injection container. If you were mocking Entra ID token endpoints, Dev Proxy wouldn't even start.

**What changed:**

The plugin now resolves the certificate on demand, when it's actually needed to process mock responses, rather than during startup. No more crashes, and your Entra ID mocking configurations work as expected.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.18.0.

In this version, we've:

- Updated all JSON snippets to use v2.3.1 schemas

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### **Why upgrade to v2.3.1?**

✅ **Accurate permissions analysis** - All application endpoints are now properly evaluated for minimal permissions  
✅ **Working Entra ID mocking** - EntraMockResponsePlugin starts reliably on all platforms

### **Try it now**

Download **Dev Proxy v2.3.1** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
