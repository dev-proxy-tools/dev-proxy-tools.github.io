---
name: dev-proxy-release-announcement
description: This skill should be used when the user asks to "write a Dev Proxy release announcement", "create release notes for Dev Proxy", "write announcement for Dev Proxy version", or needs to convert a Dev Proxy changelog into a marketing-focused release article.
---

# Dev Proxy Release Announcement Writer

Create compelling release announcements for Dev Proxy versions based on changelog input.

## About Dev Proxy

Dev Proxy is an API simulator that helps developers build better apps. Developers use it to emulate APIs and their behaviors, ensuring apps integrate with APIs following market best practices.

## Gathering Changelog Input

STOP - Before writing an announcement, obtain a GitHub release URL.

Request from the user a link to the Dev Proxy GitHub release (draft or published). Then:

1. Fetch the release page to get the list of changes
2. Follow links to related issues and PRs to understand:
   - What problem each change solves
   - Technical details of the implementation
   - User impact and breaking changes
3. Use this context to write the announcement

**For draft releases:** Remind the user to delete the draft after publishing the announcement - otherwise it breaks the build.

## Voice and Tone

Write as a master copywriter and part of the Dev Proxy team. Understand that buying is emotional - use words to tap into readers' emotions.

**Perspective:**
- Write in first-person plural ("We're excited...", "We've improved...")
- Position as team members sharing news, not a changelog dump

**Principles:**
- Skip filler words ("We're pleased to inform you that...", "This release contains...")
- Focus on user benefits, not just features
- Make technical changes relatable and actionable
- Use regular dashes (`-`), never em-dashes (`–` or `—`)
- Use sentence case for titles (only first word and proper nouns capitalized)

**Engagement techniques:**
- Use rhetorical questions ("The upside?", "Why this matters:")
- Add "Why this matters" sections for significant features
- Use emotional hooks ("Future-proof", "with confidence", "no more mysterious failures")
- Keep conversational - explain problems before solutions

## Changelog Analysis

Analyze the changelog to separate functional from non-functional changes:

**Include (functional changes):**
- New features
- Bug fixes affecting user behavior
- Breaking changes
- Performance improvements

**Exclude (non-functional changes):**
- Dependabot updates (codeql-action, checkout, setup-dotnet, etc.)
- Docker workflow updates (metadata-action, setup-qemu-action)
- Internal CI/CD pipeline changes
- GitHub Actions version bumps

## Breaking Changes

For major version releases, lead with breaking changes prominently.

Structure each breaking change with:
- **What changed** - technical description
- **Impact** - how it affects users

Frame bug fixes as improvements: "This was a bug - Dev Proxy wasn't accurately emulating..."

Explain the version bump follows semantic versioning (SemVer).

## Graph API Emulation

When describing Microsoft Graph mocking fixes:
- Emphasize alignment with how Microsoft Graph actually works
- Highlight consistency across environments
- Position fixes as bringing Dev Proxy closer to real Graph behavior

## Dev Proxy Toolkit Section

Every announcement includes a section about the companion VS Code extension: [Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit).

STOP - Before writing this section, fetch the toolkit changelog to identify the latest released version and its changes:

1. Fetch `https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog`
2. Identify the latest **released** version (skip entries marked "Unreleased")
3. Summarize the key changes from that version's Added, Changed, and Fixed sections
4. Write the section following this pattern:

```markdown
## Dev Proxy Toolkit

[Dev Proxy Toolkit](https://marketplace.visualstudio.com/items?itemName=garrytrinder.dev-proxy-toolkit) is an extension that makes it easier to work with Dev Proxy from within Visual Studio Code. Alongside the new release of Dev Proxy, we've also released a new version of the toolkit, vX.X.X.

In this version, we've:

- [Key change 1]
- [Key change 2]
- [Key change 3]

Checkout out the [changelog](https://marketplace.visualstudio.com/items/garrytrinder.dev-proxy-toolkit/changelog) for more information on changes and bug fixes.
```

**Guidelines:**
- Use `##` heading (not `###`) unless the announcement uses a "Tools" parent section
- Summarize changes in user-friendly language - don't just copy changelog entries
- Group related changes (e.g., multiple new snippets become "Added new snippets for X and Y plugins")
- Always end with the changelog link

## Announcement Structure

```markdown
# Dev Proxy vX.X.X - [Brief description in sentence case]

**Authors: Waldek Mastykarz, Garry Trinder**

[Opening paragraph - excitement, key highlights]

### **In this version:**

- [Bullet list of main changes]

---

### **[Section title]**

[Description - use "What changed:" and "Impact:" for breaking changes]

---

## Dev Proxy Toolkit

[See Dev Proxy Toolkit Section above]

---

### **Why upgrade to vX.X.X?**

✅ **Benefit 1** - description  
✅ **Benefit 2** - description

### **Try it now**

Download **Dev Proxy vX.X.X** today and build better API-connected applications with confidence!

Got feedback or ideas? [Join us](https://github.com/dotnet/dev-proxy/discussions) and be part of the conversation.
```

## Formatting Rules

- `###` for main headings (bold: `### **Section title**`)
- `####` for subsections within breaking changes
- Regular dashes only
- ✅ for benefit lists
- Bold plugin names: `**PluginName**`
- Code format for commands: `` `devproxy --version` ``

## Output Location

Store in: `Projects/Dev Proxy/Release announcements/vX.X.X.md`

## Workflow

1. Gather changelog (see "Gathering Changelog Input" above)
2. Analyze and categorize changes
3. Identify breaking changes and their impact
4. Fetch Dev Proxy Toolkit changelog (see "Dev Proxy Toolkit Section" above)
5. Draft announcement following the structure
6. Check for duplicate content across sections
7. Verify dashes are regular, not em-dashes
8. Confirm title uses sentence case

## Reference Files

- **`references/example-announcement.md`** - Complete v2.0.0 announcement example
