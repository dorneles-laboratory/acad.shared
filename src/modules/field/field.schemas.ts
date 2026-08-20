import { z, registry } from '../../lib/registry';
import { FieldStatus } from './field.enums';
import type { PaginatedResultDTO } from '../../common/common.types';
import { propertyResponseSchema } from '../property/property.schemas';

export const coordinateSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const createFieldSchema = registry.register(
  'CreateFieldRequest',
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: 'Nome do talhão',
      example: 'Talhão da Sede',
    }),
    soilType: z.string().optional().openapi({
      description: 'Tipo de solo',
      example: 'Latossolo Vermelho',
    }),
    coordinates: z.array(coordinateSchema).min(3).openapi({
      description: 'Vértices do polígono desenhado',
    }),
    propertyId: z.string().uuid().openapi({
      description: 'ID da propriedade a qual este talhão pertence',
    }),
  }),
);

export const updateFieldSchema = registry.register(
  'UpdateFieldRequest',
  createFieldSchema
    .omit({ propertyId: true })
    .extend({
      status: z.nativeEnum(FieldStatus).openapi({
        description: 'Status de processamento do talhão',
        example: FieldStatus.Ready,
      }),
    })
    .partial()
    .refine((data: Record<string, unknown>) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const fieldResponseSchema = registry.register(
  'FieldResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
    soilType: z.string().nullable(),
    area: z.number().nullable(),
    perimeter: z.number().nullable(),
    coordinates: z.any().nullable(),
    status: z.nativeEnum(FieldStatus),
    propertyId: z.string().uuid(),
    property: propertyResponseSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const fieldIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID do talhão deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});

export const fieldQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  propertyId: z.string().uuid().optional().openapi({
    description: 'Filtra os talhões por uma propriedade específica',
  }),
  query: z.string().optional().openapi({
    description: 'Busca por nome ou código do talhão',
    example: 'TAL-001',
  }),
  status: z.nativeEnum(FieldStatus).optional().openapi({
    description: 'Filtra pelo status do talhão',
    example: FieldStatus.Ready,
  }),
});
