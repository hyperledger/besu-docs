---
description: Install or upgrade Hyperledger Besu from binary distribution
---

# Install binary distribution

## MacOS with Homebrew

### Prerequisites

* [Homebrew](https://brew.sh/)
* Java JDK.

!!!important

    Hyperledger Besu requires:

      * MacOS High Sierra 10.13 or later versions
      * Java 11+ to compile; earlier versions are not supported. You can install Java using
        `brew cask install adoptopenjdk`. Alternatively, you can manually install the
        [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

### Install (or upgrade) using Homebrew

To install Besu using Homebrew:

```bash
brew tap hyperledger/besu
brew install hyperledger/besu/besu
```

To upgrade an existing Besu installation using Homebrew:

```bash
brew upgrade hyperledger/besu/besu
```

To display the Besu version and confirm installation:

```bash
besu --version
```

To display Besu command line help:

```bash
besu --help
```

## Linux / Unix

### Prerequisites

* [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

!!!attention

    Besu requires Java 11+ to compile; earlier versions are not supported.
    
!!! note "Linux Open File Limit"

    If synchronizing to MainNet on Linux or other chains with large data requirements, increase the
    maximum number of open files allowed using `ulimit`. If the open files limit is not high
    enough, a `Too many open files` RocksDB exception occurs.

### Install from packaged binaries

Download the Besu [packaged binaries](https://pegasys.tech/solutions/hyperledger-besu/).

Unpack the downloaded files and change into the `besu-<release>` directory.

Display Besu command line help to confirm installation:

```bash tab="Linux/macOS"
bin/besu --help
```
