---
title: "Dev Proxy v0.14 with generating OpenAPI specs and simulating CRUD APIs"
description: "Spend more time on building your app and less on plumbing. Make your apps more robust. We're thrilled to announce the release of Dev Proxy v0.14.0, with..."
date: 2024-01-18
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

Spend more time on building your app and less on plumbing. Make your apps more robust. We're thrilled to announce the release of Dev Proxy v0.14.0, with exciting features that take building apps connected to APIs to the next level.

**In this version:**

- Combine rate limiting with mocks
- Easily generate OpenAPI spec for your API
- Simulate CRUD APIs for development
- Simplified setup for macOS
- Easily get Dev Proxy presets
- Improved mocks
- Introduced JSON schemas
- New Dev Proxy docs
- …and more!

## Combine rate limiting with mocks

Starting from this version, you can configure Dev Proxy to combine rate limiting with mock responses. This means, that when testing how your app handles rate limiting, you won't be calling your API and incurring unnecessary load. This combination is invaluable to verify if your rate limiting code is working as expected.

![Dev Proxy simulating rate limiting using mock API responses](/web/blog/images/01.png)

Learn more about [rate limiting](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/concepts/what-is-rate-limiting).

## Easily generate OpenAPI spec for your API

OpenAPI specs allow you to benefit from the latest investments in the API space. You can for example generate an API client or even easily build an AI plugin. But what if you don't have an OpenAPI spec? Do you need to create it manually yourself?

Dev Proxy now allows you to generate an OpenAPI spec based on the requests intercepted by the proxy. All you need to do is to start your app, have it call your API, and Dev Proxy will generate an OpenAPI spec for you from the requests it intercepted!

![Dev Proxy generating an OpenAPI spec from the requests it intercepted](/web/blog/images/word-image-17765-2.png)

Learn more about [generating OpenAPI specs using Dev Proxy](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/generate-openapi-spec).

## Simulate CRUD APIs for development

When building apps, you often interact with backend APIs. Sometimes, these APIs aren't yet available, or other teams are updating them to meet the latest requirements. To avoid waiting, you typically create a mock API that returns the data you need. While this approach unblocks you, it requires you to spend time on building an API that you eventually replace with the real one. To avoid wasting time, you can now use Dev Proxy to simulate a CRUD API and speed up development. All you need is a data set that you want to expose as an API and let Dev Proxy do the rest!

![Dev Proxy simulating a CRUD API for development](/web/blog/images/word-image-17765-3.png)

Learn more about [simulating CRUD APIs with Dev Proxy](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/how-to/simulate-crud-api).

## Simplified setup for macOS

Enabling the proxy on macOS just got simpler! We've streamlined the setup process to minimize manual steps and make it as effortless as possible. Now, starting the proxy on macOS automatically registers it as a system-wide proxy, giving you a seamless experience just like on Windows. Additionally, when you start Dev Proxy for the first time, it prompts you to trust its certificate eliminating cumbersome manual steps!

## Easily get Dev Proxy presets

We regularly publish Dev Proxy presets which configure proxy for specific use cases. You can find them in the [samples gallery](https://aka.ms/devproxy/samples).

To make it easier for you to use these presets, you can now use the `devproxy preset get` command, to download and unzip the preset. All you need is the preset ID which you find on the preset's page in the sample gallery.

![Easily downloading Dev Proxy presets from the sample gallery](/web/blog/images/02.png)

We hope that you find presets helpful and if you've got your own presets that you'd like to share with others, [submit them to the gallery](https://github.com/pnp/proxy-samples/blob/main/CONTRIBUTING.md)!

## Improved mocks

We've slightly changed the shape of mocks that we use in Dev Proxy. As we extend Dev Proxy with new features, we realized that we haven't been consistent in how we represent a mock request. What's more, we found out that our structure didn't properly support specifying multiple response headers with the same name.

The new structure defines a request and response object and a collection of header objects.

![New Dev Proxy mock structure](/web/blog/images/word-image-17765-5.png)

We've already updated all samples in the sample gallery to reflect this new structure. If you have your own mocks, you can convert them to the new format using a [script](https://github.com/waldekmastykarz/convert-devproxy-mocks).

## Introduced JSON schemas

Dev Proxy and its plugins use JSON files to define their configuration. To help you ensure that you've correctly set up these configuration files, we introduce JSON schema files for [Dev Proxy configuration](https://github.com/microsoft/dev-proxy/blob/4e1ac75ef9695d23f8bd85c645c526989da4c348/schemas/v1.0/rc.schema.json), and [its plugins](https://github.com/microsoft/dev-proxy/tree/4e1ac75ef9695d23f8bd85c645c526989da4c348/schemas/v1.0). We'll be versioning these schemas using SemVer so that you can easily tell when they introduce breaking changes.

## New Dev Proxy docs

Recently, we've published [our new docs on Microsoft Learn](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/overview). We've included the reference content we had on our GitHub Wiki and extended it with additional conceptual docs, all to help you build more robust apps and get more out of Dev Proxy. Check them out and let us know how we can make them better.

![New Dev Proxy docs on Microsoft Learn](/web/blog/images/04.png)

## There's more

That's not all! This release also includes various performance enhancements, stability improvements, and behind-the-scenes optimizations, ensuring that your experience with the Dev Proxy is smoother and more enjoyable than ever before. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.14.0) for the complete list of changes in this version.

## Try it now

Download [Dev Proxy v0.14](https://aka.ms/devproxy/download) today and build better apps connected to APIs!

Thanks to [Stephan van Rooij](https://github.com/svrooij) and [Mark Oliver](https://github.com/mosoftwareenterprises) for contributing to this release.

Have any questions, feedback, or suggestions? Join us on [Discord](https://aka.ms/devproxy/discord). We can't wait to see what you create with Dev Proxy!

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
