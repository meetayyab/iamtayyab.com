---
title: "Node.js Security Release Checklist: 16 CVEs, Three LTS Lines"
slug: "nodejs-security-release-checklist-november-2026"
excerpt: "Node shipped fixes for 16 CVEs on November 11 and offered no workaround for a single one of them. Which of the 16 apply to you depends on the line you run — here is how to tell."
seoTitle: "Node.js Security Release Checklist: 16 CVEs"
seoDescription: "A Node.js security release checklist for November 11, 2026: 16 CVEs across v22.23.5, v24.22.3 and v26.13.1, which ones apply to your line, and what to audit."
tags: ["Node.js", "Security", "DevOps"]
cover:
  query: "network server cables patch panel"
  alt: "Blue network cables fanning out across a dark rack-mounted patch panel. Photo by Scott Rodgerson on Unsplash."
sources:
  - title: "Node.js: Wednesday, November 11, 2026 Security Releases"
    url: "https://nodejs.org/en/blog/vulnerability/november-2026-security-releases"
  - title: "Node.js 22.23.5 (LTS) release notes"
    url: "https://nodejs.org/en/blog/release/v22.23.5"
  - title: "Node.js 24.22.3 (LTS) release notes"
    url: "https://nodejs.org/en/blog/release/v24.22.3"
  - title: "Node.js 26.13.1 (LTS) release notes"
    url: "https://nodejs.org/en/blog/release/v26.13.1"
  - title: "nodejs/release: Node.js release schedule"
    url: "https://github.com/nodejs/release"
---

On 11 November 2026 the Node.js project shipped [security releases fixing 16 CVEs](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) — seven high, six medium and three low — across three supported lines: **v22.23.5**, **v24.22.3** and **v26.13.1**. This Node.js security release checklist walks through which of the 16 actually reach your app, because the honest answer for most small backends is "about four of them", and the four depend on whether you terminate TLS in Node, serve files over HTTP/2, or configure per-host client certificates. The advisory lists **no workaround for any of the 16**. Upgrading is the mitigation, which makes the interesting work not patching but figuring out what to audit afterwards.

## What changed on 11 November 2026

