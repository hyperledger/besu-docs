---
description: Using Elastick Stack (ELK) with Hyperledger Besu
---

# Elastic Stack

Elastic Stack (also known as ELK) is a common open-source log management platform.

[Besu Sample Networks](https://github.com/ConsenSys/besu-sample-networks/tree/1.3.1) provides example
implementations using Elastic Stack for log management.

The [Filebeat] configuration ingests logs and the [Metricbeat] configuration collects metrics from
the nodes at regular defined intervals and outputs them to Redis for storage. Redis provides a
highly available mechanism enabling storage by any of the Elastic Beats and pulled by Logstash
as required.

The [pipeline configuration] defines the JSON format used for Besu logs and automatically picks up
any new log fields.

!!! note

    The pipeline configuration must match the your log format. If using the default, you can use
    the [grok plugin](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html)
    to extract the log fields.

To see the Besu Sample Networks logs in Kibana:

1. [Start the Besu Private Network Example](../../Tutorials/Examples/Private-Network-Example.md),
   adding the `-e` parameter to the `run.sh` command.
1. Open the [`Kibana logs address`](http://localhost:5601/app/kibana#/discover) listed by the
   sample networks `list.sh` script. The logs display in Kibana.

    ![Kibana](../../images/KibanaQuickstart.png)

<!-- Links -->
[Filebeat]
[Metricbeat]
[pipeline configuration]
