import { z } from '../../lib/registry';
import {
  fieldQuerySchema,
  createFieldSchema,
  fieldIdSchema,
  updateFieldSchema,
  fieldResponseSchema,
} from './field.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateFieldDTO = z.infer<typeof createFieldSchema>;
export type UpdateFieldDTO = z.infer<typeof updateFieldSchema>;
export type FieldResponseDTO = z.infer<typeof fieldResponseSchema>;
export type FieldIdDTO = z.infer<typeof fieldIdSchema>;
export type FieldQueryDTO = z.infer<typeof fieldQuerySchema>;
export type PaginatedFieldsDTO = PaginatedResultDTO<FieldResponseDTO>;
