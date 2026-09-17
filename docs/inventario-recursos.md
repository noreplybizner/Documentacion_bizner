---
id: inventario-recursos
title: Inventario de Recursos
sidebar_label: 3. Inventario de Recursos
description: Catálogo completo de servicios Cloud Run, tareas programadas, bases de datos, máquinas virtuales y almacenamiento en Google Cloud.
---

# Inventario de Recursos

Catálogo detallado de todos los componentes de cómputo, almacenamiento, red y automatización desplegados en el proyecto de producción `pe-makers150-prd-bizner-gcp`.

---

## 1. Servicios Serverless (Cloud Run)

El proyecto cuenta con **43 servicios Cloud Run** y **1 Cloud Run Job** en la región `us-east1`. La arquitectura se organiza en 5 grupos operativos:

### 🖥️ Aplicaciones Web (Frontends)

| Servicio | Memoria / CPU | Dominio Asociado | Propósito |
| :--- | :--- | :--- | :--- |
| `bizner-facturador-front-prd` | 512 MB / 2 vCPU | `facturador.bizner.ai` | Portal de emisión y gestión tributaria |
| `bizner-cuaderno-front-prd` | 512 MB / 2 vCPU | `cuaderno.bizner.ai` | Aplicación de cuentas comerciales |
| `bizner-integrador-front-prd` | 512 MB / 1 vCPU | `micuenta.bizner.ai` | Portal de autoservicio y suscripciones |
| `bizner-pedidos-ferreteria-front-prd` | 2 GB / 1 vCPU | — | Tienda web B2B para clientes ferreteros |
| `bizner-pedidos-admin-prd` | 2 GB / 1 vCPU | — | Panel de control para distribuidores |

### ⚙️ APIs Principales (Backend Core)

| Servicio | Memoria / CPU | Protocolo | Propósito |
| :--- | :--- | :--- | :--- |
| `bizner-facturador-back-prd` | 2 GB / 1 vCPU | HTTP REST | Firma digital UBL 2.1 y comunicación con SUNAT |
| `bizner-cuaderno-back-prd` | 1 GB / 1 vCPU | HTTP REST | Gestión de créditos y libreta comercial |
| `bizner-integrador-back-prd` | 1 GB / 1 vCPU | HTTP REST | Consultas DNI (RENIEC) y RUC (SUNAT) vía CPSAA |
| `bizner-admin-back-prd` | 1 GB / 1 vCPU | HTTP REST | Gestión de empresas emisoras y membresías |
| `bizner-sockets-back-prd` | 512 MB / 1 vCPU | WebSockets | Canal de notificaciones en tiempo real |

### 🛒 Malla de Microservicios de Pedidos (Arquitectura Dual REST + gRPC)

Cada dominio de Pedidos despliega **dos servicios complementarios en Cloud Run**: uno con interfaz **REST** para consumo externo/web y otro con interfaz **gRPC** en puerto `5000` para comunicación intra-cluster de baja latencia:

