---
description: Plugin interfaces
---

# Plugin API interfaces

API interfaces in Hyperledger Besu allow users to [build plugins](../Concepts/Plugins.md) to
extend Besu functionality.

For more information about the available interfaces, see the
[Plugin API Javadoc](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/index.html).

## Core plugin classes

The following table lists the interfaces providing core plugin classes.

| Interface                                                                                                                     | Description                             |
|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| [**BesuContext**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/BesuContext.html) | Allows plugins to access Besu services. |
| [**BesuPlugin**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/BesuPlugin.html)   | Used to manage the plugin lifecycle.    |

## Plugin services

The following table lists interfaces providing services you can retrieve.

| Interface                                                                                                                                                              | Description                                                         |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| [**BesuEvents**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/BesuEvents.html)                                   | Allows plugins to attach to events during Besu operation.           |
| [**BesuConfiguration**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/BesuConfiguration.html)                     | Provides file system locations of Besu's storage.                   |
| [**IbftQueryService**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/query/IbftQueryService.html)                 | Allows query of the IBFT 2.0 aspects of the blockchain.             |
| [**MetricCategoryRegistry**](https://javadoc.io/static/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/metrics/MetricCategoryRegistry.html) | Adds a new metrics category to the CLI.                             |
| [**MetricsSystem**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/MetricsSystem.html)                             | Register metrics with the Prometheus endpoint.                      |
| [**PoaQueryService**](https://javadoc.io/static/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/query/PoaQueryService.html)                 | Query the current state of Clique and IBFT 2.0 consensus protocols. |
| [**PicoCLIOptions**](https://javadoc.io/static/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/PicoCLIOptions.html)                         | Adds CLI commands to the Besu command line.                         |
| [**SecurityModuleService**](https://javadoc.io/static/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/SecurityModuleService.html)                         | Allows plugins to register a security module.                  |
| [**StorageService**](https://javadoc.io/static/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/StorageService.html)                         | Allows plugins to register as a storage engine. For example, to connect to a hardware security module (HSM).                  |

To use the interfaces in your plugin, ensure the
[Gradle build file](https://github.com/PegaSysEng/PluginsAPIDemo/blob/master/build.gradle) contains
the `https://hyperledger-org.bintray.com/besu-repo` repository and the `plugin-api` dependency.