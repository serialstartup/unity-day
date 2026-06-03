export type CycleStatus = 'active' | 'completed'

export interface Cycle {
  id: string
  groupId: string
  cycleIndex: number
  winnerId: string
  totalPot: number
  status: CycleStatus
  startDate: string
  endDate: string | null
}
