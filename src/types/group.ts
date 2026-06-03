export type GroupStatus = 'recruiting' | 'active' | 'completed'
export type PeriodType = 'weekly' | 'monthly'

export interface Group {
  id: string
  name: string
  creatorId: string
  contributionAmount: number
  periodType: PeriodType
  maxMembers: number
  status: GroupStatus
  currentCycleIndex: number
  startDate: string
  memberOrder: string[]
}
