import { z, registry } from '../../lib/registry';

export const userWalletSchema = registry.register(
  'UserWallet',
  z.object({
    id: z.string().uuid().openapi({ description: 'ID da carteira de tokens' }),
    userId: z.string().uuid().openapi({ description: 'ID do usuário' }),
    tokenBalance: z.number().int().min(0).default(50).openapi({
      description: 'Saldo disponível em Tokens (Tk)',
      example: 250,
    }),
    isSolidaryBeneficiary: z
      .boolean()
      .default(false)
      .openapi({ description: 'Indica se recebe tokens do Banco Comunitário' }),
    solidaryStatus: z
      .enum(['NONE', 'PENDING', 'APPROVED', 'REJECTED'])
      .default('NONE'),
    updatedAt: z.string().optional(),
  }),
);

export const tokenTransactionSchema = registry.register(
  'TokenTransaction',
  z.object({
    id: z.string().uuid().openapi({ description: 'ID da transação' }),
    walletId: z.string().uuid().openapi({ description: 'ID da carteira' }),
    amount: z.number().int().openapi({
      description: 'Quantidade de tokens debitados ou creditados (+/-)',
      example: 120,
    }),
    type: z
      .enum([
        'STRIPE_PURCHASE',
        'AI_USAGE',
        'COMMUNITY_DONATION_OUT',
        'COMMUNITY_DONATION_IN',
        'WELCOME_BONUS',
        'ADMIN_GRANT',
      ])
      .openapi({ description: 'Tipo da transação' }),
    description: z.string().openapi({
      description: 'Descrição da movimentação',
      example: 'Recarga Cardápio Universitário',
    }),
    createdAt: z.string().optional(),
  }),
);

export const simulateRechargeSchema = registry.register(
  'SimulateRechargeRequest',
  z.object({
    amountReals: z
      .number()
      .min(2.5, { message: 'O valor mínimo de apoio é de R$ 2,50.' })
      .openapi({
        description: 'Valor da contribuição em Reais (mínimo R$ 2,50)',
        example: 5.0,
      }),
  }),
);

export const rechargeSimulationResultSchema = registry.register(
  'RechargeSimulationResult',
  z.object({
    amountReals: z.number(),
    netAmountAfterFees: z.number(),
    tokensGenerated: z.number().int(),
    bonusTokens: z.number().int(),
    totalTokens: z.number().int(),
    purchasingPower: z.object({
      opportunitiesSearches: z.number().int(),
      aiChatQuestions: z.number().int(),
      lattesAudits: z.number().int(),
    }),
  }),
);

export const createCheckoutSessionSchema = registry.register(
  'CreateCheckoutSessionRequest',
  z.object({
    amountReals: z
      .number()
      .min(2.5, { message: 'O valor mínimo de recarga é de R$ 2,50.' }),
    menuItemName: z.string().optional(),
  }),
);
