---
title: 'Lesson 1: Why is asset-centric orchestration good for data engineering?'
module: 'dagster_essentials'
lesson: '1'
---

# Why is asset-centric orchestration good for data engineering?

To answer this question, let’s go back to our cookie example and take a look at what different situations might look like for both a task-centric and asset-centric approach.

---

## Situation 1: Understanding data lineage

{% table %}

-
- Task-centric
- Asset-centric

---

- In a task-centric world, it can be difficult to tell how an asset is produced, whether it’s up-to-date, and how it relates to other assets. Decoupling tasks from assets is necessary not only to troubleshoot issues when they arise, but to come to a basic understanding of the workflow.

  On the other hand, an asset-centric workflow puts the focus on the data that’s produced rather than how it’s produced. This can make it easy to determine how a change could impact other assets and allow stakeholders to understand how their data is produced.

  Let’s go back to our cookie example and take a look at what different situations might look like for both a task-centric and asset-centric approach.

- 1. Figure out where in the workflow cookie dough is created
  2. Add a fork to add in peanuts
  3. Remake cookies from start to finish

- 1. Add two new assets: peanuts and peanut cookie dough
  2. Add peanuts to cookie dough
  3. Result is peanut cookie dough

{% /table %}



---

## Situation 2: Re-using assets

{% table %}

-
- Task-centric
- Asset-centric

---

- Let’s say you want to make other types of cookies using the cookie dough you already have.

  In the real world, think of this as the ability to use an asset as input to another asset. For example, creating a database table using multiple tables.

- 1. Figure out where in the workflow cookie dough is created
  2. Add a fork to add in peanuts
  3. Remake cookies from start to finish

- 1. Add two new assets: peanuts and peanut cookie dough
  2. Add peanuts to cookie dough
  3. Result is peanut cookie dough

{% /table %}


---

## Situation 3: Determining data freshness

{% table %}

-
- Task-centric
- Asset-centric

---

- Before you can bake, you need to check how fresh your eggs are. Are they expired or still okay to use?

  In the real world, think of this as producing assets that use the most up-to-date data.

- 1. Add a step that checks the date on the eggs after gathering the ingredients
  2. Start the process
  3. If expired, fail and re-start the process

- 1. Check the last updated time for the individual egg asset in the wet ingredients
  2. Start the process
  3. If expired, refresh the eggs before proceeding

{% /table %}



---

## Situation 4: Debugging

{% table %}

-
- Task-centric
- Asset-centric

---

- Everything was going smoothly, but then something went wrong: your cookies got rubbery because you overmixed them.

  In the real world, think of this as debugging an issue, such as a timeout or data discrepancy.

- 1. Identify which step in the workflow failed
  2. Re-execute the entire pipeline

- 1. Identify the problematic asset (cookie dough)
  2. Re-execute the asset

{% /table %}



---

## Recap

Before we move on, let’s recap the benefits of an asset-centric approach to building workflows:

- **Context and visibility.** Everyone in your organization can understand the data lineage and how data assets relate to each other
- **Productivity.** By building a DAG that globally understands what data exists and why, asset-centric workflows allow for reusing assets without changing an existing sequence of tasks
- **Observability.** It’s easy to tell exactly why assets are out-of-date, whether it might be late upstream data or errors in code
- **Troubleshooting.** Every run and computation is tied to the goal of producing data, so debugging tools like logs are specific to the assets being produced

Given these benefits, how do they extend to the tools used to build and manage each type of pipeline? Why should the type of orchestrator you use matter?
