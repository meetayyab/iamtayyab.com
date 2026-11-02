---
title: "App Store Multiseat Subscriptions: Selling Your iOS App to Teams and Schools"
slug: "app-store-multiseat-subscriptions-indie-guide"
excerpt: "Apple switched on multiseat purchasing for most StoreKit 2 subscriptions on Oct 22. Here is what is on by default, what to decide this week, and how to price seats."
seoTitle: "App Store Multiseat Subscriptions: Indie Guide"
seoDescription: "App Store multiseat subscriptions are on by default since Oct 22, 2026. See what changes, how seat pricing works and the checklist to run before you opt in."
tags: ["App Store", "Pricing", "Indie apps", "SaaS"]
cover:
  query: "empty classroom desks laptops"
  alt: "An empty classroom with desks and a chalkboard. Photo by Ivan Aleksic on Unsplash."
sources:
  - title: "Apple Developer News: Offer your subscriptions to businesses and schools (Oct 22, 2026)"
    url: "https://developer.apple.com/news/"
  - title: "App Store Connect Help: Manage purchase options for an auto-renewable subscription"
    url: "https://developer.apple.com/help/app-store-connect/manage-subscriptions/manage-purchase-options-for-auto-renewable-subscriptions"
  - title: "WWDC26 session 391: Offer subscriptions to groups and organizations"
    url: "https://developer.apple.com/videos/play/wwdc2026/391/"
  - title: "App Store Connect API: Configuring multi-seat subscriptions for organizations"
    url: "https://developer.apple.com/documentation/appstoreconnectapi/configuring-multi-seat-subscriptions-for-organizations"
---

