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
