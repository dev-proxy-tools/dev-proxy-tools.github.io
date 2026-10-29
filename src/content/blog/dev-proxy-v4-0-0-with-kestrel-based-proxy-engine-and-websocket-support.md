---
title: "Dev Proxy v4.0.0 with a Kestrel-based proxy engine and WebSocket support"
description: "Dev Proxy v4.0.0 runs on a new Kestrel-based proxy engine, adds WebSocket inspection and mocking, child process watching, a Dev Container Feature, and dozens of fixes that make your API simulations more accurate."
date: 2026-10-29
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/v4-0-0.png"
---

We're excited to announce **Dev Proxy v4.0.0!** This is one of the biggest releases in Dev Proxy's history. We rebuilt the engine at the heart of Dev Proxy on Kestrel, the web server that ships with .NET. Your configurations work just like before, and the new engine lets us support protocols and scenarios the previous engine couldn't handle.

Over the past months, many of you tried the alphas and betas against your own apps and told us what broke. Thank you! v4 is more stable because of your feedback.

### **In this version:**

- A new Kestrel-based proxy engine with **WebSocket** inspection and mocking
- **Breaking changes** to the custom plugin API and how Dev Proxy matches and returns simulated responses
- Watching traffic from child processes
- A Dev Container Feature and container-friendly **DevToolsPlugin**
- A native Apple Silicon build
- Header rewriting and environment variables in **RewritePlugin**
- Python 3.13+ support for Dev Proxy certificates
- Working Microsoft Graph minimal permissions checks
- More accurate failure, latency, and rate limit simulations
- Safer HAR files and a more scriptable CLI

### **A new foundation for Dev Proxy**

Since its first release, Dev Proxy used Titanium.Web.Proxy, later maintained as Unobtanium, to intercept and manipulate API traffic. It served us well, but its limitations made it harder to support newer protocols and keep Dev Proxy relevant.

