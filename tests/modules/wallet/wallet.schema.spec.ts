import { describe, it, expect } from 'vitest';
import { simulateRechargeSchema } from '../../../src/modules/wallet/wallet.schemas';

describe('Wallet Schemas Unit Tests', () => {
  it('should accept recharge with at least R$ 2,50', () => {
    const result = simulateRechargeSchema.safeParse({ amountReals: 5.0 });
    expect(result.success).toBe(true);
  });

  it('should reject recharge below minimum floor of R$ 2,50', () => {
    const result = simulateRechargeSchema.safeParse({ amountReals: 1.5 });
    expect(result.success).toBe(false);
  });
});
