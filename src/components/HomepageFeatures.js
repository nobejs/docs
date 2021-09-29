import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Predictability",
    Svg: require("../../static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Nobejs insists on consistenty. Nobejs suggests that you test and run
        your stories using a predefined strategy.
      </>
    ),
  },
  {
    title: "Reuse",
    Svg: require("../../static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Nobejs has ready codebases which can be used as a foundation for your
        microservice architecture
      </>
    ),
  },
  {
    title: "Productive",
    Svg: require("../../static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        It's nothing but Javascript running on Node, It doesn't come in your
        way. We hope it makes coding fun.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
