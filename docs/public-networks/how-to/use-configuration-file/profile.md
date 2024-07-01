---
title: Use a profile 
sidebar_position: 2
---

Load a profile using the [`--profile` CLI option](../../reference/cli/options.md#profile).

Profiles are optionally used extend Besu's default configuration. They may be used together with the [boilerplate configuration](defaults.md) to apply sensible defaults. Besu's pre-configured profiles optimize for the following supported use cases:

- [Minimalist staker profile](#minimalist-staker-profile)
- [Staker profile](#staker-profile)
- [Enterprise/Private profile](#enterpriseprivate-profile)


:::note

A configuration explicitly set in the configuration file or command line will 
[override the same option/s](index.md#configuration-order-of-precedence) set in the profile.

:::


<!-- IMO this is all redundancy -- fully supported by the linked page above

For example:

```bash
besu --config-file=config.toml --profile=staker
```

In this example, `config.toml` is the user-provided [configuration file](index.md), and `staker` is
the pre-configured profile containing custom settings.
 -->

## Minimalist staker profile

`--profile=minimalist_staker` is optimized for stakers who want to maximize their hardware value but don't want to serve full sets of data to their peers, See the
[minimalist staker profile on GitHub](https://github.com/hyperledger/besu/blob/8b64023a121ea996ef60e4b7e2299c5807683f90/config/src/main/resources/profiles/minimalist-staker.toml)
for the custom settings.

<!-- IMO this is all redundancy -- fully supported by the linked page above

To use the minimalist staker profile, run Besu with
[`--profile`](../../reference/cli/options.md#profile) set to `minimalist_staker`:

```bash
besu --profile=minimalist_staker
``` -->

## Staker profile

`--profile=staker` is optimized for stakers who want to maximize their hardware value while also serving full sets of data to their peers. See the
[staker profile on GitHub](https://github.com/hyperledger/besu/blob/8b64023a121ea996ef60e4b7e2299c5807683f90/config/src/main/resources/profiles/staker.toml)
for the custom settings.

<!-- IMO this is all redundancy -- fully supported by the linked page above

To use the staker profile, run Besu with [`--profile`](../../reference/cli/options.md#profile) set to `staker`:

```bash
besu --profile=staker
``` -->

## Enterprise/Private profile

`--profile=private` / `--profile=enterprise` supports private network operators and enterprises by handling specific use cases that apply to private network operators. See the [enterprise/private profile on GitHub](https://github.com/hyperledger/besu/blob/8b64023a121ea996ef60e4b7e2299c5807683f90/config/src/main/resources/profiles/enterprise-private.toml)
for the custom settings.

<!-- IMO this is all redundancy -- fully supported by the linked page above

To use the enterprise/private profile, run Besu with
[`--profile`](../../reference/cli/options.md#profile) set to `enterprise` or `private`:

```bash
besu --profile=enterprise
```

or

```bash
besu --profile=private
```
 -->