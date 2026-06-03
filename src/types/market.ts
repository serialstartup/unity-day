export interface VirtualGoldPackage {
  id: string
  amount: number
  priceInTRY: number
  bonusAmount: number
  label: string
}

export type TransactionType = 'purchase' | 'sale' | 'contribution_out' | 'payout_in'

export interface Transaction {
  id: string
  userId: string
  type: TransactionType
  amount: number
  createdAt: string
  groupId?: string
}
