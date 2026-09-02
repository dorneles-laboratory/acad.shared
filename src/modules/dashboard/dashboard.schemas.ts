import { z, registry } from '../../lib/registry';

export const dashboardCenterInfraSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  acronym: z.string().nullable(),
  color: z.string().nullable(),
  buildingsCount: z.number(),
  screensCount: z.number().optional(),
});

export const dashboardRecentActivitySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  type: z.string(),
  status: z.string(),
  author: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const dashboardStatsSchema = registry.register(
  'DashboardStatsResponse',
  z.object({
    totalContents: z
      .number()
      .openapi({ description: 'Total de conteúdos cadastrados', example: 42 }),
    activeContents: z
      .number()
      .openapi({ description: 'Conteúdos em exibição ativa', example: 12 }),
    pendingContents: z.number().openapi({
      description: 'Conteúdos agendados ou em rascunho',
      example: 5,
    }),
    contentsByStatus: z.record(z.string(), z.number()),
    contentsByType: z.record(z.string(), z.number()),
    totalScreens: z
      .number()
      .openapi({ description: 'Total de telas cadastradas', example: 15 }),
    onlineScreens: z
      .number()
      .openapi({ description: 'Telas conectadas online', example: 10 }),
    offlineScreens: z
      .number()
      .openapi({ description: 'Telas desconectadas offline', example: 5 }),
    screensByStatus: z.record(z.string(), z.number()),
    totalCenters: z
      .number()
      .openapi({ description: 'Total de centros acadêmicos', example: 4 }),
    totalBuildings: z
      .number()
      .openapi({ description: 'Total de prédios mapeados', example: 18 }),
    totalUsers: z
      .number()
      .openapi({ description: 'Total de usuários', example: 8 }),
    centersInfrastructure: z.array(dashboardCenterInfraSchema),
    recentActivities: z.array(dashboardRecentActivitySchema),
  }),
);
