import { z, registry } from '../../lib/registry';
import { SystemStatus } from '../../common/common.enums';

export const createBuildingSchema = registry.register(
  'CreateBuildingRequest',
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: 'Nome do prédio',
      example: 'Bloco C',
    }),
    description: z.string().max(255).trim().optional().openapi({
      description: 'Descrição de localização ou uso do prédio',
      example: 'Salas de aula e laboratórios',
    }),
    centerId: z.string().uuid().openapi({
      description: 'ID do centro ao qual o prédio pertence',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
);

export const updateBuildingSchema = registry.register(
  'UpdateBuildingRequest',
  createBuildingSchema
    .extend({
      status: z.nativeEnum(SystemStatus).openapi({
        description: 'Status do prédio',
        example: SystemStatus.Active,
      }),
    })
    .partial()
    .refine((data: Record<string, unknown>) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const buildingResponseSchema = registry.register(
  'BuildingResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable(),
    status: z.nativeEnum(SystemStatus),
    centerId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const buildingIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID do prédio deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});

export const buildingQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: 'Busca por nome ou descrição do prédio',
    example: 'Bloco',
  }),
  centerId: z.string().uuid().optional().openapi({
    description: 'Filtra os prédios por um centro específico',
  }),
  status: z.nativeEnum(SystemStatus).optional().openapi({
    description: 'Filtra pelo status do prédio',
    example: SystemStatus.Active,
  }),
});
