---
title: Some problems need an assembly line, not an agent
layout: layouts/post.ejs
created_at: 2026-09-18
---

# Some problems need an assembly line, not an agent

There is a class of problem that is neither fully deterministic nor completely open-ended.

You cannot guarantee the right outcome every time. But you can define a process which, when
followed consistently, makes the right outcome much more likely.

Keeping a public bathroom clean is a simple example.

You cannot guarantee that the bathroom is clean at every second of the day. A customer can make a
mess one minute after it was inspected. But you can ask someone to check it every thirty minutes,
follow a checklist, perform each required activity, and record what they did.

That process does not guarantee permanent cleanliness. It makes persistent cleanliness
statistically likely.

If customers repeatedly rave about how clean the bathroom is, it may not be because the company
found one unusually conscientious employee. It may be because the company designed a process that
ordinary people can execute reliably, on time, over and over again.

This kind of problem appears everywhere. It is especially common in operations.

## Non-deterministic, but statistically solvable

I think of these problems as **non-deterministic but statistically solvable**.

They usually have a few characteristics:

- The work repeats on a schedule or whenever new work arrives.
- The inputs vary from one run to another.
- Some cases require judgment.
- A useful standard operating procedure can still be written.
- Failures can be detected and isolated.
- Following the process consistently improves the overall outcome.
- Improving one weak part of the process improves the whole operation.

The aim is not to make an impossible guarantee about every individual run. The aim is to engineer
the distribution of outcomes.

If the right checks happen at the right interval, exceptions are caught early. If every failure is
visible, the weak part of the process can be improved. If the process runs consistently, small
errors do not accumulate into periodic chaos.

## Finance is full of these problems

Consider bookkeeping.

"Keep the books correct" is not a single deterministic task. Money moves through different bank
accounts. Statements arrive in different formats. Transactions contain ambiguous descriptions.
Documents are sometimes missing. A payment may be recorded twice. A person or a model may need to
judge whether an exception is harmless or needs correction.

But bookkeeping is not an unknowable open-ended problem either.

You can define recurring operations:

- Collect new statements.
- Check whether the expected data arrived.
- Verify opening and closing balances.
- Reconcile transactions against the statement.
- Investigate discrepancies.
- Update the books.
- Produce evidence of what was checked.

If these operations run correctly every day or every week, month-end becomes easier. Not because
the system guaranteed perfection, but because it continuously reduced the opportunity for
unnoticed errors to accumulate.

The same is true for transaction classification, accounts receivable follow-up, invoice
verification, close-readiness checks, and many other finance operations.

Their quality is statistical. Their process can still be engineered.

## This is not limited to finance

Code quality has the same shape.

No engineering team can guarantee that a codebase is always good. A senior engineer can review it
periodically against agreed engineering standards. They can inspect one quality dimension at a
time, identify violations, and create clear issues or work-in-progress notes.

Agentic AI makes it possible to automate parts of this process. An agent can inspect naming,
testing patterns, stale documentation, or architectural boundaries. If the resulting issue is
clear enough, another bounded process may even fix it.

Again, the useful idea is not "give an agent the goal of maintaining a perfect codebase."

The useful idea is to design a recurring operation that makes code quality more likely over time.

## Manufacturing solved a similar problem

There is an industry in which variable, failure-prone work was turned into an extremely reliable
operation: manufacturing.

A car was once built by a small group of people doing many different things. Quality depended
heavily on the skill, memory, and consistency of those individuals.

The assembly line changed the operating model.

The work was decomposed into stations. Each station had a specific responsibility. The product
moved through the line one stage at a time.

Specialization helped, but the more important consequence was observability.

If a particular defect appeared, only a small number of stations could have produced it. The
failure rate of those stations could be measured. A weak station could be improved without
redesigning the whole factory. Improvements compounded across the line until the complete operation
became extraordinarily reliable.

The assembly line did not eliminate uncertainty by making every worker infinitely intelligent. It
bounded uncertainty by narrowing responsibility.

That principle transfers surprisingly well to knowledge work.

## Turn the SOP into a line

Suppose we model a recurring operation using manufacturing concepts:

- A **line** is the complete operation.
- A **workpiece** is one identifiable unit of work moving through it.
- A **station** has one bounded responsibility.
- A **bin** represents the current state of work at that station.
- A **conveyor** controls the handoff from one station to another.
- A **worker** performs the station's work.
- A **work record** preserves evidence of what happened.

This forces a different way of thinking about automation.

Instead of asking, "What giant prompt will achieve this goal?" we ask:

- What is the unit of work?
- Where does it enter the line?
- Which responsibility belongs at each station?
- What must be true before the workpiece moves forward?
- What artifact does the station add?
- What happens when the station is uncertain?
- Where should a human retain authority?
- How will we know which station is failing?

The core principle is simple:

> Bound uncertainty by giving each station one clear responsibility.

## Deterministic code, AI and humans belong on the same line

