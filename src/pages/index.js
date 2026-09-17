import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroEyebrow}>
          ☁️ Documentación Oficial — Entorno de Producción
        </div>

        <h1 className={styles.heroTitle}>
          Bizner en Google Cloud
        </h1>

        <p className={styles.heroSubtitle}>
          Arquitectura, inventario de servicios y manual de operaciones 
          del ecosistema de producción Bizner en GCP.
        </p>

        <div className={styles.badgeContainer}>
          <span className={styles.metaBadge}>
            🟢 Producción (PRD)
          </span>
          <span className={styles.metaBadge}>
            📍 us-east1 (South Carolina)
          </span>
          <span className={styles.metaBadge}>
            🐘 PostgreSQL 16 HA
          </span>
          <span className={styles.metaBadge}>
            ✅ Verificado en GCP
          </span>
        </div>

        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/informacion-general">
            Explorar Documentación
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/arquitectura">
            Ver Arquitectura
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatsBar() {
  const stats = [
    { value: '43', label: 'Servicios Cloud Run' },
    { value: '2', label: 'Instancias Cloud SQL' },
    { value: '14', label: 'Bases de Datos' },
    { value: '45+', label: 'Secretos Cifrados' },
    { value: '99.5%', label: 'SLO Disponibilidad' },
    { value: '<1m', label: 'RPO Máximo (PITR)' },
  ];

  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarsSection() {
  const pillars = [
    {
      number: '01',
      title: '¿Qué es Bizner?',
      text: 'Plataforma SaaS en la nube con dos pilares de negocio: facturación electrónica homologada ante SUNAT y un marketplace B2B/B2C para ferreterías y distribuidores en Perú.',
    },
    {
      number: '02',
      title: 'Infraestructura Cloud',
      text: 'Todo opera en Google Cloud Platform con arquitectura serverless elástica, bases de datos PostgreSQL 16 con failover automático y red privada conectada por Shared VPC.',
    },
    {
      number: '03',
      title: 'Contenido del Portal',
      text: 'Guía oficial para el equipo: diseño de arquitectura, inventario de recursos, flujos de datos, políticas de seguridad, pipelines CI/CD y monitoreo SRE en tiempo real.',
    },
    {
      number: '04',
      title: 'Guía de Navegación',
      text: 'Explora los 14 módulos temáticos en el menú lateral o accede rápidamente a las secciones principales desde los accesos directos inferiores.',
    },
  ];

  return (
    <section className={styles.pillarSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Fundamentos de la Plataforma</h2>
          <p className={styles.sectionSubtitle}>
            Visión ejecutiva del ecosistema antes de consultar el detalle técnico
          </p>
        </div>
        <div className={styles.cardsGrid}>
          {pillars.map((p, idx) => (
            <div key={idx} className={styles.pillarCard}>
              <div className={styles.cardNumber}>{p.number}</div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardText}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinksSection() {
  const modules = [
    { icon: '📋', title: 'Información General', desc: 'Identificadores del proyecto GCP, regiones y servicios habilitados.', to: '/docs/informacion-general' },
    { icon: '🏗️', title: 'Arquitectura', desc: 'Topología de 6 capas, malla gRPC y flujo global de peticiones.', to: '/docs/arquitectura' },
    { icon: '📦', title: 'Inventario', desc: 'Catálogo de Cloud Run, Compute Engine, Storage y tareas programadas.', to: '/docs/inventario-recursos' },
    { icon: '🧾', title: 'Facturación Electrónica', desc: 'Generación, firma digital UBL 2.1 y envío de comprobantes a SUNAT.', to: '/docs/servicios-componentes/facturador' },
    { icon: '🛒', title: 'Orquestador de Pedidos', desc: 'Servicio central con 8 GB RAM que coordina compras transaccionales.', to: '/docs/servicios-componentes/pedidos-orquestador' },
    { icon: '⚙️', title: 'Automatización & Batch', desc: 'Motor n8n con Vertex AI, job de padrón RUC y cola de emails.', to: '/docs/servicios-componentes/n8n-automatizacion' },
    { icon: '🗄️', title: 'Bases de Datos', desc: 'PostgreSQL 16 Core y Pedidos con Alta Disponibilidad y PITR.', to: '/docs/bases-de-datos' },
    { icon: '🔐', title: 'Seguridad e IAM', desc: 'Identidades de servicio, políticas de acceso y Secret Manager.', to: '/docs/seguridad-iam' },
    { icon: '🌐', title: 'Red y Conectividad', desc: 'Cloud DNS, balanceadores HTTPS, Direct VPC Egress y firewall.', to: '/docs/networking' },
    { icon: '🚀', title: 'Despliegues CI/CD', desc: 'Pipelines Azure DevOps, Zero-Downtime y rollback en 5 segundos.', to: '/docs/cicd-despliegues' },
    { icon: '📊', title: 'Monitoreo & SRE', desc: 'Dashboard SLO 99.5%, Error Budget, alertas críticas y logs.', to: '/docs/observabilidad' },
    { icon: '💾', title: 'Backups y DRP', desc: 'Estrategia de 3 capas de respaldo, RPO < 1m y plan de contingencia.', to: '/docs/backups-recuperacion' },
  ];

  return (
    <section className={styles.navModulesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Acceso Rápido por Módulo</h2>
          <p className={styles.sectionSubtitle}>
            Navega directamente al componente que necesitas consultar
          </p>
        </div>
        <div className={styles.moduleGrid}>
          {modules.map((mod, idx) => (
            <Link key={idx} to={mod.to} className={styles.moduleItem}>
              <div className={styles.moduleIcon}>{mod.icon}</div>
              <div className={styles.moduleContent}>
                <div className={styles.moduleTitle}>{mod.title}</div>
                <p className={styles.moduleDesc}>{mod.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} | Documentación Oficial`}
      description="Documentación oficial de producción del ecosistema Bizner en Google Cloud Platform">
      <HomepageHeader />
      <main>
        <StatsBar />
        <PillarsSection />
        <QuickLinksSection />
      </main>
    </Layout>
  );
}
