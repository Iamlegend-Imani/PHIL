"use client";

import { useEffect, useMemo, useState } from "react";

type View =
  | "overview"
  | "context"
  | "timeline"
  | "brief"
  | "review"
  | "method";

type Mode = "patient" | "practitioner";

const navigation: { id: View; label: string; kicker: string }[] = [
  { id: "overview", label: "Overview", kicker: "Start here" },
  { id: "context", label: "Context Map", kicker: "Connect the fragments" },
  { id: "timeline", label: "Health Timeline", kicker: "See change over time" },
  { id: "brief", label: "Visit Brief", kicker: "Prepare the conversation" },
  { id: "review", label: "Human Review", kicker: "Keep judgment human" },
  { id: "method", label: "Method & Safety", kicker: "Know the boundaries" },
];

const sourceRows = [
  {
    source: "Patient story",
    detail: "Fatigue, sleep disruption, work demands, goals",
    status: "Patient entered",
  },
  {
    source: "Medication list",
    detail: "Current medicines and supplements for reconciliation",
    status: "Needs verification",
  },
  {
    source: "Lab summary",
    detail: "Mock results from two prior visits",
    status: "Document imported",
  },
  {
    source: "Wearable summary",
    detail: "Weekly sleep duration and consistency ranges",
    status: "Patient shared",
  },
];

const visitQuestions = [
  {
    id: "changes",
    text: "Which changes in my symptoms or routine are most useful to investigate first?",
    reason: "Connects the timeline to the next clinical step.",
  },
  {
    id: "medications",
    text: "Could we reconcile my medication and supplement list together?",
    reason: "Keeps medication decisions with a qualified professional.",
  },
  {
    id: "labs",
    text: "Do the changes across my prior results alter what you would want to review?",
    reason: "Frames the data as a question, not an interpretation.",
  },
  {
    id: "capacity",
    text: "What is the smallest realistic next step given my schedule and budget?",
    reason: "Makes feasibility part of the care conversation.",
  },
];

const reviewItems = [
  "Identity and date of birth confirmed",
  "Medication list checked against source",
  "Patient priorities preserved in their own words",
  "Uncertainty and missing information visible",
  "No diagnostic or treatment claim introduced",
];

