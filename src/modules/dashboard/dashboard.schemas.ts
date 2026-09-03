import { z, registry } from '../../lib/registry';

export const dashboardCenterInfraSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  acronym: z.string().nullable(),
  color: z.string().nullable(),
  buildingsCount: z.number(),
  screensCount: z.number().optional(),
  onlineScreensCount: z.number().optional(),
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

export const dashboardMapScreenSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  ip: z.string().nullable(),
  status: z.string(),
  isPrivate: z.boolean(),
});

export const dashboardMapBuildingSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  centerName: z.string(),
  centerAcronym: z.string().nullable(),
  centerColor: z.string().nullable(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  screensCount: z.number(),
  onlineScreensCount: z.number(),
  offlineScreensCount: z.number(),
  coordinates: z.object({
    ipBased: z.object({
      latitude: z.number(),
      longitude: z.number(),
      isFallback: z.boolean(),
    }),
    buildingBased: z.object({
      latitude: z.number(),
      longitude: z.number(),
      isConfigured: z.boolean(),
    }),
  }),
  screens: z.array(dashboardMapScreenSchema),
});

export const dashboardMapResponseSchema = registry.register(
  'DashboardMapResponse',
  z.object({
    center: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    bounds: z.object({
      southwest: z.tuple([z.number(), z.number()]),
      northeast: z.tuple([z.number(), z.number()]),
    }),
    buildings: z.array(dashboardMapBuildingSchema),
  }),
);
