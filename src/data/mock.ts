import type { User, Group, Member, Contribution, Cycle, VirtualGoldPackage, Transaction } from '@/types'

export const mockUser: User = {
  id: 'user-1',
  phone: '+905551234567',
  email: 'ayse@example.com',
  fullName: 'Ayşe Yılmaz',
  avatarUrl: null,
  virtualGoldBalance: 250,
  createdAt: '2026-01-15T10:00:00Z',
}

export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Kadıköy Altın Günü',
    creatorId: 'user-1',
    contributionAmount: 50,
    periodType: 'weekly',
    maxMembers: 8,
    status: 'active',
    currentCycleIndex: 2,
    startDate: '2026-05-01T00:00:00Z',
    memberOrder: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6', 'user-7', 'user-8'],
  },
  {
    id: 'group-2',
    name: 'Arkadaş Grubu',
    creatorId: 'user-2',
    contributionAmount: 100,
    periodType: 'monthly',
    maxMembers: 5,
    status: 'recruiting',
    currentCycleIndex: 0,
    startDate: '2026-06-01T00:00:00Z',
    memberOrder: ['user-2', 'user-1'],
  },
]

export const mockMembers: Member[] = [
  { id: 'member-1', groupId: 'group-1', userId: 'user-1', status: 'active', orderIndex: 0, joinedAt: '2026-05-01T00:00:00Z' },
  { id: 'member-2', groupId: 'group-1', userId: 'user-2', status: 'active', orderIndex: 1, joinedAt: '2026-05-01T00:00:00Z' },
  { id: 'member-3', groupId: 'group-1', userId: 'user-3', status: 'active', orderIndex: 2, joinedAt: '2026-05-01T00:00:00Z' },
]

export const mockContributions: Contribution[] = [
  { id: 'contrib-1', groupId: 'group-1', memberId: 'member-1', cycleIndex: 2, amount: 50, status: 'paid', paidAt: '2026-06-01T09:00:00Z' },
  { id: 'contrib-2', groupId: 'group-1', memberId: 'member-2', cycleIndex: 2, amount: 50, status: 'paid', paidAt: '2026-06-01T11:00:00Z' },
  { id: 'contrib-3', groupId: 'group-1', memberId: 'member-3', cycleIndex: 2, amount: 50, status: 'pending', paidAt: null },
]

export const mockCycles: Cycle[] = [
  { id: 'cycle-1', groupId: 'group-1', cycleIndex: 0, winnerId: 'member-3', totalPot: 400, status: 'completed', startDate: '2026-05-01T00:00:00Z', endDate: '2026-05-07T23:59:59Z' },
  { id: 'cycle-2', groupId: 'group-1', cycleIndex: 1, winnerId: 'member-1', totalPot: 400, status: 'completed', startDate: '2026-05-08T00:00:00Z', endDate: '2026-05-14T23:59:59Z' },
  { id: 'cycle-3', groupId: 'group-1', cycleIndex: 2, winnerId: 'member-2', totalPot: 400, status: 'active', startDate: '2026-05-15T00:00:00Z', endDate: null },
]

export const mockGoldPackages: VirtualGoldPackage[] = [
  { id: 'pkg-1', amount: 50, priceInTRY: 150, bonusAmount: 0, label: '50 Altın' },
  { id: 'pkg-2', amount: 100, priceInTRY: 280, bonusAmount: 10, label: '100 + 10 Altın' },
  { id: 'pkg-3', amount: 250, priceInTRY: 650, bonusAmount: 30, label: '250 + 30 Altın' },
  { id: 'pkg-4', amount: 500, priceInTRY: 1200, bonusAmount: 75, label: '500 + 75 Altın' },
]

export const mockTransactions: Transaction[] = [
  { id: 'tx-1', userId: 'user-1', type: 'purchase', amount: 250, createdAt: '2026-01-15T10:00:00Z' },
  { id: 'tx-2', userId: 'user-1', type: 'contribution_out', amount: -50, createdAt: '2026-05-01T09:00:00Z', groupId: 'group-1' },
  { id: 'tx-3', userId: 'user-1', type: 'payout_in', amount: 400, createdAt: '2026-05-14T23:59:59Z', groupId: 'group-1' },
]
