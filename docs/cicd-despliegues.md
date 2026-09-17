---
id: cicd-despliegues
title: Despliegues y Actualización de Código
sidebar_label: 8. CI/CD y Despliegues
description: Cómo se actualiza el código en producción de forma automática y sin interrupciones para los usuarios.
---

# Despliegues y Actualización de Código

Cuando un desarrollador termina una mejora o corrección, el código nuevo llega a producción de forma **automática y sin interrumpir el servicio**. Este proceso se llama CI/CD (Integración y Despliegue Continuo).

---

## 1. ¿Cómo funciona un despliegue?

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Desarrollador
    participant AzPipe as Azure DevOps
    participant AR as Registro de Imágenes
    participant CR as Cloud Run
    participant SecMgr as Secret Manager

    Dev->>AzPipe: Sube código nuevo
    Note over AzPipe: Compila y genera imagen Docker
    AzPipe->>AR: Guarda la imagen con un tag único
    AzPipe->>CR: Despliega la nueva imagen
    Note over CR: Crea nueva versión del servicio<br/>Inyecta secretos desde Secret Manager
    CR->>CR: Verifica que funciona correctamente
    CR->>CR: Redirige todo el tráfico a la nueva versión
    Note over Dev,CR: ✅ Listo, sin tiempo de caída
```

---

## 2. Características del Despliegue

### 📦 Imágenes inmutables
Cada versión del código se empaqueta en una imagen Docker con un tag único (ej: `:8842`) y un hash criptográfico. Esto garantiza que lo que se probó es exactamente lo que se despliega.

### 🔄 Sin tiempo de caída (Zero-Downtime)
Cloud Run levanta los nuevos contenedores **en paralelo** a los actuales. Solo cuando la nueva versión pasa las pruebas de salud, se redirige el tráfico. Los contenedores viejos se apagan de forma ordenada.

### 🔐 Pipeline seguro
El pipeline se autentica con una identidad dedicada que **solo puede compilar y desplegar**. No tiene acceso a datos de producción ni a secretos de negocio.

---

## 3. Rollback Inmediato

Si algo sale mal después de un despliegue, se puede volver a la versión anterior en **menos de 5 segundos**, sin reconstruir nada:

```bash
# Ejemplo: volver a la versión anterior del Facturador
gcloud run services update-traffic bizner-facturador-back-prd \
  --to-revisions=bizner-facturador-back-prd-00056-zx8=100 \
  --region=us-east1
```

:::tip ¿Cómo ver las versiones disponibles?
```bash
gcloud run revisions list --service=<NOMBRE_SERVICIO> --region=us-east1
```
:::
