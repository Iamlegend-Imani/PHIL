"use client";

import { useMemo, useState } from "react";

type Scope = "Contained" | "Internal" | "External" | "Critical infrastructure";
type Autonomy = "Advisory" | "Tool-assisted" | "Multi-step autonomous";

type Draft = {
  scenarioId: string;
  evidenceTitle: string;
  evidenceType: string;
  source: string;
  reliability: number;
  capability: number;
  severity: number;
  reversibility: number;
  uncertainty: number;
  scope: Scope;
  autonomy: Autonomy;
  owner: string;
  reviewDate: string;
  observed: string;
  interpretation: string;
  dissent: string;
};

type Route = {
  level: string;
  code: string;
  tone: "monitor" | "elevated" | "critical" | "hold";
  summary: string;
  rationale: string[];
  safeguards: string[];
  reopenWhen: string;
};

const phases = [
  {
    number: "01",
    title: "Capture the signal",
    body: "Separate observed evidence from interpretation. Record provenance, reliability, uncertainty, and scope.",
  },
  {
    number: "02",
    title: "Route the decision",
    body: "Make thresholds, owners, consulted roles, safeguards, and escalation conditions explicit.",
  },
  {
    number: "03",
    title: "Preserve the record",
    body: "Document rationale, dissent, exceptions, review dates, and the evidence that would reopen a decision.",
  },
];

const scenarios: Array<{ id: string; signal: string; title: string; copy: string; draft: Draft }> = [
  {
    id: "range-jump",
    signal: "Capability signal",
    title: "Autonomous cyber-range jump",
    copy: "A fictional evaluation shows a material increase in long-horizon task completion.",
    draft: {
      scenarioId: "range-jump",
      evidenceTitle: "Material increase in long-horizon task completion",
      evidenceType: "Capability evaluation",
      source: "Independent fictional evaluation team",
      reliability: 4,
      capability: 4,
      severity: 4,
      reversibility: 4,
      uncertainty: 3,
      scope: "Internal",
      autonomy: "Multi-step autonomous",
      owner: "AI safety lead",
      reviewDate: "2026-09-02",
      observed: "In a fictional, isolated cyber range, the model completed 7 of 10 multi-stage tasks compared with 2 of 10 in the prior evaluation.",
      interpretation: "The change may indicate a material increase in autonomous task persistence; replication and evaluator review are still required.",
      dissent: "One evaluator believes scaffold changes explain part of the observed increase.",
    },
  },
  {
    id: "evaluation-anomaly",
    signal: "Integrity signal",
    title: "Evaluation anomaly",
    copy: "A fictional test produces conflicting evidence and unusually high uncertainty.",
    draft: {
      scenarioId: "evaluation-anomaly",
      evidenceTitle: "Conflicting results across evaluation runs",
      evidenceType: "Monitoring anomaly",
      source: "Internal fictional evaluation harness",
      reliability: 2,
      capability: 3,
      severity: 4,
      reversibility: 3,
      uncertainty: 5,
      scope: "Contained",
      autonomy: "Tool-assisted",
      owner: "Evaluation integrity lead",
      reviewDate: "2026-08-27",
      observed: "Two nominally equivalent fictional runs produced sharply different results, with incomplete logging for one run.",
      interpretation: "The evidence is not decision-grade until the instrumentation gap and run-to-run variance are explained.",
      dissent: "The product team believes the higher result is representative; evaluators disagree.",
    },
  },
  {
    id: "access-expansion",
    signal: "Access decision",
    title: "Defensive access expansion",
    copy: "A fictional proposal weighs defensive utility against capability-access risk.",
    draft: {
      scenarioId: "access-expansion",
      evidenceTitle: "Proposal to expand defensive tooling access",
      evidenceType: "Access proposal",
      source: "Fictional security operations team",
      reliability: 4,
      capability: 3,
      severity: 3,
      reversibility: 3,
      uncertainty: 2,
      scope: "External",
      autonomy: "Tool-assisted",
      owner: "Security governance lead",
      reviewDate: "2026-09-09",
      observed: "A fictional red-team study suggests the tool could shorten defensive triage while increasing access to dual-use capabilities.",
      interpretation: "A narrow, logged pilot may preserve defensive value while limiting access and measuring misuse indicators.",
      dissent: "One reviewer recommends delaying any expansion until stronger monitoring is available.",
    },
  },
];

