---
title: "Dev Proxy v3.3.0 with query string support for CRUD API actions"
description: "Dev Proxy v3.3.0 adds query string matching to CRUD API actions, so you can simulate common filtering patterns more accurately."
date: 2026-09-14
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v3-3-0.png"
---

We're excited to announce the release of **Dev Proxy v3.3.0!** This release makes simulated CRUD APIs more realistic by letting actions match query string parameters and use their values to filter data.

### **Match CRUD API actions using query string parameters**

Many APIs use query strings to filter data, such as `GET /jokes?category=azure`. Until now, **CrudApiPlugin** actions matched only URL paths, so you couldn't use the query string to select an action or pass its values into a JSONPath query.

**What changed:**

You can now define literal or parameterized query string values in a CRUD API action. For example:

```json
{
  "action": "getMany",
  "url": "?category={category}",
  "method": "GET",
  "query": "$.[?(@.categories[?(@ == '{category}')])]"
}
```

When your app calls `GET /jokes?category=azure`, Dev Proxy captures `azure` as the `{category}` value and uses it in the JSONPath query. Query parameters match regardless of their order, and action definitions can use repeated parameters such as `?id={id1}&id={id2}`. You can also combine path and query parameters in the same action.

**Why this matters:**

You can simulate filtering patterns that real APIs use without creating separate endpoints or custom mocks. Matching also handles edge cases such as URL-valued parameters, quotes in values, and actions that expect more repeated values than the request provides. When a request doesn't satisfy an action, Dev Proxy moves on to another matching action or returns an empty result or 404 instead of failing with a server error.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. The latest released version is v1.36.0.

In this version, we've:

- Updated all snippets that reference schemas to use the Dev Proxy v3.3.0 schema

Checkout out the [changelog](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### **What's next: Dev Proxy v4**

The next version of Dev Proxy will be v4, scheduled for release at the end of October. We're planning to release a beta in the next few days, giving you time to test it before the final release.

Dev Proxy v4 retains the functionality you use today, but its core proxy engine has been rewritten on Kestrel. This is a significant architectural change that replaces the previous Titanium-/Unobtanium-based engine. We've added parity and per-plugin integration tests, but changes at this depth need testing against real applications and traffic.

You can already learn more and try the [latest Dev Proxy v4 alpha release](https://github.com/dotnet/dev-proxy/releases/tag/v4.0.0-alpha.4). When the beta is available, please run it with your existing configurations and let us know about any differences you find. Your feedback will help us make v4 ready for release at the end of October.

### **Why upgrade to v3.3.0?**

✅ **More realistic CRUD mocks** - route actions and filter data using query string values  
✅ **Flexible action matching** - combine path parameters with literal, parameterized, or repeated query values

### **Try it now**

Download **Dev Proxy v3.3.0** today and build better API-connected applications with confidence! Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.