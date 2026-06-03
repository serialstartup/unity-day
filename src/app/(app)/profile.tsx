import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockUser, mockGroups, mockContributions, mockCycles } from "@/data/mock";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

const BADGES = [
  { emoji: "🏆", label: "İlk Çekiliş", description: "İlk çekilişini tamamladın", locked: false },
  { emoji: "⭐", label: "Güvenilir Birikimci", description: "Tüm ödemelerini zamanında yaptın", locked: false },
  { emoji: "👑", label: "Süper Ev Sahibi", description: "3 grup oluştur", locked: true },
];

const SETTINGS = [
  { emoji: "👤", label: "Kişisel Bilgiler", destructive: false },
  { emoji: "🔒", label: "Güvenlik ve Gizlilik", destructive: false },
  { emoji: "❓", label: "Yardım ve Destek", destructive: false },
  { emoji: "🚪", label: "Çıkış Yap", destructive: true },
];

export default function ProfileScreen() {
  const activeGroups = mockGroups.filter((g) => g.status === "active").length;
  const totalPaid = mockContributions.filter((c) => c.status === "paid").length;
  const completedCycles = mockCycles.filter((c) => c.status === "completed").length;

  const stats = [
    { label: "Aktif Gruplar", value: activeGroups, color: "#c89b3c" },
    { label: "Toplam Ödeme", value: totalPaid, color: "#53b656" },
    { label: "Tamamlanan Günler", value: completedCycles, color: "#5e5e5b" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pb-8">

          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-4">
            <Text className="text-xl font-jakarta-bold text-text-primary">Profil</Text>
            <TouchableOpacity>
              <Text className="text-2xl">🔔</Text>
            </TouchableOpacity>
          </View>

          {/* Profil Hero */}
          <View className="items-center px-5 py-4">
            <View className="w-20 h-20 rounded-full bg-[#c89b3c] items-center justify-center mb-3 border-4 border-[#ffdea4]">
              <Text className="font-jakarta-bold text-white text-2xl">{getInitials(mockUser.fullName)}</Text>
            </View>
            <Text className="text-xl font-jakarta-bold text-text-primary">{mockUser.fullName}</Text>
            <View className="bg-[#e1dfdb] rounded-full px-4 py-1 mt-2">
              <Text className="text-xs font-jakarta-semibold text-text-muted">Gümüş Seviye Birikimci</Text>
            </View>
          </View>

          {/* Stats */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-5 mb-4"
            contentContainerStyle={{ gap: 12 }}
          >
            {stats.map((stat) => (
              <View
                key={stat.label}
                className="bg-surface rounded-3xl border border-border p-4 items-center"
                style={{ minWidth: 110 }}
              >
                <Text className="text-2xl font-jakarta-bold" style={{ color: stat.color }}>
                  {stat.value}
                </Text>
                <Text className="text-xs font-jakarta text-text-muted text-center mt-1">{stat.label}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Rozetler */}
          <View className="px-5 mb-6">
            <Text className="text-base font-jakarta-bold text-text-primary mb-3">Rozetlerim</Text>
            <View className="flex-row flex-wrap gap-3">
              {BADGES.map((badge) => (
                <View
                  key={badge.label}
                  className={`bg-surface rounded-3xl border border-border p-4 ${badge.locked ? "opacity-40" : ""}`}
                  style={{ width: "47%" }}
                >
                  <Text className="text-3xl mb-2">{badge.emoji}</Text>
                  <Text className="text-sm font-jakarta-bold text-text-primary">{badge.label}</Text>
                  <Text className="text-xs font-jakarta text-text-muted mt-1">{badge.description}</Text>
                  {badge.locked && (
                    <View className="absolute top-3 right-3">
                      <Text className="text-sm">🔒</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Ayarlar */}
          <View className="px-5">
            <Text className="text-base font-jakarta-bold text-text-primary mb-3">Ayarlar</Text>
            <View className="bg-surface rounded-3xl border border-border overflow-hidden">
              {SETTINGS.map((setting, i) => (
                <TouchableOpacity
                  key={setting.label}
                  className={`flex-row items-center px-4 py-4 gap-3 ${
                    i < SETTINGS.length - 1 ? "border-b border-border" : ""
                  }`}
                  onPress={() => {
                    if (setting.label === "Çıkış Yap") {
                      Alert.alert("Çıkış Yap", "Hesabından çıkmak istediğine emin misin?", [
                        { text: "İptal", style: "cancel" },
                        { text: "Çıkış Yap", style: "destructive" },
                      ]);
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <Text className="text-xl">{setting.emoji}</Text>
                  <Text
                    className={`flex-1 text-sm font-jakarta-semibold ${
                      setting.destructive ? "text-[#ba1a1a]" : "text-text-primary"
                    }`}
                  >
                    {setting.label}
                  </Text>
                  {!setting.destructive && (
                    <Text className="text-text-muted">›</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
