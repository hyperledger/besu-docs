# Hyperledger Besu documentation

[Hyperledger Besu](https://github.com/hyperledger/besu/) is an open source Ethereum client developed
under the Apache 2.0 license and written in Java.
It runs on public and private networks.

This repository contains documentation for Besu, and is built using [Docusaurus](https://docusaurus.io/).
The doc site is hosted at [`besu.hyperledger.org`](https://besu.hyperledger.org).

If you're looking for the software source code, go to the [Besu software repository](https://github.com/hyperledger/besu).

## Versions of docs and how to host previous versions

At present, we tag every version (including patch) in the repository but we only display [three versions of the docs for the most recent minor versions](https://discord.com/channels/905194001349627914/905205502940696607/1179912405216669828) in the `versioned_docs` folder. eg: `23.10.2, 23.7.3 and 23.4.1` In addition we also maintain the in flight `development` version in the `docs` folder.

In order to build or host a specific version eg `23.7.1`
1. Clone this repo and checkout the tag
```
git@github.com:hyperledger/besu-docs.git
git checkout 23.7.1
```

2. Build and run locally
```
yarn
yarn run start
```
Open up a browser tab and navigate to `http://localhost:3000/development`

3. (Optional) host this version on your own infrastructure (eg: nginx, s3 etc)
```
yarn
yarn run build

# optional - this is to check the output locally
yarn run serve 
```
Host the contents of the `build` folder on your own infrastructure


### Contribute to the docs

See the [documentation section in the Hyperledger Besu wiki](https://wiki.hyperledger.org/display/BESU/Documentation)
for information about submitting documentation changes and previewing the site locally.

### Questions?

If you have questions about Besu, ask on the **besu** channel on [Hyperledger Discord](https://discord.gg/hyperledger).
