import { z, registry } from '../../lib/registry';

export const memorySchema = registry.register(
  'AcademicMemory',
  z.object({
    id: z.string().uuid().openapi({ description: 'ID do registro de memória' }),
    studentId: z
      .string()
      .uuid()
      .openapi({ description: 'ID do estudante autor' }),
    title: z
      .string()
      .min(1)
      .default('Anotação')
      .openapi({ description: 'Título ou resumo do registro' }),
    content: z
      .string()
      .min(1)
      .openapi({ description: 'Conteúdo textual ou transcrição do áudio' }),
    type: z
      .enum(['APRENDIZADO', 'REFLEXAO', 'INSIGHT', 'CONQUISTA', 'DUVIDA'])
      .default('APRENDIZADO')
      .openapi({ description: 'Natureza da reflexão' }),
    format: z
      .enum(['TEXT', 'AUDIO', 'IMAGE', 'MULTIMEDIA'])
      .default('TEXT')
      .openapi({ description: 'Formato da memória' }),
    tags: z
      .array(z.string())
      .default([])
      .openapi({
        description: 'Etiquetas temáticas',
        example: ['Banco de Dados', 'Normalização'],
      }),
    course: z.string().nullable().optional().openapi({
      description: 'Disciplina ou projeto associado',
      example: 'Banco de Dados II',
    }),
    experienceId: z
      .string()
      .uuid()
      .nullable()
      .optional()
      .openapi({ description: 'Vínculo opcional a uma experiência prática' }),
    audioUrl: z
      .string()
      .url()
      .nullable()
      .optional()
      .openapi({ description: 'URL do arquivo de áudio gravado' }),
    audioDuration: z
      .number()
      .int()
      .nullable()
      .optional()
      .openapi({ description: 'Duração do áudio em segundos' }),
    date: z.string().openapi({ description: 'Data do fato relatado (ISO)' }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
);

export const createMemorySchema = registry.register(
  'CreateMemoryRequest',
  memorySchema.omit({
    id: true,
    studentId: true,
    createdAt: true,
    updatedAt: true,
  }),
);

export const updateMemorySchema = registry.register(
  'UpdateMemoryRequest',
  createMemorySchema.partial(),
);
