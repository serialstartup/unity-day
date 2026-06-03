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
