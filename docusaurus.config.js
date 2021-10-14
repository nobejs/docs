const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "NobeJS",
    tagline: '["post", "/teams", "Teams/UserCanCreateTeam"]',
    url: "https://nobejs.org",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "nobejs", // Usually your GitHub org/user name.
    projectName: "nobejs", // Usually your repo name.

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl:
              "https://github.com/facebook/docusaurus/edit/main/website/",
          },
          blog: {
            showReadingTime: true,
            // Please change this to your repo.
            editUrl:
              "https://github.com/facebook/docusaurus/edit/main/website/blog/",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: "Nobejs",
          logo: {
            alt: "Nobejs Logo",
            src: "img/Fav.png",
          },
          items: [
            {
              type: "doc",
              docId: "intro",
              position: "left",
              label: "Documentation",
            },
            { to: "/blog", label: "Blog", position: "left" },
            {
              type: "docsVersionDropdown",
              label: "1.x",
              position: "right",
            },
            {
              href: "https://github.com/nobejs/nobejs",
              label: "GitHub",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Docs",
              items: [
                {
                  label: "Intro",
                  to: "/docs/intro",
                },
                {
                  label: "Concepts",
                  to: "/docs/basics/folder-structure",
                },
                {
                  label: "Basics",
                  to: "/docs/basics/prepare",
                },
                {
                  label: "Deployment",
                  to: "/docs/deployment/docker",
                },
              ],
            },
            {
              title: "Community",
              items: [
                {
                  label: "Discord",
                  href: "https://discord.gg/svXMRzCyPq",
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com/nobejs",
                },
              ],
            },
            {
              title: "More",
              items: [
                {
                  label: "Blog",
                  to: "/blog",
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} <a href="https://betalectic.com" target="_blank">Betalectic</a>. Built with Docusaurus.`,
        },
        prism: {
          theme: {
            ...lightCodeTheme,
            plain: {
              color: "#393A34",
              backgroundColor: "#f6f8fa",
            },
          },
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
