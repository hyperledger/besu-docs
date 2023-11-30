const lightCodeTheme = require("prism-react-renderer/themes/dracula");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Besu documentation",
  url: "https://besu.hyperledger.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.svg",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "hyperledger", // Usually your GitHub org/user name.
  projectName: "besu-docs", // Usually your repo name.
  deploymentBranch: "gh-pages", // Github Pages deploying branch

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          breadcrumbs: false,
          sidebarPath: require.resolve("./sidebars.js"),
          // Set a base path separate from default /docs
          editUrl: "https://github.com/hyperledger/besu-docs/tree/main/",
          path: "./docs",
          includeCurrentVersion: true,
          // Set to the last stable release
          lastVersion: "23.10.2",
          versions: {
            //defaults to the ./docs folder
            // using 'development' instead of 'next' as path
            current: {
              label: "development",
              path: "development",
            },
            // The last stable release in the versioned_docs/version-stable
            "23.10.2": {
              label: "stable (23.10.2)",
            },
            "23.10.1": {
              label: "23.10.1",
            },
            "23.10.0": {
              label: "23.10.0",
            },
            "23.7.3": {
              label: "23.7.3",
            },
            "23.7.2": {
              label: "23.7.2",
            },
            "23.7.1": {
              label: "23.7.1",
            },
            "23.4.1": {
              label: "23.4.1",
            },
            "23.4.0": {
              label: "23.4.0",
            },
          },
          routeBasePath: "/",
          // @ts-ignore
          // eslint-disable-next-line global-require
          remarkPlugins: [require("remark-docusaurus-tabs")],
          include: ["**/*.md", "**/*.mdx"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // announcementBar: {
      //   id: "announcement_bar",
      //   content: "⛔️ This documentation site is still under construction! 🚧",
      //   backgroundColor: "#fafbfc",
      //   textColor: "#091E42",
      //   isCloseable: false,
      // },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        logo: {
          alt: "Besu",
          src: "img/logo-reversed.svg",
          srcDark: "img/logo-reversed.svg",
          width: 100,
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "publicDocSidebar",
            docId: "index",
            position: "left",
            label: "Public networks",
          },
          {
            type: "docSidebar",
            sidebarId: "privateDocSidebar",
            docId: "index",
            position: "left",
            label: "Private networks",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },
          {
            href: "https://github.com/hyperledger/besu/",
            className: "header-github-link",
            position: "right",
          },
          {
            href: "https://discord.gg/hyperledger",
            className: "header-discord-link",
            position: "right",
          },
          {
            href: "https://twitter.com/HyperledgerBesu",
            className: "header-twitter-link",
            position: "right",
          },
        ],
      },
      footer: {
        copyright:
          "Hyperledger Besu and its documentation are licensed under the Apache 2.0 license.",
        logo: {
          alt: "Hyperledger Besu logo",
          src: "img/logo.svg",
          srcDark: "img/logo-reversed.svg",
          href: "https://www.hyperledger.org/use/besu",
          width: 250,
        },
        links: [
          {
            title: "Public networks",
            items: [
              {
                label: "Introduction",
                to: "/public-networks",
              },
              {
                label: "How to guides",
                to: "/public-networks/how-to",
              },
              {
                label: "Concepts",
                to: "/public-networks/concepts",
              },
              {
                label: "Tutorials",
                to: "/public-networks/tutorials",
              },
              {
                label: "Reference",
                to: "/public-networks/reference",
              },
            ],
          },
          {
            title: "Private networks",
            items: [
              {
                label: "Introduction",
                to: "/private-networks",
              },
              {
                label: "How to guides",
                to: "/private-networks/how-to",
              },
              {
                label: "Concepts",
                to: "/private-networks/concepts",
              },
              {
                label: "Tutorials",
                to: "/private-networks/tutorials",
              },
              {
                label: "Reference",
                to: "/private-networks/reference",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Hyperledger Discord",
                href: "https://discord.gg/hyperledger",
              },
              {
                label: "Hyperledger Besu Wiki",
                href: "https://wiki.hyperledger.org/display/BESU/Hyperledger+Besu",
              },
              {
                label: "Hyperledger Besu Twitter",
                href: "https://twitter.com/HyperledgerBesu",
              },
              {
                label: "Hyperledger Besu GitHub",
                href: "https://github.com/hyperledger/besu/",
              },
              {
                label: "Hyperledger Besu documentation GitHub",
                href: "https://github.com/hyperledger/besu-docs",
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["solidity", "toml"],
      },
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
      ],
    }),
  plugins: [
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-KD07N5GM2B",
        anonymizeIP: true,
      },
    ],
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-THG37T4",
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/private-networks/tutorials/permissioning/onchain",
            to: "/private-networks/how-to/use-permissioning/onchain",
          },
          {
            from: "/private-networks/tutorials/permissioning/upgrade-contracts",
            to: "/private-networks/how-to/use-permissioning/onchain",
          },
        ],
      },
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: "/",
        indexBlog: false,
      }),
    ],
  ],
};

module.exports = config;
