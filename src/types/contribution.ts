export type ContributionStatus = 'pending' | 'paid' | 'late'

export interface Contribution {
  id: string
  groupId: string
  memberId: string
  cycleIndex: number
  amount: number
  status: ContributionStatus
  paidAt: string | null
}
