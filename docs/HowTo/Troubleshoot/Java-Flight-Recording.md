---
description: Using Java Flight Recorder with Hyperledger Besu 
---

# Java Flight Recorder

[Java Flight Recorder(JFR)](https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm#JFRUH170)
is a monitoring tools that collects information about the Java Virtual Machine(JVM) when Hyperledger
Besu is running. Use the JFR as a tool to analyse Besu performance.

## Enabling Java Flight Recorder

To enable JFR, add the following to the Java runtime arguments:

```bash
-XX:StartFlightRecording=disk=true,delay=15s,dumponexit=true, \
filename=/tmp/recording.jfr, maxsize=1024m,maxage=1d, \
settings=profile,path-to-gc-roots=true
```

!!! tip

    When recording, cleanly exiting Besu results in better data. If not possible to cleanly exit,
    the file may be missing some information not flushed to disk.

Inspect the file written to `/tmp/recording.jfr` with tools such as [Mission Control](https://docs.oracle.com/javacomponents/jmc-5-5/jmc-user-guide/intro.htm#JMCCI109).

!!! important

    If providing the output file to [PegaSys support](https://pegasys.zendesk.com/hc/en-us/restricted?return_to=https%3A%2F%2Fpegasys.zendesk.com%2Fhc%2Fen-us),
    be aware that while JFR files do not contain secrets such as private keys, some details about the
    user configuration can be inferred from the JFR output.