| Dominio | Servicio REST (HTTP) | Servicio gRPC (:5000) | Función Principal |
| :--- | :--- | :--- | :--- |
| **Orquestador** | `order-prd` *(8 GB / 2 vCPU)* | `order-prd-grpc` *(1 GB / 1 vCPU)* | Coordinador transaccional central |
| **Productos** | `product-prd` *(2 GB / 1 vCPU)* | `product-prd-grpc` *(4 GB / 2 vCPU)* | Catálogo, listas de precios y stock |
| **Carritos** | `cart-prd` *(2 GB / 1 vCPU)* | `cart-prd-grpc` *(1 GB / 1 vCPU)* | Carritos activos y cotizaciones |
| **Clientes** | `customer-prd` *(2 GB / 1 vCPU)* | `customer-prd-grpc` *(1 GB / 1 vCPU)* | Datos fiscales y líneas de crédito |
| **Autenticación** | `auth-prd` *(2 GB / 1 vCPU)* | `auth-prd-grpc` *(1 GB / 1 vCPU)* | Validación de tokens JWT y roles |
| **Empresas** | `company-prd` *(2 GB / 1 vCPU)* | `company-prd-grpc` *(1 GB / 1 vCPU)* | Distribuidores mayoristas y marcas |
| **Sucursales** | `store-prd` *(2 GB / 1 vCPU)* | `store-prd-grpc` *(1 GB / 1 vCPU)* | Almacenes y bodegas de despacho |
| **Zonas** | `zone-prd` *(2 GB / 1 vCPU)* | `zone-prd-grpc` *(2 GB / 1 vCPU)* | Cobertura de despacho y fletes |
| **Marketing** | `marketing-prd` *(2 GB / 1 vCPU)* | `marketing-prd-grpc` *(1 GB / 1 vCPU)* | Descuentos, cupones y banners |
| **Datos Maestros** | `common-data-prd` *(4 GB / 2 vCPU)* | `common-data-prd-grpc` *(2 GB / 1 vCPU)* | Ubigeos, monedas e impuestos |
| **Usuarios** | `user-prd` *(2 GB / 1 vCPU)* | `user-prd-grpc` *(1 GB / 1 vCPU)* | Perfiles de operador y permisos |
| **Notificaciones** | `notification` *(512 MB / 1 vCPU)* | `notification-grpc` *(512 MB / 1 vCPU)* | Alertas push móviles vía Firebase |

:::tip Detalle en profundidad
Para conocer los esquemas de base de datos y flujos de cada microservicio, consulta la sección dedicada: [Microservicios de Pedidos](/docs/servicios-componentes/microservicios-pedidos).
:::

### 🧪 Entornos Demo Aislados (6 Servicios)

| Servicio | Recursos | Función |
| :--- | :--- | :--- |
| `bizner-facturador-front-demo-prd` / `back-demo-prd` | 512 MB / 1 vCPU c/u | Entorno demo de facturación para prospectos |
| `bizner-cuaderno-front-demo-prd` / `back-demo-prd` | 512 MB / 1 vCPU c/u | Entorno demo de la libreta comercial |
| `bizner-integrador-front-demo-prd` / `back-demo-prd` | 512 MB / 1 vCPU c/u | Entorno demo del portal Mi Cuenta |

### 🤖 Automatización, Jobs y Mensajería

| Componente | Tipo | Recursos | Función |
| :--- | :--- | :--- | :--- |
| `n8n-bizner` | Cloud Run (Always-On) | 1 GB / 1 vCPU | Motor de flujos con integración a Google Vertex AI |
| `bizner-padron-ruc-prd` | Cloud Run Job | 8 GB / 2 vCPU | Sincronización batch masiva del padrón SUNAT |
| `ext-firestore-send-email` | Cloud Function Gen 2 | 256 MB / 0.17 vCPU | Procesador reactivo de cola de emails vía SendGrid |

---

## 2. Tareas Programadas (Cloud Scheduler)

El proyecto cuenta con **10 tareas cron automatizadas** que coordinan operaciones de negocio y mantenimiento:

| Job ID | Frecuencia (Hora Perú) | Destino | Acción Operativa |
| :--- | :--- | :--- | :--- |
| `BillerFreeProdFexGestionaVerifyVouchers` | Cada 1 minuto | Facturador API | Consulta de comprobantes pendientes en SUNAT |
| `BillerFreeProdFexGestionaVerifyCreditNotes` | Cada 5 minutos | Facturador API | Validación de estados de notas de crédito |
| `AdminProdFexGestionaGenerateReportSubscription` | Diario a las 17:00 | Admin API | Generación de reportes de suscripciones activas |
| `AdminProdFexGestionaVerifySubscription` | Diario a las 00:00 | Admin API | Verificación de vigencia de planes de clientes |
| `AdminProdFexGestionaResetSubscription` | Diario a las 00:10 | Admin API | Reinicio de contadores mensuales de emisión |
| `bizner-refresh-token-cpsaa-dniruc-prd` | Diario a las 13:15 | Integrador API | Renovación de token de autenticación CPSAA |
| `bizner-padron-ruc-prd` | Cada 3 días a las 05:00 | Cloud Run Job | Descarga e indexación del padrón tributario |
| `backup-bizner-users` | Lunes a las 02:00 | Script Backup | Respaldo programado de base de datos de usuarios |
| `backup-bizner-userinf` | Lunes a las 02:10 | Script Backup | Respaldo de datos personales (cumplimiento) |
| `backup-bizner-biller` | Lunes a las 02:20 | Script Backup | Exportación de respaldo de facturación electrónica |

