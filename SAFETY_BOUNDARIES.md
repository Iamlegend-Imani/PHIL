# Safety Boundaries

## Status

PHIL is a fictional, non-clinical concept prototype. It has not been clinically validated, is not a medical device, and must not be used for medical advice, diagnosis, treatment, triage, monitoring, or emergencies.

The public prototype does not collect, store, transmit, or process personal health information.

## Intended scope

PHIL explores one bounded task: helping an adult prepare their own context and questions for a scheduled, non-emergency health visit.

The prototype may:

- organize fictional patient-provided information
- preserve the origin and verification status of an input
- place events in chronological order
- help a fictional patient select visit priorities and questions
- produce a draft visit-preparation brief
- demonstrate a human verification and approval step

## Explicit exclusions

PHIL must not:

- diagnose, predict, or rule out a condition
- calculate clinical risk or severity
- interpret lab, imaging, genetic, or device results
- recommend, start, stop, or change medication or supplements
- recommend treatment, testing, diet, exercise, or care plans
- decide whether symptoms are urgent
- provide emergency guidance beyond directing a person to established emergency services
- substitute for a clinician, pharmacist, therapist, emergency service, or medical record
- infer causation from timing or correlation
- share information without the patient's informed choice
- represent generated text as professionally verified when it is not

## Public-prototype controls

| Risk | Current control | Residual limitation |
| --- | --- | --- |
| Fictional content mistaken for real patient data | Persona and data are labeled fictional throughout | A viewer may still skim or miss a label |
| Pattern mistaken for causation | Timeline labels patterns as conversation prompts | Visual proximity can still imply a relationship |
| Brief mistaken for medical advice | Output is titled Visit Preparation Brief and excludes recommendations | A polished document can still appear authoritative |
| Medication detail used as guidance | Medication content is limited to reconciliation questions | The prototype cannot test misunderstanding in real use |
| Automated output treated as final | Verification gate and decision record are required | Checkbox completion is not equivalent to clinical review |
| Hidden uncertainty | Missing and pending states remain visible | The current fictional dataset is simpler than real records |
| Privacy exposure | No data entry, accounts, database, or real data | Future connected versions would create substantial new risk |
| Overclaiming product maturity | Evidence status and limitations are public | External descriptions could still omit the caveats |

## Language rules

Prototype language should:

- say “may be worth discussing” rather than “this indicates”
- say “sequence” or “variation” rather than “cause”
- say “draft” until a human has reviewed the output
- distinguish patient report from document-derived information
- keep uncertainty visible instead of resolving it rhetorically
- use “question for a qualified professional” for interpretation

Prototype language should not use phrases such as:

- “you have”
- “your risk is”
- “this result means”
- “the best treatment is”
- “you should stop or start”
- “this is not urgent”
- “clinically proven”

## Emergency boundary

PHIL is not an emergency or triage tool. A future interface that accepts open-ended symptom input would need a separate, clinically governed emergency pathway. The current public prototype intentionally does not accept or respond to symptom submissions.

For any real-world use, a person with a medical emergency must contact local emergency services or an appropriate qualified professional. PHIL must not assess whether a situation is an emergency.

## Patient agency boundary

The patient should be able to:

- see every item proposed for the brief
- correct or remove any patient-reported item
- distinguish source-derived content from generated language
- choose which questions and context to include
- withhold the brief entirely
- know who reviewed a shared version and when

Consent to use the tool is not blanket consent to share the output.

## Human accountability boundary

Human review must remain meaningful. It should identify:

- the person or accountable role conducting the review
- the exact version reviewed
- the sources checked
- unresolved discrepancies
- whether the patient approved the final content
- which decisions remain outside the system

The prototype does not claim that a human-in-the-loop label alone makes an unsafe workflow safe.

## Privacy and security requirements for future work

Before any real data is introduced, future work would need, at minimum:

- data minimization and a documented purpose for every field
- explicit consent and granular sharing controls
- encryption in transit and at rest
- role-based access and strong identity controls
- tamper-evident audit records
- retention and deletion controls
- incident response and breach procedures
- vendor and model data-use review
- jurisdiction-specific privacy and health-data legal review
- threat modeling for account takeover, inference, prompt injection, data leakage, and malicious records
- a prohibition on using identifiable data for model training without a separate, valid basis and explicit disclosure

## AI requirements for any future model-assisted version

No model should be connected to real health information until the intended use, prohibited use, test set, error taxonomy, escalation path, and monitoring plan are defined.

Evaluation should test:

- unsupported clinical inference
- omission of important uncertainty
- source confusion
- fabricated history or results
- medication and supplement advice leakage
- false reassurance or alarm
- demographic and language performance differences
- patient ability to detect and correct errors
- practitioner ability to trace every statement to a source

Model output must remain a draft. Clinical judgment, urgency assessment, and treatment decisions must not be delegated.

## Responsible public description

Acceptable:

> PHIL is an interactive concept prototype exploring patient-controlled visit preparation and human-reviewed context synthesis.

Not acceptable:

> PHIL improves clinical outcomes, reduces diagnostic error, or has been validated by practitioners.

Those claims require evidence that does not currently exist.