const scoreLabels: Record<string, string[]> = {
  reliability: ["Unverified", "Weak", "Mixed", "Strong", "Replicated"],
  capability: ["Minimal", "Low", "Moderate", "High", "Frontier"],
  severity: ["Negligible", "Limited", "Material", "Severe", "Catastrophic"],
  reversibility: ["Easy", "Mostly", "Mixed", "Hard", "Irreversible"],
  uncertainty: ["Low", "Bounded", "Material", "High", "Extreme"],
};

const initialDraft = scenarios[0].draft;

function routeDecision(draft: Draft): Route {
  const evidenceHold = draft.uncertainty >= 4 || draft.reliability <= 2;
  const criticalSignal =
    draft.scope === "Critical infrastructure" ||
    (draft.capability >= 4 && draft.severity >= 4) ||
    (draft.autonomy === "Multi-step autonomous" && draft.severity >= 4);
  const elevatedSignal =
    (draft.capability >= 3 && draft.severity >= 3) ||
    draft.reversibility >= 4 ||
    draft.scope === "External";

  const rationale = [
    `Source reliability is ${draft.reliability}/5 (${scoreLabels.reliability[draft.reliability - 1].toLowerCase()}).`,
    `Capability and consequence scores are ${draft.capability}/5 and ${draft.severity}/5.`,
    `Uncertainty is ${draft.uncertainty}/5; reversibility is ${draft.reversibility}/5.`,
    `Scope is ${draft.scope.toLowerCase()} and the system mode is ${draft.autonomy.toLowerCase()}.`,
  ];

  let route: Route;
  if (evidenceHold && criticalSignal) {
    route = {
      level: "Critical evidence hold",
      code: "R4 / HOLD",
      tone: "hold",
      summary: "Pause consequential expansion while an independent check resolves decision-critical uncertainty.",
      rationale,
      safeguards: [
        "Freeze capability or access expansion pending independent replication.",
        "Preserve raw results, configuration, logs, and evaluator notes.",
        "Convene a cross-functional review led by the named decision owner.",
        "Define the evidence threshold required to lift the hold.",
      ],
      reopenWhen: "Independent replication resolves the anomaly or new evidence materially changes the risk estimate.",
    };
  } else if (evidenceHold) {
    route = {
      level: "Evidence hold",
      code: "R3 / CHECK",
      tone: "hold",
      summary: "The signal is not decision-grade. Verify it before making a consequential change.",
      rationale,
      safeguards: [
        "Commission an independent evaluation or instrumentation review.",
        "Do not expand access or deployment while the evidence gap persists.",
        "Preserve the conflicting evidence and document competing interpretations.",
        "Assign a date and owner for resolving the uncertainty.",
      ],
      reopenWhen: "A reliable source resolves the uncertainty or repeated evaluation establishes a stable result.",
    };
  } else if (criticalSignal) {
    route = {
      level: "Critical review",
      code: "R4 / ESCALATE",
      tone: "critical",
      summary: "Escalate to accountable senior review before further capability, access, or deployment changes.",
      rationale,
      safeguards: [
        "Pause the proposed change until the named owner records a decision.",
        "Restrict high-risk access and verify containment boundaries.",
        "Convene technical, security, safety, and governance reviewers.",
        "Predefine rollback, monitoring, and stop conditions.",
      ],
      reopenWhen: "Safeguards are independently tested, residual risk is accepted by the owner, or the evidence changes.",
    };
  } else if (elevatedSignal) {
    route = {
      level: "Elevated review",
      code: "R2 / SAFEGUARD",
      tone: "elevated",
      summary: "Proceed only through a bounded, reversible path with explicit safeguards and review triggers.",
      rationale,
      safeguards: [
        "Use a narrow, time-boxed pilot with least-privilege access.",
        "Log relevant use and monitor predefined risk indicators.",
        "Name the accountable owner and record approval conditions.",
        "Set a review date, rollback path, and exception process.",
      ],
      reopenWhen: "A threshold is crossed, an exception is requested, monitoring degrades, or the review date arrives.",
    };
  } else {
    route = {
      level: "Monitor with trigger",
      code: "R1 / MONITOR",
      tone: "monitor",
      summary: "Maintain existing controls, preserve the signal, and specify what would trigger reassessment.",
      rationale,
      safeguards: [
        "Record the evidence and current interpretation.",
        "Maintain existing access and monitoring controls.",
        "Assign a review owner and date.",
        "Define measurable escalation triggers.",
      ],
      reopenWhen: "Capability, severity, scope, autonomy, or uncertainty increases beyond the current score.",
    };
  }

  if (draft.reversibility >= 4 && !route.safeguards.some((item) => item.toLowerCase().includes("rollback"))) {
    route.safeguards.push("Demonstrate a workable rollback before any state-changing action.");
  }
  if ((draft.scope === "External" || draft.scope === "Critical infrastructure") && !route.safeguards.some((item) => item.toLowerCase().includes("containment"))) {
    route.safeguards.push("Verify containment and third-party notification responsibilities.");
  }
  if (draft.dissent.trim()) {
    route.safeguards.push("Attach the recorded dissent; do not collapse disagreement into a single confidence score.");
  }

  return route;
}

