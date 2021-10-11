---
description: Plugin interfaces
---

# Plugin API interfaces

API interfaces in Hyperledger Besu allow users to [build plugins](../Concepts/Plugins.md) to
extend Besu functionality, such as the [Quorum Besu plugins](https://doc.quorumplugins.consensys.net/en/latest/Concepts/Besu-Plugins/Event-Streams/).

For more information about the available interfaces, see the
[Plugin API Javadoc](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/index.html).

!!! note "Javadoc issue"

    Since the deprecation of bintray javadoc.io is no longer being updated with our latest Javadocs. We're working on a fix, but in the meantime, some links will be temporarily pointing to wiki.hyperledger.org

## Core plugin classes

The following table lists the interfaces providing core plugin classes.

| Interface                                                                                                                     | Description                             |
|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| [**BesuContext**](https://wiki.hyperledger.org/display/BESU/BesuContext) | Allows plugins to access Besu services. |
| [**BesuPlugin**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/BesuPlugin.html)   | Used to manage the plugin lifecycle.    |

## Plugin services

The following table lists interfaces providing services you can retrieve.

| Interface                                                                                                                                                              | Description                                                         |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| [**BesuEvents**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/BesuEvents.html)                                   | Allows plugins to attach to events during Besu operation.           |
| [**BesuConfiguration**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/BesuConfiguration.html)                     | Provides file system locations of Besu's storage.                   |
| [**IbftQueryService**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/query/IbftQueryService.html)                 | Allows query of the IBFT 2.0 aspects of the blockchain.             |
| [**MetricCategoryRegistry**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/metrics/MetricCategoryRegistry.html) | Adds a new metrics category to the CLI.                             |
| [**MetricsSystem**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/MetricsSystem.html)                             | Register metrics with the Prometheus endpoint.                      |
| [**PoaQueryService**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/query/PoaQueryService.html)                 | Query the current state of Clique and IBFT 2.0 consensus protocols. |
| [**PicoCLIOptions**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/PicoCLIOptions.html)                         | Adds CLI commands to the Besu command line.                         |
| [**SecurityModuleService**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/SecurityModuleService.html)                         | Allows plugins to register a security module.                  |
| [**StorageService**](https://javadoc.io/doc/org.hyperledger.besu/plugin-api/latest/org/hyperledger/besu/plugin/services/StorageService.html)                         | Allows plugins to register as a storage engine. For example, to connect to a hardware security module (HSM).                  |
| [**PermissioningService**](https://wiki.hyperledger.org/display/BESU/PermissioningService)| Allows for fine grain control of node connection and node messaging permissioning.|
| [**PrivacyPluginService**](https://wiki.hyperledger.org/display/BESU/PrivacyPluginService)| Provides a way to define how private marker transactions are created and what private genesis is to be used.|
| [**RpcEndpointService**](https://wiki.hyperledger.org/display/BESU/RpcEndpointService)| Allows the registration of custom RPC Endpoints.|

To use the interfaces in your plugin, ensure the
[Gradle build file](https://github.com/ConsenSys/PluginsAPIDemo/blob/master/build.gradle) contains
the `https://hyperledger.jfrog.io/hyperledger/besu-maven` repository and the `plugin-api` dependency.

!!! warning "Known issue"

    As indicated in [issue #406](https://github.com/hyperledger/besu-docs/issues/406),
    plugins may need to access the parsed command line during registration, but the command line is not yet
    initialized at this stage.

    It's in our roadmap to improve lifecycle steps and provide additional visibility for some data.
    A workaround is to create a supplier during the `register` step and store it in memory.

    The `start` step can be ignored and your plugin module will be instantiated when
    the command line interface is parsed and available.
