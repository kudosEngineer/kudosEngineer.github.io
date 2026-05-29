// ============================================================
//  POSTS.JS  —  Your blog's content database
//  To add a new post, copy the template at the bottom and
//  add it to the POSTS array. Newest post first.
// ============================================================

const POSTS = [

  {
    slug: "why-i-hunt-threats",
    title: "Why I Hunt Threats: The Mindset Behind the Search",
    date: "June 2025",
    readTime: 5,
    tags: ["threat-hunting", "career"],
    excerpt: "Threat hunting is fundamentally a thinking problem. Here's why I love it and how I approach it.",
    content: `
      <p>
        Most security work is reactive. An alert fires, you investigate, you respond. It's important work —
        but it's work that happens <em>after</em> the attacker has already made a move.
      </p>
      <p>
        Threat hunting flips that model. You go looking before anything fires. You start with a hypothesis —
        "if an attacker was staging for lateral movement in this environment, what would that look like?" —
        and you follow that thread through telemetry until the story either holds or falls apart.
      </p>

      <h2>The part I love</h2>
      <p>
        The thing that hooked me is that threat hunting rewards curiosity more than almost any other security discipline.
        You don't need an alert to start. You need a question.
      </p>
      <p>
        Some of the most interesting things I've found started with something that looked completely unremarkable —
        a process running at an odd time, a parent-child relationship that was slightly off, a beacon interval
        that was a little too regular. The alert systems saw nothing. But the pattern was there.
      </p>

      <h2>The mindset shift</h2>
      <p>
        Good hunting requires you to think like an attacker first. Before you can find the anomaly, you need to
        understand what "normal" looks like — and that means understanding what an attacker would change to blend in.
      </p>
      <p>
        That's why I spend time studying TTPs. Not to memorise MITRE ATT&CK IDs, but to understand the
        <em>why</em> behind attacker behaviour. If I understand why an attacker uses a technique, I can model
        what traces it leaves — and I can hunt for those traces even when the tooling changes.
      </p>

      <h2>Turning hunts into detections</h2>
      <p>
        The loop I care most about: you hunt, you find something, you build a detection. Now the threat you
        spent hours tracking manually fires automatically next time. The work compounds.
      </p>
      <p>
        That's what detection engineering means to me — it's not just writing SIEM rules, it's closing the loop
        on intelligence you've gathered in the field.
      </p>

      <p class="post-closing">
        Future posts will go deeper into specific hunts and the detection logic that came out of them.
        If any of this resonates, I'd love to hear from you.
      </p>
    `
  },

  {
    slug: "detection-engineering-kql-basics",
    title: "Detection Engineering 101: Writing Your First KQL Hunt Query",
    date: "May 2025",
    readTime: 8,
    tags: ["detection-engineering", "threat-hunting"],
    excerpt: "A practical walkthrough of writing detection-grade KQL queries in Azure Sentinel — from hypothesis to firing alert.",
    content: `
      <p>
        KQL (Kusto Query Language) is the query language behind Azure Sentinel (now Microsoft Sentinel).
        If you're building detections in a Microsoft environment, you're going to live in KQL.
        Here's how I think about writing queries that actually catch things.
      </p>

      <h2>Start with the hypothesis, not the query</h2>
      <p>
        The biggest mistake I see in detection engineering is starting with the data. You open a table,
        you start filtering, and you end up with something technically correct but behaviourally meaningless.
      </p>
      <p>
        Instead, start here: <strong>what attacker behaviour am I trying to catch?</strong> Map it to a
        MITRE ATT&CK technique. Understand what traces it leaves. Then write the query.
      </p>

      <h2>Example: Detecting LSASS memory access</h2>
      <p>Credential dumping via LSASS access (T1003.001) is one of the most common post-compromise techniques.
      Here's a simple baseline KQL query:</p>

      <pre><code>SecurityEvent
| where EventID == 4656
| where ObjectName has "lsass"
| where AccessMask in ("0x1010", "0x1410", "0x143A")
| project TimeGenerated, Account, ProcessName, ObjectName, AccessMask
| order by TimeGenerated desc</code></pre>

      <p>This catches process handle requests to lsass.exe with suspicious access masks commonly
      associated with credential dumping tools like Mimikatz.</p>

      <h2>Tuning: the unglamorous half of the job</h2>
      <p>
        A detection that fires constantly is worse than no detection — it trains analysts to ignore it.
        Good tuning is about understanding your environment's baseline and excluding legitimate behaviour
        before you ship the rule.
      </p>
      <p>
        Add exclusions carefully. Document every exclusion with a reason. Review them quarterly.
        Attackers have learned to abuse legitimate tools precisely because defenders excluded them.
      </p>

      <h2>The test before you ship</h2>
      <p>
        Before any detection goes into production, I ask: <em>can I generate a true positive to verify this fires?</em>
        Atomic Red Team is great for this — it gives you controlled, documented test procedures for
        hundreds of MITRE ATT&CK techniques. Use it.
      </p>

      <p class="post-closing">
        Next post: moving from single-event detections to multi-stage correlation rules that catch
        attack chains instead of individual techniques.
      </p>
    `
  }

];

// ============================================================
//  postCard() — renders a post preview card
//  Used by index.html and blog.html
// ============================================================
function postCard(post) {
  return `
    <a href="post.html?slug=${post.slug}" class="post-card">
      <div class="post-card-tags">${post.tags.map(t => `<span class="tag tag-sm">${t}</span>`).join('')}</div>
      <h3 class="post-card-title">${post.title}</h3>
      <p class="post-card-excerpt">${post.excerpt}</p>
      <div class="post-card-meta">
        <span>${post.date}</span>
        <span>${post.readTime} min read</span>
      </div>
    </a>
  `;
}

// ============================================================
//  HOW TO ADD A NEW POST:
//
//  1. Copy this template and add it to the top of POSTS array:
//
//  {
//    slug: "your-post-slug",          // URL-friendly, no spaces
//    title: "Your Post Title",
//    date: "Month YYYY",
//    readTime: 5,                      // estimated minutes
//    tags: ["threat-hunting"],         // from: threat-hunting,
//                                      // detection-engineering,
//                                      // incident-response,
//                                      // tools, career
//    excerpt: "One sentence summary shown on blog listing.",
//    content: `
//      <p>Your post content here. HTML is supported.</p>
//      <h2>Section heading</h2>
//      <p>More content...</p>
//      <pre><code>code blocks like this</code></pre>
//    `
//  },
//
//  2. Save the file. Done. The post appears automatically.
// ============================================================
