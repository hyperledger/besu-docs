description: Hyperledger Besu log level setting and log formatting
path: blob/master/besu/src/main/resources/
source: log4j2.xml
<!--- END of page meta data -->

# Logging

Hyperledger Besu uses Log4J2 for logging. There are two methods to configure logging behavior:

* Basic - changes the log level. 
* Advanced - configures the output and format of the logs. 

!!!note
    For most use-cases, the basic method provides sufficient configurability.  

## Basic Log Level Setting

Use the [`--logging`](../../Reference/CLI/CLI-Syntax.md#logging) command line option to specify 
the logging verbosity. The [`--logging`](../../Reference/CLI/CLI-Syntax.md#logging) option changes
the volume of events displayed in the log. Valid log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, `ALL`. The default level is `INFO`.

!!! tip 
    Use the [`admin_changeLogLevel`](../../Reference/API-Methods.md#admin_changeloglevel) API method
    to change the log level while Besu is running. 

## Advanced Custom Logging

You can provide your own logging configuration using the standard Log4J2 configuration mechanisms.
For example, the following Log4J2 configuration is the same as the 
[default configuration](https://github.com/hyperledger/besu/blob/master/besu/src/main/resources/log4j2.xml) 
except logging of stack traces for exceptions is excluded.

```xml tab="debug.xml"
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="INFO">
  <Properties>
    <Property name="root.log.level">INFO</Property>
  </Properties>

  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSSZZZ} | %t | %-5level | %c{1} | %msg %throwable{short.message}%n" />
    </Console>
  </Appenders>
  <Loggers>
    <Root level="${sys:root.log.level}">
      <AppenderRef ref="Console" />
    </Root>
  </Loggers>
</Configuration>
```

To use your custom configuration, set the environment variable `LOG4J_CONFIGURATION_FILE` to the 
location of your configuration file.  

If you have more specific requirements, you can create your own 
[log4j2 configuration](https://logging.apache.org/log4j/2.x/manual/configuration.html).

For Bash-based executions, you can set the variable for only the scope of the program execution by 
setting it before starting Besu.  

!!!example
    To set the debug logging and start Besu connected to the Rinkeby testnet:

    ```bash
    LOG4J_CONFIGURATION_FILE=./debug.xml besu --network=rinkeby
    ```