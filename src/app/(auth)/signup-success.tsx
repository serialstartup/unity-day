import { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONFETTI_COUNT = 15;
const CONFETTI_COLORS = ["#C89B3C", "#7B5900", "#4CAF50", "#FFDEA4", "#53B656"];

function useConfetti() {
  const particles = useRef(
    Array.from({ length: CONFETTI_COUNT }, () => ({
      x: Math.random() * SCREEN_WIDTH,
      translateY: new Animated.Value(-20),
      opacity: new Animated.Value(1),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 6,
    }))
  ).current;

  useEffect(() => {
    const animations = particles.map((p, i) =>
      Animated.sequence([
        Animated.delay(i * 100),
        Animated.parallel([
          Animated.timing(p.translateY, {
            toValue: 600,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(p.opacity, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    Animated.parallel(animations).start();
  }, []);

  return particles;
}

export default function SignupSuccessScreen() {
  const router = useRouter();
  const particles = useConfetti();
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Confetti Layer */}
      <View
        pointerEvents="none"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
      >
        {particles.map((p, i) => (
          <Animated.View
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: 0,
              width: p.size,
              height: p.size,
              borderRadius: p.size / 4,
              backgroundColor: p.color,
              transform: [{ translateY: p.translateY }],
              opacity: p.opacity,
            }}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-5 py-8">

          {/* Progress Bar */}
          <View className="mb-8">
            <View className="h-2 bg-[#e1dfdb] rounded-full overflow-hidden">
              <Animated.View
                className="h-full bg-[#c89b3c] rounded-full"
                style={{ width: progressWidth }}
              />
            </View>
          </View>

          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-jakarta-bold text-text-primary text-center">
              Hoş Geldin! 🎉
            </Text>
            <Text className="text-sm font-jakarta text-text-muted text-center mt-3 px-4">
              Profilin hazır. Artık birikim gruplarına katılabilir veya kendi grubunu kurabilirsin.
            </Text>
          </View>

          {/* Hero Block */}
          <View className="bg-[#ffdea4] rounded-3xl items-center justify-center py-12 mb-6">
            <Text className="text-7xl">🏆</Text>
            <Text className="text-base font-jakarta-semibold text-[#4b3500] mt-4">
              Birikimin En Sosyal Hali
            </Text>
          </View>

          {/* Avatar Stack */}
          <View className="flex-row items-center justify-center mb-8">
            {["💛", "🌟", "✨"].map((emoji, i) => (
              <View
                key={i}
                className="w-10 h-10 rounded-full bg-[#c89b3c] items-center justify-center border-2 border-background"
                style={{ marginLeft: i === 0 ? 0 : -12 }}
              >
                <Text>{emoji}</Text>
              </View>
            ))}
            <View
              className="w-10 h-10 rounded-full bg-[#e1dfdb] items-center justify-center border-2 border-background"
              style={{ marginLeft: -12 }}
            >
              <Text className="text-xs font-jakarta-bold text-text-muted">+12</Text>
            </View>
            <Text className="ml-3 text-sm font-jakarta text-text-muted">
              topluluğa katıldın
            </Text>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            className="h-14 bg-[#7b5900] rounded-2xl items-center justify-center"
            onPress={() => router.replace("/(app)/")}
            activeOpacity={0.9}
          >
            <Text className="font-jakarta-bold text-lg text-white">Başlayalım →</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text className="text-xs font-jakarta text-text-muted text-center mt-6">
            Sorun mu yaşıyorsunuz?{" "}
            <Text className="text-[#c89b3c] font-jakarta-semibold">Yardım Merkezi</Text>
            {" "}ile iletişime geçin.
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
