@AGENTS.md

# Dijital Altın Günü

## Stack
- React Native + Expo v56
- NativeWind v4 (styling)
- Expo Router (dosya tabanlı navigasyon)
- TypeScript strict mode

## Styling Kuralları
- Renkler ve spacing için her zaman `src/constants/theme.ts` token'larını kullan
- Inline style yasak, NativeWind className veya StyleSheet kullan
- Tasarım referansı: `unity-day-design/` klasörü

## Navigasyon Yapısı
- `(auth)/` — giriş yapmamış kullanıcılar
- `(app)/` — giriş yapmış kullanıcılar (5 tab: Home, Activity, Create, Market, Profile)
- Root `_layout.tsx` auth durumuna göre yönlendirir

## Schema Kuralları
- Tüm veri tipleri `src/types/` altında
- Mock data `src/data/mock.ts` içinde
- Supabase bağlantısı yokken mock data kullanılır

## Progress Tracking
- Her session sonunda Obsidian'a not: `/Users/oguztasci/Desktop/secondBrain/application-ideas/03-dijital-altin-gunu/YYYY-MM-DD-unity-day.md`
- Format: Yapılanlar, Yapılacaklar, Notlar
