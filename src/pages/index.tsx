import React from "react";
import Layout from "@theme/Layout";
import HomepageCards from "@site/src/components/HomepageCards";

function HomepageText() {
  return (
    <div className="container homepageContainer margin-bottom--xl">
      <h2>What does Besu support?</h2>
      <p>
        Besu includes a{" "}
        <a href="/public-networks/reference/cli/options">
          command line interface
        </a>{" "}
        and <a href="/public-networks/how-to/use-besu-api">JSON-RPC API</a> for
        running, maintaining, debugging, and monitoring nodes in an Ethereum
        network. You can use the API via RPC over HTTP or via WebSocket. Besu
        also supports Pub/Sub.
      </p>
      <p>
        Besu supports common smart contract and dapp development, deployment,
        and operational use cases, using tools such as{" "}
        <a href="https://github.com/NomicFoundation/hardhat">Hardhat</a>,{" "}
        <a href="https://github.com/ethereum/remix">Remix</a>, and{" "}
        <a href="https://web3j.io/">web3j</a>. The client supports common
        JSON-RPC API methods such as <code>eth</code>, <code>net</code>,{" "}
        <code>web3</code>, <code>debug</code>, and <code>miner</code>.
      </p>
      <p>
        Besu doesn&apos;t support key management inside the client. You can use{" "}
        <a href="https://docs.web3signer.consensys.net/">Web3Signer</a> with
        Besu to access your keystore and sign transactions.
      </p>

      <h2>Questions?</h2>
      <p>
        If you have any questions about Besu, ask on the <b>besu</b> channel on{" "}
        <a href="https://discord.gg/hyperledger">Hyperledger Discord</a>.
      </p>
      <p>
        Learn more about the{" "}
        <a href="https://www.hyperledger.org/about">Hyperledger Foundation</a>.
        You can{" "}
        <a href="https://wiki.hyperledger.org/display/BESU/Documentation">
          contribute to the documentation
        </a>{" "}
        or to{" "}
        <a href="https://wiki.hyperledger.org/display/BESU/Contributing">
          Besu itself
        </a>
        .
      </p>
    </div>
  );
}

export default function Home(): JSX.Element {
  // const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Welcome`}>
      <main>
        <HomepageCards />
        <HomepageText />
      </main>
    </Layout>
  );
}
