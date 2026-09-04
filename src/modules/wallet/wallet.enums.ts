export const TransactionType = {
  StripePurchase: 'STRIPE_PURCHASE',
  AiUsage: 'AI_USAGE',
  CommunityDonationOut: 'COMMUNITY_DONATION_OUT',
  CommunityDonationIn: 'COMMUNITY_DONATION_IN',
  WelcomeBonus: 'WELCOME_BONUS',
  AdminGrant: 'ADMIN_GRANT',
} as const;

export type EnumTransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export const SolidaryStatus = {
  None: 'NONE',
  Pending: 'PENDING',
  Approved: 'APPROVED',
  Rejected: 'REJECTED',
} as const;

export type EnumSolidaryStatus =
  (typeof SolidaryStatus)[keyof typeof SolidaryStatus];
