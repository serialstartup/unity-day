export type MemberStatus = 'invited' | 'active' | 'exited'

export interface Member {
  id: string
  groupId: string
  userId: string
  status: MemberStatus
  orderIndex: number
  joinedAt: string
}
