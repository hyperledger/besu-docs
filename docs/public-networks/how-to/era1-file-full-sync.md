---
title: Utilize ERA1 files for Full sync
sidebar_position: 9
description: Utilize ERA1 files for Full sync
tags:
  - public networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Node operators using [Full sync](../concepts/node-sync.md#full-synchronization) can utilise ERA1 files as the source of pre-merge blocks in a pre-pipeline.

## How to use the prepipeline

The ERA1 import pre-pipeline can be activated and controlled with the following besu command options:

```bash
besu --era1-import-prepipeline-enabled --era1-data-uri=<filesystem path or http URI> --era1-import-prepipeline-concurrency=1
```

1. `--era1-import-prepipeline-enabled` activates the pre-pipeline
2. `--era1-data-uri` specifies the location of the ERA1 files to be imported. Either a simple filesystem path (`/path/to/files/`), or a HTTP address (`https://mainnet.era1.nimbus.team`). If unspecified, this option will default to `https://mainnet.era1.nimbus.team`
3. `--era1-import-prepipeline-concurrency` specifies the desired level of concurrency in the pre-pipeline. This option will default to 1. Due to a bottleneck in the block import process, this option should probably be left at 1 unless extremely slow download speeds are impacting the process.

Immediately after the ERA1 import pre-pipeline, Besu will use [Full sync](../concepts/node-sync.md#full-synchronization) to complete the synchonization process.