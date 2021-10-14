/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "Intro",
    },
    {
      type: "doc",
      id: "installation",
      label: "Installation",
    },
    {
      type: "category",
      label: "Concepts",
      items: [
        "concepts/business-story",
        "concepts/nobe-story",
        "concepts/pahr-strategy",
      ],
    },
    {
      type: "category",
      label: "Basics",
      items: [
        "basics/folder-structure",
        "basics/strategies",
        "basics/prepare",
        "basics/authorize",
        "basics/handle",
        "basics/respond",
        "basics/testing",
        "basics/endpoint",
        "basics/authentication",
        "basics/validation",
        "basics/errors",
        "basics/updating",
      ],
    },
    {
      type: "category",
      label: "Database",
      items: ["database/intro", "database/repository", "database/serializer"],
    },
    {
      type: "category",
      label: "Deployment",
      items: [
        "deployment/docker",
        "deployment/kubernetes",
        "deployment/security",
      ],
    },
  ],
};
