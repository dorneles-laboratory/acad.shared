import { z } from 'zod';
import {
  dashboardCenterInfraSchema,
  dashboardRecentActivitySchema,
  dashboardStatsSchema,
} from './dashboard.schemas';

export type DashboardCenterInfraDTO = z.infer<
  typeof dashboardCenterInfraSchema
>;
export type DashboardRecentActivityDTO = z.infer<
  typeof dashboardRecentActivitySchema
>;
export type DashboardStatsDTO = z.infer<typeof dashboardStatsSchema>;
