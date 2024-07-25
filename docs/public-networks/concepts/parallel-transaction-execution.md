---
sidebar_position: 4
description: Learn about parallel transaction execution.
tags:
- public networks
---

# Parallel transaction execution

Besu supports parallel transaction execution, using an optimistic approach to
parallelize transactions within a block.
This page provides an [overview of the mechanism](#parallelization-mechanism-overview)
and some key [metrics](#metrics).

:::warning Important
Parallel transaction execution is an early access feature.
You can enable it using the `--Xbonsai-parallel-tx-processing-enabled` option.
:::

## Parallelization mechanism overview

Simple flowchart test:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

Mechanism overview flowchart test:

```mermaid
graph TD;
   A[Start Conflict Check] --> B[Fetch Block's Touched Addresses];
   B --> C{For Each Transaction};
   C -->|Next Transaction| D[Fetch Transaction's Touched Addresses];
   D --> E{Compare Addresses};
   E -->|Conflict Detected| F[Handle Conflict];
   E -->|No Conflict| G[Proceed With Transaction];
   F --> H{More Transactions?};
   G --> H;
   H -->|Yes| C;
   H -->|No| I[End Conflict Check];
```

## Metrics