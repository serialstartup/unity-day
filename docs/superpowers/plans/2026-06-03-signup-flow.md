# Signup Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 3-screen signup flow (phone → profile → success) with UI-only mock navigation, tasarım dosyalarına sadık NativeWind styling.

**Architecture:** Her ekran kendi local state'ini tutar, ekranlar arası veri aktarımı yok. `router.push` ile ileriye, `router.back` ile geriye. Success ekranı `router.replace('/(app)/')` ile auth stack'i temizler. `IS_AUTHENTICATED` mock flag geçici olarak `true` yapılır.

**Tech Stack:** React Native, Expo Router, NativeWind v4, react-native-reanimated (confetti için), TypeScript strict

---

### Task 1: IS_AUTHENTICATED flag'ini true yap

**Files:**
- Modify: `src/app/_layout.tsx`

- [ ] **Step 1: `IS_AUTHENTICATED` sabitini `true` yap ve TODO comment ekle**

`src/app/_layout.tsx` içinde:
```typescript
// Değiştirilecek satır:
const IS_AUTHENTICATED = false;

// Yerine:
const IS_AUTHENTICATED = true; // TODO: Replace with Supabase session check
```

- [ ] **Step 2: TypeScript kontrolü**

```bash
npx tsc --noEmit
```
Beklenen: hata yok.

- [ ] **Step 3: Commit**

```bash
git add src/app/_layout.tsx
git commit -m "chore: set IS_AUTHENTICATED=true for signup flow testing"
```

---

### Task 2: signup-phone.tsx — Telefon Numarası Ekranı

**Files:**
- Modify: `src/app/(auth)/signup-phone.tsx`
- Design ref: `unity-day-design/sign-up-step-1/code.html`

- [ ] **Step 1: Dosyayı tam olarak yaz**

`src/app/(auth)/signup-phone.tsx`:
```typescript
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SignupPhoneScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-5 py-10">

          {/* Header */}
          <View className="items-center mb-10">
            <View className="w-20 h-20 rounded-full bg-[#c89b3c] items-center justify-center mb-4">
              <Text className="text-4xl">💰</Text>
            </View>
            <Text className="text-2xl font-jakarta-bold text-text-primary text-center">
              Aramıza Katıl
            </Text>
            <Text className="text-sm font-jakarta text-text-muted text-center mt-2 px-4">
              Tasarruf yolculuğuna başlamak için telefon numaranı doğrula.
            </Text>
          </View>

          {/* Card */}
          <View className="bg-surface rounded-3xl border border-border p-6">

            {/* Phone Input */}
            <Text className="text-sm font-jakarta-semibold text-text-primary mb-2">
              Telefon Numaran
            </Text>
            <View className="flex-row items-center h-14 bg-background border border-border rounded-2xl overflow-hidden">
              <View className="px-4 h-full justify-center border-r border-border">
                <Text className="font-jakarta-semibold text-text-primary">+90</Text>
              </View>
              <TextInput
                className="flex-1 px-4 font-jakarta text-text-primary"
                placeholder="5xx xxx xx xx"
                placeholderTextColor="#5e5e5b"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={13}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="mt-6 h-14 bg-[#c89b3c] rounded-2xl items-center justify-center"
              onPress={() => router.push("/(auth)/signup-profile")}
              activeOpacity={0.9}
            >
              <Text className="font-jakarta-bold text-lg text-[#4b3500]">
                Doğrulama Kodu Gönder
              </Text>
            </TouchableOpacity>

          </View>

          {/* Disclaimer */}
          <Text className="text-xs font-jakarta text-text-muted text-center mt-6 px-4">
            Devam ederek{" "}
            <Text className="text-[#c89b3c] font-jakarta-semibold">Kullanım Koşulları</Text>
            {" "}ve{" "}
            <Text className="text-[#c89b3c] font-jakarta-semibold">Gizlilik Politikamızı</Text>
            {" "}kabul etmiş olursun.
          </Text>

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
git add src/app/(auth)/signup-phone.tsx
git commit -m "feat: implement signup phone screen"
```

---

### Task 3: signup-profile.tsx — Profil Oluşturma Ekranı

**Files:**
- Modify: `src/app/(auth)/signup-profile.tsx`
- Design ref: `unity-day-design/sign-up-step-2/code.html`

- [ ] **Step 1: Dosyayı tam olarak yaz**

