# Signup Flow — Design Spec

**Date:** 2026-06-03  
**Status:** Approved

## Context

Dijital Altın Günü uygulamasının kayıt akışı. Foundation kurulduktan sonra auth ekranlarının ilk gerçek implementasyonu. UI-only — OTP doğrulama ve backend entegrasyonu sonraki sprint'e bırakıldı.

## Navigation Chain

```
(auth)/login
  └─► (auth)/signup-phone        [Step 1]
        └─► (auth)/signup-profile  [Step 2]
              └─► (auth)/signup-success [Step 3]
                    └─► (app)/         [Ana uygulama]
```

"Doğrulama Kodu Gönder" direkt Step 2'ye geçer — gerçek SMS gönderimi yok.  
"Başlayalım" `router.replace('/(app)/')` ile ana uygulamaya yönlendirir.

## Screen 1 — signup-phone.tsx

**Dosya:** `src/app/(auth)/signup-phone.tsx`  
**Tasarım ref:** `unity-day-design/sign-up-step-1/code.html`

### Layout
- `SafeAreaView` + `ScrollView` (bg-background)
- İçerik ortalanmış, px-5 py-10

### Bileşenler
| Eleman | Detay |
|--------|-------|
| Başlık | "Aramıza Katıl" (text-2xl font-jakarta-bold) |
| Alt başlık | "Tasarruf yolculuğuna başlamak için telefon numaranı doğrula." (text-sm font-jakarta text-text-muted) |
| Telefon input | `+90` prefix (sabit, solda) + TextInput (`keyboardType="phone-pad"`, placeholder "5xx xxx xx xx") |
| Buton | "Doğrulama Kodu Gönder" — `bg-[#c89b3c]` rounded-2xl h-14 — `router.push('/(auth)/signup-profile')` |
| Disclaimer | "Devam ederek Kullanım Koşulları ve Gizlilik Politikamızı kabul etmiş olursun." (text-xs text-text-muted, ortalı) |

### State
```typescript
const [phone, setPhone] = useState('')
```

### Navigasyon
- Geri: `router.back()` → login
- İleri: buton → `/(auth)/signup-profile`

---

## Screen 2 — signup-profile.tsx

**Dosya:** `src/app/(auth)/signup-profile.tsx`  
**Tasarım ref:** `unity-day-design/sign-up-step-2/code.html`

### Layout
- `SafeAreaView` + `ScrollView` (bg-background)
- Progress bar üstte, form aşağıda

### Bileşenler
| Eleman | Detay |
|--------|-------|
| Progress bar | "Kayıt Adımı 2 / 3" label + bar (bg-[#e1dfdb], fill %66 bg-[#c89b3c], h-2 rounded-full) |
| Başlık | "Seni Tanıyalım" |
| Ad Soyad input | label + TextInput, placeholder "Örn: Ayşe Yılmaz" |
| E-posta input | label + TextInput, `keyboardType="email-address"`, placeholder "merhaba@ornek.com" |
| Şifre input | label + TextInput, `secureTextEntry={!showPassword}`, toggle butonu (👁 emoji), placeholder "••••••••" |
| Şifre hint | "En az 8 karakter, bir rakam içermeli" (text-xs text-text-muted) |
| Terms checkbox | `Pressable` custom checkbox + "Kullanım Koşulları ve Gizlilik Politikası'nı kabul ediyorum" text |
| Buton | "Devam Et" — disabled={!termsAccepted} — `router.push('/(auth)/signup-success')` |
| Footer | "Zaten hesabın var mı?" + "Giriş Yap" → `router.replace('/(auth)/login')` |

### State
```typescript
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [showPassword, setShowPassword] = useState(false)
const [termsAccepted, setTermsAccepted] = useState(false)
```

### Navigasyon
- Geri: `router.back()` → signup-phone
- İleri: buton → `/(auth)/signup-success`

---

## Screen 3 — signup-success.tsx

**Dosya:** `src/app/(auth)/signup-success.tsx`  
**Tasarım ref:** `unity-day-design/success-sign-up/code.html`

### Layout
- `SafeAreaView` + `ScrollView` (bg-background)
- Üst: progress bar (tam dolu), orta: hero blok, alt: buton

### Bileşenler
| Eleman | Detay |
|--------|-------|
| Progress bar | Animasyonlu: 0→%100, 700ms, `useEffect` + `Animated.timing` veya `width` state |
| Başlık | "Hoş Geldin! 🎉" (text-2xl font-jakarta-bold text-center) |
| Alt başlık | "Profilin hazır. Artık birikim gruplarına katılabilir veya kendi grubunu kurabilirsin." |
| Hero blok | `View` — rounded-3xl, bg-[#ffdea4], min-h-48, içinde büyük 🏆 emoji (ortalı), dekoratif |
| Avatar stack | 3 daire (`w-10 h-10 rounded-full bg-[#c89b3c]`, `items-center`, `-ml-3` ile üst üste) + "+12" badge |
| Konfeti | `useEffect` mount'ta basit animasyon: 10-15 `Animated.Value` ile yukarıdan aşağı düşen renkli View'lar. Basit tutulacak. |
| Buton | "Başlayalım" — `bg-[#7b5900]` — `router.replace('/(app)/')` |
| Footer | "Sorun mu yaşıyorsunuz? Yardım Merkezi ile iletişime geçin." (text-xs text-text-muted) |

### Konfeti Implementasyonu
Basit yaklaşım: `useEffect` ile mount'ta 15 adet `Animated.Value` oluştur, `Animated.stagger` ile `translateY` ve `opacity` animasyonları çalıştır. Absolute positioned View'lar random `left` pozisyonlarında, 5 farklı renk (`#C89B3C`, `#7B5900`, `#4CAF50`, `#FFDEA4`, `#53B656`).

### Navigasyon
- Geri yok (back butonu gösterilmez)
- Buton: `router.replace('/(app)/')` — history stack temizlenir

---

## IS_AUTHENTICATED Mock Notu

`src/app/_layout.tsx`'deki `IS_AUTHENTICATED = false` sabiti, `/(app)/`'a yönlendirmeyi engelliyor. Signup-success implementasyonu sırasında bu sabit `true` yapılacak (Supabase entegrasyonuna kadar geçici). Root layout'a comment eklenecek: `// TODO: Replace with Supabase session check`.

---

## Kapsam Dışı

- Gerçek OTP doğrulama (Supabase Auth)
- Form validation görselleri (hata rengi, error mesajları)
- Profil fotoğrafı yükleme
- Onboarding ekranı (ayrı sprint)
