import { z, registry } from '../../lib/registry';

export const experienceSchema = registry.register(
  'Experience',
  z.object({
    id: z.string().uuid().openapi({ description: 'ID da vivência prática' }),
    studentId: z.string().uuid().openapi({ description: 'ID do estudante' }),
    title: z.string().min(2).openapi({
      description: 'Título da atividade ou projeto',
      example: 'Iniciação Científica em Redes Neurais',
    }),
    type: z
      .enum([
        'PROJECT',
        'INTERNSHIP',
        'RESEARCH',
        'EXTENSION',
        'TEACHING',
        'COMPETITION',
        'EVENT',
      ])
      .openapi({ description: 'Tipo fundamental de vivência prática' }),
    status: z
      .enum(['IN_PROGRESS', 'COMPLETED', 'PAUSED'])
      .default('IN_PROGRESS')
      .openapi({ description: 'Estado da experiência' }),
    role: z.string().min(2).openapi({
      description: 'Papel exercido',
      example: 'Pesquisador Bolsista PIBIC',
    }),
    institution: z.string().min(2).openapi({
      description: 'Instituição ou organização vinculada',
      example: 'Laboratório de Inteligência Artificial / UFSM',
    }),
    advisor: z.string().nullable().optional().openapi({
      description: 'Orientador ou supervisor',
      example: 'Prof. Dr. Dorneles',
    }),
    startDate: z.string().openapi({
      description: 'Data de início (ISO)',
      example: '2025-03-01T00:00:00Z',
    }),
    endDate: z
      .string()
      .nullable()
      .optional()
      .openapi({ description: 'Data de término (ISO)' }),
    weeklyHours: z
      .number()
      .int()
      .min(1)
      .max(60)
      .default(20)
      .openapi({ description: 'Carga horária semanal dedicada', example: 20 }),
    totalHours: z
      .number()
      .int()
      .min(0)
      .default(0)
      .openapi({ description: 'Total de horas acumuladas', example: 160 }),
    description: z.string().openapi({
      description: 'Resumo das atividades desenvolvidas e resultados',
    }),
    skills: z
      .array(z.string())
      .default([])
      .openapi({
        description: 'Competências e tecnologias aplicadas',
        example: ['Python', 'PyTorch', 'Metodologia Científica'],
      }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
);

export const createExperienceSchema = registry.register(
  'CreateExperienceRequest',
  experienceSchema.omit({
    id: true,
    studentId: true,
    totalHours: true,
    createdAt: true,
    updatedAt: true,
  }),
);

export const updateExperienceSchema = registry.register(
  'UpdateExperienceRequest',
  createExperienceSchema.partial(),
);
