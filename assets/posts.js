const POSTS = [
  {
    slug: "why-i-hunt-threats",
    title: "Why I Hunt Threats: The Mindset Behind the Search",
    date: "June 2025",
    readTime: 5,
    tags: ["threat-hunting", "career"],
    excerpt: "Threat hunting is fundamentally a thinking problem. Here's why I love it and how I approach it.",
    content: `
      <p>Most security work is reactive. An alert fires, you investigate, you respond. It's important work — but it happens <em>after</em> the attacker has already made a move.</p>
      <p>Threat hunting flips that model. You go looking before anything fires. You start with a hypothesis — if an attacker was staging for lateral movement in this environment, what would that look like? — and follow that thread through telemetry until the story either holds or falls apart.</p>
      <h2>The part that hooked me</h2>
      <p>Threat hunting rewards curiosity more than almost any other security discipline. You don't need an alert to start. You need a question.</p>
      <p>Some of the most interesting things I've found started with something completely unremarkable — a process running at an odd time, a parent-child relationship slightly off, a beacon interval a little too regular. The alert systems saw nothing. The pattern was there.</p>
      <h2>The mindset shift</h2>
      <p>Good hunting requires you to think like an attacker first. Before you can find the anomaly, you need to understand what "normal" looks like — and that means understanding what an attacker would change to blend in.</p>
      <p>That's why I spend time studying TTPs. Not to memorise MITRE ATT&CK IDs, but to understand the <em>why</em> behind attacker behaviour. If I understand why an attacker uses a technique, I can model what traces it leaves — and hunt for those traces even when the tooling changes.</p>
      <h2>Turning hunts into detections</h2>
      <p>The loop I care most about: you hunt, you find something, you build a detection. Now the threat you spent hours tracking manually fires automatically next time. The work compounds.</p>
      <p>That's what detection engineering means to me — it's not just writing SIEM rules, it's closing the loop on intelligence gathered in the field.</p>
      <p class="post-closing">Future posts will go deeper into specific hunts and the detection logic that came out of them. If any of this resonates, I'd love to hear from you.</p>
    `
  },
  {
    slug: "kql-detection-lsass",
    title: "Detection Engineering 101: Writing Your First KQL Hunt Query",
    date: "May 2025",
    readTime: 8,
    tags: ["detection-engineering", "threat-hunting"],
    excerpt: "A practical walkthrough of writing detection-grade KQL queries in Azure Sentinel — from hypothesis to firing alert.",
    content: `
      <p>KQL (Kusto Query Language) is the query language behind Azure Sentinel. If you're building detections in a Microsoft environment, you're going to live in KQL. Here's how I think about writing queries that actually catch things.</p>
      <h2>Start with the hypothesis, not the query</h2>
      <p>The biggest mistake I see in detection engineering is starting with the data. You open a table, start filtering, and end up with something technically correct but behaviourally meaningless.</p>
      <p>Instead, start here: <strong>what attacker behaviour am I trying to catch?</strong> Map it to a MITRE ATT&CK technique. Understand what traces it leaves. Then write the query.</p>
      <h2>Example: detecting LSASS memory access</h2>
      <p>Credential dumping via LSASS access (T1003.001) is one of the most common post-compromise techniques. Here's a baseline KQL query:</p>
      <pre><code>SecurityEvent
| where EventID == 4656
| where ObjectName has "lsass"
| where AccessMask in ("0x1010", "0x1410", "0x143A")
| project TimeGenerated, Account, ProcessName, ObjectName, AccessMask
| order by TimeGenerated desc</code></pre>
      <p>This catches process handle requests to lsass.exe with suspicious access masks commonly associated with credential dumping tools like Mimikatz.</p>
      <h2>Tuning: the unglamorous half</h2>
      <p>A detection that fires constantly is worse than no detection — it trains analysts to ignore it. Good tuning means understanding your environment's baseline and excluding legitimate behaviour before you ship the rule.</p>
      <p>Add exclusions carefully. Document every exclusion with a reason. Review quarterly. Attackers abuse legitimate tools precisely because defenders excluded them.</p>
      <h2>The test before you ship</h2>
      <p>Before any detection goes into production, ask: <em>can I generate a true positive to verify this fires?</em> Atomic Red Team is great for this — controlled, documented test procedures for hundreds of MITRE ATT&CK techniques. Use it.</p>
      <p class="post-closing">Next post: moving from single-event detections to multi-stage correlation rules that catch attack chains instead of individual techniques.</p>
    `
  }
];

function postCard(post) {
  return `
    <a href="post.html?slug=${post.slug}" class="post-card">
      <div class="post-card-inner">
        <div class="post-card-left">
          <div class="post-card-tags">${post.tags.map(t=>`<span class="filter-tag">${t.replace(/-/g,' ')}</span>`).join(' · ')}</div>
          <div class="post-card-title">${post.title}</div>
          <div class="post-card-excerpt">${post.excerpt}</div>
        </div>
        <div>
          <div class="post-card-meta">${post.date} · ${post.readTime} min</div>
          <div class="arrow-icon">→</div>
        </div>
      </div>
    </a>`;
}
