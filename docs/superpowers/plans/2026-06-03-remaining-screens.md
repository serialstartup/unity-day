# Remaining Screens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Onboarding carousel, Group Detail, Activity feed ve Profile ekranlarını NativeWind v4 ile tasarım dosyalarına sadık olarak uygula.

**Architecture:** Her ekran bağımsız bir dosya — kendi local state ve mock data import'ları var. `src/data/mock.ts` ve `src/types/` mevcut. Navigation Expo Router ile çalışıyor.

**Tech Stack:** React Native, Expo Router, NativeWind v4, TypeScript strict, mock data from `@/data/mock`

---

### Task 1: Onboarding Ekranı

**Files:**
- Modify: `src/app/(auth)/onboarding.tsx`

- [ ] **Step 1: Dosyayı tam olarak yaz**

`src/app/(auth)/onboarding.tsx`:
```typescript
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const STEPS = [
  {
    title: "Gruplarınızı Kurun",
    description: "Aileniz, iş arkadaşlarınız veya dostlarınızla özel tasarruf grupları oluşturun veya mevcut bir gruba katılın.",
    cards: [
      { emoji: "👨‍👩‍👧", label: "Aile Grubu", rotate: "-rotate-3", members: "👩 👨 👧" },
      { emoji: "💼", label: "İş Ekibi", rotate: "rotate-2", members: "👩 👨 👩" },
      { emoji: "🎉", label: "Dostlar", rotate: "-rotate-1", members: "😊 😄 🥳" },
    ],
  },
  {
    title: "Altın Katkı Yapın",
    description: "Her dönem belirlenen miktarda sanal altın katkı yapın. Sıra sizde geldiğinde tüm potu kazanın.",
    cards: [],
  },
  {
    title: "Sıranızı Bekleyin",
    description: "Rastgele belirlenen sıra ile herkes kazanacak. Şeffaf ve adil bir sistem.",
    cards: [],
  },
  {
    title: "Kazananı Kutlayın",
    description: "Her dönem sonunda kazanan konfeti yağmuru ile kutlanır. Topluluk birlikte sevinir.",
    cards: [],
  },
  {
    title: "Başlamaya Hazır mısınız?",
    description: "Dijital Altın Günü'ne katılın, birikimlerinizi güvenle büyütün.",
    cards: [],
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const current = STEPS[step];

  const handleSkip = () => router.replace("/(app)/");
  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else router.replace("/(app)/");
  };
  const handleBack = () => setStep(step - 1);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <Text className="text-base font-jakarta-bold text-[#7b5900]">Dijital Altın Günü</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-sm font-jakarta-semibold text-text-muted">Atla</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center px-5 py-8">

          {/* Cards (Step 0 only, others show emoji placeholder) */}
          {current.cards.length > 0 ? (
            <View className="w-full h-52 relative mb-8">
              {current.cards.map((card, i) => (
                <View
                  key={i}
                  className={`absolute bg-surface rounded-3xl border border-border p-4 w-48 shadow-sm ${card.rotate}`}
                  style={{
                    left: i === 0 ? "5%" : i === 1 ? "30%" : "55%",
                    top: i === 1 ? 8 : 0,
                  }}
                >
                  <Text className="text-2xl mb-2">{card.emoji}</Text>
                  <Text className="text-sm font-jakarta-bold text-text-primary">{card.label}</Text>
                  <Text className="text-xs font-jakarta text-text-muted mt-1">{card.members}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View className="w-32 h-32 rounded-full bg-[#ffdea4] items-center justify-center mb-8">
              <Text className="text-6xl">
                {step === 1 ? "💰" : step === 2 ? "⏳" : step === 3 ? "🎊" : "🚀"}
              </Text>
            </View>
          )}

          {/* Text */}
          <Text className="text-2xl font-jakarta-bold text-text-primary text-center mb-3">
            {current.title}
          </Text>
          <Text className="text-sm font-jakarta text-text-muted text-center px-4 leading-6">
            {current.description}
          </Text>

        </View>
      </ScrollView>

      {/* Footer */}
      <View className="px-5 pb-8">
        {/* Progress Dots */}
        <View className="flex-row justify-center items-center gap-2 mb-6">
          {STEPS.map((_, i) => (
            <View
              key={i}
              className={`rounded-full bg-[${i === step ? "#c89b3c" : "#e1dfdb"}]`}
              style={{
                width: i === step ? 16 : 8,
                height: 8,
                backgroundColor: i === step ? "#c89b3c" : "#e1dfdb",
              }}
            />
          ))}
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3">
          {step > 0 && (
            <TouchableOpacity
              className="flex-1 h-14 bg-[#f0eded] rounded-2xl items-center justify-center"
              onPress={handleBack}
              activeOpacity={0.9}
            >
              <Text className="font-jakarta-bold text-text-muted">← Geri</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className={`h-14 bg-[#c89b3c] rounded-2xl items-center justify-center ${step > 0 ? "flex-1" : "w-full"}`}
            onPress={handleNext}
            activeOpacity={0.9}
          >
            <Text className="font-jakarta-bold text-lg text-[#4b3500]">
              {step === STEPS.length - 1 ? "Başlayalım 🚀" : "İleri →"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

- [ ] **Step 2: TypeScript kontrolü**

```bash
npx tsc --noEmit
```
Beklenen: hata yok.

- [ ] **Step 3: Commit**

```bash
git add src/app/(auth)/onboarding.tsx
git commit -m "feat: implement onboarding carousel screen"
```

---

### Task 2: Group Detail Ekranı

**Files:**
- Modify: `src/app/(app)/groups/[id].tsx`

- [ ] **Step 1: Dosyayı tam olarak yaz**

`src/app/(app)/groups/[id].tsx`:
```typescript
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
              Bu ayki hedefin %{progressPct}'ine ulaşıldı
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
              {members.map((member, i) => {
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
                      className={`mt-2 rounded-full px-2 py-0.5 ${
                        status === "paid"
                          ? "bg-[#d4f0d8]"
                          : status === "current"
                          ? "bg-[#ffdea4]"
                          : "bg-[#e1dfdb]"
                      }`}
                    >
                      <Text
                        className={`text-xs font-jakarta-semibold ${
                          status === "paid"
                            ? "text-[#006e1c]"
                            : status === "current"
                            ? "text-[#261900]"
                            : "text-text-muted"
                        }`}
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
                    className={`w-8 h-8 rounded-full items-center justify-center ${
                      cycle.status === "completed"
                        ? "bg-[#53b656]"
                        : "bg-[#c89b3c]"
                    }`}
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
```

- [ ] **Step 2: Homepage'deki grup kartlarına navigation ekle**

`src/app/(app)/index.tsx` içinde grup kartı View'ını `TouchableOpacity`'e çevir:

```typescript
// Mevcut grup kartı View'ını bul:
// <View key={group.id} className="mr-3 w-72 ...">
// TouchableOpacity ile değiştir:
import { useRouter } from "expo-router";
// ...
const router = useRouter();
// ...
<TouchableOpacity
  key={group.id}
  className="mr-3 w-72 bg-surface rounded-3xl border border-border p-5"
  onPress={() => router.push(`/(app)/groups/${group.id}`)}
  activeOpacity={0.9}
>
```

- [ ] **Step 3: TypeScript kontrolü**

```bash
npx tsc --noEmit
```
Beklenen: hata yok.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(app)/groups/[id].tsx" src/app/(app)/index.tsx
git commit -m "feat: implement group detail screen and add home navigation"
```

---

### Task 3: Activity Ekranı

**Files:**
- Modify: `src/app/(app)/activity.tsx`

- [ ] **Step 1: Dosyayı tam olarak yaz**

`src/app/(app)/activity.tsx`:
```typescript
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockTransactions, mockGroups } from "@/data/mock";
import type { TransactionType } from "@/types";

type TabType = "all" | "groups" | "payments";

const TAB_LABELS: { key: TabType; label: string }[] = [
  { key: "all", label: "Hepsi" },
  { key: "groups", label: "Gruplarım" },
  { key: "payments", label: "Ödemeler" },
];

function getTransactionIcon(type: TransactionType): string {
  switch (type) {
    case "purchase": return "💰";
    case "contribution_out": return "⬆️";
    case "payout_in": return "🎉";
    default: return "📋";
  }
}

function getTransactionIconBg(type: TransactionType): string {
  switch (type) {
    case "purchase": return "#ffdea4";
    case "contribution_out": return "#ffe0dd";
    case "payout_in": return "#d4f0d8";
    default: return "#f0eded";
  }
}

function getTransactionLabel(type: TransactionType): string {
  switch (type) {
    case "purchase": return "Altın satın aldın";
    case "contribution_out": return "Katkı gönderdin";
    case "payout_in": return "Ödeme aldın";
    default: return type;
  }
}

function getGroupName(groupId?: string): string {
  if (!groupId) return "";
  return mockGroups.find((g) => g.id === groupId)?.name ?? "";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
  });
}

