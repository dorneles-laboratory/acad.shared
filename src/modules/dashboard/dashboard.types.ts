import { z } from '../../lib/registry';
import { dashboardResponseSchema } from './dashboard.schemas';
export type DashboardResponseDTO = z.infer<typeof dashboardResponseSchema>;
