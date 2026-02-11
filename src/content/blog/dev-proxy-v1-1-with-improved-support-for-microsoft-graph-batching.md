---
title: "Dev Proxy v1.1 with improved support for Microsoft Graph batching"
description: "We're excited to announce the release of Dev Proxy v1.1. This update delivers critical fixes for Microsoft Graph batch request simulation, resolves..."
date: 2025-09-03
author: "Waldek Mastykarz, Garry Trinder"
tags: ["release"]
image: "/blog/images/og-image-dev-proxy-v1-1-with-improved-support-for-microsoft-graph-batching.png"
---

We're excited to announce the release of Dev Proxy v1.1. This update delivers critical fixes for Microsoft Graph batch request simulation, resolves authentication plugin issues, and enhances the MinimalPermissionsGuidancePlugin with new reporting capabilities.

**In this version:**

- Fixed Microsoft Graph batch response handling
- Resolved authentication plugin initialization issues
- Enhanced MinimalPermissionsGuidancePlugin with markdown and text reports
- Added scope filtering for permissions guidance
- Performance optimizations for MSGraphDb generation

## Fixed Microsoft Graph batch response handling

We've addressed a critical issue where the `GraphRandomErrorPlugin` incorrectly returned HTTP status code 424 instead of 200 for Microsoft Graph batch requests containing failed individual requests.

**What changed:**

- Batch responses now correctly return HTTP 200 OK as per Microsoft Graph specifications
- Individual requests within batches maintain their proper error codes (e.g., 429 for throttling)
- Fixed exception handling that was silently swallowing errors during batch processing

This fix ensures your applications receive the correct response patterns when testing Microsoft Graph batch operations, helping you build more reliable integrations.

## Resolved authentication plugin initialization issues

The `AuthPlugin` was experiencing initialization problems where the 'Enabled' property was being incorrectly overridden to 'false', preventing proper authentication simulation regardless of your configuration settings.

**The fix:**

- Removed the hardcoded 'Enabled = false' override in the plugin initialization
- Your authentication configuration settings are now properly respected
- Authentication simulation works correctly across all supported flows

If you've been experiencing authentication issues since version 0.29.0, this update will restore the expected functionality.

## Enhanced MinimalPermissionsGuidancePlugin with new reporting

We've significantly improved the `MinimalPermissionsGuidancePlugin` to provide more actionable insights for your Microsoft Graph applications:

**New features:**

- Markdown and plain text report formats for better documentation integration
- Scope filtering capabilities to ignore specific permissions in your analysis
- Performance optimizations for faster MSGraphDb generation

These enhancements make it easier to understand and document the minimal permissions your applications actually need, helping you follow the principle of least privilege more effectively.

## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, v1.2.0.

In this version, we've:

- Updated all JSON snippets to use v1.1.0 schemas
- Added new YAML snippets for [Dev Proxy GitHub Actions](https://github.com/marketplace/actions/dev-proxy-actions)

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.

## Try it now

Download Dev Proxy v1.1.0 today and experience more accurate Microsoft Graph simulation and improved authentication testing! Thanks to [Artem Azaraev](https://github.com/bartizan) for contributing to this release.

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
