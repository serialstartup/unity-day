import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { mockGroups, mockMembers, mockCycles, mockUser } from "@/data/mock";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

function getMemberStatus(orderIndex: number, currentCycleIndex: number) {
  if (orderIndex < currentCycleIndex) return "paid";
  if (orderIndex === currentCycleIndex) return "current";
  return "waiting";
}

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const group = mockGroups.find((g) => g.id === id) ?? mockGroups[0];
  const members = mockMembers.filter((m) => m.groupId === group.id);
  const cycles = mockCycles.filter((c) => c.groupId === group.id);
  const totalPot = group.contributionAmount * group.maxMembers;
  const progressPct = Math.round((group.currentCycleIndex / Math.max(cycles.length, 1)) * 100);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-border">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
        <Text className="text-base font-jakarta-bold text-text-primary">{group.name}</Text>
        <TouchableOpacity>
          <Text className="text-2xl">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4 gap-4">

          {/* Hero Card — Toplam Biriken */}
          <View className="bg-surface rounded-3xl border border-border p-6">
            <Text className="text-xs font-jakarta-semibold text-text-muted mb-1">Toplam Biriken Miktar</Text>
            <Text className="text-3xl font-jakarta-bold text-text-primary">{totalPot} Altın</Text>
            <View className="mt-3 h-2.5 bg-[#e1dfdb] rounded-full overflow-hidden">
              <View
                className="h-full bg-[#c89b3c] rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </View>
            <Text className="text-xs font-jakarta text-text-muted mt-2">
              Bu ayki hedefin %{progressPct}&apos;ine ulaşıldı
            </Text>
          </View>

          {/* Sıradaki Alıcı Card */}
          <View className="bg-surface rounded-3xl border border-border p-6">
            <Text className="text-xs font-jakarta-semibold text-text-muted mb-3">Sıradaki Alıcı</Text>
            <View className="flex-row items-center gap-4">
              <View className="w-16 h-16 rounded-full bg-[#c89b3c] items-center justify-center border-4 border-[#ffdea4]">
                <Text className="font-jakarta-bold text-white text-lg">{getInitials(mockUser.fullName)}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-jakarta-bold text-text-primary">{mockUser.fullName}</Text>
                <Text className="text-xs font-jakarta text-text-muted mt-0.5">Teslimat Tarihi: 12 Nisan</Text>
                <View className="self-start bg-[#ffdea4] rounded-full px-3 py-0.5 mt-2">
                  <Text className="text-xs font-jakarta-semibold text-[#261900]">Hazırlanıyor</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Üyeler */}
          <View>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-base font-jakarta-bold text-text-primary">
                Grup Üyeleri ({members.length})
              </Text>
              <Text className="text-sm font-jakarta text-[#c89b3c]">Tümünü Gör</Text>
            </View>
            <View className="flex-row flex-wrap gap-3">
              {members.map((member) => {
                const status = getMemberStatus(member.orderIndex, group.currentCycleIndex);
                return (
                  <View
                    key={member.id}
                    className="bg-surface rounded-2xl border border-border p-3 items-center"
                    style={{ width: "47%" }}
                  >
                    <View className="w-12 h-12 rounded-full bg-[#c89b3c] items-center justify-center mb-2">
                      <Text className="font-jakarta-bold text-white text-sm">
                        {getInitials(mockUser.fullName)}
                      </Text>
                    </View>
                    <Text className="text-xs font-jakarta-semibold text-text-primary text-center" numberOfLines={1}>
                      {mockUser.fullName}
                    </Text>
                    <View
                      className="mt-2 rounded-full px-2 py-0.5"
                      style={{
                        backgroundColor:
                          status === "paid" ? "#d4f0d8" : status === "current" ? "#ffdea4" : "#e1dfdb",
                      }}
                    >
                      <Text
                        className="text-xs font-jakarta-semibold"
                        style={{
                          color:
                            status === "paid" ? "#006e1c" : status === "current" ? "#261900" : "#5e5e5b",
                        }}
                      >
                        {status === "paid" ? "ÖDENDİ" : status === "current" ? "GÜNCEL" : "BEKLİYOR"}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Timeline */}
          <View>
            <Text className="text-base font-jakarta-bold text-text-primary mb-3">Grup Takvimi</Text>
            <View className="bg-surface rounded-3xl border border-border p-4 gap-4">
              {cycles.map((cycle, i) => (
                <View key={cycle.id} className="flex-row items-start gap-3">
                  <View
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: cycle.status === "completed" ? "#53b656" : "#c89b3c" }}
                  >
                    <Text className="text-white text-xs">
                      {cycle.status === "completed" ? "✓" : "●"}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-jakarta-semibold text-text-primary">
                      {cycle.status === "completed"
                        ? `${i + 1}. Ödeme Tamamlandı`
                        : `${i + 1}. Ödeme`}
                    </Text>
                    <Text className="text-xs font-jakarta text-text-muted mt-0.5">
                      {cycle.startDate.slice(0, 10)} • {cycle.totalPot} Altın
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Alt Buton */}
      <View className="px-5 pb-6 pt-3 border-t border-border">
        <TouchableOpacity
          className="h-14 bg-[#c89b3c] rounded-2xl items-center justify-center"
          onPress={() => Alert.alert("Ödeme", `${group.contributionAmount} Altın katkı yapılacak.`)}
          activeOpacity={0.9}
        >
          <Text className="font-jakarta-bold text-lg text-[#4b3500]">
            Katılım Payını Öde ({group.contributionAmount} Altın)
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
