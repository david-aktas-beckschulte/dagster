---
title: 'Lesson 6: Lesson recap'
module: 'dagster_dbt'
lesson: '6'
---

# Lesson recap

In this lesson, you:

- Learned the benefits of partitioning your incremental models
- Added a time-based partition to an incremental model
- Created a second `@dbt_assets` definition specifically for incremental dbt models 

The patterns you used are general enough that they can also be applied to any type of partition, allowing you to partition your incremental models by location, customer, or other dimensions. Tinker around with the `context.partition_key` property if you’re interested!

