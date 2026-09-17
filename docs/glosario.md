---
id: glosario
title: Glosario
sidebar_label: 14. Glosario
description: Definiciones claras de los términos técnicos usados en esta documentación.
---

# Glosario

Definiciones simples de los conceptos que aparecen en esta documentación. Pensado para que cualquier persona pueda entender la arquitectura de Bizner.

---

### ☁️ Cloud Run
Servicio de Google Cloud que ejecuta aplicaciones en contenedores. Se escala automáticamente según la demanda (de 0 a muchas instancias) y solo cobras por lo que usas.

---

### 🗄️ Cloud SQL
Servicio de bases de datos administrado por Google Cloud. En Bizner usamos PostgreSQL 16. Google se encarga de los parches de seguridad, respaldos y alta disponibilidad.

---

### 🔌 Direct VPC Egress
Tecnología que permite a los contenedores de Cloud Run conectarse directamente a la red privada sin necesidad de máquinas intermedias. Más rápido, más barato.

---

### ⚡ gRPC
Protocolo de comunicación ultrarrápido entre microservicios, basado en formato binario. Es mucho más eficiente que JSON/REST. En Bizner se usa en el puerto `5000` para la malla de Pedidos.

---

### ⏱️ PITR (Point-in-Time Recovery)
Capacidad de restaurar una base de datos al estado exacto de cualquier segundo del pasado (hasta 7 días). Funciona grabando continuamente los registros de transacciones.

---

### 🔄 Regional HA (Alta Disponibilidad)
Configuración donde la base de datos tiene una copia sincronizada en otra zona. Si la zona principal falla, se conmuta automáticamente a la copia sin perder datos.

---

### 🔐 Secret Manager
Servicio de Google Cloud para guardar de forma segura contraseñas, API Keys, certificados y llaves privadas. Todo está cifrado y se controla quién puede leer cada secreto.

---

### 🌐 Serverless NEG
Un conector de red que permite a los balanceadores de carga enviar tráfico directamente a servicios de Cloud Run o Cloud Functions.

---

### 🏢 Shared VPC
Patrón donde una organización centraliza la administración de redes en un proyecto "Host" y comparte las redes privadas con otros proyectos. Así se mantiene el control y aislamiento.

---

### 📄 UBL 2.1
Estándar internacional en formato XML usado por SUNAT en Perú para estructurar facturas electrónicas, boletas y notas de crédito.
