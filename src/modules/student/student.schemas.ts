import { z, registry } from '../../lib/registry';

export const studentProfileSchema = registry.register(
  'StudentProfile',
  z.object({
    id: z.string().uuid().openapi({ description: 'ID do perfil acadêmico' }),
    userId: z
      .string()
      .uuid()
      .openapi({ description: 'ID do usuário associado' }),
    university: z.string().openapi({
      description: 'Instituição de ensino superior',
      example: 'UFSM',
    }),
    campus: z
      .string()
      .nullable()
      .optional()
      .openapi({ description: 'Campus universitário', example: 'Sede' }),
    course: z.string().openapi({
      description: 'Curso de graduação',
      example: 'Ciência da Computação',
    }),
    currentSemester: z
      .number()
      .int()
      .min(1)
      .max(20)
      .openapi({ description: 'Semestre atual', example: 4 }),
    registrationId: z.string().nullable().optional().openapi({
      description: 'Número de matrícula acadêmica',
      example: '202310123',
    }),
    shift: z
      .enum(['MANHA', 'TARDE', 'NOITE', 'INTEGRAL'])
      .nullable()
      .optional()
      .openapi({ description: 'Turno do curso' }),
    expectedGraduationYear: z
      .number()
      .int()
      .nullable()
      .optional()
      .openapi({ description: 'Ano previsto de formatura', example: 2027 }),
    bio: z
      .string()
      .nullable()
      .optional()
      .openapi({ description: 'Biografia acadêmica / apresentação pessoal' }),
    interests: z
      .array(z.string())
      .default([])
      .openapi({
        description: 'Tópicos de interesse e pesquisa',
        example: ['Inteligência Artificial', 'Web Dev'],
      }),
    academicGoals: z
      .array(z.string())
      .default([])
      .openapi({ description: 'Metas acadêmicas do ciclo atual' }),
    lattesUrl: z
      .string()
      .url()
      .nullable()
      .optional()
      .openapi({ description: 'Link do currículo Lattes' }),
    linkedinUrl: z
      .string()
      .url()
      .nullable()
      .optional()
      .openapi({ description: 'Link do perfil no LinkedIn' }),
    githubUrl: z
      .string()
      .url()
      .nullable()
      .optional()
      .openapi({ description: 'Link do perfil no GitHub' }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
);

export const updateStudentProfileSchema = registry.register(
  'UpdateStudentProfileRequest',
  studentProfileSchema
    .omit({ id: true, userId: true, createdAt: true, updatedAt: true })
    .partial(),
);
