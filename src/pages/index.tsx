import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageCards from "@site/src/components/HomepageCards";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.introductionBlock)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.title, styles.forceColor)}>
          {siteConfig.title}
        </h1>
        <p
          className={clsx(
            "hero__subtitle",
            styles.forceColor,
            styles.subtitle,
          )}>
          Hyperledger Besu is an open source Ethereum client developed under the
          Apache 2.0 license and written in Java. It runs on public and private
          networks
        </p>
      </div>
    </header>
  );
}

function HomepageText() {
  return (
    <div className="container">
      <h2>What does Besu support?</h2>
      <p>
        Besu includes a{" "}
        <a href="/category/public-networks/reference/cli/options.md">
          command line interface
        </a>{" "}
        and
        <a href="/category/public-networks/how-to/use-besu-api/index.md">
          JSON-RPC API
        </a>{" "}
        for running, maintaining, debugging, and monitoring nodes in an Ethereum
        network. You can use the API via RPC over HTTP or via WebSocket. Besu
        also supports Pub/Sub.
      </p>
      <p>
        Besu supports common smart contract and dapp development, deployment,
        and operational use cases, using tools such as{" "}
        <a href="http://truffleframework.com/">Truffle</a>
        <a href="https://github.com/ethereum/remix">Remix</a>, and{" "}
        <a href="https://web3j.io/">web3js</a>. The client supports common
        JSON-RPC API methods such as <kbd>`eth`, `net`, `web3`, `debug`,</kbd>{" "}
        and <kbd>`miner`</kbd>.
      </p>
      <p>
        Besu doesn&apos;t support key management inside the client. You can use{" "}
        <a href="http://docs.ethsigner.consensys.net/en/latest/">Ethsigner</a>{" "}
        with Besu to access your keystore and sign transactions.
      </p>

      <h2>Questions?</h2>
      <p>
        If you have any questions about Besu, contact us on the{" "}
        <a href="https://discord.gg/hyperledger">
          Besu channel on Hyperledger Discord
        </a>
        . Learn more about the{" "}
        <a href="https://www.hyperledger.org/about">Hyperledger Foundation</a>
        You can{" "}
        <a href="https://wiki.hyperledger.org/display/BESU/Documentation">
          contribute to the documentation
        </a>
        or to{" "}
        <a href="https://wiki.hyperledger.org/display/BESU/Contributing">
          Besu itself
        </a>
      </p>
    </div>
  );
}

export default function Home(): JSX.Element {
  // const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Welcome`}>
      <HomepageHeader />
      <main>
        <HomepageCards />
      </main>
      <HomepageText />
    </Layout>
  );
}