App Store multiseat subscriptions are live: since October 22, 2026, organizations and schools can buy your auto-renewing subscription in volume, and Apple has [enabled this by default in App Store Connect](https://developer.apple.com/news/) unless you changed the setting before. If you run a StoreKit 2 subscription app, you are probably already listed in Apple Business and Apple School Manager today. This guide covers what is on by default, what to decide this week, and how to price seats so a team purchase does not undercut your own plans.

I build and ship indie apps from Lahore, and the pattern I keep seeing is that platform defaults get flipped on while founders are busy shipping. A default is a pricing decision somebody else made for you. Here is how to make it yours.

## What changed on October 22, 2026

Apple's [developer news post from October 22](https://developer.apple.com/news/) announced volume purchasing for subscriptions. Organizations that use Apple Business or Apple School Manager buy seats through a single Apple In-App Purchase, then assign and manage them with their existing device management tools. Seats can be added or removed at any time.

Two other dates matter:

- **November 2026:** you can configure and test group purchases in your Sandbox Apple Account.
- **This winter:** group purchases arrive on the App Store itself, letting a customer buy several seats and invite other people into the subscription.

So there are two different channels. Volume purchasing through Apple Business and Apple School Manager is live now. Group purchases in the normal App Store flow are coming, and you can start testing them this month.

## Where things stand: App Store multiseat subscriptions defaults

Apple's [App Store Connect help page](https://developer.apple.com/help/app-store-connect/manage-subscriptions/manage-purchase-options-for-auto-renewable-subscriptions) is the best reference for the rules. The parts that affect most indie apps:

- Multiseat purchasing is **enabled by default** unless you previously changed the setting.
- Subscriptions created before **September 14, 2026** that do not use StoreKit 2, or that have Family Sharing turned on, are **opted out by default**.
- Apple Business and Apple School Manager support **only** multiseat purchases. If you want to sell there, multiseat must be on.
- Changing the setting needs the Account Holder, Admin or App Manager role.
- Custom-app subscriptions are automatically available in Apple Business and Apple School Manager, and you cannot opt out.

The [WWDC26 session on selling to groups and organizations](https://developer.apple.com/videos/play/wwdc2026/391/) adds that both purchase types require StoreKit 2, and that selling to groups is on by default for most StoreKit 2 subscriptions. You can limit a subscription to Apple School Manager only, or turn group and organization sales off entirely. Individual App Store sales continue either way.

If you have not touched your subscriptions since the [StoreKit 2 migration or a commitment-plan change](https://www.iamtayyab.com/blog/sell-the-year-bill-the-month-storekit), open App Store Connect now and look at each one. The default may already be live.

## How multiseat works for you and your customers

From the WWDC26 session, the mechanics are:

- **Group purchases (in the App Store flow):** your app builds the UI, collects the seat count and passes it into the StoreKit 2 purchase request. The purchaser shares an invite link and each member who accepts is automatically assigned a seat.
- **Volume purchasing (Apple Business / Apple School Manager):** Apple handles the display and purchase. The organization assigns seats through its device management service.
- **Seat management:** by default Apple's included system generates invite links, tracks acceptance and handles seat lifecycle events such as cancellations. If you have your own invitation system, new App Store Server API endpoints let you integrate it.
- **Transactions:** for either purchase type the App Store issues a transaction for each assigned member, and your app grants access based on that.

The session also names App Store Server API group management endpoints that let you look up every group a customer belongs to and every member of a group. It does not list paths or response fields, so read Apple's documentation before you build against them.

The main shift for your code is that the buyer is no longer always the user. Someone pays, someone else gets a seat.

## Who should opt in, and who should wait

Opt in if your product already has a team story: shared workspaces, classroom use, a tool an IT admin would deploy to a fleet of devices. For those apps, volume purchasing opens a buying route that did not exist before, and it comes with Apple's own seat assignment, so you do not have to build invitations yourself.

Wait, or switch it off, if your pricing assumes one person per subscription, if your support load scales with accounts rather than seats, or if your backend cannot yet separate the buyer from the user. A half-ready multiseat setup is worse than none, because the first school that buys 40 seats will find every rough edge. If you are also deciding how to handle storefront-specific terms, my [guide to Apple's EU terms](https://www.iamtayyab.com/blog/apple-eu-unified-app-store-terms-indie-guide) covers a similar "decide before the default decides for you" problem.

## The multiseat decision checklist

### 1. Decide which channels you want

Per subscription, App Store Connect lets you pick the App Store, Apple Business and Apple School Manager. Apple's help page says App Store availability cannot be removed after approval, so the real choices are whether to add the two organization channels and whether to allow multiple seats.

If your app is a personal tool, such as a habit tracker or a single-user photo editor, turn multiseat off. If a team could plausibly share it, leave it on and plan for it.

### 2. Understand what disabling does

Turning multiseat off on an approved subscription needs a confirmation and has consequences, per Apple's help page:

- New customers can only buy one seat.
- The subscription disappears from Apple Business and Apple School Manager.
- Existing subscriptions keep renewing until the group purchaser cancels.
- Nobody can add seats, but the purchaser can remove them.

Removing Apple Business or Apple School Manager from an approved subscription is stricter: only the Account Holder can do it, and existing subscribers will be cancelled at the end of their next renewal. Treat that as a one-way door and talk to your customers first.

### 3. Mind the Family Sharing interaction

If Family Sharing is on and you enable multiseat, only the group purchaser's access includes Family Sharing. Every other seat is for individual use. Apple also notes that once Family Sharing is turned on you cannot turn it off. If you are weighing Family Sharing, decide on multiseat at the same time.

### 4. Price seats on purpose

Default pricing is a per-seat price. WWDC26 session 391 describes optional **volume pricing** with up to five price bands and per-seat discounts. The speaker's example is $19.99 per seat per month for seats 1 to 20, $13.99 for seats 21 to 40 and $10.99 from seat 41.

Here is that example worked through for a 50-seat purchase (Apple's example numbers, not a recommendation):

```text
// example: Apple's WWDC26 volume-pricing example, 50 seats, per month
seats 1-20   : 20 x $19.99 = $399.80
seats 21-40  : 20 x $13.99 = $279.80
seats 41-50  : 10 x $10.99 = $109.90
total        : $789.50
average/seat : $15.79  (about 21% below the $19.99 base)
```

Session 391 puts that average at about 20% below base. For an indie app the question is whether a 20% discount at 50 seats still covers support, server cost and the commission. Do that math before you add bands. If your plans are already usage-based, see how a [custom billing engine can handle per-seat and usage pricing](https://www.iamtayyab.com/blog/custom-billing-engine-stripe-subscriptions) and compare it with what Apple now offers.

### 5. Move entitlement logic from "user" to "seat"

Your app should grant access from the transaction StoreKit gives each assigned member, not from who paid. The simplest approach is to keep using current entitlements:

```swift
// example: grant access from whatever entitlement this Apple Account holds
import StoreKit

func hasActiveSubscription(groupID: String) async -> Bool {
    for await result in Transaction.currentEntitlements {
        if case .verified(let tx) = result, tx.productID == groupID {
            return true
        }
    }
    return false
}
```

That works when each assigned member receives their own transaction, which is what Apple describes. Do not assume the person who purchased is the only one who needs access, and do not store a single "owner" flag on your server.

### 6. Pass the seat count when you build group purchases

For group purchases in your own UI, Apple says your app collects the seat count and passes it into the StoreKit 2 purchase request. StoreKit 2 has a quantity purchase option for this:

```swift
// example: buying more than one seat (verify against current StoreKit docs)
let result = try await product.purchase(options: [.quantity(seats)])
```

I have not tested this against the group purchase flow, because group purchases only reach the App Store this winter. Test it in the Sandbox Apple Account in November and read [the App Store Connect API page on configuring multi-seat subscriptions](https://developer.apple.com/documentation/appstoreconnectapi/configuring-multi-seat-subscriptions-for-organizations) before shipping.

### 7. Update your server and analytics

If your backend maps one App Store transaction to one user, you need to revisit it. With seats, the purchaser pays and members redeem. Dashboards that count "subscribers" will start undercounting users and overcounting accounts, or the opposite. Decide now what you call a customer. Campaign attribution has the same problem: a [campaign link](https://www.iamtayyab.com/blog/app-store-campaign-links-indie-attribution) credits one install, but one purchase may serve twenty people.

### 8. Write the team-plan page

Organizations buy through Apple, but they still need a page that tells an IT admin what they are buying: seats, what each seat gets, data handling, and where to get support. A short team-plan page also helps when a school asks how to roll the app out.

## Caveats and corrections

- **Dates and defaults are Apple's.** Everything here comes from Apple's October 22 news post, the App Store Connect help page and WWDC26 session 391. Apple's help page says group purchases "will be available for App Store customers later this year", while the news post says this winter. Treat both as "not yet live".
- **I could not read the API page.** The App Store Connect API page on configuring multi-seat subscriptions did not return its body when I fetched it, so I do not describe its endpoints. Check it yourself.
- **Server API details are thin.** Session 391 names group management endpoints but gives no paths or fields. Notification types, tax and proceeds handling for seats are not covered in the sources I used.
- **The example prices are Apple's illustration,** not benchmarks for your market.
- **Opt-out rules are subtle.** If a subscription is Family Sharing enabled or pre-dates September 14, 2026 without StoreKit 2, it is opted out by default. Check each product rather than assuming.

## Quick checklist

- [ ] Open every subscription in App Store Connect and note its multiseat and channel settings.
- [ ] Decide per product: multiseat on or off.
- [ ] Decide whether to sell in Apple Business and Apple School Manager.
- [ ] Check Family Sharing status before you change anything.
- [ ] Draft a per-seat price and, if useful, volume bands. Check margin at 10, 50 and 200 seats.
- [ ] Switch entitlement logic to per-transaction access, not per-purchaser.
- [ ] Test group purchases in your Sandbox Apple Account this month.
- [ ] Update analytics definitions for "customer" and "user".
- [ ] Publish a short team plan page.

## FAQ

### What are App Store multiseat subscriptions?

They let a customer buy an auto-renewable subscription in quantities greater than one. The buyer is the group purchaser, who manages the shared subscription and controls who has access, so a team, classroom or organization can share one purchase.

### Are multiseat subscriptions on by default for my app?

Per Apple's help page, multiseat purchasing is enabled by default in App Store Connect unless you previously changed the setting. Subscriptions created before September 14, 2026 that do not use StoreKit 2, or that have Family Sharing on, are opted out by default.

### Can I turn multiseat off?

Yes, with the Account Holder, Admin or App Manager role. New customers can then buy only one seat and the subscription leaves Apple Business and Apple School Manager. Existing subscriptions keep renewing, and the purchaser can remove seats but not add them.

### Do I need StoreKit 2?

Yes. WWDC26 session 391 says both group purchases and volume purchasing require StoreKit 2.

### How does volume pricing work?

Default pricing is per seat. Volume pricing supports up to five price bands with per-seat discounts. In Apple's example, $19.99 for seats 1 to 20, $13.99 for 21 to 40 and $10.99 from seat 41 averages about 20% below base at 50 seats.

### When can I test group purchases?

From November 2026 in your Sandbox Apple Account. Apple says group purchases reach the App Store this winter.

If you are building an app with team plans, or need help moving a billing setup to StoreKit 2, [get in touch](https://www.iamtayyab.com/full-stack-developer-pakistan).

## Sources

- [Apple Developer News, Oct 22, 2026: Offer your subscriptions to businesses and schools](https://developer.apple.com/news/)
- [App Store Connect Help: Manage purchase options for an auto-renewable subscription](https://developer.apple.com/help/app-store-connect/manage-subscriptions/manage-purchase-options-for-auto-renewable-subscriptions)
- [WWDC26 session 391: Offer subscriptions to groups and organizations](https://developer.apple.com/videos/play/wwdc2026/391/)
- [App Store Connect API: Configuring multi-seat subscriptions for organizations](https://developer.apple.com/documentation/appstoreconnectapi/configuring-multi-seat-subscriptions-for-organizations)