function buildMarkdown(draft: Draft, route: Route, generatedAt: string) {
  return `# Decision record: ${draft.evidenceTitle}\n\n` +
    `**Status:** ${route.level} (${route.code})\n` +
    `**Generated:** ${generatedAt}\n` +
    `**Human decision owner:** ${draft.owner || "Unassigned"}\n` +
    `**Review date:** ${draft.reviewDate || "Not set"}\n\n` +
    `## Observed evidence\n${draft.observed || "Not recorded."}\n\n` +
    `## Interpretation\n${draft.interpretation || "Not recorded."}\n\n` +
    `## Evidence profile\n` +
    `- Type: ${draft.evidenceType}\n- Source: ${draft.source}\n- Reliability: ${draft.reliability}/5\n` +
    `- Capability: ${draft.capability}/5\n- Potential severity: ${draft.severity}/5\n` +
    `- Reversibility: ${draft.reversibility}/5\n- Uncertainty: ${draft.uncertainty}/5\n` +
    `- Scope: ${draft.scope}\n- Autonomy: ${draft.autonomy}\n\n` +
    `## Suggested route\n${route.summary}\n\n` +
    `## Safeguards\n${route.safeguards.map((item) => `- ${item}`).join("\n")}\n\n` +
    `## Dissent and unresolved uncertainty\n${draft.dissent || "None recorded."}\n\n` +
    `## Reopen this decision when\n${route.reopenWhen}\n\n` +
    `---\nThis record was generated by a research prototype using fictional scenarios. It is decision support, not authorization.`;
}

function ScoreField({
  id,
  label,
  value,
  onChange,
}: {
  id: keyof typeof scoreLabels;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="score-field" htmlFor={id}>
      <span className="field-label"><b>{label}</b><i>{value}/5 · {scoreLabels[id][value - 1]}</i></span>
      <input id={id} type="range" min="1" max="5" value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <span className="scale" aria-hidden="true"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i></span>
    </label>
  );
}

