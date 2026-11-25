---
title: "App Maintenance Cost Per Year: The 2027 Bill Nobody Quoted You"
slug: "app-maintenance-cost-per-year-2027"
excerpt: "Your app is finished. So why does it keep costing money? Eight platform deadlines land between December 3 and April 2027 — here is what each one does to your budget."
seoTitle: "App Maintenance Cost Per Year: The 2027 Bill"
seoDescription: "App maintenance cost per year, priced from real deadlines: eight Apple and Google changes land between Dec 3 and April 2027. What each one costs you."
tags: ["App Store", "Google Play", "Pricing", "Hiring", "macOS"]
cover:
  query: "calculator and coins on a desk"
  alt: "black calculator beside black pen on white printer paper. Photo by Mediamodifier on Unsplash."
sources:
  - title: "Apple Developer News: Tax and price updates for apps, In-App Purchases, and subscriptions (Nov 17, 2026)"
    url: "https://developer.apple.com/news/"
  - title: "Apple Developer News: Upcoming: New age rating content descriptors in App Store Connect (Nov 2, 2026)"
    url: "https://developer.apple.com/news/"
  - title: "Apple Developer News: Upcoming expiration of Developer ID Certification Authority (Sub-CA) (Oct 1, 2026)"
    url: "https://developer.apple.com/news/"
  - title: "Apple Developer News: App Store submissions now open for the latest OS releases (Sep 9, 2026)"
    url: "https://developer.apple.com/news/"
  - title: "Apple Developer News: Update on regulated medical device apps in the EEA, UK, and US (Mar 26, 2026)"
    url: "https://developer.apple.com/news/"
  - title: "App Store Connect release notes"
    url: "https://developer.apple.com/help/app-store-connect/release-notes/"
  - title: "What's New - App Store - Apple Developer"
    url: "https://developer.apple.com/app-store/whats-new/"
---

If you signed off on an app this year, your app maintenance cost per year is about to stop being theoretical. Between **December 3, 2026 and April 2027**, eight separate Apple and Google deadlines land on apps that are already built, already shipped, and already paid for. Four of them will stop you submitting updates if you ignore them. None of them add a single feature your users will notice.

This is the invoice nobody includes in a build quote. Not because developers are hiding it — because when you agreed the scope, most of these dates did not exist yet.

## What changed, and what it costs you

Platform maintenance is normally a trickle: an SDK bump here, a policy tweak there. What makes the next five months unusual is the density. Eight dated requirements, from two platform owners, landing inside twenty weeks — and they hit different parts of your product. One is a tax setting. One is a certificate. One is a questionnaire answer that can re-rate your app 18+. One is a genuine code migration.

Here is the full run, in date order, with the source for each:

| Date | What happens | Blocks updates? |
|---|---|---|
| Dec 3, 2026 | Prices update in five storefronts | No |
| Jan 1, 2027 | California sales tax applies to SaaS apps | No |
| Jan 12, 2027 | New age rating declarations required for all apps | Yes |
| Jan 27, 2027 | Google Play contacts and location policy mandatory | Yes |
| Feb 1, 2027 | Developer ID certificate authority expires | Mac installers |
| Early 2027 | On-Demand Resources uploads refused for new apps | New apps |
| Early 2027 | Medical device status required for existing apps | Yes |
| April 2027 | iOS 27 SDK and iPhone Duo screenshots required | Yes |

Four of those eight are paperwork. Three are real engineering. One is a tax checkbox. Knowing which is which is the whole difference between a planned afternoon and a panicked weekend.

## Where things stand

Nothing here is a surprise attack. Every one of these was announced between March and November 2026, which means the information to plan around them has been public for months. The reason founders still get blindsided is structural: these announcements go to the Apple Developer account and the Play Console, and the person reading those is almost never the person who owns the budget.

If your arrangement with your developer ended at "the app is live", then nobody is currently watching that mailbox on your behalf. That is the actual gap — not the deadlines themselves.

## The 2027 deadline bill, line by line