A station is defined by its responsibility, not by the technology it uses.

One station may run deterministic checks. Another may call an API. Another may use an LLM to make
a bounded judgment. Another may stop and wait for a human to approve a consequential change.

This is a more useful way to apply AI to operations than turning the entire process into one large
agent.

Use deterministic software where the answer is knowable. Use AI where judgment is required. Keep
humans where authority matters.

The line remains explicit even when one station is probabilistic. The model receives inspectable
inputs and produces a constrained output. A later station can validate the result or wait for
approval. If the model is weak, that station can be measured and replaced without rebuilding the
whole operation.

AI becomes a capable worker at a station. It does not need to be the factory manager, the factory
design, and every station at once.

## A statement-verification line

Here is a real example from a system I am building.

A statement-verification line has four stations:

1. **Discover statements.** Find new statements that need verification and create one workpiece
   for each.
2. **Run checks.** Fetch the statement and transactions, then run deterministic metadata, balance,
   daily-balance, and accounting-equation checks.
3. **Analyse findings.** Give an LLM the structured check results and supporting reports. Ask it for
   a schema-constrained judgment: verified, needs correction, or needs investigation.
4. **Finalize the review.** Produce the report, push the checks back to the system of record, and
   record the outcome.

The LLM is useful because discrepancies sometimes require interpretation. But it does not control
the entire process. It does not discover its own data sources, silently invent checks, and write
unbounded changes to the books.

Its responsibility is narrow: judge the findings produced by the previous station.

The line tells us where each failure occurred. It preserves the artifacts that led to the
judgment. We can improve the deterministic checks without changing the analysis station, or replace
the model without changing statement discovery.

## A human-approval line

Another line renames statement files using their accounting period.

Some statements already contain valid period dates. They move directly to a deterministic rename
station. Others have a period embedded ambiguously in the original filename.

For those, an LLM proposes the period and explains its reasoning. The workpiece then waits in an
approval bin. A human approves the proposed dates before another station updates the record and
renames the file.

The uncertain cases do not force the entire process to become uncertain. Judgment is isolated at
one station. Authority is isolated at another boundary.

This is the operational benefit of decomposition.

## Why not just use a workflow builder?

Tools such as n8n are useful for connecting applications and manipulating data. Tools such as
Trigger.dev are useful for running background code reliably. You can implement sophisticated
systems with either.

But the starting abstraction influences what you build.

If the primary abstraction is a graph of actions, I tend to think about what runs after what. If
the abstraction is a durable task, I think about how a piece of code executes reliably. If the
abstraction is an agent, I think about goals and tools.

For the class of problem described here, I want to start elsewhere:

> What repeatable operating process will make the desired outcome reliable over time?

That question makes the workpiece, its state, the station boundary, the accumulated evidence, and
the improvement loop first-class concerns.

It changes the architecture from a sequence that happens to run repeatedly into a production
system designed around repeated work.

## The developer should still own the work

An assembly-line model does not require putting business logic into a proprietary graphical
canvas.

For me, developer ownership is part of the design:

- Station logic should be ordinary code in an ordinary repository.
- Definitions should be version controlled.
- A station should be testable on a laptop.
- Workers should run on infrastructure close to the systems and data they need.
- The developer should choose the libraries, tools, APIs, and models.
- Workpieces and their artifacts should remain inspectable.
- The UI should be an operational and review surface, not the only place where the process exists.

The platform should coordinate the line without taking ownership of the work away from the
developer.

This creates a useful division of responsibility. The developer owns what each station does and
where it runs. The orchestrator handles dispatch, schedules, handoffs, state, failure visibility,
and work records.

## Reliability comes from the system, not a heroic agent

The current AI conversation often assumes that better models will allow us to hand an entire
operation to one increasingly capable agent.

Perhaps that will work for some problems. But many important operations do not need unlimited
autonomy. They need dependable execution.

Manufacturing did not achieve quality by waiting for one worker capable of building the entire car
perfectly. It designed a system in which bounded responsibilities, explicit state, inspection, and
continuous improvement produced quality at scale.

We can take the same approach to recurring knowledge work.

The aim is not to remove judgment. It is to put judgment in the right station.

The aim is not to guarantee that every individual execution is perfect. It is to make the whole
operation measurably more dependable over time.

The aim is not to hide the process behind an agent. It is to make the process executable.

## The product this led me to build

This is the model behind [Orchestrator](https://orchestrator.finopsbricks.com), a product I am
building as part of [FinOpsBricks](https://finopsbricks.com).

It lets developers turn finance SOPs into executable assembly lines. Developer-owned workers run
the actual code, tools, and models. Orchestrator coordinates the stations, workpieces, handoffs,
schedules, failures, and execution evidence.

The product is still evolving, but the principle underneath it is stable:

> Recurring operations under uncertainty should be engineered like production lines: explicit,
> observable, bounded, and improvable one station at a time.
