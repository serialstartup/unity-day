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
              className="rounded-full"
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
