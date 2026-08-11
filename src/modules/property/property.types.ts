import { z } from '../../lib/registry';
import {
  createPropertySchema,
  updatePropertySchema,
  propertyResponseSchema,
  propertyIdSchema,
  propertyQuerySchema,
} from './property.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreatePropertyDTO = z.infer<typeof createPropertySchema>;
export type UpdatePropertyDTO = z.infer<typeof updatePropertySchema>;
export type PropertyResponseDTO = z.infer<typeof propertyResponseSchema>;
export type PropertyIdDTO = z.infer<typeof propertyIdSchema>;
export type PropertyQueryDTO = z.infer<typeof propertyQuerySchema>;
export type PaginatedPropertiesDTO = PaginatedResultDTO<PropertyResponseDTO>;
