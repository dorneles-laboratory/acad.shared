import { ipv4Schema } from '../../common';
import { z, registry } from '../../lib/registry';
import { buildingResponseSchema } from '../buildings';
import { ScreenStatus } from './screens.enums';

export const createScreenSchema = registry.register(
  'CreateScreenRequest',
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: 'Nome de identificação da tela',
      example: 'Tela Recepção Principal',
    }),
    ip: ipv4Schema.optional().openapi({
      description: 'Endereço IP do dispositivo na rede',
      example: '192.168.1.50',
    }),
    buildingId: z.string().uuid().openapi({
      description: 'ID do prédio onde a tela está instalada',
      example: 'd3b07384-d113-49cd-a5d6-80d00d542fba',
    }),
    isPaired: z.boolean().default(false).openapi({
      description: 'Indica se a tela está pareada com o servidor',
      example: true,
    }),
  }),
);

export const updateScreenSchema = registry.register(
  'UpdateScreenRequest',
  z
    .object({
      name: z.string().min(2).max(120).trim().optional(),
      ip: ipv4Schema.optional(),
      buildingId: z.string().uuid().optional(),
      isPaired: z.boolean().optional(),
      status: z.nativeEnum(ScreenStatus).optional(),
      pin: z.string().length(6).optional().openapi({
        description: 'PIN de pareamento da tela',
        example: 'A1B2C3',
      }),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const screenResponseSchema = registry.register(
  'ScreenResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    ip: z.string(),
    status: z.nativeEnum(ScreenStatus),
    buildingId: z.string().uuid(),
    isPaired: z.boolean(),
    building: buildingResponseSchema.optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
);

export const screenIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID da tela deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});

export const screenQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({ description: 'Busca por nome ou IP' }),
  status: z.nativeEnum(ScreenStatus).optional(),
  centerId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
});
