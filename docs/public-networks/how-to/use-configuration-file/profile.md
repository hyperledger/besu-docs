---
title: Use a profile 
sidebar_position: 1
---

# Use a profile 

Load a profile using the [`--profile` CLI option](../../reference/cli/options.md#profile).

:::note
Run `./besu --help` to view all available profiles.
:::

You can optionally use profiles to extend Besu's configuration. Combined with the [boilerplate 
configuration](../defaults.md), profiles simplify the process of applying viable defaults. Besu's pre-configured profiles optimize for the following use cases:

- [Minimalist staker profile](#minimalist-staker-profile)
- [Staker profile](#staker-profile)
- [Enterprise/Private profile](#enterpriseprivate-profile)

You can also [load external profiles](#load-external-profiles).

:::note

A configuration explicitly set in the configuration file or command line will 
[override the same option/s](index.md#configuration-order-of-precedence) set in the profile.

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

`enterprise` and `private` are aliases for the same profile. [`--profile=PRIVATE` / `--profile=ENTERPRISE`](../../reference/cli/options.md#profile) 
supports private network operators and enterprises by handling specific use cases that apply to 
private network operators. See the [enterprise/private profile on 
GitHub](https://github.com/hyperledger/besu/blob/main/config/src/main/resources/profiles/enterprise-private.toml)
for the custom settings.


To use the enterprise/private profile, run Besu with
[`--profile`](../../reference/cli/options.md#profile) set to `--profile=PRIVATE` or `--profile=ENTERPRISE`, 
and use [`sync-mode=FULL`](../../reference/cli/options.md#sync-mode) 
and [`data-storage-format=FOREST`](../../reference/cli/options.md#data-storage-format).

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

