description: Plugin interfaces
<!--- END of page meta data -->

# Plugin API Interfaces

Hyperledger Besu provides API interfaces to allow users to [build plugins](../Concepts/Plugins.md) to
extend Besu functionality.

## Core Plugin Classes

The following interfaces provide core plugin classes.

| Interface          | Description                                              |
|--------------------|----------------------------------------------------------|
| **BesuContext**    | Allows plugins to access Besu services.  |
| **BesuPlugin**     | Used to manage the plugin lifecycle.  |


## Plugin Services

The following interfaces provide services that can be retrieved.

| Interface          | Description                                              |
|--------------------|----------------------------------------------------------|
| **BesuEvents**     | Allows plugins to attach to various events during Besu operation.  |
| **BesuConfiguration** | Provides file system locations of Besu's storage. |
| **IbftQueryService** | Allows IBFT 2.0 aspects of the blockchain to be queried. |
| **MetricCategoryRegistry** | Adds a new metrics category to the CLI. |
| **MetricsSystem**  | Register metrics with the Prometheus endpoint. |
| **PoAQueryService** | Query the current state of Clique and IBFT consensus protocols. |       
| **PicoCLIOptions** | Adds CLI commands to the Besu command line.  |
| **StorageService** | Allows plugins to register as a storage engine.  |

To use the interfaces in your plugin, ensure the [Gradle build file](https://github.com/PegaSysEng/PluginsAPIDemo/blob/master/build.gradle) contains
the `https://hyperledger-org.bintray.com/besu-repo` repository and the 
`plugin-api` dependency.