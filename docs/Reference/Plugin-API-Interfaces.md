description: Plugin interfaces
<!--- END of page meta data -->

Hyperledger Besu provides API interfaces to allow users to [build plugins](../Concepts/Plugins.md) to
extend Besu functionality.



| Interface          | Description                                              |
|--------------------|----------------------------------------------------------|
| **BesuContext**    | Allows plugins to access Besu services.  |
| **BesuEvents**     | Allows plugins to attach to various events during Besu operation.  |
| **BesuPlugin**     | Used to manage the plugin lifecycle.  |
| **PicoCLIOptions** | Adds CLI commands to the Besu command line.  |
| **StorageService** | Allows plugins to register as a storage engine.  |

To use the interfaces in your plugin, ensure the [Gradle build file](https://github.com/PegaSysEng/PluginsAPIDemo/blob/master/build.gradle) contains
the `https://hyperledger-org.bintray.com/besu-repo` repository and the 
`plugin-api` dependency.