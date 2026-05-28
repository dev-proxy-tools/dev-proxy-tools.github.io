---
title: "Dev Proxy v3.0 with NuGet package for custom plugins and API key authentication"
description: "Dev Proxy v3.0 introduces the DevProxy.Abstractions NuGet package for building custom plugins, API key authentication for simulated CRUD APIs, important security fixes, and updated core dependencies."
date: 2026-05-28
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v3-0-0.png"
---

We're excited to announce the release of **Dev Proxy v3.0.0!** Following semantic versioning (SemVer), we're bumping the major version due to **breaking changes** in the underlying dependencies. While these changes are mostly internal, they improve Dev Proxy's long-term maintainability and bring important new capabilities - including the ability to build your own custom plugins using a NuGet package.

### **In this version:**

- **Breaking changes** in core dependencies
- DevProxy.Abstractions NuGet package for building custom plugins
- API key authentication for simulated CRUD APIs
- Security fix for JWT claim filtering

### **Breaking changes**

We've updated Dev Proxy's core dependencies, including a major migration from `Microsoft.OpenApi` v1 to v3 and updates to `System.CommandLine`. These changes are largely internal but include one visible impact.

#### **Updated OpenAPI and CLI dependencies**

`Microsoft.OpenApi` v3 is a complete rewrite of the OpenAPI library. We've migrated all of Dev Proxy's OpenAPI parsing, spec generation, and permissions checking to use the new v3 APIs. This also required adding YAML support through a separate package (`Microsoft.OpenApi.YamlReader`), and updating the CLI framework to newer `System.CommandLine` APIs.

**What changed:**

- OpenAPI spec generation, minimal permissions checks, and Graph DB loading all use the new `Microsoft.OpenApi` v3 APIs internally
- YAML-based OpenAPI specs are now handled through a dedicated reader package
- CLI command parsing uses updated `System.CommandLine` APIs

**Impact:** If you're using Dev Proxy through its standard CLI or configuration files, you shouldn't notice any difference. The generated OpenAPI specs and permissions reports remain functionally the same.

#### **Swagger UI temporarily removed**

The proxy's built-in control API documentation (Swagger UI) has been removed in this release. The .NET 10 OpenAPI ecosystem doesn't yet fully support `Microsoft.OpenApi` v3 at runtime, which caused conflicts when generating API documentation. We'll bring it back once the ecosystem catches up.

**Impact:** If you relied on the Swagger UI at the proxy's control API endpoint for exploring available commands, it's temporarily unavailable. The control API itself continues to work as expected.

### **DevProxy.Abstractions NuGet package**

Want to build your own Dev Proxy plugins? Now you can. We're publishing the **DevProxy.Abstractions** package to NuGet, making it easy to reference the public abstractions your plugins need without having to clone the entire Dev Proxy repository.

**Why this matters:**

Until now, building custom plugins meant working directly with the Dev Proxy source code. With the abstractions available as a standalone NuGet package, you can create a standard .NET class library project, add a package reference, and start building. The package is versioned alongside Dev Proxy releases, so you always know which version to target.

```bash
dotnet add package DevProxy.Abstractions
```

No need to clone the repo, no need to reference local assemblies. Just add the package and start building.

### **API key authentication for CRUD APIs**

The **CrudApiPlugin** now supports API key authentication alongside the existing Microsoft Entra ID option. Many APIs use API keys for authentication, and you can now simulate this pattern in your CRUD API definitions.

Configure it in your API definition file:

```json
{
  "auth": "apiKey",
  "apiKeyAuthConfig": {
    "headerName": "x-api-key",
    "apiKey": "my-secret-key",
    "queryParameterName": "api_key"
  }
}
```

The plugin checks for the API key in the configured header or query parameter. If both are configured, either location is accepted. Missing or invalid keys return `401 Unauthorized` - just like a real API would.

**Why this matters:**

If you're building apps that integrate with APIs secured by API keys, you can now simulate the full authentication flow locally. Test what happens when the key is missing, invalid, or sent in the wrong location - all without hitting the real API.

### **Security fix: case-insensitive JWT claim filtering**

We've fixed a security bypass in Dev Proxy's JWT token generation where restricted claims like `scp` and `roles` could be injected using mixed-case keys (e.g., `SCP`, `ROLES`). The claim filtering now uses case-insensitive matching, ensuring restricted claims are properly blocked regardless of casing.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.28.1.

In this version, we've:

- Updated the agent skill to v1.1.0 with CRUD API plugin API key authentication support and v3.0.0 schema references
- Added a built-in Dev Proxy agent skill for use with GitHub Copilot
- Added a command to switch between stable and beta Dev Proxy releases
- Updated all JSON snippets to use v3.0.0 schemas
- Fixed the problem matcher pattern to correctly match Dev Proxy output

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### **Why upgrade to v3.0.0?**

✅ **Build custom plugins** - DevProxy.Abstractions on NuGet lets you extend Dev Proxy with your own plugins  
✅ **Simulate API key auth** - Test API key authentication flows in your CRUD API simulations  
✅ **Stronger security** - JWT claim filtering now handles all casing variations  
✅ **Modern foundation** - Updated dependencies keep Dev Proxy aligned with the latest .NET ecosystem

### **Try it now**

Download **Dev Proxy v3.0.0** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
