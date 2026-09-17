// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'informacion-general',
      label: '1. Información General',
    },
    {
      type: 'doc',
      id: 'arquitectura',
      label: '2. Arquitectura',
    },
    {
      type: 'doc',
      id: 'inventario-recursos',
      label: '3. Inventario de Recursos',
    },
    {
      type: 'category',
      label: '4. Servicios',
      collapsible: true,
      collapsed: false,
      items: [
        'servicios-componentes/facturador',
        'servicios-componentes/pedidos-orquestador',
        'servicios-componentes/microservicios-pedidos',
        'servicios-componentes/n8n-automatizacion',
      ],
    },
    {
      type: 'doc',
      id: 'bases-de-datos',
      label: '5. Bases de Datos',
    },
    {
      type: 'doc',
      id: 'seguridad-iam',
      label: '6. Seguridad',
    },
    {
      type: 'doc',
      id: 'networking',
      label: '7. Red y Conectividad',
    },
    {
      type: 'doc',
      id: 'cicd-despliegues',
      label: '8. Despliegues',
    },
    {
      type: 'doc',
      id: 'observabilidad',
      label: '9. Monitoreo y Alertas',
    },
    {
      type: 'doc',
      id: 'backups-recuperacion',
      label: '10. Backups y Recuperación',
    },
    {
      type: 'doc',
      id: 'procesos-operativos',
      label: '11. Procesos Operativos',
    },
    {
      type: 'doc',
      id: 'dependencias-integraciones',
      label: '12. Integraciones Externas',
    },
    {
      type: 'doc',
      id: 'historial-cambios',
      label: '13. Historial de Cambios',
    },
    {
      type: 'doc',
      id: 'glosario',
      label: '14. Glosario',
    },
  ],
};

export default sidebars;
