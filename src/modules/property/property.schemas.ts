import { z, registry } from '../../lib/registry';
import { PropertyStatus } from './property.enums';

export const createPropertySchema = registry.register(
  'CreatePropertyRequest',
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: 'Nome da propriedade',
      example: 'Fazenda Rio Grande',
    }),
    location: z.string().min(2).max(120).trim().openapi({
      description: 'Localização/Cidade da propriedade',
      example: 'Santa Maria, RS',
    }),
    car: z.string().min(5).trim().openapi({
      description: 'Cadastro Ambiental Rural (CAR)',
      example: 'RS-4316907-1A2B3C4D5E6F7G8H9I0J',
    }),
  }),
);

export const updatePropertySchema = registry.register(
  'UpdatePropertyRequest',
  createPropertySchema
    .extend({
      status: z.nativeEnum(PropertyStatus).openapi({
        description: 'Status de configuração da propriedade',
        example: PropertyStatus.Active,
      }),
    })
    .partial()
    .refine((data: Record<string, unknown>) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const propertyResponseSchema = registry.register(
  'PropertyResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    location: z.string(),
    car: z.string(),
    status: z.nativeEnum(PropertyStatus),
    ownerId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const propertyIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID da propriedade deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});

export const propertyQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: 'Busca por nome, cidade ou CAR',
    example: 'Fazenda',
  }),
  status: z.nativeEnum(PropertyStatus).optional().openapi({
    description: 'Filtra pelo status da propriedade',
    example: PropertyStatus.Active,
  }),
});
