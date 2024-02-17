---
sidebar_position: 1
---

# Use a profile

To help you get started quickly, Besu provides pre-configured profiles containing custom settings
for some common use cases.
You can load these profiles using the [`--profile`](../../reference/cli/options.md#profile) CLI option.
For example:

```bash
besu --config-file=config.toml --profile=staker
```

In this example, `config.toml` is the user-provided [configuration file](index.md), and `staker` is
the pre-configured profile containing custom settings.

Any configuration options explicitly set in the configuration file or command line will overwrite
the same options set in the profile.
See the [configuration order of precedence](index.md#configuration-order-of-precedence) for more information.

You can use the following profiles:

- [Minimalist staker profile](#minimalist-staker-profile)
- [Staker profile](#staker-profile)
- [Enterprise/Private profile](#enterpriseprivate-profile)

## Minimalist staker profile

For stakers who want to maximize their hardware value but don't want to serve full sets of data to
their peers, Besu provides a minimalist staker profile.
See the
[minimalist staker profile on GitHub](https://github.com/hyperledger/besu/blob/8b64023a121ea996ef60e4b7e2299c5807683f90/config/src/main/resources/profiles/minimalist-staker.toml)
for the custom settings.

To use the minimalist staker profile, run Besu with
[`--profile`](../../reference/cli/options.md#profile) set to `minimalist_staker`:

```bash
besu --profile=minimalist_staker
```

## Staker profile

For stakers who want to maximize their hardware value and also want to serve full sets of data to
their peers, Besu providers a staker profile.
See the
[staker profile on GitHub](https://github.com/hyperledger/besu/blob/8b64023a121ea996ef60e4b7e2299c5807683f90/config/src/main/resources/profiles/staker.toml)
for the custom settings.

To use the staker profile, run Besu with [`--profile`](../../reference/cli/options.md#profile) set to `staker`:

```bash
besu --profile=staker
```

## Enterprise/Private profile

For private network operators who want to minimize confusion by setting sensible defaults, Besu
provides an enterprise/private profile.
This profile is designed to handle specific use cases for private network operators.
See the
[enterprise/private profile on GitHub](https://github.com/hyperledger/besu/blob/8b64023a121ea996ef60e4b7e2299c5807683f90/config/src/main/resources/profiles/enterprise-private.toml)
for the custom settings.

To use the enterprise/private profile, run Besu with
[`--profile`](../../reference/cli/options.md#profile) set to `enterprise` or `private`:

```bash
besu --profile=enterprise
```

or

```bash
besu --profile=private
```

:::note
`enterprise` and `private` are aliases for the same profile.
:::
