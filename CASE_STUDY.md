# Case Study

## PHIL: Designing for the story between the data points

**Role:** Independent product strategy, research framing, interaction design, prototyping, safety design, and documentation  
**Status:** Functional public concept prototype  
**Live:** <https://phil-health-map.imani-kirika116.chatgpt.site>

## The starting observation

People can have more health data and still struggle to tell a coherent health story.

Information is stored by source: a portal, a device, a medication list, a personal note, a memory of what changed. The patient often becomes the integration layer, especially when work, affordability, routines, and previous attempts affect what is possible.

I wanted to explore the moment before a scheduled visit. Not “Can software diagnose this person?” but “Can better structure help the person and practitioner begin with a clearer shared picture?”

## The hypothesis

A patient-controlled context layer might make a visit more useful by helping the patient:

- gather relevant fragments
- retain practical context
- see events in sequence
- choose their questions
- verify what will be shared

This remains a hypothesis. The project does not claim improved outcomes, reduced visit time, or practitioner adoption.

## The core design decision

I narrowed the first workflow to a Visit Preparation Brief.

That decision changed the product. I removed the supplement recommendations, generic protocols, pricing paths, and broad health-plan language that appeared in an earlier concept. Those features asked the interface to make claims it had not earned.

The revised PHIL prototype does less, but it says something more credible:

> The machine may help organize. The person still owns the story. The professional still owns clinical judgment.

## The system I designed

### Context Map

The Context Map organizes information around the person rather than the data source. Biology, behavior, context, and care are visible together, while the source ledger preserves origin and verification state.

![PHIL Context Map](docs/assets/evidence-workbench.jpg)

### Health Timeline

The timeline places patient-reported events, clinical documents, and device summaries in sequence. A visible warning separates timing from causation.

### Patient-controlled Visit Brief

The patient chooses the questions that appear in the brief. Practical constraints, such as schedule, budget, and capacity for change, can remain visible when the patient wants them included.

### Human Review

The brief cannot be approved until identity, source accuracy, patient intent, uncertainty, and claim language have been checked. The final screen records an approved version and the accountable reviewer role.

![PHIL Human Review](docs/assets/decision-record.jpg)

## Safety was part of the product architecture

I did not want safety to appear only as a footer. It is present in the information model and interactions:

- fictional data is labeled
- source status is visible
- patterns are framed as questions
- medication content is limited to reconciliation
- the output remains a draft
- an incomplete review blocks approval
- the patient controls sharing
- clinical decisions remain explicitly outside the system

The complete boundary is documented in [SAFETY_BOUNDARIES.md](SAFETY_BOUNDARIES.md).

## What the project proves

This prototype is evidence that I can:

- turn a broad health technology ambition into a bounded use case
- connect systems thinking with concrete interaction design
- build a polished, responsive, working artifact
- make provenance, uncertainty, and human accountability visible
- revise an idea when its claims exceed its evidence
- document what is built, fictional, unvalidated, and pending

It does not prove clinical need, workflow fit, usability, safety performance, or outcomes. Those require research with real people and appropriate oversight.

## What I learned

The strongest move was subtraction.

When I stopped trying to make PHIL the intelligence that solves the health problem, the product became clearer. Its value could live in helping people arrive at a better question, with less of their reality lost in translation.

I also learned that “human in the loop” is too vague. Accountability needs an interface: a named role, a version, a checklist, unresolved items, and a visible boundary around the decisions that were not delegated.

## What comes next

The next step is not more functionality. It is disciplined need discovery.

I would begin with patient and practitioner interviews about current preparation work, information overload, trust, and the point at which context becomes useful or burdensome. The prototype would then be used for comprehension, task-based usability, and workflow review.

Only after those findings would I decide whether PHIL should become a product, a feature inside an existing system, a patient worksheet, or something else entirely.

## Why I built it

I build systems that make complexity legible.

PHIL is personal to my way of seeing: nothing exists in isolation. But the project also reflects the discipline I want to bring to health technology. Curiosity without overclaiming. Imagination with boundaries. Technology in service of a more human conversation.
