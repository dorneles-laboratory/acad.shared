import { z } from '../../lib/registry';
import {
  userWalletSchema,
  tokenTransactionSchema,
  simulateRechargeSchema,
  rechargeSimulationResultSchema,
  createCheckoutSessionSchema,
} from './wallet.schemas';

export type UserWalletDTO = z.infer<typeof userWalletSchema>;
export type TokenTransactionDTO = z.infer<typeof tokenTransactionSchema>;
export type SimulateRechargeDTO = z.infer<typeof simulateRechargeSchema>;
export type RechargeSimulationResultDTO = z.infer<
  typeof rechargeSimulationResultSchema
>;
export type CreateCheckoutSessionDTO = z.infer<
  typeof createCheckoutSessionSchema
>;
