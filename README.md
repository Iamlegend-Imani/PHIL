# PHIL

> [!IMPORTANT]
> **Proprietary source, public for portfolio review only.** Copying, reuse, modification, redistribution, commercialization, and derivative works are prohibited without prior written permission. See [LICENSE](LICENSE).

### Personal Health Intelligence Layer

> Your health is not fragmented. Your health data is.

[Explore the PHIL site](https://iamlegend-imani.github.io/PHIL/) · [View the prototype experience](https://iamlegend-imani.github.io/PHIL/prototype.html) · [Watch the 90-second walkthrough](public/PHIL_90_Second_Walkthrough.mp4) · [Download the one-page brief](public/PHIL_Project_Brief.pdf)

PHIL is a patient-controlled context layer that turns scattered health information and lived experience into a clear, source-aware brief for a better clinical conversation.

It is a functional concept prototype, not a clinical product. It does not diagnose, prescribe, recommend supplements, interpret lab results, or replace professional judgment.

## The problem I am exploring

Health information is often stored by source rather than understood around the person. Symptoms live in memory. Medications live in a list. Test results live in separate portals. Work patterns, budget constraints, and previous attempts may never enter the record at all.

That fragmentation creates a practical problem before a visit even begins: the patient and practitioner must reconstruct the story while the clock is already running.

PHIL asks a focused design question:

> What changes when health technology starts with the whole person, not simply the easiest data point?

## What the prototype demonstrates

The interactive prototype follows a fictional patient named Maya Carter through six connected views:

1. **Overview** establishes the patient goal and product boundary.
2. **Context Map** connects biology, behavior, lived context, and care while preserving source provenance.
3. **Health Timeline** places events in sequence without turning correlation into causation.
4. **Visit Brief** lets the patient choose priorities and questions for the visit.
5. **Human Review** prevents the brief from being approved until every verification step is complete.
6. **Method & Safety** makes the prototype limits visible inside the product.

The prototype includes working navigation, patient and practitioner modes, editable visit questions, a generated visit brief, a verification gate, and an auditable decision record.

## The design thesis

Nothing exists in isolation.

Biology, behavior, environment, access, and lived experience shape one another. The role of PHIL is to make that complexity legible without pretending to resolve it automatically.

The system follows four principles:

- Start with the patient's words, priorities, and practical capacity.
- Keep every input attached to its source and verification state.
- Treat patterns as prompts for inquiry, not clinical conclusions.
- Keep final judgment and sharing decisions with accountable people.

## What is real and what is not

| Status | Evidence |
| --- | --- |
| Built | Interactive public prototype with six connected views |
| Built | Patient-controlled question selection and visit brief |
| Built | Human verification gate and decision record |
| Built | Methodology, safety, scenario, case study, and review protocol |
| Fictional | Maya Carter, her history, results, wearable data, and visit context |
| Unvalidated | The unmet-need hypothesis and proposed workflow |
| Pending | External practitioner feedback and clinical workflow testing |

No user outcomes, adoption numbers, clinical improvements, or practitioner endorsements are claimed.

## Project evidence

- [Project brief](PROJECT_BRIEF.md)
- [One-page project brief PDF](public/PHIL_Project_Brief.pdf)
- [Methodology](METHODOLOGY.md)
- [Safety boundaries](SAFETY_BOUNDARIES.md)
- [Fictional patient scenario](FICTIONAL_SCENARIO.md)
- [Case study](CASE_STUDY.md)
- [Practitioner review guide](PRACTITIONER_REVIEW_GUIDE.md)
- [Roadmap](ROADMAP.md)
- [Repository setup and public description](REPOSITORY_SETUP.md)
- [90-second walkthrough script](WALKTHROUGH_SCRIPT.md)
- [90-second walkthrough video](public/PHIL_90_Second_Walkthrough.mp4)
- [Walkthrough captions](WALKTHROUGH_CAPTIONS.srt)

## Access and permitted use

The public site and repository materials may be viewed for portfolio evaluation, research review, and demonstration. The source is not open source. Copying, cloning, reuse, modification, redistribution, commercial use, and creation of derivative works require prior written permission. See the [proprietary notice](LICENSE).

## Technology

- React 19
- TypeScript
- Next.js-compatible Vinext runtime
- CSS-first responsive interface
- Cloudflare-compatible production build
- Static GitHub Pages public thesis and evidence site

The prototype deliberately uses fictional local state. It does not collect, store, or transmit personal health information.

## Related work

[AbundanceApp](https://github.com/Iamlegend-Imani/AbundanceApp) is another public prototype in my broader systems-building practice. PHIL narrows that practice into a specific health technology question: how to make patient context useful without automating away agency or clinical judgment.

## Builder

Built by [Imani](https://www.linkedin.com/in/imanikir/), a systems builder working across technology, health, intelligence, and human-centered design.

I build systems that make complexity legible and accountability visible.

Proof over hype. No invented metrics. No hidden clinical claims.

## License and responsible use

**Proprietary, all rights reserved.** This repository is public for portfolio review and demonstration only. No permission is granted to copy, use, modify, redistribute, commercialize, or create derivative works from the source or accompanying materials, except for the limited rights required by GitHub's Terms of Service. See the [proprietary notice](LICENSE).

This repository is for design exploration and portfolio demonstration. It must not be used for medical advice, diagnosis, treatment, triage, or emergencies.
