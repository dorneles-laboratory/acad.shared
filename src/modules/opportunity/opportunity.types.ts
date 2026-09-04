import { z } from '../../lib/registry';
import {
  opportunitySchema,
  createOpportunitySchema,
  updateOpportunitySchema,
  applicationSchema,
  createApplicationSchema,
  updateApplicationStatusSchema,
  opportunityFilterQuerySchema,
} from './opportunity.schemas';

export type OpportunityDTO = z.infer<typeof opportunitySchema>;
export type CreateOpportunityDTO = z.infer<typeof createOpportunitySchema>;
export type UpdateOpportunityDTO = z.infer<typeof updateOpportunitySchema>;
export type ApplicationDTO = z.infer<typeof applicationSchema>;
export type CreateApplicationDTO = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStatusDTO = z.infer<
  typeof updateApplicationStatusSchema
>;
export type OpportunityFilterQueryDTO = z.infer<
  typeof opportunityFilterQuerySchema
>;