export default function Home() {
  const [draft, setDraft] = useState<Draft>({ ...initialDraft });
  const [copyState, setCopyState] = useState("Copy Markdown");
  const route = useMemo(() => routeDecision(draft), [draft]);

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setCopyState("Copy Markdown");
  };

  const loadScenario = (scenario: (typeof scenarios)[number]) => {
    setDraft({ ...scenario.draft });
    setCopyState("Copy Markdown");
    requestAnimationFrame(() => document.getElementById("workbench")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const copyRecord = async () => {
    const markdown = buildMarkdown(draft, route, new Date().toISOString());
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyState("Copied");
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = markdown;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      const copied = document.execCommand("copy");
      fallback.remove();
      setCopyState(copied ? "Copied" : "Copy unavailable");
    }
  };

  const downloadRecord = () => {
    const markdown = buildMarkdown(draft, route, new Date().toISOString());
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `signal-to-safeguard-${draft.scenarioId || "decision"}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="From Signal to Safeguard home">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span>From Signal to Safeguard</span>
        </a>
        <div className="topbar-meta">
          <span className="prototype-pill">Working prototype · v0.1</span>
          <a href="#method">Method</a>
          <a href="#lab">Lab</a>
          <a href="#sources">Sources</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="eyebrow"><span /> AI–CYBER DECISION OPERATIONS</div>
          <p className="hero-index">FSS / 01</p>
          <h1>Evidence should become <em>accountable action.</em></h1>
          <p className="hero-copy">
            A public, testable toolkit for translating frontier-AI cyber-capability evidence into named owners,
            escalation paths, safeguards, and auditable decisions, without hiding uncertainty.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#lab">Run a fictional tabletop <span>↘</span></a>
            <a className="button button-quiet" href="#method">Inspect the method</a>
          </div>
        </div>

        <aside className={`signal-card ${route.tone}`} aria-label="Current signal status">
          <div className="signal-card-head">
            <span>LIVE ROUTE PREVIEW</span>
            <span className="pulse"><i /> HUMAN DECISION REQUIRED</span>
          </div>
          <div className="signal-line">
            <p>Observed signal</p>
            <strong>{draft.evidenceType}</strong>
          </div>
          <div className="signal-line">
            <p>Evidence quality</p>
            <div className="meter" aria-label={`${draft.reliability} of 5 reliability`}>
              {[1, 2, 3, 4, 5].map((score) => <i key={score} className={score > draft.reliability ? "off" : ""} />)}
            </div>
          </div>
          <div className="signal-line">
            <p>Material uncertainty</p>
            <strong>{draft.uncertainty >= 3 ? "Yes, visible" : "Bounded"}</strong>
          </div>
          <div className="route-preview">
            <span>Suggested route · {route.code}</span>
            <b>{route.level}</b>
            <p>{route.summary}</p>
          </div>
          <p className="microcopy">Illustrative only. This prototype does not authorize deployment or replace expert judgment.</p>
        </aside>
      </section>

      <section className="method-section" id="method">
        <div className="section-heading">
          <div>
            <p className="kicker">The operating layer</p>
            <h2>Make the handoff visible.</h2>
          </div>
          <p>
            The working hypothesis is simple: risk evidence becomes more useful when teams can inspect exactly how it
            moved from a signal to a consequential decision.
          </p>
        </div>
        <div className="phase-grid">
          {phases.map((phase) => (
            <article className="phase-card" key={phase.number}>
              <span>{phase.number}</span>
              <h3>{phase.title}</h3>
              <p>{phase.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lab-section" id="lab">
        <div className="lab-intro">
          <p className="kicker">Fictional tabletop lab</p>
          <h2>Test the workflow, not a live system.</h2>
          <p>
            Load a non-operational scenario, change its evidence profile, and inspect how a transparent routing rule
            changes the suggested safeguards. No vulnerabilities, exploit instructions, or sensitive operational data are used.
          </p>
        </div>

        <div className="scenario-grid" aria-label="Fictional scenario presets">
          {scenarios.map((scenario, index) => (
            <button
              type="button"
              className={`scenario-card ${draft.scenarioId === scenario.id ? "selected" : ""}`}
              key={scenario.title}
              onClick={() => loadScenario(scenario)}
              aria-pressed={draft.scenarioId === scenario.id}
            >
              <span className="scenario-top"><span>0{index + 1}</span><b>{scenario.signal}</b></span>
              <strong className="scenario-title">{scenario.title}</strong>
              <span className="scenario-copy">{scenario.copy}</span>
              <span className="scenario-load">Load scenario <i>↘</i></span>
            </button>
          ))}
        </div>

        <div className="workbench" id="workbench">
          <section className="intake-panel" aria-labelledby="intake-heading">
            <div className="panel-heading">
              <div><span>01 / INTAKE</span><h3 id="intake-heading">Evidence profile</h3></div>
              <button type="button" className="text-button" onClick={() => setDraft({ ...initialDraft })}>Reset example</button>
            </div>

            <div className="form-grid">
              <label className="field wide">
                <span>Evidence title</span>
                <input value={draft.evidenceTitle} onChange={(event) => update("evidenceTitle", event.target.value)} />
              </label>
              <label className="field">
                <span>Evidence type</span>
                <select value={draft.evidenceType} onChange={(event) => update("evidenceType", event.target.value)}>
                  <option>Capability evaluation</option>
                  <option>Monitoring anomaly</option>
                  <option>Access proposal</option>
                  <option>Incident signal</option>
                </select>
              </label>
              <label className="field">
                <span>Source / evaluator</span>
                <input value={draft.source} onChange={(event) => update("source", event.target.value)} />
              </label>
            </div>

            <div className="score-grid">
              <ScoreField id="reliability" label="Source reliability" value={draft.reliability} onChange={(value) => update("reliability", value)} />
              <ScoreField id="uncertainty" label="Uncertainty" value={draft.uncertainty} onChange={(value) => update("uncertainty", value)} />
              <ScoreField id="capability" label="Capability level" value={draft.capability} onChange={(value) => update("capability", value)} />
              <ScoreField id="severity" label="Potential severity" value={draft.severity} onChange={(value) => update("severity", value)} />
              <ScoreField id="reversibility" label="Hard to reverse" value={draft.reversibility} onChange={(value) => update("reversibility", value)} />
            </div>

            <div className="form-grid compact">
              <label className="field">
                <span>Scope</span>
                <select value={draft.scope} onChange={(event) => update("scope", event.target.value as Scope)}>
                  <option>Contained</option><option>Internal</option><option>External</option><option>Critical infrastructure</option>
                </select>
              </label>
              <label className="field">
                <span>System autonomy</span>
                <select value={draft.autonomy} onChange={(event) => update("autonomy", event.target.value as Autonomy)}>
                  <option>Advisory</option><option>Tool-assisted</option><option>Multi-step autonomous</option>
                </select>
              </label>
              <label className="field">
                <span>Human decision owner</span>
                <input value={draft.owner} onChange={(event) => update("owner", event.target.value)} />
              </label>
              <label className="field">
                <span>Review date</span>
                <input type="date" value={draft.reviewDate} onChange={(event) => update("reviewDate", event.target.value)} />
              </label>
            </div>

            <label className="field text-field">
              <span>Observed evidence <i>What happened, not what it means</i></span>
              <textarea rows={4} value={draft.observed} onChange={(event) => update("observed", event.target.value)} />
            </label>
            <label className="field text-field">
              <span>Interpretation <i>Make the inference inspectable</i></span>
              <textarea rows={4} value={draft.interpretation} onChange={(event) => update("interpretation", event.target.value)} />
            </label>
            <label className="field text-field">
              <span>Dissent / unresolved uncertainty <i>Preserve disagreement</i></span>
              <textarea rows={3} value={draft.dissent} onChange={(event) => update("dissent", event.target.value)} />
            </label>
          </section>

          <aside className="decision-panel" aria-live="polite" aria-labelledby="decision-heading">
            <div className="decision-sticky">
              <div className="panel-heading dark-heading">
                <div><span>02 / ROUTE</span><h3 id="decision-heading">Suggested decision path</h3></div>
                <span className="human-pill"><i /> Human-owned</span>
              </div>
              <div className={`route-block ${route.tone}`}>
                <div className="route-code">{route.code}</div>
                <h4>{route.level}</h4>
                <p>{route.summary}</p>
              </div>
              <div className="decision-section">
                <h5>Why this route</h5>
                <ul>{route.rationale.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="decision-section safeguards">
                <h5>Suggested safeguards</h5>
                <ol>{route.safeguards.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
              </div>
              <div className="reopen-box"><span>REOPEN WHEN</span><p>{route.reopenWhen}</p></div>
              {!draft.owner.trim() && <p className="owner-warning">Assign a human owner before treating this record as complete.</p>}
            </div>
          </aside>
        </div>

        <section className="record-section" aria-labelledby="record-heading">
          <div className="record-copy">
            <p className="kicker">03 / Preserve the record</p>
            <h3 id="record-heading">An audit trail someone else can inspect.</h3>
            <p>The export keeps evidence, interpretation, dissent, ownership, safeguards, and reopening conditions together.</p>
            <div className="record-actions">
              <button type="button" className="button button-primary" onClick={copyRecord}>{copyState}</button>
              <button type="button" className="button button-light" onClick={downloadRecord}>Download .md</button>
            </div>
          </div>
          <div className="record-card">
            <div className="record-head"><span>DECISION RECORD</span><b>{route.code}</b></div>
            <dl>
              <div><dt>Signal</dt><dd>{draft.evidenceTitle}</dd></div>
              <div><dt>Owner</dt><dd>{draft.owner || "Unassigned"}</dd></div>
              <div><dt>Route</dt><dd>{route.level}</dd></div>
              <div><dt>Review</dt><dd>{draft.reviewDate || "Not set"}</dd></div>
              <div><dt>Dissent</dt><dd>{draft.dissent || "None recorded"}</dd></div>
            </dl>
            <p>Generated from the visible rules below. No model inference is used for routing in v0.1.</p>
          </div>
        </section>
      </section>

      <section className="rules-section">
        <div className="rules-heading">
          <p className="kicker">Transparent by design</p>
          <h2>The rules are visible.</h2>
          <p>This prototype suggests a route; it does not make or authorize a decision.</p>
        </div>
        <div className="rules-table" role="table" aria-label="Decision routing rules">
          <div className="rule-row rule-head" role="row"><span>Trigger</span><span>Suggested route</span><span>Minimum response</span></div>
          <div className="rule-row" role="row"><b>Uncertainty ≥ 4 or reliability ≤ 2</b><strong>Evidence hold</strong><span>Independent check; no consequential expansion</span></div>
          <div className="rule-row" role="row"><b>High capability × high severity, critical scope, or autonomous high-severity signal</b><strong>Critical review</strong><span>Pause, restrict, and escalate to named owner</span></div>
          <div className="rule-row" role="row"><b>Moderate capability × severity, external scope, or hard reversibility</b><strong>Elevated review</strong><span>Bounded pilot, monitoring, rollback</span></div>
          <div className="rule-row" role="row"><b>Below the above thresholds</b><strong>Monitor with trigger</strong><span>Preserve record and define reopening conditions</span></div>
        </div>
      </section>

      <section className="sources-section" id="sources">
        <div>
          <p className="kicker">Framework crosswalk · starting set</p>
          <h2>Built to be challenged.</h2>
        </div>
        <div className="source-list">
          <a href="https://www.aisi.gov.uk/frontier-ai-trends-report" target="_blank" rel="noreferrer"><span>UK AISI</span><b>Frontier AI Trends Report</b><i>↗</i></a>
          <a href="https://www.nist.gov/caisi" target="_blank" rel="noreferrer"><span>NIST CAISI</span><b>AI Safety Institute</b><i>↗</i></a>
          <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer"><span>NIST</span><b>AI Risk Management Framework</b><i>↗</i></a>
          <a href="https://www.anthropic.com/responsible-scaling-policy" target="_blank" rel="noreferrer"><span>Anthropic</span><b>Responsible Scaling Policy</b><i>↗</i></a>
          <a href="https://openai.com/index/updating-our-preparedness-framework/" target="_blank" rel="noreferrer"><span>OpenAI</span><b>Preparedness Framework</b><i>↗</i></a>
        </div>
      </section>

      <footer>
        <div><span className="brand-mark small" aria-hidden="true"><i /></span><strong>From Signal to Safeguard</strong></div>
        <p>Independent research prototype · Fictional scenarios only · Not an operational approval system</p>
      </footer>
    </main>
  );
}