---

## 3. Bases de Datos Relacionales (Cloud SQL)

La capa de persistencia transaccional está segregada en dos instancias de PostgreSQL 16:

- 🧾 **`pe-makers150-pg-bizner-prd` (Core)**: 4 vCPU / 16 GB RAM / 120 GB SSD (Zonal `us-east1-d`). Aloja facturación, libreta de clientes y administración.
- 🛒 **`pe-makers150-pg-bizner-pedidos-prd` (Pedidos)**: 4 vCPU / 16 GB RAM / 90 GB SSD (**Regional HA con failover automático y PITR al segundo**). Aloja las 14 bases de datos del marketplace.

> 📖 *Para ver esquemas, usuarios, políticas de respaldo y conexiones privadas, consulta [Bases de Datos](/docs/bases-de-datos).*

---

## 4. Máquinas Virtuales (Compute Engine)

| VM | Zona | Tipo | IP Privada | IP Pública | Función |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `datadog-dbm` | `us-east1-c` | `e2-medium` (2 vCPU / 4 GB) | `10.142.0.80` | `34.138.134.109` | Agente de telemetría Database Monitoring |
| `vm-cloudsql-proxy-pbi` | `us-east1-d` | `e2-micro` (2 vCPU / 1 GB) | `10.142.0.66` | `34.24.154.251` | Cloud SQL Auth Proxy para reportes PowerBI |
| `workstations-...` | `us-east1-c` | `e2-standard-4` (4 vCPU / 16 GB) | `10.142.0.45` | `136.108.62.140` | Estación de trabajo remota de desarrollo |

---

## 5. Almacenamiento de Objetos (Cloud Storage)

| Bucket | Región / Clase | Acceso | Contenido Almacenado |
| :--- | :--- | :--- | :--- |
| `bizner-bucket-private-prd` | `us-east1` / Standard | 🔒 Privado | XMLs firmados, CDRs de SUNAT y comprobantes en PDF |
| `bizner-bucket-public-prd` | `us-east1` / Standard | 🌐 Público | Catálogo de imágenes, logos y recursos web |
| `bizner-cdn-geojson-backend-prd` | Multi-región / Standard | 🌐 CDN | Mapas vectoriales GeoJSON para zonificación de fletes |
| `bizner-backups-archive` | `us-east1` / **Archive** | 🔒 Privado | Archivo histórico inmutable de bases de datos |
| `makers-db-backups-prd` | `us-east1` / Standard | 🔒 Privado | Respaldos semanales comprimidos `.sql.gz` (90 días) |
| `pe-makers150-bizner-prd-sql-backups` | `us-east1` / Standard | 🔒 Privado | Copias de seguridad auxiliares de Cloud SQL |
| `bizner-users-personal-data-backup` | `us-east1` / Standard | 🔒 Privado | Respaldos de datos personales (política de 8 días) |
| `bizner-pedidos-pe-makers150-prd-bizner-gcp` | Multi-región / Standard | 🔒 Privado | Almacenamiento auxiliar del ecosistema Pedidos |

---

## 6. Registro de Artefactos (Artifact Registry)

| Repositorio | Formato | Contenido |
| :--- | :--- | :--- |
| `bizner-docker-registry-prd` | Docker | Imágenes de producción de todos los microservicios (`:88XX`) |
| `n8n-remote` | Docker | Imagen base oficial y extensiones del motor n8n |
| `gcf-artifacts` | Docker | Imágenes construidas automáticamente para Cloud Functions |