const timelineEvents = [
  {
    date: "JAN 2026",
    title: "Baseline visit",
    text: "Maya reports intermittent fatigue. A routine lab panel is completed.",
    source: "Mock visit note",
    kind: "clinical",
  },
  {
    date: "FEB 2026",
    title: "Work pattern changes",
    text: "Late shifts increase from one to three nights most weeks.",
    source: "Patient story",
    kind: "context",
  },
  {
    date: "MAR 2026",
    title: "Sleep becomes less consistent",
    text: "Weekly summaries show a wider range of sleep and wake times.",
    source: "Mock wearable summary",
    kind: "data",
  },
  {
    date: "APR 2026",
    title: "Self-directed change",
    text: "Maya adds an over-the-counter supplement after reading online reviews.",
    source: "Patient story",
    kind: "context",
  },
  {
    date: "MAY 2026",
    title: "Follow-up results",
    text: "A second mock panel is added. PHIL does not interpret the result.",
    source: "Mock lab summary",
    kind: "clinical",
  },
];

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span>P</span>
      <i />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status-pill status-${tone}`}>{children}</span>;
}

function MiniSparkline() {
  return (
    <svg className="sparkline" viewBox="0 0 280 80" role="img" aria-label="Illustrative trend with variation over time">
      <path className="spark-grid" d="M0 20H280M0 40H280M0 60H280" />
      <path className="spark-area" d="M0 58 C20 54 26 34 48 40 S75 65 96 51 S128 29 151 38 S180 62 199 45 S231 24 280 31 L280 80 L0 80 Z" />
      <path className="spark-line" d="M0 58 C20 54 26 34 48 40 S75 65 96 51 S128 29 151 38 S180 62 199 45 S231 24 280 31" />
      <circle cx="199" cy="45" r="4" />
    </svg>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("overview");
  const [mode, setMode] = useState<Mode>("patient");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([
    "changes",
    "medications",
    "capacity",
  ]);
  const [checkedReview, setCheckedReview] = useState<number[]>([0, 2, 3, 4]);
  const [verified, setVerified] = useState(false);

  const selectedQuestionText = useMemo(
    () => visitQuestions.filter((item) => selectedQuestions.includes(item.id)),
    [selectedQuestions],
  );

  const currentIndex = navigation.findIndex((item) => item.id === view);
  const current = navigation[currentIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  function toggleQuestion(id: string) {
    setSelectedQuestions((currentQuestions) =>
      currentQuestions.includes(id)
        ? currentQuestions.filter((question) => question !== id)
        : [...currentQuestions, id],
    );
    setVerified(false);
  }

  function toggleReview(index: number) {
    setCheckedReview((currentItems) =>
      currentItems.includes(index)
        ? currentItems.filter((item) => item !== index)
        : [...currentItems, index],
    );
    setVerified(false);
  }

  function move(direction: number) {
    const nextIndex = Math.max(0, Math.min(navigation.length - 1, currentIndex + direction));
    setView(navigation[nextIndex].id);
    window.scrollTo(0, 0);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setView("overview")} aria-label="Go to PHIL overview">
          <BrandMark />
          <span>
            <strong>PHIL</strong>
            <small>Personal Health Intelligence Layer</small>
          </span>
        </button>

        <div className="demo-label">
          <span className="live-dot" />
          Interactive concept
        </div>

        <nav aria-label="Prototype sections">
          {navigation.map((item, index) => (
            <button
              key={item.id}
              className={`nav-item ${view === item.id ? "active" : ""}`}
              onClick={() => setView(item.id)}
            >
              <span className="nav-index">0{index + 1}</span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.kicker}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <span>Prototype boundary</span>
          <p>Fictional data. No diagnosis. No treatment recommendation.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="mobile-brand">PHIL</span>
            <span className="breadcrumb">Maya Carter / {current.label}</span>
          </div>
          <div className="topbar-actions">
            <div className="mode-switch" aria-label="View mode">
              <button className={mode === "patient" ? "active" : ""} onClick={() => setMode("patient")}>Patient</button>
              <button className={mode === "practitioner" ? "active" : ""} onClick={() => setMode("practitioner")}>Practitioner</button>
            </div>
            <button className="icon-button" onClick={() => window.print()} aria-label="Print current view">↗</button>
            <div className="avatar" aria-label="Fictional patient Maya Carter">MC</div>
          </div>
        </header>

        <div className="mobile-nav" aria-label="Mobile prototype sections">
          {navigation.map((item) => (
            <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="content">
          {view === "overview" && (
            <div className="screen overview-screen">
              <section className="hero-grid">
                <div className="hero-copy">
                  <Eyebrow>Patient-controlled health context</Eyebrow>
                  <h1>Your health is not fragmented. <em>Your health data is.</em></h1>
                  <p className="hero-lede">
                    PHIL turns scattered health information and lived context into a clear,
                    patient-approved brief for a better clinical conversation.
                  </p>
                  <div className="hero-actions">
                    <button className="primary-button" onClick={() => setView("context")}>Explore Maya&apos;s context <span>→</span></button>
                    <button className="text-button" onClick={() => setView("method")}>Read the safety boundaries</button>
                  </div>
                  <div className="trust-line">
                    <span>Patient controlled</span>
                    <span>Source visible</span>
                    <span>Human reviewed</span>
                  </div>
                </div>

                <article className="profile-card">
                  <div className="profile-topline">
                    <span>Fictional patient profile</span>
                    <StatusPill tone="teal">Demo data</StatusPill>
                  </div>
                  <div className="profile-person">
                    <div className="profile-initials">MC</div>
                    <div>
                      <h2>Maya Carter</h2>
                      <p>42 · Boston, MA · Follow-up preparation</p>
                    </div>
                  </div>
                  <div className="profile-priority">
                    <span>In Maya&apos;s words</span>
                    <blockquote>“I want to understand what is worth discussing first, without losing the reality of my life.”</blockquote>
                  </div>
                  <div className="profile-grid">
                    <div><span>Primary concern</span><strong>Persistent fatigue</strong></div>
                    <div><span>Change capacity</span><strong>2 steps at a time</strong></div>
                    <div><span>Time horizon</span><strong>6 months</strong></div>
                    <div><span>Budget context</span><strong>$75 / month</strong></div>
                  </div>
                </article>
              </section>

              <section className="journey-section">
                <div className="section-heading compact">
                  <div>
                    <Eyebrow>The PHIL workflow</Eyebrow>
                    <h2>From fragments to a more useful visit</h2>
                  </div>
                  <p>PHIL structures context. People retain agency and clinical judgment.</p>
                </div>
                <div className="journey-grid">
                  <button className="journey-card" onClick={() => setView("context")}>
                    <span className="journey-number">01</span>
                    <div className="journey-icon fragments-icon"><i /><i /><i /><i /></div>
                    <h3>Gather the fragments</h3>
                    <p>Bring the patient story, history, routines, records, and constraints into one view.</p>
                    <small>Context Map →</small>
                  </button>
                  <button className="journey-card" onClick={() => setView("timeline")}>
                    <span className="journey-number">02</span>
                    <div className="journey-icon pattern-icon"><i /><i /><i /></div>
                    <h3>Make patterns visible</h3>
                    <p>Place events side by side without turning correlation into a clinical conclusion.</p>
                    <small>Health Timeline →</small>
                  </button>
                  <button className="journey-card" onClick={() => setView("brief")}>
                    <span className="journey-number">03</span>
                    <div className="journey-icon brief-icon"><i /><i /><i /></div>
                    <h3>Prepare the conversation</h3>
                    <p>Choose priorities and questions for a concise, patient-approved visit brief.</p>
                    <small>Visit Brief →</small>
                  </button>
                  <button className="journey-card" onClick={() => setView("review")}>
                    <span className="journey-number">04</span>
                    <div className="journey-icon human-icon"><span>✓</span></div>
                    <h3>Keep judgment human</h3>
                    <p>Verify sources, preserve uncertainty, and record who approved the final brief.</p>
                    <small>Human Review →</small>
                  </button>
                </div>
              </section>

              <section className="principle-band">
                <div>
                  <Eyebrow>Design principle</Eyebrow>
                  <h2>Nothing exists in isolation.</h2>
                </div>
                <p>Biology, behavior, environment, access, and lived experience shape one another. PHIL makes those relationships legible without pretending to replace care.</p>
              </section>
            </div>
          )}

          {view === "context" && (
            <div className="screen">
              <div className="section-heading">
                <div>
                  <Eyebrow>01 / Context Map</Eyebrow>
                  <h1>See the person around the data.</h1>
                </div>
                <p>{mode === "patient" ? "Maya chooses what to share and what matters most." : "Review the origin, status, and patient meaning of every input."}</p>
              </div>

              <div className="context-layout">
                <section className="context-map-card">
                  <div className="map-header">
                    <div>
                      <span>Whole-person context</span>
                      <h2>Maya&apos;s Context Map</h2>
                    </div>
                    <StatusPill tone="gold">4 source types</StatusPill>
                  </div>
                  <div className="context-orbit">
                    <div className="orbit-ring ring-one" />
                    <div className="orbit-ring ring-two" />
                    <div className="context-center">
                      <span>MC</span>
                      <strong>Maya</strong>
                      <small>Patient priorities</small>
                    </div>
                    <button className="orbit-node node-one"><span>Biology</span><small>Symptoms · history</small></button>
                    <button className="orbit-node node-two"><span>Behavior</span><small>Sleep · routines</small></button>
                    <button className="orbit-node node-three"><span>Context</span><small>Work · budget</small></button>
                    <button className="orbit-node node-four"><span>Care</span><small>Visits · medicines</small></button>
                  </div>
                  <div className="map-caption"><span /> Connections are prompts for inquiry, not claims of causation.</div>
                </section>

                <aside className="priority-panel">
                  <div className="panel-heading">
                    <span>Patient priorities</span>
                    <small>Set by Maya</small>
                  </div>
                  <ol className="priority-list">
                    <li><span>1</span><div><strong>Have enough energy for daily life</strong><p>Especially through late work shifts.</p></div></li>
                    <li><span>2</span><div><strong>Understand what changed</strong><p>Look at the sequence, not one snapshot.</p></div></li>
                    <li><span>3</span><div><strong>Choose a realistic next step</strong><p>Low burden and financially possible.</p></div></li>
                  </ol>
                  <div className="constraint-card">
                    <span>Feasibility matters</span>
                    <p>Maya can manage two changes at a time and a recurring cost of up to $75 monthly.</p>
                  </div>
                </aside>
              </div>

              <section className="source-section">
                <div className="panel-heading inline"><span>Source ledger</span><small>Every claim should remain traceable</small></div>
                <div className="source-table">
                  {sourceRows.map((row, index) => (
                    <div className="source-row" key={row.source}>
                      <span className="source-index">0{index + 1}</span>
                      <div><strong>{row.source}</strong><p>{row.detail}</p></div>
                      <StatusPill tone={row.status.includes("verification") ? "gold" : "teal"}>{row.status}</StatusPill>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {view === "timeline" && (
            <div className="screen">
              <div className="section-heading">
                <div>
                  <Eyebrow>02 / Health Timeline</Eyebrow>
                  <h1>Change makes more sense in sequence.</h1>
                </div>
                <p>One view of clinical events, daily life, and patient-reported changes. No automated interpretation.</p>
              </div>

              <section className="signal-card">
                <div className="signal-copy">
                  <span>Illustrative signal</span>
                  <h2>Sleep consistency varies as late shifts increase</h2>
                  <p>This is a conversation prompt. It is not evidence that work schedule caused Maya&apos;s fatigue.</p>
                </div>
                <div className="signal-chart">
                  <MiniSparkline />
                  <div className="chart-axis"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span></div>
                </div>
              </section>

              <div className="timeline-legend">
                <span><i className="clinical" /> Clinical</span>
                <span><i className="contextual" /> Lived context</span>
                <span><i className="data" /> Patient-shared data</span>
              </div>

              <section className="timeline">
                {timelineEvents.map((event, index) => (
                  <article className={`timeline-event ${event.kind}`} key={event.date}>
                    <div className="timeline-date">{event.date}</div>
                    <div className="timeline-marker"><span /></div>
                    <div className="timeline-card">
                      <div><span>{event.source}</span><small>Event 0{index + 1}</small></div>
                      <h3>{event.title}</h3>
                      <p>{event.text}</p>
                    </div>
                  </article>
                ))}
              </section>

              <div className="uncertainty-note">
                <span>?</span>
                <div><strong>What the timeline cannot tell us</strong><p>Timing can guide better questions. It cannot establish cause, diagnosis, or treatment.</p></div>
              </div>
            </div>
          )}

          {view === "brief" && (
            <div className="screen">
              <div className="section-heading">
                <div>
                  <Eyebrow>03 / Visit Brief</Eyebrow>
                  <h1>Turn context into a better conversation.</h1>
                </div>
                <p>{mode === "patient" ? "Choose what belongs in the brief before it is shared." : "Review the brief with the patient before using it in a visit."}</p>
              </div>

              <div className="brief-layout">
                <section className="question-builder">
                  <div className="panel-heading">
                    <span>Questions for the visit</span>
                    <small>{selectedQuestions.length} selected</small>
                  </div>
                  <p className="builder-intro">PHIL offers question structures, not clinical answers. Maya controls the final selection.</p>
                  <div className="question-list">
                    {visitQuestions.map((question) => {
                      const isSelected = selectedQuestions.includes(question.id);
                      return (
                        <button key={question.id} className={`question-option ${isSelected ? "selected" : ""}`} onClick={() => toggleQuestion(question.id)} aria-pressed={isSelected}>
                          <span className="check-box">{isSelected ? "✓" : ""}</span>
                          <span><strong>{question.text}</strong><small>{question.reason}</small></span>
                        </button>
                      );
                    })}
                  </div>
                  <button className="secondary-button" onClick={() => setView("review")}>Send to human review <span>→</span></button>
                </section>

                <article className="visit-document">
                  <div className="document-topline"><BrandMark /><span>VISIT PREPARATION BRIEF</span><small>Draft 01</small></div>
                  <div className="document-person">
                    <div><span>Prepared with</span><h2>Maya Carter</h2><p>Fictional profile · August 20, 2026</p></div>
                    <StatusPill tone="gold">Needs review</StatusPill>
                  </div>
                  <div className="document-section">
                    <span>What matters most</span>
                    <blockquote>“I want to understand what is worth discussing first, without losing the reality of my life.”</blockquote>
                  </div>
                  <div className="document-columns">
                    <div className="document-section">
                      <span>Visit priorities</span>
                      <ol><li>Persistent fatigue</li><li>Recent changes in sleep and work</li><li>Realistic next step</li></ol>
                    </div>
                    <div className="document-section">
                      <span>Context to retain</span>
                      <ul><li>Late shifts increased</li><li>Two changes at a time</li><li>$75 monthly budget</li></ul>
                    </div>
                  </div>
                  <div className="document-section questions">
                    <span>Questions Maya selected</span>
                    <ol>{selectedQuestionText.map((question) => <li key={question.id}>{question.text}</li>)}</ol>
                  </div>
                  <div className="document-footer"><span>Not a diagnosis or treatment plan</span><span>Sources and uncertainty remain visible</span></div>
                </article>
              </div>
            </div>
          )}

          {view === "review" && (
            <div className="screen">
              <div className="section-heading">
                <div>
                  <Eyebrow>04 / Human Review</Eyebrow>
                  <h1>Capability can be automated. Accountability cannot.</h1>
                </div>
                <p>Before a brief leaves PHIL, a person verifies the sources, language, and patient intent.</p>
              </div>

              <div className="review-layout">
                <section className="review-checklist">
                  <div className="panel-heading"><span>Pre-share verification</span><small>{checkedReview.length} of {reviewItems.length} complete</small></div>
                  <div className="progress-track"><span style={{ width: `${(checkedReview.length / reviewItems.length) * 100}%` }} /></div>
                  <div className="checklist-items">
                    {reviewItems.map((item, index) => {
                      const checked = checkedReview.includes(index);
                      return <button key={item} className={checked ? "checked" : ""} onClick={() => toggleReview(index)}><span>{checked ? "✓" : ""}</span><strong>{item}</strong></button>;
                    })}
                  </div>
                  <button
                    className="primary-button wide"
                    disabled={checkedReview.length !== reviewItems.length}
                    onClick={() => setVerified(true)}
                  >
                    {verified ? "Review recorded" : "Record human approval"}
                  </button>
                  {checkedReview.length !== reviewItems.length && <p className="completion-hint">Complete every verification step to record approval.</p>}
                </section>

                <aside className={`decision-record ${verified ? "verified" : ""}`}>
                  <div className="record-seal">{verified ? "✓" : "04"}</div>
                  <Eyebrow>Decision record</Eyebrow>
                  <h2>{verified ? "Approved for patient-controlled sharing" : "Awaiting human approval"}</h2>
                  <p>{verified ? "The prototype records who checked the brief, what they checked, and which version was approved." : "A generated summary remains a draft until a person reviews it with the patient."}</p>
                  <dl>
                    <div><dt>Brief version</dt><dd>Draft 01</dd></div>
                    <div><dt>Reviewer role</dt><dd>{mode === "patient" ? "Patient" : "Practitioner"}</dd></div>
                    <div><dt>Source status</dt><dd>1 item pending</dd></div>
                    <div><dt>Clinical judgment</dt><dd>Not delegated</dd></div>
                  </dl>
                  <div className="record-boundary"><span /> No autonomous diagnosis, triage, or treatment decision.</div>
                </aside>
              </div>

              <section className="handoff-flow">
                <div><span>01</span><strong>Machine assists</strong><p>Organizes patient-approved information.</p></div>
                <i>→</i>
                <div><span>02</span><strong>Human verifies</strong><p>Checks source, meaning, and uncertainty.</p></div>
                <i>→</i>
                <div><span>03</span><strong>Patient decides</strong><p>Controls whether and how the brief is shared.</p></div>
              </section>
            </div>
          )}

          {view === "method" && (
            <div className="screen method-screen">
              <div className="section-heading">
                <div>
                  <Eyebrow>05 / Method & Safety</Eyebrow>
                  <h1>A prototype with visible limits.</h1>
                </div>
                <p>PHIL is a design inquiry about context and conversation readiness, not a validated clinical product.</p>
              </div>

              <section className="method-statement">
                <span>Builder&apos;s question</span>
                <blockquote>What changes when health technology starts with the whole person, not simply the easiest data point?</blockquote>
                <p>I build systems that make complexity legible. PHIL is one exploration of how patient context can be structured without automating away patient agency or professional judgment.</p>
              </section>

              <div className="boundary-grid">
                <article className="boundary-card does">
                  <div className="boundary-icon">+</div>
                  <span>What PHIL does</span>
                  <ul>
                    <li>Organizes patient-provided context</li>
                    <li>Preserves source and uncertainty</li>
                    <li>Supports visit preparation</li>
                    <li>Creates a patient-approved brief</li>
                    <li>Records human review</li>
                  </ul>
                </article>
                <article className="boundary-card does-not">
                  <div className="boundary-icon">×</div>
                  <span>What PHIL does not do</span>
                  <ul>
                    <li>Diagnose or predict disease</li>
                    <li>Recommend medication or supplements</li>
                    <li>Replace a clinician or emergency care</li>
                    <li>Infer causation from correlation</li>
                    <li>Make autonomous care decisions</li>
                  </ul>
                </article>
              </div>

              <section className="method-grid">
                <article><span>01</span><h3>Start with lived experience</h3><p>The patient defines the concern, desired outcome, and practical constraints in their own language.</p></article>
                <article><span>02</span><h3>Keep provenance attached</h3><p>Every detail retains a visible source, date, and verification state.</p></article>
                <article><span>03</span><h3>Separate signal from claim</h3><p>The interface may surface timing or variation, but it labels interpretation as a question for care.</p></article>
                <article><span>04</span><h3>Require accountable review</h3><p>No generated brief is treated as final until a human verifies it with the patient.</p></article>
              </section>

              <div className="prototype-disclosure">
                <div className="disclosure-mark">!</div>
                <div>
                  <strong>Concept prototype disclosure</strong>
                  <p>All names, records, results, and scenarios shown here are fictional. This prototype has not been clinically validated, is not a medical device, and must not be used for medical advice, diagnosis, treatment, triage, or emergencies.</p>
                </div>
              </div>

              <div className="resource-links">
                <a href="/PHIL_Project_Brief.pdf" target="_blank" rel="noreferrer">
                  <span>Project brief</span>
                  <strong>Download the one-page PDF</strong>
                  <small>Evidence status, workflow, and safety boundary ↗</small>
                </a>
                <a href="/demo/PHIL_90_Second_Walkthrough.mp4" target="_blank" rel="noreferrer">
                  <span>Walkthrough</span>
                  <strong>Watch the 90-second story</strong>
                  <small>Six product views with embedded captions ↗</small>
                </a>
              </div>
            </div>
          )}

          <div className="screen-footer">
            <button disabled={currentIndex === 0} onClick={() => move(-1)}>← Previous</button>
            <span>0{currentIndex + 1} / 0{navigation.length}</span>
            <button disabled={currentIndex === navigation.length - 1} onClick={() => move(1)}>Next →</button>
          </div>
        </div>

        <footer className="site-footer">
          <div><BrandMark /><span><strong>PHIL</strong><small>A Personal Health Intelligence Layer concept by Imani Kirika</small></span></div>
          <p>Proof over hype. Built to make complexity legible and accountability visible.</p>
          <div className="footer-links">
            <a href="https://github.com/Iamlegend-Imani" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/imanikir/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </footer>
      </section>
    </main>
  );
}