Effort figures below are my own estimates for a typical small product — one app, a modest codebase, no unusual architecture. They are not quotes. Where I convert effort into money, I am using the contractor rates from my own [rates breakdown for full-stack developers](https://www.iamtayyab.com/blog/what-us-startups-pay-full-stack-pakistan) (mid ~$15–25/hr, senior ~$25–40/hr, labelled QBS Global 2026, soft), which works out to roughly **$150–$320 per developer-day** at eight hours.

### 1. December 3, 2026 — your prices move in five storefronts

Apple is updating prices for apps and In-App Purchases in **Botswana, Colombia, Egypt, Rwanda and Türkiye**, per its [November 17 tax and price update](https://developer.apple.com/news/). This also absorbs new VAT in Botswana (14%) and Rwanda (18%), plus a 3% Significant Economic Presence tax in Cameroon and Côte d'Ivoire.

What will *not* change: auto-renewable subscriptions anywhere, the storefront you picked as your base, and any storefront where you set prices manually.

**Effort:** 30–60 minutes to open App Store Connect and look. **Blocks updates:** no.

### 2. January 1, 2027 — California sales tax reaches SaaS

Apple states that "effective January 1, 2027, the following categories of apps will be subject to sales and use tax in California: SaaS, App Store Software, Software Training Material, Dating, and Boosting." There is also a new **Software as a Service** tax attribute to review under Pricing and Availability.

The important reassurance, in Apple's words: US prices are shown excluding tax, so your proceeds do not change. Your customer's total may go up. If you run a subscription product, the thing to check is whether your category is tagged correctly — which matters more than the tax itself, and is the kind of detail worth getting right alongside your [pricing page setup](https://www.iamtayyab.com/blog/pricing-page-aeo-indie-saas-checklist).

**Effort:** under an hour. **Blocks updates:** no.

### 3. January 12, 2027 — the age rating answer that can re-rate your app

App Store Connect added two content descriptors: **Shared Location** and **Dating and Relationships**. Apple's wording is unambiguous: "All apps must have these declarations completed by January 12, 2027."

This is the one to read twice, because the cost is not the clicking. Declaring **Dating and Relationships sets a minimum rating of 18+**. In Brazil, declaring Shared Location automatically assigns A16 and Dating and Relationships A18. If your app lets users share their location with a friend, or connects people to each other, your rating can move — and an 18+ rating affects which ad networks will take you, whether you can be featured in family contexts, and in some markets whether schools can install you at all.

If you think you qualify for a lower rating in Brazil for a legitimate reason — parent-child location sharing is Apple's own example — there is an official route through Brazil's Ministry of Justice to get properly rated rather than defaulted.

**Effort:** 1–3 hours to answer honestly and model the impact. Potentially much more if an 18+ rating forces a product decision. **Blocks updates:** yes, after January 12.

### 4. January 27, 2027 — Google Play's contacts and location rules

Play's Contacts and Location policy becomes mandatory on **January 27, 2027**, with a 30-day self-extension available in the Console. I covered the engineering in detail in the [contact picker and location button checklist](https://www.iamtayyab.com/blog/google-play-contact-picker-location-button-deadline), but the founder version is short: if your Android app reads the user's contacts or asks for precise location, you may need to swap to a system-provided picker or button instead of requesting broad permission.

This is the most expensive item on the list for most Android products, because it is real code and real re-testing, not a form.

**Effort:** 2–6 developer-days, so roughly **$300–$1,900**. **Blocks updates:** yes, after enforcement begins.

### 5. February 1, 2027 — the Mac certificate that stops installers

Apple announced on October 1, 2026 that "the original Developer ID Certification Authority (Sub-CA) expires on February 1, 2027. Certificates issued by this authority will stop working on that date."

Concretely: **.pkg installers signed with an affected certificate will no longer install** after that date. Mac software you already signed and notarized with a secure timestamp keeps working. The fix is generating a replacement from the G2 authority and re-signing — and when prompted, choosing G2 specifically, because another option may issue a certificate that also expires in 2027. I wrote the step-by-step in [the Developer ID expiry fix](https://www.iamtayyab.com/blog/developer-id-certificate-expiry-2027-mac-apps).

If you distribute a Mac app outside the Mac App Store, this is the one that can silently break your download page. If you want to know whether you are affected, forward this to whoever signs your builds:

```bash
## example: ask your developer to run this and send you the output
security find-identity -v -p codesigning
```

**Effort:** half a day to a day, including updating your build pipeline. **Blocks updates:** it blocks *installs*, which is worse.

### 6. Early 2027 — asset packs and medical device paperwork

Two unrelated things share this vague window, and the vagueness is the problem — "early 2027" is not a date you can put in a sprint.

**On-Demand Resources.** Per the App Store Connect release notes of November 12, 2026, from early 2027 App Store Connect will no longer accept uploads containing On-Demand Resources from new apps, or from apps that have never used the feature. The feature is deprecated as of iOS 27, and Apple recommends Apple-Hosted Background Assets. If your app downloads level packs, offline maps, model files or media after install, this is a migration. Crucially, the cutoff bites **new** apps first — so a rebuild shipping as a fresh bundle in 2027 cannot use the old system at all.

**Regulated medical device status.** Announced March 26, 2026, and easy to miss: if you distribute in the EEA, UK or US and your app's primary or secondary category is Health & Fitness or Medical — or it is marked as containing frequent references to Medical or Treatment Information in the age rating questionnaire — you must provide a regulated medical device status plus regulatory contact and safety information. Apple's words: existing apps "must provide a status by early 2027," and "if you haven't declared your app's status by early 2027, you'll no longer be able to submit app updates."

That second one catches wellness and fitness apps that never thought of themselves as medical.

**Effort:** On-Demand Resources migration, 3–10 developer-days (**$450–$3,200**). Medical device declaration, a few hours plus whatever your legal review costs.

### 7. April 2027 — the SDK floor and a new screenshot size

Apple's September 9, 2026 submissions notice sets out that "starting April 2027, apps and games uploaded to App Store Connect need to meet the following minimum requirements," including that "iOS and iPadOS apps must be built with the iOS 27 & iPadOS 27 SDK or later."

In the same window, per Apple's What's New page: "Starting April 2027, any apps or games submitted will need to include screenshots for iPhone Duo." I wrote about preparing for that device in the [iPhone Duo readiness checklist](https://www.iamtayyab.com/blog/iphone-duo-app-ready-checklist).

An SDK floor sounds trivial and usually is not. Rebuilding on a new SDK surfaces deprecations, changed defaults and third-party libraries that have not kept up. Budget for the regression testing, not the rebuild.

**Effort:** 2–8 developer-days for the SDK move (**$300–$2,600**), plus half a day to two days of design time for new screenshots. **Blocks updates:** yes, from April 2027.

## What app maintenance cost per year actually buys you

Add it up for three common shapes of product. These are my estimates at the day rates above, assuming nothing goes wrong:

| Product shape | Items that apply | Rough range |
|---|---|---|
| One iOS app, no Mac, no asset packs | 1, 2, 3, 7 | $600–$3,000 |
| iOS + Android SaaS | 1, 2, 3, 4, 7 | $1,200–$5,500 |
| Multi-platform, Mac installer, asset packs | all eight | $2,500–$11,000 |

Two things that table should tell you. First, the cheap items are cheap only if someone is watching for them — the $0 tax checkbox becomes expensive the day it is wrong on a tax filing. Second, the expensive items are the ones with real code behind them, and those are the ones that cannot be done in the last week.

A reasonable planning figure for a shipped, actively-sold app is **one to three developer-days a month** of pure platform maintenance, before any feature work, bug or outage. That is the number missing from most build quotes.

## Retainer or ad hoc?

This list is a good argument for a small retainer and a bad argument for a big one.

The work is lumpy — nothing in December, a cluster in late January, a spike before April. Paying for a full-time seat to cover it is waste. But paying nothing and calling someone in a panic on January 26 is worse, because emergency work is priced as emergency work and you will be at the back of their queue.

What actually fits is the smallest arrangement that includes someone *monitoring* the two mailboxes and telling you what is coming. For comparison, published figures in my [contractor vs retainer vs dedicated breakdown](https://www.iamtayyab.com/blog/hire-pakistan-full-stack-contractor-retainer-dedicated) put managed retainers around $2k–$3.5k/month for junior and $3.5k–$5k for mid (Codalyst Tech 2026) — which is more than this list needs on its own. A few hours a month on a standing arrangement is the honest shape, with the January and April spikes scoped and quoted separately as they arrive.

The heuristic from that post holds here: optimise for predictable ownership cost, not the lowest headline hourly rate. If you want to talk through what your product's version of this list looks like, that is the kind of thing I help founders scope as a [full-stack developer working with US and UK teams](https://www.iamtayyab.com/full-stack-developer-pakistan).

## Caveats and corrections

- **"Early 2027" is not a date.** Both the On-Demand Resources cutoff and the medical device declaration use that phrasing. Treat them as January and plan accordingly, but watch for Apple to put a firm date on them.
- **The December 3 price update may not apply to you at all.** If one of the five affected storefronts is your base storefront, or you manage prices manually, nothing changes.
- **Google Play's dates come with an extension path.** The 30-day self-extension in the Console is real, but it is a buffer, not a reprieve.
- **Apple's own pages disagree on one date.** Apple's developer news says the new age rating descriptors arrive November 16, 2026; the App Store Connect release notes say November 19. The January 12, 2027 completion deadline is consistent across both, and that is the date that matters.
- **I have not priced your legal review.** The medical device status asks for regulatory information. If your app is anywhere near a medical claim, that is a lawyer's question, not a developer's.
- **Deadlines move.** Apple has extended requirements before. Planning for the published date is correct; assuming it will slip is not.

## Quick checklist

- [ ] Find out who currently reads your Apple Developer and Play Console email. If the answer is "nobody", fix that first.
- [ ] Before Dec 3: check whether any of the five repriced storefronts is your base storefront.
- [ ] Before Jan 1: confirm your tax category and review the new SaaS attribute.
- [ ] Before Jan 12: answer the two new age rating descriptors, and model what an 18+ rating would do to your marketing.
- [ ] Before Jan 27: if your Android app touches contacts or precise location, get the migration scoped now.
- [ ] Before Feb 1: if you ship a .pkg installer, re-sign with a G2 certificate.
- [ ] If your app is Health & Fitness or Medical, declare your regulated medical device status.
- [ ] Before April: budget the iOS 27 SDK rebuild and new iPhone Duo screenshots.
- [ ] Decide what goes on a standing arrangement and what you will scope ad hoc.

## FAQ

### How much should I budget per year to maintain an app?

For a shipped app that is actively sold, plan on one to three developer-days a month of platform maintenance before any feature work — roughly $1,800 to $11,500 a year at the mid-to-senior contractor rates above. The 2027 deadline cluster sits at the higher end of a normal year because eight requirements land in five months.

### My developer said the app was finished. Were they wrong?

No. The app was finished against the platform as it existed then. Apple and Google change the rules underneath shipped software several times a year, and most of these requirements were announced after typical 2026 build contracts were signed. The fair question is not whether the work was complete, but who agreed to watch for changes afterwards.

### Which of these can actually stop me shipping an update?

Four. Missing age rating declarations after January 12, Google Play's contacts and location policy after enforcement begins, an undeclared medical device status by early 2027, and the iOS 27 SDK floor from April 2027. The Developer ID expiry is worse in a different way: it does not block updates, it stops your existing .pkg installer from installing.

### Can I just ignore the ones that are not ship-blocking?

You can defer the price and tax items safely, because Apple applies them whether you act or not. What you cannot do is ignore them permanently: a wrong tax category is a compliance problem rather than an engineering one, and it compounds quietly over quarters.

### Do I need a retainer for this?

Not a large one. The work is lumpy, so a full-time arrangement is waste. What you need is someone monitoring the platform mailboxes and giving you warning, with the January and April spikes scoped separately. A few hours a month plus quoted project work fits this better than a big monthly commitment.

### What if I am mid-way through a rebuild?

Then the On-Demand Resources cutoff matters more to you than to anyone else, because it hits new apps first. If your rebuild will ship as a new bundle in 2027, it cannot use On-Demand Resources at all — design around Background Assets now rather than migrating twice.

## Sources

- [Apple Developer News — Tax and price updates for apps, In-App Purchases, and subscriptions (Nov 17, 2026)](https://developer.apple.com/news/)
- [Apple Developer News — Upcoming: New age rating content descriptors in App Store Connect (Nov 2, 2026)](https://developer.apple.com/news/)
- [Apple Developer News — Upcoming expiration of Developer ID Certification Authority (Sub-CA) (Oct 1, 2026)](https://developer.apple.com/news/)
- [Apple Developer News — App Store submissions now open for the latest OS releases (Sep 9, 2026)](https://developer.apple.com/news/)
- [Apple Developer News — Update on regulated medical device apps in the EEA, UK, and US (Mar 26, 2026)](https://developer.apple.com/news/)
- [App Store Connect release notes (On-Demand Resources upload deprecation, Nov 12, 2026)](https://developer.apple.com/help/app-store-connect/release-notes/)
- [What's New — App Store, Apple Developer (iPhone Duo screenshots, On-Demand Resources deprecation)](https://developer.apple.com/app-store/whats-new/)
