// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bizner GCP PRD',
  tagline: 'Portal Oficial de Arquitectura, Infraestructura y Operaciones Cloud',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://jeansimon20.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/Documentacion_Makers150/',

  // GitHub pages deployment config.
  organizationName: 'JeanSimon20',
  projectName: 'Documentacion_Makers150',

  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Bizner GCP PRD',
        logo: {
          alt: 'Bizner Platform Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentación Completa',
          },
          {
            to: '/docs/arquitectura',
            label: 'Arquitectura',
            position: 'left',
          },
          {
            to: '/docs/inventario-recursos',
            label: 'Inventario',
            position: 'left',
          },
          {
            to: '/docs/servicios-componentes/facturador',
            label: 'Servicios',
            position: 'left',
          },
          {
            to: '/docs/bases-de-datos',
            label: 'Bases de Datos',
            position: 'left',
          },
          {
            to: '/docs/seguridad-iam',
            label: 'Seguridad & IAM',
            position: 'left',
          },
          {
            href: 'https://github.com/JeanSimon20/Documentacion_Makers150',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Arquitectura & Componentes',
            items: [
              {
                label: 'Información General',
                to: '/docs/informacion-general',
              },
              {
                label: 'Arquitectura Global',
                to: '/docs/arquitectura',
              },
              {
                label: 'Inventario de Recursos',
                to: '/docs/inventario-recursos',
              },
              {
                label: 'Servicios Cloud Run',
                to: '/docs/servicios-componentes/facturador',
              },
            ],
          },
          {
            title: 'Infraestructura & Seguridad',
            items: [
              {
                label: 'Bases de Datos (Cloud SQL)',
                to: '/docs/bases-de-datos',
              },
              {
                label: 'Seguridad e IAM',
                to: '/docs/seguridad-iam',
              },
              {
                label: 'Networking & Shared VPC',
                to: '/docs/networking',
              },
              {
                label: 'CI/CD & Despliegues',
                to: '/docs/cicd-despliegues',
              },
            ],
          },
          {
            title: 'Operaciones & Gobierno',
            items: [
              {
                label: 'Observabilidad & Alertas',
                to: '/docs/observabilidad',
              },
              {
                label: 'Backups & DRP',
                to: '/docs/backups-recuperacion',
              },
              {
                label: 'Procesos Operativos',
                to: '/docs/procesos-operativos',
              },
              {
                label: 'Glosario Técnico',
                to: '/docs/glosario',
              },
            ],
          },
          {
            title: 'Contexto de Producción',
            items: [
              {
                label: 'Proyecto: pe-makers150-prd-bizner-gcp',
                href: 'https://console.cloud.google.com',
              },
              {
                label: 'Organización: 301182531400',
                href: 'https://console.cloud.google.com',
              },
              {
                label: 'Región Principal: us-east1',
                href: 'https://cloud.google.com/about/locations',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Makers150 — Bizner Platform (pe-makers150-prd-bizner-gcp). Documentación técnica verificada.`,
      },
      mermaid: {
        theme: {
          light: 'neutral',
          dark: 'dark',
        },
      },
    }),
};

export default config;
