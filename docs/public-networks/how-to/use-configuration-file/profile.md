---
title: Use a profile 
sidebar_position: 2
---

# Use a profile 

Load a profile using the [`--profile` CLI option](../../reference/cli/options.md#profile).

You can optionally use profiles to extend Besu's configuration. Combined with the [boilerplate configuration](defaults.md), profiles simplify the process of applying viable defaults. Besu's pre-configured profiles optimize for the following supported use cases:

- [Minimalist staker profile](#minimalist-staker-profile)
- [Staker profile](#staker-profile)
- [Enterprise/Private profile](#enterpriseprivate-profile)


:::note

A configuration explicitly set in the configuration file or command line will 
[override the same option/s](index.md#configuration-order-of-precedence) set in the profile.

:::

## Minimalist staker profile

[`--profile=minimalist_staker`](../../reference/cli/options.md#profile) is optimized for stakers who want to maximize their hardware value but don't want to serve full sets of data to their peers, See the
[minimalist staker profile on GitHub](https://github.com/hyperledger/besu/blob/8b64023a121ea996ef60e4b7e2299c5807683f90/config/src/main/resources/profiles/minimalist-staker.toml)
for the custom settings.

## Staker profile

[`--profile=staker`](../../reference/cli/options.md#profile) is optimized for stakers who want to maximize their hardware value while also serving full sets of data to their peers. See the
[staker profile on GitHub](https://github.com/hyperledger/besu/blob/8b64023a121ea996ef60e4b7e2299c5807683f90/config/src/main/resources/profiles/staker.toml)
for the custom settings.

## Enterprise/Private profile

[`--profile=private` / `--profile=enterprise`](../../reference/cli/options.md#profile) supports private network operators and enterprises by handling specific use cases that apply to private network operators. See the [enterprise/private profile on GitHub](https://github.com/hyperledger/besu/blob/8b64023a121ea996ef60e4b7e2299c5807683f90/config/src/main/resources/profiles/enterprise-private.toml)
for the custom settings.
