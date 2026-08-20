# Methodology

## Purpose

This document explains how the PHIL concept was framed, translated into a prototype, and bounded for responsible public demonstration.

PHIL is a design inquiry, not a clinically validated product. The method is therefore intended to make the hypothesis, assumptions, information model, decisions, and next tests visible.

## Working design question

> How might a patient prepare a coherent, source-aware account of their health context without asking software to diagnose them or replace the clinical conversation?

## Method in six moves

### 1. Observe the system around the visit

The concept begins with a systems observation: the information needed for a useful health conversation can be distributed across memory, portals, paper records, medication lists, wearable summaries, and daily life.

The patient often carries the relationships among these fragments. That creates a need hypothesis around preparation and synthesis, not around generating more health data.

### 2. Frame the narrowest useful job

PHIL is not positioned as a universal health intelligence system. The first workflow is deliberately narrow:

> Help a patient prepare a clear brief for a non-emergency health visit.

This boundary removes diagnosis, treatment, ongoing surveillance, and autonomous triage from the prototype.

### 3. Map the information around the person

The prototype groups context into four lenses:

- **Biology:** symptoms, history, and patient-reported changes
- **Behavior:** routines, sleep, activity, and previous attempts
- **Context:** work, caregiving, affordability, access, and change capacity
- **Care:** visits, medications, supplements, and source documents

The lenses are not clinical categories and do not imply causation. They are a way to prevent practical context from disappearing when information is summarized.

### 4. Preserve provenance and uncertainty

Every meaningful detail should retain:

- its source
- its date or time range
- whether it is patient-reported, document-derived, device-derived, or professionally verified
- whether information is missing, conflicting, or awaiting confirmation

The prototype represents this through a source ledger, status labels, timeline annotations, and a pending verification state.

### 5. Convert information into questions, not answers

The output is a Visit Preparation Brief. It includes:

- the patient's stated goal
- visit priorities
- context the patient wants retained
- questions selected by the patient
- visible source and uncertainty cues

The wording is intentionally interrogative. A pattern can become a question for discussion, but the system does not turn it into a diagnosis, risk score, or treatment recommendation.

### 6. Require human review before sharing

The brief remains a draft until a person verifies:

1. identity
2. medication-source accuracy
3. preservation of the patient's priorities
4. visibility of missing or uncertain information
5. absence of unsupported diagnostic or treatment language

The prototype records the role of the reviewer and the approved version. It does not claim that a checkbox alone establishes clinical safety. The interaction demonstrates the accountability structure that future testing would need to examine.

## Information model

| Layer | Contents | Owner | Prototype treatment |
| --- | --- | --- | --- |
| Patient intent | Goals, concerns, priorities, sharing choice | Patient | Preserved in the patient's words |
| Lived context | Work, budget, routines, caregiving, capacity | Patient | Included only when the patient selects it |
| Source data | Medication list, documents, device summaries | Source-dependent | Labeled by origin and verification state |
| Pattern prompt | Timing, variation, possible relationship | Shared inquiry | Framed as a question, never a conclusion |
| Clinical interpretation | Diagnosis, risk, treatment, urgency | Qualified professional | Excluded from PHIL |
| Decision record | Version, reviewer role, checks completed | Accountable human | Visible before sharing |

## Role of AI

The public prototype does not call an AI model and does not process real health information. Its generated behavior is deterministic interface logic.

A future research prototype could test tightly bounded language-model assistance for tasks such as:

- classifying an input by source type
- identifying missing dates or provenance
- proposing neutral question wording
- compressing patient-approved content into a draft brief

Any such use would require data minimization, model and prompt evaluation, traceable outputs, human review, error recovery, privacy controls, and a prohibition on diagnosis, treatment, or urgency decisions.

## Prototype development choices

- A fictional persona was used to make the workflow concrete without using personal health information.
- The scenario contains ambiguity by design so the interface must preserve uncertainty.
- Medication and supplement information is limited to reconciliation prompts.
- The timeline explicitly distinguishes sequence from causation.
- Practical constraints are included because a theoretically ideal next step may not be feasible for the person.
- Safety language appears throughout the product, not only in legal text.
- No outcome metrics, practitioner endorsements, or validation claims are presented.

## Planned evaluation sequence

### Phase 1: Need discovery

Conduct semi-structured interviews with patients and practitioners about visit preparation, context reconstruction, current workarounds, and sources of burden. Do not lead with the prototype until the current workflow is understood.

### Phase 2: Comprehension and boundary testing

Test whether users can accurately explain what PHIL does and does not do. Measure whether any interface element is mistaken for diagnosis, treatment advice, urgency guidance, or a complete medical record.

### Phase 3: Task-based usability

Ask participants to review a fictional scenario, correct an error, remove unwanted context, select priorities, and approve or reject a visit brief. Track completion, confusion, error recovery, and user control.

### Phase 4: Practitioner relevance

Ask practitioners which elements are useful, which create noise, what would need verification, and where the workflow could create liability or duplicate documentation.

### Phase 5: Equity and access review

Evaluate language burden, mobile use, disability access, data access assumptions, health literacy, trust, and the risk of disadvantaging people with less complete records or less time to prepare.

### Phase 6: Only then consider a data-connected pilot

Any pilot involving real data would require appropriate legal, security, privacy, clinical, institutional, and research review before recruitment or collection begins.

## Evidence standard

PHIL uses a simple evidence ladder:

1. **Idea:** a possibility worth articulating
2. **Hypothesis:** a specific need or mechanism that can be tested
3. **Built evidence:** a functioning artifact that demonstrates implementation ability
4. **Usability evidence:** observed participant behavior on defined tasks
5. **Workflow evidence:** observed fit within real practice
6. **Outcome evidence:** appropriately designed measurement of health or operational effects

The current project has reached level 3. It should not be described as having reached levels 4 through 6.

## Current limitations

- The need hypothesis was not derived from formal clinical immersion.
- The scenario is fictional and cannot establish real-world usability.
- No practitioner feedback is represented as complete.
- The interface has not undergone accessibility conformance testing with disabled users.
- There is no data ingestion, identity verification, audit infrastructure, or security architecture.
- The human-review checklist is a design proposal, not an approved clinical protocol.
- The prototype does not evaluate model behavior because no model is connected.

These limitations are part of the project record. They define the next work rather than weakening the value of the current artifact.
