import { z, registry } from '../../lib/registry';
import { SystemStatus } from '../../common/common.enums';
import { buildingResponseSchema } from '../buildings/building.schemas';

export const createCenterSchema = registry.register(
  'CreateCenterRequest',
  z.object({
    name: z.string().min(2).max(150).trim().openapi({
      description: 'Nome do Centro Acadêmico',
      example: 'Centro de Ciências Tecnológicas',
    }),
    acronym: z.string().min(2).max(10).trim().toUpperCase().openapi({
      description: 'Sigla do Centro',
      example: 'CCT',
    }),
    color: z
      .string()
      .regex(
        /^bg-[a-z]+-\d{3}$/,
        'A cor deve seguir o padrão do Tailwind (ex: bg-blue-500)',
      )
      .openapi({
        description: 'Classe utilitária de cor para a interface',
        example: 'bg-blue-500',
      }),
  }),
);

export const updateCenterSchema = registry.register(
  'UpdateCenterRequest',
  createCenterSchema
    .extend({
      status: z.nativeEnum(SystemStatus).openapi({
        description: 'Status de atividade do Centro',
        example: SystemStatus.Active,
      }),
    })
    .partial()
    .refine((data: Record<string, unknown>) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const centerResponseSchema = registry.register(
  'CenterResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    acronym: z.string(),
    color: z.string(),
    status: z.nativeEnum(SystemStatus),
    buildings: z.array(buildingResponseSchema).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const centerIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID do centro deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});

export const centerQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: 'Busca por nome ou sigla do Centro',
    example: 'Tecnológicas',
  }),
  status: z.nativeEnum(SystemStatus).optional().openapi({
    description: 'Filtra pelo status do Centro',
    example: SystemStatus.Active,
  }),
  includeBuildings: z.coerce.boolean().optional().default(false).openapi({
    description:
      'Se verdadeiro, inclui os prédios vinculados ao centro na resposta',
  }),
});
