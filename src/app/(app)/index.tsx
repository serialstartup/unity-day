import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { mockGroups, mockTransactions, mockUser } from '@/data/mock'

function getTransactionLabel(type: string): string {
  switch (type) {
    case 'purchase':
      return 'Altın satın aldın'
    case 'contribution_out':
      return 'Katkı gönderdin'
    case 'payout_in':
      return 'Ödeme aldın'
    default:
      return type
  }
}

function getTransactionIcon(type: string): string {
  switch (type) {
    case 'purchase':
      return '💰'
    case 'contribution_out':
      return '⬆️'
    case 'payout_in':
      return '🎉'
    default:
      return '💰'
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const initials = mockUser.fullName
  .split(' ')
  .map((n) => n[0])
  .join('')

export default function HomeScreen() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-6">
          {/* Top Bar */}
          <View className="flex-row items-center justify-between px-5 py-4">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-full bg-[#c89b3c] items-center justify-center">
                <Text className="font-jakarta-bold text-white text-sm">{initials}</Text>
              </View>
              <View>
                <Text className="text-xs font-jakarta text-text-muted">Hoş geldin,</Text>
                <Text className="text-base font-jakarta-bold text-[#7b5900]">
                  {mockUser.fullName.split(' ')[0]}!
                </Text>
              </View>
            </View>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#f0eded] items-center justify-center">
              <Text className="text-lg">🔔</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Card — Sıradaki Ödeme */}
          <View className="mx-5 mt-2">
            <View className="bg-[#FFF9F0] rounded-3xl border border-border p-6">
              <View className="flex-row items-start justify-between">
                <View>
                  <View className="self-start bg-[#ffdea4] rounded-full px-3 py-1 mb-3">
                    <Text className="text-xs font-jakarta-semibold text-[#261900]">
                      Sıradaki Ödeme
                    </Text>
                  </View>
                  <Text className="text-xl font-jakarta-bold text-text-primary">
                    Aylin'in Günü
                  </Text>
                  <Text className="text-sm font-jakarta text-text-muted mt-1">
                    14 Kasım Perşembe
                  </Text>
                </View>
                <View className="w-16 h-16 rounded-full bg-[#c89b3c] items-center justify-center">
                  <Text className="text-2xl">🌟</Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between mt-4">
                <View className="flex-row items-center">
                  <Text className="text-sm font-jakarta text-text-muted">👥 8 üye</Text>
                </View>
                <TouchableOpacity className="bg-[#7b5900] rounded-2xl px-4 py-2">
                  <Text className="text-sm font-jakarta-bold text-white">Katılım Onayla</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Active Groups */}
          <View className="mt-6">
            <View className="flex-row items-center justify-between px-5 mb-3">
              <Text className="text-lg font-jakarta-bold text-text-primary">Aktif Grupların</Text>
              <TouchableOpacity>
                <Text className="text-sm font-jakarta text-[#c89b3c]">Tümü ›</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {mockGroups.map((group) => {
                const progress = group.maxMembers > 0
                  ? (group.currentCycleIndex / group.maxMembers) * 100
                  : 0
                const isActive = group.status === 'active'
                const emoji = group.name.includes('Kadıköy') ? '☕' : '🏠'
                const periodLabel = group.periodType === 'weekly' ? 'Hafta' : 'Ay'

                return (
                  <TouchableOpacity
                    key={group.id}
                    className="mr-3 w-72 bg-surface rounded-3xl border border-border p-5"
                    onPress={() => router.push(`/(app)/groups/${group.id}` as any)}
                    activeOpacity={0.9}
                  >
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="w-12 h-12 rounded-2xl bg-[#ffdea4] items-center justify-center">
                        <Text className="text-2xl">{emoji}</Text>
                      </View>
                      <View className="bg-[#f0eded] rounded-lg px-2 py-1">
                        <Text className="text-xs font-jakarta-semibold text-text-muted">
                          {group.currentCycleIndex}/{group.maxMembers} {periodLabel}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-base font-jakarta-semibold text-text-primary">
                      {group.name}
                    </Text>
                    <Text className="text-sm font-jakarta text-text-muted mt-0.5">
                      {group.contributionAmount} Altın / {periodLabel}
                    </Text>
                    {/* Progress Bar */}
                    <View className="mt-3 h-2.5 bg-[#e4e2e1] rounded-full overflow-hidden">
                      <View
                        className="h-full bg-[#c89b3c] rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </View>
                    <View className="flex-row items-center justify-between mt-3">
                      <Text className="text-xs font-jakarta text-text-muted">
                        👥 {group.maxMembers} üye
                      </Text>
                      <View className="flex-row items-center gap-1">
                        <View
                          className={`w-2 h-2 rounded-full ${isActive ? 'bg-success' : 'bg-[#e4e2e1]'}`}
                        />
                        <Text
                          className={`text-xs font-jakarta ${isActive ? 'text-success' : 'text-text-muted'}`}
                        >
                          {isActive ? 'Aktif' : 'Bekliyor'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>

          {/* Recent Activity */}
          <View className="mt-6 mx-5">
            <Text className="text-lg font-jakarta-bold text-text-primary mb-3">
              Son Hareketler
            </Text>
            <View className="bg-surface rounded-3xl border border-border p-4">
              {mockTransactions.map((tx, index) => {
                const isPositive = tx.amount > 0
                const isLast = index === mockTransactions.length - 1

                return (
                  <View
                    key={tx.id}
                    className={`flex-row items-center gap-3 py-3 ${isLast ? '' : 'border-b border-border'}`}
                  >
                    <View className="w-10 h-10 rounded-full bg-[#f0eded] items-center justify-center">
                      <Text className="text-lg">{getTransactionIcon(tx.type)}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-jakarta-semibold text-text-primary">
                        {getTransactionLabel(tx.type)}
                      </Text>
                      <Text className="text-xs font-jakarta text-text-muted mt-0.5">
                        {formatDate(tx.createdAt)}
                      </Text>
                    </View>
                    <Text
                      className={`text-sm font-jakarta-bold ${isPositive ? 'text-success' : 'text-error'}`}
                    >
                      {isPositive ? '+' : ''}{tx.amount} Altın
                    </Text>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