In v4, Dev Proxy runs on [Kestrel](https://learn.microsoft.com/aspnet/core/fundamentals/servers/kestrel). Kestrel is part of .NET and maintained by the .NET team, so Dev Proxy gets its performance and security improvements with every .NET release. We backed the migration with parity tests for the proxy engine and integration tests for individual plugins.

**Why this matters:**

You keep the Dev Proxy you know, built on a foundation that's ready for what's next. The first capability it unlocks is **WebSocket** support. Dev Proxy now relays and inspects WebSocket traffic and includes it in generated HAR files. With the new **WebSocketMockResponsePlugin**, you can return mocked responses to individual WebSocket messages, so you can build real-time features without depending on a live backend.

### **Breaking changes**

Following semantic versioning (SemVer), we're bumping the major version because of breaking changes. Most of them fix cases where Dev Proxy didn't behave the way you'd expect from a real API.

#### **Custom plugin API**

**What changed:** Plugins now work with Dev Proxy's own HTTP model instead of types from the previous proxy library. Plugin code no longer depends on a specific proxy engine.

**Impact:** If you maintain a custom plugin, you'll need to update it for v4. If you only use built-in plugins, you don't need to change anything.

#### **Matching and returning mock and error responses**

**What changed:**

- **Case-insensitive URL matching** - `urlsToWatch` always ignored case, but **MockResponsePlugin**, **GraphMockResponsePlugin**, **GenericRandomErrorPlugin**, and **WebSocketMockResponsePlugin** matched URLs case-sensitively. Dev Proxy could intercept a request, find no matching mock, and silently pass it through to the real API. URL matching in these plugins now ignores case too.
- **String bodies sent as-is** - a string `body` in mocks, errors, and **RateLimitingPlugin** custom responses was JSON-serialized, so `"body": "hello"` reached your app as `"hello"` with quotes. Dev Proxy now sends the string as-is.
- **Default `Content-Type`** - errors from **GenericRandomErrorPlugin** and **RateLimitingPlugin** custom responses now get `Content-Type: application/json` when they have a body and you haven't set a content type, just like mocks.
- **Mock `nth` counts intercepted requests** - `nth` counted applied mocks, so without a fallback mock for the same URL, the `nth` mock never fired. Dev Proxy now counts every matching request, whether or not it returned a mock.

**Impact:** If your mocks or errors file relies on casing to tell two entries apart, the first matching entry now wins. If you relied on a quoted string body, wrap the value in quotes yourself.

#### **Rate limiting language models**

**What changed:** When **LanguageModelRateLimitingPlugin** throttles a request with `whenLimitExceeded: "Throttle"`, it now returns OpenAI's `rate_limit_exceeded` tokens-per-minute error. Previously, it returned the `insufficient_quota` billing error, which tells clients to stop retrying. This was a bug - Dev Proxy wasn't accurately emulating what OpenAI returns when you hit a rate limit.

**Impact:** Your app now sees the same error as in production, so you can test the retry logic that matters. The message includes the model, the exhausted limit, tokens used, and seconds until reset. If you want to simulate a quota error on purpose, use `whenLimitExceeded: "Custom"`.

#### **CLI and Dev Proxy API**

**What changed:**

- `cert ensure`, `config new`, `config get`, and `mocks from-http-responses` now exit with code `1` when they fail, instead of logging an error and exiting with `0`.
- `env` in the config file and `--env` now set environment variables for the Dev Proxy process, as documented. Previously, they only filled placeholders in API spec files for the minimal permissions plugins.
- `POST /proxy/mockRequest` returns `204 No Content` instead of `202 Accepted`, because the request has already completed when Dev Proxy responds.
- **LatencyPlugin** stops Dev Proxy at startup with a clear message when `minMs` is greater than `maxMs`, instead of throwing an error on every request.

**Impact:** Scripts and agents can now rely on exit codes. If you call the Dev Proxy API and check for exactly `202`, update your code to accept `204`.

### **Watch traffic from child processes**

Does your app start helper processes that call APIs? Watching only the parent process isn't enough. With the new `--watch-process-tree` option (`watchProcessTree` in the config file), Dev Proxy intercepts requests from the processes you watch with `--watch-pids` or `--watch-process-names` and all of their child processes. It resolves process ancestry on Windows, macOS, and Linux. Special thanks to [@Yvand](https://github.com/Yvand) for requesting this feature.

### **Run Dev Proxy in dev containers**

We've published a **Dev Container Feature** that installs Dev Proxy and trusts its root certificate in your container:

```json
"features": {
  "ghcr.io/dotnet/dev-proxy/dev-proxy:1": {}
}
```

The Feature generates a root certificate unique to each container after it's created, so no private key ends up in your image layers or Codespaces prebuilds. It also points Node.js, Python, and other runtimes to the system certificate store, and adds Dev Proxy Toolkit to VS Code.

**DevToolsPlugin** now works in containers too. Use the new `port` setting to publish the inspector from your devcontainer, GitHub Codespaces, or Aspire container. Set `launchBrowser` to `false`, and Dev Proxy logs the inspector URL for you to open in Microsoft Edge or Google Chrome on your host. While working on this, we also secured the DevTools WebSocket: connections now need a random per-session token and must come from a DevTools frontend, so other web pages can't read your intercepted traffic. Thanks to [@hansmbakker](https://github.com/hansmbakker) for asking how to use **DevToolsPlugin** in a devcontainer.

Since v3.3.1, the Dev Proxy API requires a bearer token. You can now set it yourself using the `DEV_PROXY_API_TOKEN` environment variable instead of reading a generated token from disk. This makes it easier to control Dev Proxy from tools like Aspire and from containers.

### **Native Apple Silicon build**

Our releases now include a native `osx-arm64` build, so Dev Proxy runs natively on Apple Silicon Macs without Rosetta. No more `bad CPU type in executable` errors after upgrading to macOS 27.

### **Rewrite request headers with RewritePlugin**

Need to add an API key or replace the `Authorization` header before a request reaches the API? **RewritePlugin** now rewrites request headers. A rule can change only the headers, without rewriting the URL. You can also use `${env:VAR_NAME}` in replacement values, so secrets stay out of your config files:

```json
{
  "rewrites": [
    {
      "in": { "url": "https://api.contoso.com/(.*)" },
      "out": {
        "url": "${env:API_BASE_URL}/$1",
        "headers": [ { "name": "Authorization", "value": "Bearer ${env:API_TOKEN}" } ]
      }
    }
  ]
}
```

### **Certificates that work with Python 3.13+**

Starting with version 3.13, Python verifies certificates strictly and rejected Dev Proxy's certificates because they lacked an authority key identifier. Dev Proxy now adds it to every certificate it generates, so Python apps work with Dev Proxy without extra configuration. Huge thanks to [@AronUJVARY](https://github.com/AronUJVARY) for this fix - and for their first contribution to Dev Proxy!

### **Microsoft Graph minimal permissions that work again**

The service that **GraphMinimalPermissionsPlugin** and **GraphMinimalPermissionsGuidancePlugin** use to look up permissions moved, so the plugins couldn't return results. Dev Proxy now uses the same service as Graph Explorer, so you get reliable minimal permissions checks for your Microsoft Graph calls again. We've also fixed permission lookups for drive items addressed by path, such as file uploads to `/me/drive/root:/report.docx:/content`.

For Azure API Center, **ApiCenterMinimalPermissionsPlugin** no longer reports OpenID Connect scopes like `openid` and `profile` as excessive, matching the other minimal permissions plugins. You can change the excluded scopes using the new `permissionsToExclude` setting.

### **More accurate simulations**

Your tests are only as good as the conditions you simulate. We've fixed several places where Dev Proxy didn't behave exactly as configured:

- **GenericRandomErrorPlugin** and **GraphRandomErrorPlugin** now fail exactly the percentage of requests set in `rate`. Previously, `rate: 99` failed every request.
- **LatencyPlugin** can now apply `maxMs`. Before, the delay never reached the configured maximum.
- **GenericRandomErrorPlugin** now resolves `@dynamic` in the `Retry-After` header for any status code, so throttling presets that use `503` and `529` errors send a real value.
- **GraphRandomErrorPlugin** passes requests through when `allowedErrors` leaves no error for their method, instead of throwing an exception.

### **Safer HAR files**

With `includeSensitiveInformation: false`, **HarGeneratorPlugin** now redacts cookie values and sensitive query parameters, such as `access_token`, `code`, `client_secret`, `sig`, and `api_key`. You can share HAR files with your team without leaking secrets.

### **A friendlier CLI**

- Use `~/` in config file paths to refer to your home directory, for example `"mocksFile": "~/mocks/mocks.json"`.
- `devproxy status` shows the full proxy URL next to the API URL.
- `devproxy logs` tells you which instance it shows when multiple are running, and `--since` now filters logs by date and time.
- `devproxy config get` prints the start command for presets that store their config in a `.devproxy` folder.
- `devproxy jwt create` applies default validity and audience when you omit them, and accepts claim values that contain `:`.
- `--discover false` no longer turns on recording, and `NO_COLOR` disables colors only when it's set to a non-empty value.

### **Thank you, contributors**

Dev Proxy v4 is better thanks to the community. A big thank you to:

- [@AronUJVARY](https://github.com/AronUJVARY) for making Dev Proxy certificates work with Python 3.13+
- [@Yvand](https://github.com/Yvand) for requesting child process watching and for testing the v4 betas and reporting issues
- [@hansmbakker](https://github.com/hansmbakker) for helping us make **DevToolsPlugin** work in containers

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.40.0.

In this version, we've:

- Updated all snippets to use the Dev Proxy v4.0.0 schemas

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

### **Why upgrade to v4.0.0?**

✅ **Future-proof foundation** - a proxy engine built on Kestrel and maintained as part of .NET  
✅ **WebSocket support** - inspect and mock real-time traffic  
✅ **Complete coverage** - intercept requests from child processes  
✅ **Container-ready** - a Dev Container Feature and DevTools that work in containers  
✅ **More accurate simulations** - errors, latency, and rate limits behave exactly as configured  
✅ **Safer by default** - redacted HAR files and a secured DevTools connection

### **Try it now**

Download **Dev Proxy v4.0.0** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
