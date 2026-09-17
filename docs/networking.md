---
id: networking
title: Red e Infraestructura de Conectividad
sidebar_label: 7. Red y Conectividad
description: Topología de red, enrutamiento DNS, balanceadores de carga HTTPS, Direct VPC Egress y reglas de firewall.
---

# Red e Infraestructura de Conectividad

Esta sección detalla cómo fluye el tráfico de red en Bizner: desde las peticiones de los usuarios en internet hasta la comunicación privada entre contenedores y bases de datos.

---

## 1. Topología de Red Global

```mermaid
flowchart TD
    subgraph Internet["🌐 Tráfico Externo"]
        User["Usuarios Web & Apps"]
        PBI["Servicio PowerBI"]
    end

    subgraph Perimetro["🛡️ Capa Perimetral & DNS"]
        DNS["Cloud DNS: bizner.ai"]
        LB_Global["Global HTTPS LB + CDN\n(136.68.127.76)"]
        LB_Reg["Regional HTTPS LB\n(34.23.203.92 - us-east1)"]
    end

    subgraph VPC_Local["🔒 Red Local (default)"]
        Subnet_LB["Subred Balanceador Proxy\n(10.0.0.0/24)"]
        VM_PBI["VM Proxy PowerBI\n(10.142.0.66:5432/5433)"]
        VM_DD["VM Datadog DBM\n(10.142.0.80)"]
        Direct_Egress["Direct VPC Egress\n(Rango 10.142.15.x)"]
    end

    subgraph CloudRun_Layer["☁️ Cómputo Serverless"]
        CR_Services["43 Servicios Cloud Run\n(Frontends & Microservicios)"]
    end

    subgraph Shared_VPC["🏢 Red Corporativa (pe-makers150-networking-host)"]
        SQL_Core[("Cloud SQL Core\nIP Privada: 192.168.4.11")]
        SQL_Pedidos[("Cloud SQL Pedidos\nIP Privada PSA")]
    end

    User --> DNS
    DNS --> LB_Global & LB_Reg
    LB_Reg --> Subnet_LB --> CR_Services
    LB_Global -->|Cache CDN| GCS[("GCS GeoJSON")]

    CR_Services --> Direct_Egress
    Direct_Egress -->|Fibra Privada PSA| SQL_Core & SQL_Pedidos

    PBI -->|Firewall allow-pbi| VM_PBI --> SQL_Core & SQL_Pedidos
    VM_DD --> SQL_Core & SQL_Pedidos
```

---

## 2. Gestión de Dominios (Cloud DNS: `bizner.ai`)

La zona pública administrada `bizner-prd-zone` enruta el tráfico hacia las IPs correspondientes:

| Nombre de Dominio | Tipo | Destino / IP | Servicio que Responde |
| :--- | :--- | :--- | :--- |
| `facturador.bizner.ai` | A | `34.23.203.92` | Balanceador Regional → `facturador-frontend` |
| `cuaderno.bizner.ai` | A | `34.23.203.92` | Balanceador Regional → `cuaderno-frontend` |
| `micuenta.bizner.ai` | A | `34.23.203.92` | Balanceador Regional → `integrador-frontend` |
| `distribuidores.bizner.ai` | A | `34.23.203.92` | Balanceador Regional → Backend por defecto |
| `cdn.bizner.ai` | A | `136.68.127.76` | Balanceador Global + Cloud CDN (Archivos GeoJSON) |
| `pedidos.bizner.ai` | A | `35.211.193.10` | Portal web principal de Pedidos |
| `bizner.ai` | A | `35.211.193.10` | Sitio institucional principal |

---

## 3. Balanceadores de Carga y Enrutamiento

### ⚖️ Balanceador Regional HTTPS (`lb-frontend-bizner-prd`)
- **Dirección IP**: `34.23.203.92` (Región `us-east1`)
- **Certificado SSL**: Gestionado por Google (`bizner-cert`)
- **Subred Proxy Dedicada**: `10.0.0.0/24` (`subred-lb-bizner-prd`)
- **Mapa de URLs (`url-map`)**:
  - `host: facturador.bizner.ai` ➔ Backend Service `facturador-frontend`
  - `host: cuaderno.bizner.ai` ➔ Backend Service `cuaderno-frontend`
  - `host: micuenta.bizner.ai` ➔ Backend Service `integrador-frontend`

### 🌍 Balanceador Global con CDN (`bizner-cdn-geojson-urlmap-prd`)
- **Dirección IP Anycast**: `136.68.127.76`
- **Backend**: Bucket `bizner-cdn-geojson-backend-prd`
- **Función**: Almacena en caché de borde (*Edge Cache*) los polígonos y mapas vectoriales GeoJSON para que las apps móviles descarguen zonas de entrega en milisegundos.

---

## 4. Conectividad Interna: Direct VPC Egress & Shared VPC

- **Direct VPC Egress**: Todos los microservicios Cloud Run se comunican directamente con la VPC asignando interfaces de red internas (`10.142.15.x`). Esto elimina la necesidad de Serverless VPC Access Connectors tradicionales, reduciendo la latencia intra-cluster y los costos operativos de máquinas puente.
- **Shared VPC (Host Corporativo)**: El proyecto productivo `pe-makers150-prd-bizner-gcp` está conectado al host `pe-makers150-networking-host`. La comunicación hacia las bases de datos PostgreSQL viaja a través del túnel de **Private Services Access (PSA)** usando direcciones privadas (ej: `192.168.4.11`), sin transitar por internet.

---

## 5. Reglas de Firewall

| Nombre de Regla | Dirección | Puertos / Protocolo | Origen Real | Destino / Target |
| :--- | :--- | :--- | :--- | :--- |
| `allow-pbi-to-cloudsql-proxy` | INGRESS | TCP 5432, 5433 | `0.0.0.0/0` | Tag: `cloudsql-proxy-pbi` |
| `dd-fw-rule` | INGRESS | TCP 22 (SSH) | `0.0.0.0/0` | Todas las instancias |
| `default-allow-https` | INGRESS | TCP 443 | `0.0.0.0/0` | Tag: `https-server` |
| `default-allow-http` | INGRESS | TCP 80 | `0.0.0.0/0` | Tag: `http-server` |

:::warning Recomendación de Seguridad DevSecOps
La regla `allow-pbi-to-cloudsql-proxy` tiene como origen `0.0.0.0/0` protegido por la autenticación del Cloud SQL Proxy. Como buena práctica de hardening, se recomienda restringir el rango de IPs de origen exclusivamente al bloque de IPs públicas oficiales del servicio de PowerBI Service en Azure / Microsoft 365.
:::
