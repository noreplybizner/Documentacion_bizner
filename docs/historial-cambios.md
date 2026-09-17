---
id: historial-cambios
title: Historial de Cambios
sidebar_label: 13. Historial de Cambios
description: Cronología de los principales hitos de infraestructura del proyecto.
---

# Historial de Cambios

Línea de tiempo con los hitos más importantes del proyecto desde su creación.

---

### 📅 Enero 2025
**Creación del proyecto GCP**
Se creó el proyecto `pe-makers150-prd-bizner-gcp` y se vinculó a la organización corporativa de Makers150.

---

### 📅 Abril 2025
**Configuración de secretos**
Se cargaron las credenciales iniciales de bases de datos e integraciones en Secret Manager.

---

### 📅 Mayo 2025
**Balanceador de carga**
Se creó el Regional HTTPS Load Balancer (`34.23.203.92`) con Serverless NEGs para los contenedores Cloud Run.

---

### 📅 Septiembre 2025
**Base de datos de Pedidos**
Se desplegó la instancia `pe-makers150-pg-bizner-pedidos-prd` con **Alta Disponibilidad Regional** y recuperación al segundo (PITR).

---

### 📅 Julio 2026
**CDN para mapas**
Se configuró el Global CDN Load Balancer (`136.68.127.76`) para acelerar la entrega de polígonos GeoJSON de zonificación.

---

### 📅 Julio 2026
**Motor de automatización**
Se desplegó `n8n-bizner` en Cloud Run con CPU siempre activa, persistencia en PostgreSQL e integración con modelos de IA en Vertex AI.

---

### 📅 Agosto 2026
**Validación de servicios**
Se verificaron y validaron las revisiones productivas activas del Facturador y del Orquestador de Pedidos.

---

### 📅 Agosto 2026
**Publicación de la documentación**
Se generó y publicó este portal de documentación oficial del proyecto.
