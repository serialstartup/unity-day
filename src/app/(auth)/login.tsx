import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <View className="px-5 py-10 min-h-screen justify-center">
          {/* Header */}
          <View className="items-center">
            <View className="w-16 h-16 bg-[#c89b3c] rounded-full items-center justify-center shadow">
              <Text className="text-2xl">💰</Text>
            </View>
            <Text className="text-2xl font-jakarta-bold text-text-primary text-center mt-4">
              Dijital Altın Günü
            </Text>
            <Text className="text-lg font-jakarta text-text-muted text-center mt-1">
              Tekrar Hoş Geldin!
            </Text>
          </View>

          {/* Card */}
          <View className="mt-10 bg-surface rounded-3xl border border-border p-6">
            {/* Phone/Email Input */}
            <View>
              <Text className="text-sm font-jakarta-semibold text-text-primary mb-2">
                Telefon Numarası veya E-posta
              </Text>
              <TextInput
                className="h-14 bg-background border border-border rounded-2xl px-4 font-jakarta text-text-primary"
                placeholder="ornek@mail.com"
                placeholderTextColor="#5e5e5b"
                value={identifier}
                onChangeText={setIdentifier}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View className="mt-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-jakarta-semibold text-text-primary">
                  Şifre
                </Text>
                <TouchableOpacity>
                  <Text className="text-sm font-jakarta text-[#c89b3c]">
                    Şifremi Unuttum
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                className="h-14 bg-background border border-border rounded-2xl px-4 font-jakarta text-text-primary"
                placeholder="••••••••"
                placeholderTextColor="#5e5e5b"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity className="mt-6 h-14 bg-[#c89b3c] rounded-2xl items-center justify-center">
              <Text className="font-jakarta-bold text-lg text-[#4b3500]">
                Giriş Yap
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login */}
          <View className="mt-6">
            {/* Divider */}
            <View className="flex-row items-center">
              <View className="flex-1 h-px bg-border" />
              <Text className="mx-3 text-sm font-jakarta text-text-muted">
                veya şunlarla devam et
              </Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Social Buttons */}
            <View className="flex-row gap-3 mt-4">
              <TouchableOpacity className="flex-1 h-14 border border-border rounded-2xl items-center justify-center flex-row gap-2">
                <Text className="text-lg font-jakarta-bold text-[#4285F4]">G</Text>
                <Text className="font-jakarta-semibold text-text-primary">Google</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 h-14 border border-border rounded-2xl items-center justify-center flex-row gap-2">
                <Text className="text-lg font-jakarta-bold text-[#1877F2]">f</Text>
                <Text className="font-jakarta-semibold text-text-primary">Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="mt-8 flex-row justify-center items-center gap-1">
            <Text className="font-jakarta text-text-muted">Hesabın yok mu?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup-phone')}>
              <Text className="font-jakarta-bold text-[#c89b3c]">Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
