---
title: Use a profile 
sidebar_position: 1
tags:
  - public networks
  - private networks
---

# Use a profile 

You can load a profile to extend Besu's [default configuration](index.md#default-configuration), using the [`--profile`](../../reference/cli/options.md#profile) option.

Profiles simplify the process of configuring Besu for common use cases. Besu provides the following pre-configured profiles:

- [Minimalist staker profile](#minimalist-staker-profile)
- [Staker profile](#staker-profile)
- [Enterprise/Private profile](#enterpriseprivate-profile)

Alternatively, you can customize and [load external profiles](#load-external-profiles).

:::note
Run `./besu --help` to view all available profiles.
:::

:::note

A configuration option specified in the configuration file or on the command line 
[overrides the same option](index.md#configuration-order-of-precedence) set in the profile.

:::

## Minimalist staker profile

[`--profile=MINIMALIST_STAKER`](../../reference/cli/options.md#profile) is optimized for stakers who 
want to maximize their hardware value but don't want to serve full sets of data to their peers, See the
[minimalist staker profile on GitHub](https://github.com/hyperledger/besu/blob/main/config/src/main/resources/profiles/minimalist-staker.toml)
for the custom settings.

## Staker profile

[`--profile=STAKER`](../../reference/cli/options.md#profile) is optimized for stakers who want to 
maximize their hardware value while also serving full sets of data to their peers. See the
[staker profile on GitHub](https://github.com/hyperledger/besu/blob/main/config/src/main/resources/profiles/staker.toml)
for the custom settings.

## Enterprise/Private profile

`ENTERPRISE` and `PRIVATE` are aliases for the same profile. [`--profile=PRIVATE` / `--profile=ENTERPRISE`](../../reference/cli/options.md#profile) 
supports private network operators and enterprises by handling specific use cases that apply to 
private network operators. See the [enterprise/private profile on 
GitHub](https://github.com/hyperledger/besu/blob/main/config/src/main/resources/profiles/enterprise-private.toml)
for the custom settings.

When using this profile, set [`--sync-mode=FULL`](../../reference/cli/options.md#sync-mode) 
and [`--data-storage-format=FOREST`](../../reference/cli/options.md#data-storage-format).

## Load external profiles

You can use external profiles to create custom Besu bundles with various plugins and their default options.

Add external profiles to a `profiles` directory under the root Besu directory.
Run Besu with [`--profile`](../../reference/cli/options.md#profile) set to the external profile
file name, without the `.toml` extension.
For example, to load the `profiles/custom_profile.toml` profile, run:

```bash
besu --profile=custom_profile
```

:::note
You can overwrite the directory in which to place external profiles using the `besu.profiles.dir`
system property.
:::

