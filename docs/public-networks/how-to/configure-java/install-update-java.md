---
title: Install and Update Java
sidebar_position: 1
description: Install or update Java for use with Hyperledger Besu
tags:
  - public networks
  - private networks
---

# Install Java

There are many different flavors of Java and the JVM that work with Hyperledger Besu. They may impact performance, start time, and more. It is worth considering the options carefully when installing Java on the host machine. Currently, Java 21 is recommended. 

## Get Started

First, download the version of Java you would like to install. If you are running Besu outside of a virtual environment, like Docker, you will need to have Java installed on the host machine. We currently recommend Java 21. [Downloads for OpenJDK 21 can be found here](https://jdk.java.net/21/), while others can be sourced across the web. There are platform-specific installation instructions that are likely included with the download. We use OpenJDK in the examples below.

### Ubuntu Installation

Using `apt-get`, Ubuntu users can easily install Java. First ensure `apt` libraries are installed and up-to-date.

```
sudo apt update && sudo apt upgrade -y
```

Confirm whether Java is already installed.

```
java -version
```

If this is non-empty, and you would like to update, skip to Upgrading Java.

Next, use `apt` to install the preferred version. 

```
sudo apt-get install openjdk-21-jdk
```

Then confirm the install with `java -version`. Next, you may need to update your environment to make Java visible to Besu. Edit the `.bashrc` file in your home directory (or create it if needed) and add the following lines to the end of the file.

```
export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
export PATH=$PATH:$JAVA_HOME/bin
```

Make sure to save your changes and source the file running the following in your terminal: 

```
source ~/.bashrc 
```

You can verify everything was done correctly by running:

```
echo $JAVA_HOME
echo $PATH
```

You should see the JDK versions output. If so, you're all set! 

### MacOS 

MacOS users can install OpenJDK using Homebrew. With `brew` installed, simply run:

```
brew install openjdk@21
```

You can target another version if you prefer. 

If installed correctly, `java -version` should return the OpenJDK you installed.

If the above command returns `command not found: java`, check your terminal logs. Brew may prompt you to create a symlink or update your path variables within the logs in the terminal output. If so, you should run the prompts provided. 

You're all set!

# Updating Java 

## Upgrade Java on Ubuntu

To update Java, simply uninstall the current versions and follow the installation instructions above for Ubuntu. If you started with this guide, try the following:

```
sudo apt-get purge openjdk-\*
```

You are all set to re-install the target version. 

## Update Java on MacOS

To update Java, use Homebrew. Start by running `brew ls` to list out all of your homebrew packages. To move JDK versions (i.e. from 17 to 21), you should uninstall the Java formula and reinstall the target version.

```
brew uninstall openjdk@17
brew install openjdk@21
```

To update point versions of Java, simply run:

```
brew upgrade openjdk
```

That's it! 
