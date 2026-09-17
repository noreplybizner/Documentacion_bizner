---
id: procesos-operativos
title: Procesos Operativos
sidebar_label: 11. Procesos Operativos
description: Procedimientos paso a paso para rollback, rotación de secretos y diagnóstico de conectividad.
---

# Procesos Operativos

Guía de procedimientos estándar para las tareas más comunes de mantenimiento y contingencia en producción.

---

## 1. 🔄 Rollback (Volver a la Versión Anterior)

Si un despliegue introduce errores, puedes redirigir el tráfico a la versión anterior en segundos.

**Paso 1** — Ver las versiones disponibles del servicio:

```bash
gcloud run revisions list \
  --service=bizner-facturador-back-prd \
  --region=us-east1 \
  --project=pe-makers150-prd-bizner-gcp
```

**Paso 2** — Redirigir el 100% del tráfico a la versión anterior:

```bash
gcloud run services update-traffic bizner-facturador-back-prd \
  --to-revisions=bizner-facturador-back-prd-00056-zx8=100 \
  --region=us-east1 \
  --project=pe-makers150-prd-bizner-gcp
```

**Paso 3** — Verificar que el cambio se aplicó:

```bash
gcloud run services describe bizner-facturador-back-prd \
  --region=us-east1 \
  --project=pe-makers150-prd-bizner-gcp \
  --format="value(status.traffic)"
```

---

## 2. 🔐 Rotar un Secreto (Cambiar una Credencial)

Cuando necesitas cambiar una contraseña, API Key o certificado, no es necesario tocar el código.

**Paso 1** — Agregar el nuevo valor al secreto en Secret Manager:

```bash
echo -n "NUEVO_VALOR" | gcloud secrets versions add NOMBRE_DEL_SECRETO \
  --data-file=- \
  --project=pe-makers150-prd-bizner-gcp
```

**Paso 2** — Hacer un nuevo despliegue para que los contenedores carguen el valor actualizado:

```bash
gcloud run services update bizner-facturador-back-prd \
  --region=us-east1 \
  --project=pe-makers150-prd-bizner-gcp \
  --update-env-vars=LAST_ROTATION_DATE="2026-08-27"
```

**Paso 3** *(opcional)* — Destruir la versión anterior del secreto:

```bash
gcloud secrets versions destroy 1 \
  --secret=NOMBRE_DEL_SECRETO \
  --project=pe-makers150-prd-bizner-gcp
```

---

## 3. 🔌 Verificar Conexión con las Bases de Datos

Si sospechas que un servicio no puede conectarse a PostgreSQL:

```bash
# Ver estado de la instancia Core
gcloud sql instances describe pe-makers150-pg-bizner-prd \
  --project=pe-makers150-prd-bizner-gcp \
  --format="value(state,ipAddresses)"

# Ver estado de la instancia Pedidos (con info de failover)
gcloud sql instances describe pe-makers150-pg-bizner-pedidos-prd \
  --project=pe-makers150-prd-bizner-gcp \
  --format="value(state,ipAddresses,failoverReplica.name)"
```
