import { z, registry } from '../../lib/registry';

export const dashboardResponseSchema = registry.register(
  'DashboardResponse',
  z.object({
    kpis: z.object({
      totalTasks: z.number(),
      totalHours: z.number(),
      completedTasks: z.number(),
      delayedTasks: z.number(),
      dailyGoalPercent: z.number(),
      totalProjects: z.number(),
      urgentTasks: z.number(),
      todayMinutes: z.number(),
    }),
    hoursPerNature: z.array(
      z.object({
        natureza: z.string(), // Ex: 'DEV', 'MEETING'
        horas: z.number(),
      }),
    ),
    appointmentsPerProject: z.array(
      z.object({
        projeto: z.string(),
        horas: z.number(),
      }),
    ),
    recentActivity: z.array(
      z.object({
        type: z.string(),
        userName: z.string(),
        taskTitle: z.string(),
        loggedMinutes: z.number(),
        createdAt: z.string(),
      }),
    ),
  }),
);
