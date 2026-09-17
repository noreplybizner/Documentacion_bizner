---
id: dependencias-integraciones
title: Integraciones Externas
sidebar_label: 12. Dependencias e Integraciones
description: Servicios externos con los que Bizner se conecta y puntos que requieren validación con otros equipos.
---

# Integraciones Externas

Bizner no funciona solo — se conecta con varios servicios externos indispensables para operar. Aquí está el mapa de esas conexiones.

---

## 1. ¿Con Quién se Conecta Bizner?

| Servicio | ¿Para qué? | Importancia |
| :--- | :--- | :--- |
| 🧾 **SUNAT** | Validar y enviar facturas electrónicas, boletas y notas de crédito | <span className="badge-critical">CRÍTICO</span> |
| 🆔 **CPSAA** | Consultar DNI (RENIEC) y RUC (SUNAT) en tiempo real para registrar clientes | <span className="badge-high">ALTO</span> |
| 🤖 **reCAPTCHA** | Detectar y bloquear bots en compras masivas | <span className="badge-high">ALTO</span> |
| 📧 **SendGrid** | Enviar correos de confirmación de pedidos, facturas y contraseñas | <span className="badge-high">MEDIO</span> |
| 📊 **Datadog** | Monitoreo profundo del rendimiento de las bases de datos | <span className="badge-high">MEDIO</span> |
| 📈 **PowerBI** | Reportes y tableros de inteligencia de negocio | <span className="badge-tag">BAJO</span> |
| 🚀 **Azure DevOps** | Compilación automática de código y despliegue en Cloud Run | <span className="badge-high">MEDIO</span> |

---

## 2. Puntos que Necesitan Validación

Estos componentes **no se pueden verificar desde este proyecto** y requieren coordinación con otros equipos:

:::warning Pendientes de validación
1. **¿Dónde está Redis?** — Los microservicios de Pedidos usan Redis para caché, pero no hay una instancia de Memorystore en este proyecto. Confirmar si está en la Shared VPC o con un proveedor externo.

2. **Pipelines de Azure DevOps** — Confirmar con el equipo de DevOps los pasos exactos de compilación y las aprobaciones manuales en los archivos `azure-pipelines.yml`.

3. **Hosting de `bizner.ai`** — Los registros DNS apuntan a la IP `35.211.193.10`. Confirmar si es Firebase Hosting, Cloudflare u otro proxy.

4. **Dashboards en Datadog** — Solicitar acceso a la plataforma web de Datadog para documentar los monitores configurados.

5. **Red corporativa** — Validar con el equipo de redes los rangos de subredes y reglas de Cloud NAT en la Shared VPC.
:::
