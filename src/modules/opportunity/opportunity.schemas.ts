import { z, registry } from '../../lib/registry';

export const opportunitySchema = registry.register(
  'Opportunity',
  z.object({
    id: z.string().uuid().openapi({ description: 'ID da oportunidade/edital' }),
    title: z.string().min(2).openapi({
      description: 'Título do edital ou vaga',
      example: 'Bolsa FAPERGS Iniciação Científica 2026',
    }),
    institution: z.string().min(2).openapi({
      description: 'Instituição ou órgão fomentador',
      example: 'UFSM / FAPERGS',
    }),
    institutionLogo: z
      .string()
      .nullable()
      .optional()
      .openapi({ description: 'Logo ou sigla da instituição' }),
    description: z
      .string()
      .openapi({ description: 'Descrição detalhada do edital e objetivos' }),
    category: z
      .enum([
        'SCHOLARSHIP',
        'RESEARCH_GRANT',
        'TEACHING_ASSISTANT',
        'EXTENSION',
        'INTERNSHIP',
        'EXCHANGE',
        'GRADUATE_PROGRAM',
        'EVENT',
        'HACKATHON',
      ])
      .openapi({ description: 'Categoria da oportunidade' }),
    modality: z
      .enum(['PRESENTIAL', 'REMOTE', 'HYBRID'])
      .default('PRESENTIAL')
      .openapi({ description: 'Modalidade de atuação' }),
    level: z
      .enum(['GRADUATION', 'POST_GRADUATION', 'TECHNICAL'])
      .default('GRADUATION')
      .openapi({ description: 'Nível de formação exigido' }),
    value: z.string().nullable().optional().openapi({
      description: 'Remuneração ou valor da bolsa',
      example: 'R$ 700,00/mês',
    }),
    benefits: z
      .array(z.string())
      .default([])
      .openapi({ description: 'Benefícios adicionais da vaga' }),
    requirements: z
      .array(z.string())
      .default([])
      .openapi({ description: 'Requisitos mínimos obrigatórios' }),
    targetCourses: z
      .array(z.string())
      .default([])
      .openapi({ description: 'Cursos elegíveis' }),
    deadline: z.string().openapi({
      description: 'Data limite para inscrição (ISO)',
      example: '2026-10-15T23:59:59Z',
    }),
    publishedAt: z.string().openapi({ description: 'Data de publicação' }),
    matchScore: z.number().int().min(0).max(100).default(0).openapi({
      description: 'Grau de compatibilidade com o perfil do estudante (0-100)',
      example: 88,
    }),
    externalUrl: z
      .string()
      .url()
      .nullable()
      .optional()
      .openapi({ description: 'Link oficial do edital/inscrição' }),
    status: z
      .enum(['OPEN', 'CLOSED', 'ARCHIVED'])
      .default('OPEN')
      .openapi({ description: 'Situação do edital' }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
);

export const createOpportunitySchema = registry.register(
  'CreateOpportunityRequest',
  opportunitySchema.omit({
    id: true,
    matchScore: true,
    createdAt: true,
    updatedAt: true,
  }),
);

export const updateOpportunitySchema = registry.register(
  'UpdateOpportunityRequest',
  createOpportunitySchema.partial(),
);

export const applicationSchema = registry.register(
  'Application',
  z.object({
    id: z
      .string()
      .uuid()
      .openapi({ description: 'ID da candidatura no Kanban' }),
    studentId: z.string().uuid().openapi({ description: 'ID do estudante' }),
    opportunityId: z
      .string()
      .uuid()
      .openapi({ description: 'ID da oportunidade' }),
    status: z
      .enum([
        'DRAFT',
        'SUBMITTED',
        'REVIEW',
        'ACCEPTED',
        'REJECTED',
        'WITHDRAWN',
      ])
      .default('DRAFT')
      .openapi({ description: 'Coluna no Kanban de candidaturas' }),
    notes: z
      .string()
      .nullable()
      .optional()
      .openapi({ description: 'Anotações pessoais do estudante' }),
    appliedAt: z
      .string()
      .nullable()
      .optional()
      .openapi({ description: 'Data de envio da candidatura' }),
    opportunity: opportunitySchema.optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
);

export const createApplicationSchema = registry.register(
  'CreateApplicationRequest',
  z.object({
    opportunityId: z
      .string()
      .uuid()
      .openapi({ description: 'ID da oportunidade a se candidatar' }),
    status: z
      .enum([
        'DRAFT',
        'SUBMITTED',
        'REVIEW',
        'ACCEPTED',
        'REJECTED',
        'WITHDRAWN',
      ])
      .default('DRAFT'),
    notes: z.string().optional(),
  }),
);

export const updateApplicationStatusSchema = registry.register(
  'UpdateApplicationStatusRequest',
  z.object({
    status: z
      .enum([
        'DRAFT',
        'SUBMITTED',
        'REVIEW',
        'ACCEPTED',
        'REJECTED',
        'WITHDRAWN',
      ])
      .openapi({ description: 'Novo status / coluna' }),
    notes: z.string().optional(),
  }),
);

export const opportunityFilterQuerySchema = registry.register(
  'OpportunityFilterQuery',
  z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    modality: z.string().optional(),
    level: z.string().optional(),
    minMatch: z.coerce.number().int().min(0).max(100).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(12),
  }),
);
