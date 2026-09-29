# The development model.

Atlas is built using AI as the primary development tool. This is not a footnote — it is the reason a platform of this scale exists without a traditional engineering organization behind it.

## How the work is done

Development runs through Claude Code, Anthropic's coding agent, operating as a full development environment: reading and writing files, executing commands, querying the database, and shipping end to end.

The division of labor is deliberate. Architecture and strategy are human decisions — what to build, why, in what order, and what not to build. Execution happens at the agent level. Tasks that would take days of engineering time complete in hours. New ingestion runners are built and deployed in a single session. Schema changes, pipeline modifications, and new signal generators are specified, built, tested, and deployed without the coordination overhead a team structure requires.

## Why it holds together at this scale

Velocity without constraints produces a mess quickly, and the interesting part of this model is not the speed — it is what keeps the speed from being destructive.

The engine operates under written doctrine that is enforced in code rather than in review. Headline metrics come from one canonical module and refuse to emit a number when they cannot be trusted. Jobs that rebuild live tables must stage, validate, and swap in a single transaction. Data acquisition rules prohibit evasion outright. Quality floors gate signal generation. Adoption records are constrained at the database level so a first reading cannot be recorded as a decision.

Each of those rules exists because something went wrong once. The rule is the residue of the failure, written down and made unavoidable. That is what makes the model durable: the system accumulates judgment rather than depending on anyone remembering it.

## What this is not

It is not a claim that the work is unsupervised, and it is not a temporary workaround pending a real team.

Every consequential change is specified by a person, and every published figure traces to a query someone can re-run. The agent is an accelerant for human decisions, not a replacement for human judgment, and the constraint that matters is still the quality of the decision about what to build.

## Where this goes

The current model is intentionally lean, built for speed and autonomy at early scale. As the team grows the model grows with it. Engineers bring architectural oversight, domain judgment, and systems thinking that AI accelerates but does not supply.

The goal is a small, high-output technical team operating at a velocity a conventionally structured organization many times its size could not match — not because the people are different, but because the coordination cost is not there.