`src/app/(auth)/signup-profile.tsx`:
```typescript
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SignupProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-5 py-8">

          {/* Progress */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs font-jakarta-semibold text-text-muted">Kayıt Adımı</Text>
              <Text className="text-xs font-jakarta-bold text-[#c89b3c]">2 / 3</Text>
            </View>
            <View className="h-2 bg-[#e1dfdb] rounded-full overflow-hidden">
              <View className="h-full bg-[#c89b3c] rounded-full" style={{ width: "66.67%" }} />
            </View>
          </View>

          {/* Header */}
          <View className="mb-8">
            <Text className="text-2xl font-jakarta-bold text-text-primary">Seni Tanıyalım</Text>
            <Text className="text-sm font-jakarta text-text-muted mt-1">
              Profilini oluşturmak için bilgini gir.
            </Text>
          </View>

          {/* Card */}
          <View className="bg-surface rounded-3xl border border-border p-6 gap-4">

            {/* Ad Soyad */}
            <View>
              <Text className="text-sm font-jakarta-semibold text-text-primary mb-2">Ad Soyad</Text>
              <TextInput
                className="h-14 bg-background border border-border rounded-2xl px-4 font-jakarta text-text-primary"
                placeholder="Örn: Ayşe Yılmaz"
                placeholderTextColor="#5e5e5b"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* E-posta */}
            <View>
              <Text className="text-sm font-jakarta-semibold text-text-primary mb-2">E-posta Adresi</Text>
              <TextInput
                className="h-14 bg-background border border-border rounded-2xl px-4 font-jakarta text-text-primary"
                placeholder="merhaba@ornek.com"
                placeholderTextColor="#5e5e5b"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Şifre */}
            <View>
              <Text className="text-sm font-jakarta-semibold text-text-primary mb-2">Şifre</Text>
              <View className="flex-row items-center h-14 bg-background border border-border rounded-2xl pr-4">
                <TextInput
                  className="flex-1 px-4 h-full font-jakarta text-text-primary"
                  placeholder="••••••••"
                  placeholderTextColor="#5e5e5b"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text className="text-lg">{showPassword ? "🙈" : "👁"}</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-xs font-jakarta text-text-muted mt-1">
                En az 8 karakter, bir rakam içermeli
              </Text>
            </View>

            {/* Terms Checkbox */}
            <Pressable
              className="flex-row items-start gap-3"
              onPress={() => setTermsAccepted(!termsAccepted)}
            >
              <View
                className={`w-5 h-5 rounded border-2 items-center justify-center mt-0.5 ${
                  termsAccepted ? "bg-[#c89b3c] border-[#c89b3c]" : "border-border"
                }`}
              >
                {termsAccepted && <Text className="text-white text-xs font-jakarta-bold">✓</Text>}
              </View>
              <Text className="flex-1 text-sm font-jakarta text-text-muted">
                <Text className="text-[#c89b3c] font-jakarta-semibold">Kullanım Koşulları</Text>
                {" "}ve{" "}
                <Text className="text-[#c89b3c] font-jakarta-semibold">Gizlilik Politikası</Text>
                {"'"}nı kabul ediyorum
              </Text>
            </Pressable>

            {/* Devam Et */}
            <TouchableOpacity
              className={`h-14 rounded-2xl items-center justify-center mt-2 ${
                termsAccepted ? "bg-[#c89b3c]" : "bg-[#e1dfdb]"
              }`}
              onPress={() => termsAccepted && router.push("/(auth)/signup-success")}
              activeOpacity={0.9}
            >
              <Text
                className={`font-jakarta-bold text-lg ${
                  termsAccepted ? "text-[#4b3500]" : "text-text-muted"
                }`}
              >
                Devam Et
              </Text>
            </TouchableOpacity>

          </View>

          {/* Footer */}
          <View className="flex-row justify-center items-center gap-1 mt-6">
            <Text className="font-jakarta text-text-muted text-sm">Zaten hesabın var mı?</Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text className="font-jakarta-bold text-[#c89b3c] text-sm">Giriş Yap</Text>
            </TouchableOpacity>
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
git add src/app/(auth)/signup-profile.tsx
git commit -m "feat: implement signup profile screen"
```

---

### Task 4: signup-success.tsx — Başarı Ekranı (konfeti dahil)

**Files:**
- Modify: `src/app/(auth)/signup-success.tsx`
- Design ref: `unity-day-design/success-sign-up/code.html`

- [ ] **Step 1: Dosyayı tam olarak yaz**

`src/app/(auth)/signup-success.tsx`:
```typescript
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
```

- [ ] **Step 2: TypeScript kontrolü**

```bash
npx tsc --noEmit
```
Beklenen: hata yok.

- [ ] **Step 3: Commit**

```bash
git add src/app/(auth)/signup-success.tsx
git commit -m "feat: implement signup success screen with confetti"
```

---

### Task 5: Obsidian notu güncelle + push

**Files:**
- Modify: `/Users/oguztasci/Desktop/secondBrain/application-ideas/03-dijital-altin-gunu/2026-06-03-unity-day.md`

- [ ] **Step 1: Obsidian notunu güncelle**

`2026-06-03-unity-day.md` dosyasına "Yapılanlar" bölümüne ekle:
```markdown
- **Signup flow tamamlandı** — signup-phone, signup-profile, signup-success ekranları uygulandı; IS_AUTHENTICATED mock flag'i true yapıldı
```

"Sonraki Adımlar" bölümünden şunu işaretle:
```markdown
- [x] Signup flow tam implementasyon (3 adım)
```

- [ ] **Step 2: Push**

```bash
git push
```

- [ ] **Step 3: Commit özeti**

Toplam commit'ler bu task sonunda:
- `chore: set IS_AUTHENTICATED=true for signup flow testing`
- `feat: implement signup phone screen`
- `feat: implement signup profile screen`
- `feat: implement signup success screen with confetti`

---

## Doğrulama

1. `npx expo start --ios` — uygulama açılıyor
2. Login ekranında "Kayıt Ol" → signup-phone açılıyor
3. "Doğrulama Kodu Gönder" → signup-profile açılıyor
4. Terms checkbox işaretlenince "Devam Et" aktif hale geliyor
5. "Devam Et" → signup-success açılıyor
6. Progress bar %100'e dolarak animasyonlu açılıyor, konfeti düşüyor
7. "Başlayalım" → ana uygulama (Home tab) açılıyor
8. `npx tsc --noEmit` — sıfır hata