Three releases landed the same day, all tagged LTS: [22.23.5 'Jod'](https://nodejs.org/en/blog/release/v22.23.5), [24.22.3 'Krypton'](https://nodejs.org/en/blog/release/v24.22.3) and [26.13.1 'Lithium'](https://nodejs.org/en/blog/release/v26.13.1). The umbrella advisory groups the 16 CVEs by severity but does not map them to versions, so the per-release notes are where you find out what applies to you.

The seven high-severity issues cluster into three families. The first is **memory disclosure to the network**. [CVE-2026-123864](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) is the one to read first: a zero-length TLS write re-enters the HTTP parser, causing a use-after-free whose freed heap memory ends up **inside HTTPS response bodies**. That is the worst shape a bug can take for a multi-tenant backend — not a crash you notice, but someone else's bytes quietly appended to a response. The advisory is explicit that cleartext `node:http` is not affected, so this is specifically about TLS terminated inside Node. CVE-2026-123866 is its HTTP/2 sibling: tearing down a backpressured stream frees memory that is then sent to the peer.

The second family is **remote crashes**. CVE-2026-123863 lets a client trigger a failed internal assertion during HTTP/2 session teardown and abort the process — the advisory calls it a variant of an earlier 2024 issue. CVE-2026-126051 kills a TLS server when a socket is destroyed before a deferred callback runs, which matters only if you use `SNICallback`, `OCSPRequest`, `newSession`, `resumeSession` or `server.addContext()`. CVE-2026-123865 leaks memory *and file descriptors* when an HTTP/2 session hits a protocol error during shutdown, and the advisory notes it is an incomplete fix of a previous CVE — the kind of detail that argues for patching rather than hand-rolling a mitigation.

The third family is the most interesting and the least discussed: **authentication carried somewhere it should not go**. CVE-2026-123872 lets a client change the servername during TLS 1.2 renegotiation and carry existing client-certificate authentication over to a stricter virtual host. The 22.23.5 notes list it three separate times — once each for mTLS resumption, for renegotiation with HelloRetryRequest and SNI, and for resumption with SNI — which tells you it was a family of related holes in one mechanism rather than a single slip.

## Where things stand across the release lines

Before you patch, check that the line you are on still exists. Per the [Node.js release schedule](https://github.com/nodejs/release), as of today three lines are supported: **22 'Jod'** and **24 'Krypton'** are both in Maintenance LTS, and **26 'Lithium'** became Active LTS on 28 October 2026. Maintenance, in the project's own words, covers "Critical bug fixes and security updates" — so a Maintenance line is a perfectly fine place to be for another year or two. Node 22 runs to 30 April 2027; Node 24 to 30 April 2028; Node 26 to 30 April 2029.

Node 20 'Iron' is the line to worry about. The schedule lists it under End-of-Life Releases with an end-of-life date of **30 April 2026**, more than six months before this release. It is not among the three patched versions. You will see it claimed that Node 20 "received no patch" in this release; the advisory never mentions Node 20 at all, which amounts to the same practical outcome by a different route. What the advisory does say, and it is the line worth quoting to anyone still on an old runtime, is that [End-of-Life versions are always affected when a security release occurs](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases).

Node 25 is also gone — it reached end-of-life on 1 June 2026, which is the normal fate of an odd-numbered line. If you are on 20, 21, 23 or 25, none of the 16 fixes reach you and no future ones will either. That is an upgrade project, not a patch.

## Your Node.js security release checklist

The point of this Node.js security release checklist is to separate "upgrade" from "audit". Upgrading takes ten minutes. The audit is what stops you repeating the same exposure next quarter.

### 1. Work out which line you are on, and whether it is patched

Check the runtime that actually serves production, not the one on your laptop. Container base images are where this goes wrong most often: a `node:22-alpine` tag pulled six months ago is not 22.23.5.

```bash
## example: what is actually running
node -v                                  # local
docker run --rm node:22-alpine node -v   # what your base image resolves to today
grep -rn '"node"' package.json           # the engines field you promised
```

If that prints anything below 22.23.5, 24.22.3 or 26.13.1 — or anything starting with 20, 21, 23 or 25 — you are running unpatched code.

### 2. Upgrade to the right patch for your line

Stay on your major version; these are patch releases, so there is no migration cost. The only decision is whether you also want to move off a Maintenance line, and that is a separate, unhurried conversation.

```bash
## example: upgrade in place, then pin it in your image
nvm install 22.23.5 && nvm alias default 22.23.5   ## or 24.22.3 / 26.13.1
## Dockerfile: FROM node:22.23.5-alpine   (not the floating node:22-alpine tag)
```

Floating tags feel convenient until a rebuild silently changes your runtime. Pinning the patch and bumping it deliberately is the same discipline that makes dependency compromises survivable, which I have argued at more length in the [Plugin4Shell write-up on coding-agent supply chains](https://www.iamtayyab.com/blog/plugin4shell-ai-coding-agent-security).

### 3. Decide whether the HTTPS heap leak reaches you

CVE-2026-123864 only applies if **Node itself terminates TLS**. Many small deployments do not: if nginx, Caddy, a cloud load balancer or a platform like Vercel or Fly terminates TLS and talks to your process over plaintext HTTP on localhost, the [advisory's "cleartext `node:http` is not affected"](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) covers you for this specific bug.

You are exposed if you call `https.createServer()` with a key and certificate, or use `tls.createServer()` directly. That is common in two places people forget: webhook receivers that need mutual TLS, and internal service-to-service APIs. If you run a payments webhook endpoint with its own certificate — the kind of surface I described when writing about [building a custom billing engine on Node and Postgres](https://www.iamtayyab.com/blog/custom-billing-engine-stripe-subscriptions) — that endpoint terminates TLS in Node and is in scope.

Because the symptom is foreign bytes in a response body rather than an error, there is no log line to grep for. This is the one where "we upgraded" has to be the answer.

### 4. Audit your HTTP/2 file-serving paths

Two of the 16 have a precondition narrow enough to check in a minute: CVE-2026-123874 (a stream freed while a write is queued, then dereferenced) and CVE-2026-123875 (a client cancellation leaving a NULL pointer to dereference, crashing the process) both require your app to serve files with `respondWithFile()` or `respondWithFD()`.

```bash
## example: do we use the affected HTTP/2 file APIs at all?
grep -rn "respondWithFile\|respondWithFD\|createSecureServer" src/
```

No hits means those two do not apply. Worth noting that CVE-2026-123874 is exploitable over both TLS and cleartext, so moving TLS to a proxy does not help here the way it does for the issue above.

### 5. Check per-host mTLS and the `ca: []` trap

Two medium issues quietly weaken trust boundaries, and both are easy to get wrong in ordinary code.

CVE-2026-123867: when you register an SNI context with only a `ca` — `server.addContext(host, { ca })` — it can fall back to the default client CA, bypassing the per-host mutual TLS you thought you had configured. If you use `addContext()` to enforce different client certificate authorities per hostname, verify that behaviour after upgrading rather than assuming it.

CVE-2026-123877 is the subtler one. In `https.Agent`, omitting `ca` and passing `ca: []` produced the same session-cache key, so a TLS session negotiated under the broader default policy could be reused for a request that meant to pin a narrow one.

```javascript
// example: these two are NOT equivalent, and used to share a cache key
const strict = new https.Agent({ ca: [myPinnedCa] });  // intended
const broken = new https.Agent({ ca: [] });            // empty != "no ca"
```

If you wrote `ca: []` anywhere expecting "trust nothing", that was never what it meant. Treat it as a bug in your code as well as in Node.

### 6. Grep for proxy URLs with credentials

CVE-2026-123871 prints proxy credentials verbatim in `ERR_PROXY_INVALID_CONFIG` error messages — in four of them, and the advisory notes this is an incomplete fix of an earlier CVE on the same theme. If your `HTTPS_PROXY` or `HTTP_PROXY` contains a username and password, those strings may already be sitting in logs, error trackers and CI output from before you upgraded.

```bash
## example: find credentials in proxy config, then rotate them
env | grep -iE '^(http|https|all)_proxy=' | grep '@'
```

Upgrading stops the leak going forward. It does not clean up what has already been written, so if you find a match, rotate the credential and then go looking in your log retention. This is the same post-incident habit I covered in the [hardening checklist for small SaaS and app backends](https://www.iamtayyab.com/blog/ai-agent-hacking-small-saas-hardening-checklist): assume anything printed into a log has been read.

### 7. Re-check Permission Model wildcards

Two low-severity issues touch the Permission Model, which is still young enough that few small teams rely on it. CVE-2026-106071 is a wildcard over-grant: `--allow-fs-read=/etc/passwd.*` also granted `/etc/passwd`, but only when the wildcard sits directly under the root of the permission tree. CVE-2026-123829 leaks the names — not contents — of denied descendant files through recursive `fs.watch()` callbacks on macOS and Windows.

If you run with `--allow-fs-read` or `--allow-fs-write`, re-read your flags for wildcards near the tree root. If you do not use the Permission Model, these two are noise for you.

## Caveats and corrections

**The advisory and the release notes do not list the same 16 CVEs.** This is worth knowing if you are reconciling a scanner's output against the announcement. The umbrella advisory's three low-severity entries are CVE-2026-123829, CVE-2026-123862 and CVE-2026-106071. The per-release notes for [22.23.5](https://nodejs.org/en/blog/release/v22.23.5), [24.22.3](https://nodejs.org/en/blog/release/v24.22.3) and [26.13.1](https://nodejs.org/en/blog/release/v26.13.1) instead list CVE-2026-123873 among their lows and do not surface CVE-2026-106071 by id. The fix for the wildcard over-grant does appear in all three commit lists as "src: fix the fs permission tree node on wildcard nodes" — it simply is not labelled with its CVE in the notable changes. So both documents describe 16 issues; they disagree on which two of the lows to name.

**Node 22 gets 15 of the 16, not all of them.** CVE-2026-126051, the deferred-callback TLS server crash, appears on the 24 and 26 release notes but not on 22.23.5. If you are on Node 22 and your scanner flags 126051, check the version mapping before chasing it.

**The dependency bumps differ by line, which matters for transitive CVE scanning.** All three lines move llhttp to 9.4.4 and sqlite to 3.54.1. Only 24 and 26 bump brotli to 1.2.1. Undici is not bumped on 22 at all; 24 goes to 7.30.2 and 26 to 8.12.4 — a major version apart. If you have pinned expectations about the bundled undici, read your line's notes rather than the umbrella.

**On "Node 20 received no patch":** that phrasing circulated widely, but it is an inference rather than a quote. The advisory does not mention Node 20; the [release schedule](https://github.com/nodejs/release) is what establishes that Node 20 hit end-of-life on 30 April 2026. The schedule also does not spell out what end-of-life means for security patches. The conclusion is sound, the citation just belongs to a different document.

**No workarounds exist.** [The advisory](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) offers none for any of the 16 and says only to "use an up-to-date version as outlined in our Release Schedule." If you cannot upgrade this week, you are accepting risk rather than mitigating it, and the audit steps above are about scoping that risk honestly, not neutralising it.

## Quick checklist

- [ ] Print the Node version your production container actually runs, not your local one.
- [ ] Upgrade to 22.23.5, 24.22.3 or 26.13.1 and pin the patch in your Dockerfile.
- [ ] If you are on 20, 21, 23 or 25, schedule a major upgrade — no fixes are coming.
- [ ] Determine whether Node terminates TLS in production, or a proxy does.
- [ ] Grep for `respondWithFile`, `respondWithFD` and `createSecureServer`.
- [ ] Re-verify per-host mTLS if you use `server.addContext()` with a `ca`.
- [ ] Replace any `ca: []` in an `https.Agent` with the certificate you actually meant.
- [ ] Check proxy env vars for embedded credentials; rotate and scrub logs if found.
- [ ] Review `--allow-fs-read` / `--allow-fs-write` wildcards near the tree root.
- [ ] Re-run your dependency scanner after upgrading and reconcile against your line's notes.

## FAQ

### Which Node.js version should I upgrade to?

Stay on your major line and take its patch: 22.23.5 if you are on Node 22, 24.22.3 on Node 24, or 26.13.1 on Node 26. All three are LTS and all three carry the fixes. There is no need to jump majors to get patched — Node 22 is supported until 30 April 2027 and Node 24 until 30 April 2028, per the [release schedule](https://github.com/nodejs/release). Only move majors if you were planning to anyway.

### Am I affected if nginx or a load balancer terminates TLS?

For CVE-2026-123864, the HTTPS heap-disclosure issue, no: [the advisory](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) states cleartext `node:http` is not affected, and a proxy fronting a plaintext localhost listener is exactly that shape. You are still affected by the HTTP/2 issues if your Node process speaks HTTP/2 itself, and CVE-2026-123874 is explicitly exploitable over cleartext as well as TLS. Terminating TLS elsewhere narrows your exposure considerably but does not eliminate it.

### Does Node.js 20 get a patch for these CVEs?

No. Node 20 reached end-of-life on 30 April 2026 according to the [release schedule](https://github.com/nodejs/release), and it is not among the three versions released on 11 November. The [advisory's position](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) is blunter than that: "End-of-Life versions are always affected when a security release occurs." If you are still on 20, the fix is a major upgrade to 22, 24 or 26.

### How do I tell which of the 16 CVEs apply to my app?

Start with preconditions rather than severity. Most of the 16 require a specific API: `respondWithFile()`/`respondWithFD()` for two of the HTTP/2 issues, `server.addContext()` or `SNICallback` for the TLS context issues, an `https.Agent` with a `ca` for the session-cache collision, a credential-bearing proxy URL for the error-message leak, and `--allow-fs-*` flags for the Permission Model pair. Grep for those symbols first; whatever you do not call cannot reach you. Then check whether Node terminates TLS, which decides the highest-severity one.

### Is there a workaround if I cannot upgrade immediately?

Not a published one. The advisory lists no mitigations for any of the 16 and points only at upgrading. You can reduce exposure by moving TLS termination behind a proxy, avoiding the HTTP/2 file-serving APIs and removing credentials from proxy URLs, but treat those as risk reduction while an upgrade is scheduled, not as a fix.

### Why does my scanner report a CVE that is not in the advisory?

Probably CVE-2026-123873, which appears in the per-release notes but not in the umbrella advisory's severity tables, or CVE-2026-106071, which appears in the advisory but is not named by id in the release notes. Both documents cover 16 issues and disagree on which two low-severity ones to name. Reconcile against your specific line's release notes rather than the umbrella.

A Node upgrade like this is the cheapest security work you will do this quarter, and the audit around it is worth more than the patch: knowing whether you terminate TLS in-process, which HTTP/2 APIs you touch and what your proxy URLs contain is the same inventory that makes the next advisory a ten-minute read instead of a day of guessing. If you are building out that inventory for the first time, the [hardening checklist for small backends](https://www.iamtayyab.com/blog/ai-agent-hacking-small-saas-hardening-checklist) is a reasonable place to start.

## Sources

- [Node.js: Wednesday, November 11, 2026 Security Releases](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases)
- [Node.js 22.23.5 (LTS) release notes](https://nodejs.org/en/blog/release/v22.23.5)
- [Node.js 24.22.3 (LTS) release notes](https://nodejs.org/en/blog/release/v24.22.3)
- [Node.js 26.13.1 (LTS) release notes](https://nodejs.org/en/blog/release/v26.13.1)
- [nodejs/release: Node.js release schedule and end-of-life dates](https://github.com/nodejs/release)