export default function ActivityScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filtered = mockTransactions.filter((tx) => {
    if (activeTab === "groups") return !!tx.groupId;
    if (activeTab === "payments") return tx.type === "payout_in" || tx.type === "contribution_out";
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 py-4 border-b border-border">
        <Text className="text-xl font-jakarta-bold text-text-primary">Hareketler</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row gap-2 px-5 py-3">
        {TAB_LABELS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab.key ? "bg-[#c89b3c]" : "bg-[#f0eded]"
            }`}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.9}
          >
            <Text
              className={`text-sm font-jakarta-semibold ${
                activeTab === tab.key ? "text-white" : "text-text-muted"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Feed */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pb-6">
          {filtered.length === 0 ? (
            <View className="items-center py-12">
              <Text className="text-4xl mb-3">📭</Text>
              <Text className="font-jakarta text-text-muted">Henüz hareket yok</Text>
            </View>
          ) : (
            <View className="bg-surface rounded-3xl border border-border overflow-hidden">
              {filtered.map((tx, i) => (
                <View
                  key={tx.id}
                  className={`flex-row items-center gap-3 px-4 py-4 ${
                    i < filtered.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {/* Icon */}
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: getTransactionIconBg(tx.type) }}
                  >
                    <Text className="text-lg">{getTransactionIcon(tx.type)}</Text>
                  </View>

                  {/* Info */}
                  <View className="flex-1">
                    <Text className="text-sm font-jakarta-semibold text-text-primary">
                      {getTransactionLabel(tx.type)}
                    </Text>
                    <Text className="text-xs font-jakarta text-text-muted mt-0.5">
                      {getGroupName(tx.groupId) ? `${getGroupName(tx.groupId)} • ` : ""}
                      {formatDate(tx.createdAt)}
                    </Text>
                  </View>

                  {/* Amount */}
                  <Text
                    className={`text-sm font-jakarta-bold ${
                      tx.amount > 0 ? "text-[#006e1c]" : "text-[#c75b4e]"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}{tx.amount} 🪙
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

- [ ] **Step 2: TypeScript kontrolü**

```bash
npx tsc --noEmit
```
Beklenen: hata yok.

- [ ] **Step 3: Commit**

```bash
git add src/app/(app)/activity.tsx
git commit -m "feat: implement activity feed screen with tab filters"
```

---

### Task 4: Profile Ekranı

**Files:**
- Modify: `src/app/(app)/profile.tsx`

- [ ] **Step 1: Dosyayı tam olarak yaz**

`src/app/(app)/profile.tsx`:
```typescript
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
```

- [ ] **Step 2: TypeScript kontrolü**

```bash
npx tsc --noEmit
```
Beklenen: hata yok.

- [ ] **Step 3: Commit**

```bash
git add src/app/(app)/profile.tsx
git commit -m "feat: implement profile screen with stats, badges and settings"
```

---

### Task 5: Obsidian notu güncelle + push + PR

**Files:**
- Modify: `/Users/oguztasci/Desktop/secondBrain/application-ideas/03-dijital-altin-gunu/2026-06-03-unity-day.md`

- [ ] **Step 1: Obsidian notunu güncelle**

"Yapılanlar" bölümüne ekle:
```markdown
- **Kalan 4 ekran tamamlandı** — Onboarding (5 adımlı carousel), Group Detail (üyeler, timeline, ödeme CTA), Activity (tab filtreli feed), Profile (stats, rozetler, ayarlar)
```

"Sonraki Adımlar" bölümünde işaretle:
```markdown
- [x] Onboarding carousel ekranı
- [x] Group detail sayfası (groups/[id].tsx)
- [x] Activity ekranı — gerçek veri yapısı
- [x] Profile ekranı — istatistikler, rozetler
```

"Sonraki Adımlar"a ekle:
```markdown
- [ ] Create ekranı — grup oluşturma formu (ayrı tasarım session'ı)
- [ ] Market ekranı — sanal altın al/sat (ayrı tasarım session'ı)
- [ ] Supabase entegrasyonu — auth, database, realtime
```

- [ ] **Step 2: Push**

```bash
git push
```

- [ ] **Step 3: PR Aç**

```bash
gh pr create \
  --title "feat: remaining screens — onboarding, group detail, activity, profile" \
  --body "$(cat <<'EOF'
## Summary

- Onboarding ekranı: 5 adımlı carousel, ileri/geri/atla navigasyonu, progress dots
- Group Detail: toplam tutar hero, sıradaki alıcı, üyeler grid (ÖDENDİ/BEKLİYOR), timeline, ödeme CTA
- Activity: 3 tab filtreli feed (Hepsi/Gruplarım/Ödemeler), transaction ikonları ve renkleri
- Profile: avatar, stats kartları (yatay scroll), rozetler grid (kilitli/açık), ayarlar listesi (çıkış Alert ile)
- Tüm ekranlar NativeWind v4, mock data, TypeScript strict

## Test Plan

- [ ] Onboarding: İleri/Geri ile 5 adım arası geçiş, Atla → Home açılıyor
- [ ] Home'da grup kartına tıklayınca Group Detail açılıyor
- [ ] Group Detail: üye grid'i görünüyor, ödeme butonu Alert açıyor
- [ ] Activity tabları: Hepsi/Gruplarım/Ödemeler filtreler çalışıyor
- [ ] Profile: stats doğru sayılar, kilitli rozet soluk görünüyor, Çıkış Yap Alert açıyor
- [ ] `npx tsc --noEmit` → hata yok

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Doğrulama

1. `npx expo start --ios` — uygulama açılıyor
2. Onboarding: atla → Home; ileri/geri çalışıyor; son adımda "Başlayalım"
3. Home gruba tıklayınca Group Detail açılıyor (grup adı görünüyor)
4. Activity tabları filtreler; boş state görünüyor (filtreye göre)
5. Profile: stats mockGroups/mockContributions/mockCycles'dan hesaplıyor
6. `npx tsc --noEmit` → sıfır hata
