---
id: informacion-general
title: Información General del Proyecto
sidebar_label: 1. Información General
description: Datos principales del proyecto Bizner en Google Cloud, regiones y servicios habilitados.
---

# Información General del Proyecto

Aquí encontrarás los datos fundamentales del proyecto de producción de **Bizner** en Google Cloud. Esta es la "ficha de identidad" del entorno donde vive toda la plataforma.

:::info ¿Qué es Bizner?
**Bizner** es un ecosistema SaaS que atiende a miles de comercios, ferreterías y distribuidores en Perú. Necesita estar siempre disponible, responder rápido y cumplir con las regulaciones tributarias de SUNAT.
:::

---

## 1. Datos del Proyecto

| Dato | Valor | ¿Qué significa? |
| :--- | :--- | :--- |
| **ID del Proyecto** | `pe-makers150-prd-bizner-gcp` | Identificador único en Google Cloud (no cambia nunca) |
| **Nombre** | `pe-makers150-bizner-gcp-prd` | Nombre descriptivo del entorno productivo |
| **Número de Proyecto** | `483597276141` | ID numérico interno usado en políticas de acceso |
| **Organización** | `301182531400` | Organización raíz corporativa de Makers150 |
| **Creado el** | 4 de enero de 2025 | Fecha de inicio del proyecto en la nube |
| **Región Principal** | `us-east1` (South Carolina) | Donde viven la mayoría de servicios, bases de datos y almacenamiento |
| **Región Secundaria** | `us-central1` (Iowa) | Solo para la función de envío de correos |
| **Red Compartida** | `pe-makers150-networking-host` | Proyecto de red corporativa que provee conectividad privada |

---

## 2. Servicios de Google Cloud Habilitados

Estos son los servicios principales de Google Cloud que usa Bizner:

- ☁️ **Cloud Run** — Ejecuta los 43 microservicios de la plataforma (se escalan solos según la demanda)
- 🗄️ **Cloud SQL** — Bases de datos PostgreSQL 16 administradas con backups automáticos
- 🌐 **Compute Engine** — Máquinas virtuales auxiliares para monitoreo y conexiones analíticas
- 🔗 **Cloud DNS** — Administra el dominio `bizner.ai` y lo conecta con los balanceadores
- 📦 **Artifact Registry** — Almacena las imágenes Docker de cada microservicio
- 🔐 **Secret Manager** — Guarda de forma segura más de 45 credenciales y llaves
- ⏰ **Cloud Scheduler** — Programa 10 tareas automáticas (facturación, mantenimiento, etc.)
- 📨 **Pub/Sub & Eventarc** — Mensajería entre servicios y disparo de eventos
- 📊 **Cloud Monitoring & Logging** — Monitoreo centralizado con dashboard y alertas
- 🔥 **Cloud Firestore** — Base de datos NoSQL para la cola de envío de correos
- 📧 **Cloud Functions** — Procesa y envía correos electrónicos de forma automática

---

## 3. Estructura Organizacional

Así se organiza el proyecto dentro de la jerarquía de Google Cloud:

```text
Organización Corporativa (Makers150)
 └── Proyecto de Red: pe-makers150-networking-host (red compartida)
      └── Proyecto de Producción: pe-makers150-prd-bizner-gcp
           ├── Capa de Entrada: DNS + Balanceadores de carga HTTPS
           ├── Capa de Servicios: Cloud Run + Cloud Functions
           ├── Capa de Datos: Cloud SQL (PostgreSQL 16)
           └── Capa de Seguridad: Secret Manager + Cuentas de Servicio
```

:::tip ¿Quieres conectarte al proyecto desde tu terminal?
```bash
gcloud config set project pe-makers150-prd-bizner-gcp
```
:::
