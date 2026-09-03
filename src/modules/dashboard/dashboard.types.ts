import { z } from 'zod';
import {
  dashboardCenterInfraSchema,
  dashboardRecentActivitySchema,
  dashboardStatsSchema,
  dashboardMapScreenSchema,
  dashboardMapBuildingSchema,
  dashboardMapResponseSchema,
} from './dashboard.schemas';

export type DashboardCenterInfraDTO = z.infer<
  typeof dashboardCenterInfraSchema
>;
export type DashboardRecentActivityDTO = z.infer<
  typeof dashboardRecentActivitySchema
>;
export type DashboardStatsDTO = z.infer<typeof dashboardStatsSchema>;
export type DashboardMapScreenDTO = z.infer<typeof dashboardMapScreenSchema>;
export type DashboardMapBuildingDTO = z.infer<
  typeof dashboardMapBuildingSchema
>;
export type DashboardMapResponseDTO = z.infer<
  typeof dashboardMapResponseSchema
>;
