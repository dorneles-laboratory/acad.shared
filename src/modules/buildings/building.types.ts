import { z } from '../../lib/registry';
import {
  buildingQuerySchema,
  buildingIdSchema,
  buildingResponseSchema,
  createBuildingSchema,
  updateBuildingSchema,
} from './building.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateBuildingDTO = z.infer<typeof createBuildingSchema>;
export type UpdateBuildingDTO = z.infer<typeof updateBuildingSchema>;
export type BuildingResponseDTO = z.infer<typeof buildingResponseSchema>;
export type BuildingIdDTO = z.infer<typeof buildingIdSchema>;
export type BuildingQueryDTO = z.infer<typeof buildingQuerySchema>;
export type PaginatedBuildingsDTO = PaginatedResultDTO<BuildingResponseDTO>;
