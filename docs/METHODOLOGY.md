# Methodology

## Purpose

From Signal to Safeguard tests whether a lightweight, public decision-operations layer can make the movement from AI-cyber capability evidence to accountable action easier to inspect and challenge.

The prototype is intentionally deterministic in v0.1. It does not use an AI model to decide the route. Users can see the inputs, thresholds, recommendation, safeguards, and reopening conditions.

## Workflow

### 1. Capture the signal

The intake separates:

- observed evidence;
- interpretation;
- source or evaluator;
- source reliability;
- uncertainty and disagreement;
- capability and potential severity;
- reversibility, scope, and autonomy.

This separation is intended to reduce the risk that an inference is presented as an observation.

### 2. Route the decision

The v0.1 engine evaluates explicit thresholds in this order:

1. **Evidence quality:** High uncertainty or weak source reliability triggers an evidence hold.
2. **Critical signal:** High capability combined with high severity, critical-infrastructure scope, or autonomous high-severity activity triggers critical review.
3. **Elevated signal:** Moderate capability and severity, external scope, or hard reversibility triggers elevated review.
4. **Otherwise:** The signal is recorded for monitoring with explicit reopening conditions.

When weak evidence and a critical signal occur together, the route becomes a critical evidence hold. The recommendation is to pause consequential expansion while independent evaluation resolves the uncertainty.

## Scoring dimensions

Every numerical dimension uses a five-point ordinal scale. The labels are working definitions for tabletop testing, not validated measurement standards.

| Dimension | 1 | 3 | 5 |
|---|---|---|---|
| Source reliability | Unverified | Mixed | Replicated |
| Capability | Minimal | Moderate | Frontier |
| Potential severity | Negligible | Material | Catastrophic |
| Reversibility | Easy to reverse | Mixed | Irreversible |
| Uncertainty | Low | Material | Extreme |

## Routing rules

| Condition | Route |
|---|---|
| Uncertainty is 4 or 5, or reliability is 1 or 2 | Evidence hold |
| Capability and severity are both at least 4 | Critical review |
| Scope is critical infrastructure | Critical review |
| Autonomy is multi-step autonomous and severity is at least 4 | Critical review |
| Capability and severity are both at least 3 | Elevated review |
| Reversibility is at least 4 | Elevated review |
| Scope is external | Elevated review |
| No higher condition is met | Monitor with trigger |

## Safeguard generation

Each route provides a minimum safeguard set. Additional safeguards appear when:

- reversibility is hard or irreversible;
- scope is external or critical infrastructure;
- dissent or unresolved disagreement is recorded.

The safeguards are prompts for review, not automatic controls and not evidence that risk has been reduced.

## Human accountability

The workflow asks for:

- a named human decision owner;
- a review date;
- recorded dissent;
- conditions that would reopen the decision;
- a preserved decision record.

No route constitutes approval. Consequential action remains owned by an authorized human within the relevant institution.

## Testing approach

The proposed pilot uses fictional, non-operational tabletop cases. Tests should examine:

- whether different users interpret the fields consistently;
- whether the routing logic creates useful distinctions;
- whether safeguards are actionable or merely procedural;
- where important institutional context is missing;
- whether the workflow adds clarity or unnecessary overhead;
- whether any part creates false confidence.

## Current limitations

- The scoring scales have not been empirically validated.
- The routing thresholds are hypotheses for testing.
- The interface does not model every dependency or institutional authority.
- Public information may not capture context available inside frontier-model organizations.
- A lightweight workflow cannot establish that safeguards are effective.
- Consistent process does not guarantee a safe outcome.

