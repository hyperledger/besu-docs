import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
// import styles from "./styles.module.css";

type CardItem = {
  title: string;
  link: string;
  description: JSX.Element;
  buttonName: string;
  buttonType:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "link";
};

const CardList: CardItem[] = [
  {
    title: "🌐 Public networks",
    link: "/public-networks",
    // prettier-ignore
    description: (
      <>
        Run Besu as an execution client on Ethereum Mainnet and Ethereum public testnets, such as Holesky and Sepolia.
      </>
    ),
    buttonName: "Get started",
    buttonType: "secondary",
  },
  {
    title: "🔐 Private networks",
    link: "/private-networks",
    // prettier-ignore
    description: (
      <>
        Use private networks for enterprise applications requiring secure, high-performance transaction processing.
      </>
    ),
    buttonName: "Get started",
    buttonType: "secondary",
  },
];

function Card({ title, link, description, buttonName, buttonType }: CardItem) {
  return (
    <div className={clsx("col", "margin-top--md")}>
      <div className="card-demo">
        <div className="card">
          <div className="card__header">
            <h3>{title}</h3>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <Link
              className={clsx(
                "button",
                "button--" + buttonType,
                "button--block",
              )}
              to={link}>
              {buttonName}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageCards(): JSX.Element {
  return (
    <section className={clsx("margin-top--lg", "margin-bottom--lg")}>
      <div className="container homepageContainer">
        <h1 className="homepageTitle">Hyperledger Besu Ethereum client</h1>
        <p>
          Hyperledger Besu is an open source Ethereum client developed under the
          Apache 2.0 license and written in Java. It runs on public and private
          networks:
        </p>
        <div className="row">
          {CardList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
