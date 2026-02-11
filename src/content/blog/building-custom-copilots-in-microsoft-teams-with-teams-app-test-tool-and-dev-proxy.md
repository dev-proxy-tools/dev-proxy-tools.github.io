---
title: "Building custom copilots in Microsoft Teams with Teams App Test Tool and Dev Proxy"
description: "Custom copilots are AI assistants that have been tailored to meet the specific needs of an organization. Microsoft Teams is where employees communicate and..."
date: 2024-04-07
author: "Garry Trinder, Waldek Mastykarz"
tags: ["tutorial"]
image: "/blog/images/og-image-building-custom-copilots-in-microsoft-teams-with-teams-app-test-tool-and-dev-proxy.jpg"
---

Custom copilots are AI assistants that have been tailored to meet the specific needs of an organization. Microsoft Teams is where employees communicate and collaborate across the organization daily. Many organizations are interested in building bots for Microsoft Teams to integrate custom copilots they build. However, building a custom copilot is not trivial. By using Teams App Test Tool, you'll build and test your custom copilots quicker, saving time and money.

## Custom copilots on Microsoft Cloud

Many organizations are building custom copilots grounded in organizational data using the Retrieval Augmented Generation (RAG) pattern. Organizations can integrate information retrieval with large language models (LLMs) making the responses more contextually relevant and useful.

The [ChatGPT + Enterprise data with Azure OpenAI and AI Search](https://github.com/Azure-Samples/azure-search-openai-demo) sample is an example of how to implement RAG on the Microsoft Cloud.

![Retrieval Augmented Generation (RAG) architecture](/blog/images/word-image-20254-1.png)

Employees use natural language to ask questions and receive answers based on data from a fictitious company called Contoso Electronics. Allowing them to ask questions about the benefits, internal policies, as well as job descriptions and roles.

![Chat interface in the web application](/blog/images/chat-screen.png)

Requests are sent to a back-end API when employees submit queries. Answers are returned in natural language along with document citations and follow-up questions in the response which are displayed in the user interface.

## Custom copilots in Microsoft Teams

In many organizations, daily communication and collaboration takes place in Microsoft Teams. Exposing conversational AI bots in Microsoft Teams gives employees a familiar experience that can be accessed on desktop, tablet, and mobile devices through the Microsoft Teams clients, meeting employees where they are, and in the flow of work.

In the [ChatGPT + Enterprise data with Azure OpenAI and Cognitive Search in Microsoft Teams](https://adoption.microsoft.com/sample-solution-gallery/sample/pnp-sp-dev-teams-sample-bot-azure-search-openai-ts/) sample, which builds on top of the previous sample, employees post questions as messages to a bot in Microsoft Teams, as an alternative to using the web-based app.

The bot sends requests to the same back-end API to return answers from the LLM.

![Chat interface in Microsoft Teams bot](/blog/images/chat-with-your-data-bot-in-microsoft-teams.png)

The answers, along with document citations and action buttons, are returned in Adaptive Cards. In addition, follow-up questions are displayed as suggested actions.

## Removing platform dependencies

To run and develop the two sample projects that we've just seen, you need to setup and configure several cloud services, as well as have access to a Microsoft 365 tenant.

![Microsoft Teams bot with RAG architecture](/blog/images/a-diagram-of-a-software-company-description-autom.png)

During development this can be inefficient, in both time and money. It takes time to get everything in place and each request you send to the LLM incurs a cost as does keeping these services up and running.

During development, consider the following:

- Do you always need a real response from the LLM for every request?
- Do you always need to run the app in Microsoft Teams?
- Do you always need to have cloud services enabled?

In many cases, the answer is "no". Whilst you can remove cloud resources when you are not using them, provisioning resources each time you need them can also take time, which could be better spent on more high value tasks.

With Teams App Test Tool and Dev Proxy, you simulate only the dependencies you need to run the parts of the app that you are working on.

- **Teams App Test Tool (Test Tool)** is a Microsoft Teams app simulator that improves developer productivity by enabling you to develop and test bot code without the need for a bot service, or sideloading your app into a real Microsoft Teams environment.
- **Dev Proxy** is a command line tool that simulates APIs, improving developer productivity by intercepting network requests sent from your app and responding with mocked responses or errors, and injecting real-world API behaviours like throttling or latency, plus much more.

With Teams App Test Tool, you remove the dependency on a Microsoft 365 tenant, bot services, Microsoft Entra, and Dev Tunnels, whilst using real responses from the LLM.

![Removing dependencies with Teams App Test Tool](/blog/images/word-image-20254-6.png)

By adding Dev Proxy, you remove the dependency on all cloud services and APIs, whilst using mocked responses to simulate the LLM response without changing any of your app code.

![Removing dependencies with Dev Proxy](/blog/images/word-image-20254-7.png)

When you are ready to test against the live LLM, simply turn off Dev Proxy.

## Try the sample project

To run and test the bot locally using Teams App Test Tool and Dev Proxy:

1. [Install and configure](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/get-started#install-dev-proxy) Dev Proxy on your machine
2. [Download](https://adoption.microsoft.com/sample-solution-gallery/sample/pnp-sp-dev-teams-sample-bot-azure-search-openai-ts/) the sample and extract the contents to a folder on your machine
3. Open the project folder in Visual Studio Code
4. In Visual Studio Code, open a new terminal window
5. Run `devproxy –config-file devProxy/use-mocks.json` to start Dev Proxy
6. Open the side bar in Visual Studio Code, select the Run and Debug panel
7. In the debug profile dropdown, select Debug in Test Tool
8. Start a debug session and launch the test tool by pressing F5

In the Test Tool, select the "What is included in my Northwind heal…" button to send a message in the bot chat and issue a request to the back-end API.

![Teams App Test Tool displaying the bot welcome message and answer to a question as Adaptive Cards](/blog/images/a-screenshot-of-a-computer-description-automatica.png)

In the Dev Proxy process output, you can see that the request to the back-end API is intercepted, a delay is added to simulate real-world latency, and the API response is mocked.

![Dev Proxy running in a terminal window inside Visual Studio Code, displaying a delayed mocked request to a backend API](/blog/images/a-screenshot-of-a-computer-description-automatica-1.png)

## Summary

Using Teams App Test Tool and Dev Proxy you can focus on developing the app logic and user interface by removing dependencies you don't need, for the task at hand.

- Faster F5 time
- Reduce costs during development
- Use deterministic responses to develop and test repeatable scenarios

Try the sample for yourself and let us know what you think. We are looking forward to hearing how we could make it better.

Follow us on [X (Twitter) / @Microsoft365Dev](http://twitter.com/microsoft365dev), [LinkedIn](https://www.linkedin.com/showcase/microsoft365dev/), and subscribe to our [YouTube channel](https://www.youtube.com/microsoft365developer) to stay up to date on the latest developer news and announcements.
