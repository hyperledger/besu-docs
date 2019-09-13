description: Passing Java virtual machine JVM options to Hyperledger Besu at runtime
<!--- END of page meta data -->

# Passing JVM Options

To perform tasks such as attaching a debugger or configuring the garbage collector, pass JVM options to Hyperledger Besu.  

Besu passes the contents of the `BESU_OPTS` environmental variable to the JVM.  Set standard JVM options in the `BESU_OPTS` variable.  

For Bash-based executions, you can set the variable for only the scope of the program execution by setting it before starting Besu.

!!! example
    ```bash
    BESU_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 \
    besu --network=rinkeby
    ```