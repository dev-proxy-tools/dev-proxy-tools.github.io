---
title: "Dev Proxy v0.13 with new guidance and inspecting web requests"
description: "Are you ready to build better apps? We are thrilled to announce the first release of Dev Proxy, formerly known as Microsoft 365 Developer Proxy."
date: 2023-12-04
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
---

Are you ready to build better apps? We are thrilled to announce the first release of Dev Proxy, formerly known as Microsoft 365 Developer Proxy.

## New name, same great features

Under its new name, Dev Proxy keeps all its functionality that helps you all build better apps. From intercepting and mocking requests to logging and analyzing API requests, Dev Proxy continues to empower developers worldwide.

With this rebranding, we emphasize the versatility of this powerful tool as well as the fact that it's an open-source project that we work on together with our community. Now, with its broader scope, Dev Proxy opens doors to a wide range of applications and APIs, enabling you to build and test with confidence.

Whether you're building apps for Microsoft 365 or any other type of application using any API, Dev Proxy has got you covered!

## Easier access to documentation on Microsoft Learn

We are excited to share that we have also published our [comprehensive documentation](https://aka.ms/devproxy) on Microsoft Learn. With this move, we've made it easier for you to find relevant information: whether you're just starting working with Dev Proxy or want to use its advanced features. Get the most out of Dev Proxy with step-by-step guides, tutorials, and real-world examples.

## Inspect requests with Chrome DevTools Protocol

One of the frequent requests that we got from you was for Dev Proxy to show more information about intercepted requests and responses including their headers and bodies.

We're excited to introduce a new plugin that uses Chrome DevTools Protocol to let you explore requests and responses!

![Edge Dev Tools showing requests and responses intercepted by Dev Proxy](/web/blog/images/Blog.png)

Using Chrome DevTools Protocol for inspecting requests intercepted by Dev Proxy is convenient for several reasons.

First of all, it's the same user interface that you already know from building web apps. Because Dev Proxy intercepts requests from all types of apps, you'll now be able to use the same set of tools for all API requests, including those issued by server-side code!

Dev Proxy is a command line tool, and its UI is limited by the textual nature of the terminal. Using Chrome DevTools Protocol takes Dev Proxy beyond the terminal and gives you a richer UX with the ability to filter requests and messages. You'll find it particularly convenient when using Dev Proxy with apps that issue many API requests. Using Chrome DevTools Protocol allows us to provide you with detailed information about all intercepted requests and responses without cluttering the terminal output.

![Dev Proxy messages warnings and guidance displayed in Edge Dev Tools](/web/blog/images/blog2.png)

Depending on your preference, you can use DevTools in Edge, Edge Dev channel or Chrome to inspect requests intercepted by Dev Proxy. Check it out and let us know how you like it!

## New search guidance

Recently, we published [new guidance about Microsoft Search APIs](https://devblogs.microsoft.com/microsoft365dev/transition-to-microsoft-graph-search-endpoint-for-onedrive-and-sharepoint/). Following this guidance, will help you get the most out of our latest investments in search across Microsoft 365.

To help you understand where in your applications you're using OneDrive and SharePoint search APIs, and which you could update to use the recommended Microsoft Search APIs in Microsoft Graph, we introduce in this version of Dev Proxy new guidance plugin.

![Dev Proxy warning of using OneDrive and SharePoint search APIs](/web/blog/images/blogother.png)

## There's more

That's not all! This release also includes various performance enhancements, stability improvements, and behind-the-scenes optimizations, ensuring that your experience with the Dev Proxy is smoother and more enjoyable than ever before. Check out the [release notes](https://github.com/microsoft/dev-proxy/releases/tag/v0.13.0) for the complete list of changes in this version.

## Try it now

Download Microsoft 365 [Dev Proxy v0.13](https://aka.ms/devproxy/download) and check if your apps properly handle API errors.

With the latest version of Dev Proxy, v0.13.0, you can take advantage of a range of powerful features designed to improve your development and testing processes. From mocking capabilities to the ability to simulate real-world network conditions, Dev Proxy has everything you need. Upgrade now to build even more robust applications!

Follow us on [X (Twitter) / @Microsoft365Dev](http://www.twitter.com/microsoft365dev) to stay up to date on the latest developer news and announcements.
