---
title: "Simulate handling Teams Admin Center notifications for Microsoft Graph connectors"
description: "Microsoft Graph connectors can be packaged as Microsoft Teams apps, enabling admins to deploy them in Teams Admin Center with a single click. This works by..."
date: 2024-03-19
author: "Majesty Uwagerikpe, Waldek Mastykarz"
tags: ["tutorial"]
---

Microsoft Graph connectors can be packaged as Microsoft Teams apps, enabling admins to deploy them in Teams Admin Center with a single click. This works by sending a webhook notification to a URL denoted in the Teams app manifest. To learn more, read through this [documentation](https://learn.microsoft.com/en-us/graph/connecting-external-content-deploy-teams).

We recognize the challenge for developers testing the deployment of their Graph connectors Teams app if they do not have access to a Microsoft 365 tenant and global and/or Teams admin privileges in that tenant. To alleviate this challenge, we're excited to share that Graph connectors now work with Dev Proxy.

## Microsoft Graph connectors in Dev Proxy

[Dev Proxy](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/overview) is a command line tool and API simulator that allows you to test your apps end-to-end on your local machine. With this tool, you can verify that your app correctly handles the webhook notification and validation token from Teams Admin Center, obtains an access token from Microsoft Entra, creates the Graph connection and provisions its schema, and ingests external items. In addition, you can also test that your app can handle requests to delete the Graph connection. Each error message and warning you receive from Dev Proxy will tell you exactly what needs to be done to ensure administrators can successfully deploy your app and that the Graph connection will provide value to users in Microsoft Copilot for Microsoft 365.

Are you ready to get started? First, install the latest Dev Proxy beta by following these [setup instructions](https://learn.microsoft.com/en-us/microsoft-cloud/dev/dev-proxy/get-started?tabs=powershell&pivots=client-operating-system-macos#:~:text=To%20try%20the%20latest%20preview%20features%2C%20install%20the%20beta%20version%20of%20Dev%20Proxy%20by%20running%20the%20following%20command%3A). Next, you'll want to have the source code for your Graph connector Teams app handy. You can also grab the Graph connectors Dev Proxy preset [here](https://adoption.microsoft.com/en-us/sample-solution-gallery/sample/pnp-devproxy-microsoft-graph-connector-notification/). Next, start Dev Proxy and the Graph connector notification handling API. Finally, press 'w' in the terminal running Dev Proxy to trigger the webhook notification from Teams Admin Center. Happy testing!

![Dev Proxy simulating Teams Admin Center notification](/blog/images/a-screenshot-of-a-computer-description-automatica.png)

## Conclusion

With Dev Proxy, developers can test their Graph connector Teams apps end-to-end from the terminal on their local machine. To get started, grab the [Graph connectors Dev Proxy preset](https://adoption.microsoft.com/en-us/sample-solution-gallery/sample/pnp-devproxy-microsoft-graph-connector-notification/), in beta now, and be on the lookout for when it comes to v1 at the end of March.

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev) and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
