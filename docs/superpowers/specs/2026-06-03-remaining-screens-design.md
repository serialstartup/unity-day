# Remaining Screens Design Spec

**Date:** 2026-06-03  
**Status:** Approved  
**Screens:** Onboarding, Group Detail, Activity, Profile

---

## Screen 1 — Onboarding (`src/app/(auth)/onboarding.tsx`)

**Design ref:** `unity-day-design/onboarding/code.html`

### Layout
SafeAreaView → View (flex-1)
- Sticky header: "Dijital Altın Günü" sol + "Atla" sağ (→ `/(app)/`)
- Carousel content (flex-1, değişen içerik)
- Footer: geri/ileri butonları + 5 progress dot

### Adım 1 içeriği (tam impl, diğerleri placeholder)
- 3 grup kartı (dönen açılar: -rotate-3, rotate-2, -rotate-1):
  - "Aile Grubu" — emoji 👨‍👩‍👧, açıklama, avatar stack
  - "İş Ekibi" — emoji 💼
  - "Dostlar" — emoji 🎉
- Başlık: "Gruplarınızı Kurun"
- Açıklama: "Aileniz, iş arkadaşlarınız veya dostlarınızla özel tasarruf grupları oluşturun."

### State
```typescript
const [step, setStep] = useState(0) // 0-4
const TOTAL_STEPS = 5
```

### Navigasyon
- "Atla" → `router.replace('/(app)/')`
- "Geri" → `setStep(step - 1)` (adım 0'da görünmez)
- "İleri" (adım 0-3) → `setStep(step + 1)`
- "Başlayalım" (adım 4) → `router.replace('/(app)/')`

### Progress Dots
5 nokta, aktif olan `bg-[#c89b3c]` (w-4 h-2 rounded-full), diğerleri `bg-[#e1dfdb]` (w-2 h-2 rounded-full)

---

## Screen 2 — Group Detail (`src/app/(app)/groups/[id].tsx`)

**Design ref:** `unity-day-design/group-detay-2/code.html`

### Layout
SafeAreaView → ScrollView
- Header: geri butonu + grup adı + 🔔
- Hero card: toplam tutar + progress bar + sıradaki alıcı
- Üyeler grid (2 sütun)
- Timeline (dikey)
- Alt buton: "Katılım Payını Öde"

### Data
```typescript
const { id } = useLocalSearchParams<{ id: string }>()
// mockGroups'tan id ile bul
const group = mockGroups.find(g => g.id === id) ?? mockGroups[0]
const members = mockMembers.filter(m => m.groupId === group.id)
const cycles = mockCycles.filter(c => c.groupId === group.id)
```

### Hero Card
- "Toplam Biriken Miktar" label
- Büyük tutar: `{group.contributionAmount * group.maxMembers} Altın`
- Progress bar: `{(group.currentCycleIndex / mockCycles.length) * 100}%` genişlik
- Alt satır: "Bu ayki hedefin %70'ine ulaşıldı"

### Sıradaki Alıcı Card
- "Sıradaki Alıcı" label
- Alıcı adı (mockUser.fullName)
- "Teslimat Tarihi: 12 Nisan"
- "Hazırlanıyor" badge (bg-[#ffdea4])
- Büyük avatar dairesi (initials)

### Üyeler Grid
- 2 sütun, her kart:
  - Avatar (initials, renkli daire)
  - İsim (mockUser.fullName)
  - Badge: "ÖDENDİ" (bg-[#53b656]/20, text-[#006e1c]) veya "BEKLİYOR" (bg-[#e1dfdb], text-text-muted)

### Timeline
- Geçmiş cycle'lar: yeşil daire ✓ + tarih + alıcı adı
- Aktif cycle: altın border + "Güncel"
- Gelecek: soluk + takvim ikonu

### Alt Buton
- "Katılım Payını Öde ({group.contributionAmount} Altın)"
- `bg-[#c89b3c]` — mock onPress (alert veya console.log)

---

## Screen 3 — Activity (`src/app/(app)/activity.tsx`)

**Design ref:** `unity-day-design/hareketler_activity/code.html`

### Layout
SafeAreaView → ScrollView
- Header: "Hareketler" başlığı
- Tab filtreler: Hepsi / Gruplarım / Ödemeler (pill butonlar)
- Feed listesi (mock transactions + mock cycles)

### State
```typescript
const [activeTab, setActiveTab] = useState<'all' | 'groups' | 'payments'>('all')
```

### Tab Filtreler
3 pill buton yan yana, aktif: `bg-[#c89b3c]` text-white, pasif: `bg-[#f0eded]` text-text-muted

### Feed Item Yapısı (her transaction için)
```
Row:
  ├── İkon dairesi (40x40, renkli bg, emoji)
  ├── View (flex-1)
  │   ├── Açıklama text (font-jakarta-semibold)
  │   └── Grup adı + tarih (text-text-muted text-xs)
  └── Tutar (font-jakarta-bold, yeşil=pozitif, kırmızı=negatif)
```

### Transaction İkon/Renk Mapping
- `purchase` → 💰 bg-[#ffdea4]
- `contribution_out` → ⬆️ bg-[#ffe0dd]
- `payout_in` → 🎉 bg-[#d4f0d8]

### Tab Filtreleme Mantığı
- "Hepsi": tüm mockTransactions
- "Gruplarım": sadece groupId olan transactions
- "Ödemeler": sadece `payout_in` ve `contribution_out`

---

## Screen 4 — Profile (`src/app/(app)/profile.tsx`)

**Design ref:** `unity-day-design/profil_profile/code.html`

### Layout
SafeAreaView → ScrollView
- Header row (avatar + isim + 🔔)
- Profil hero (büyük avatar + isim + badge)
- 3 stat card (yatay scroll veya grid)
- Rozetler grid (2 sütun)
- Ayarlar listesi

### Profil Hero
- Büyük daire avatar (initials, 80x80, bg-[#c89b3c])
- İsim: `mockUser.fullName`
- Badge: "Gümüş Seviye Birikimci" (bg-[#e1dfdb] rounded-full px-3 py-1)

### Stats (3 kart, yatay scroll)
| Label | Değer | Renk |
|-------|-------|------|
| Aktif Gruplar | `mockGroups.filter(g => g.status === 'active').length` | primary |
| Toplam Ödeme | `mockContributions.filter(c => c.status === 'paid').length` | success |
| Tamamlanan Günler | `mockCycles.filter(c => c.status === 'completed').length` | secondary |

### Rozetler
3 adet, grid 2 sütun:
- "İlk Çekiliş" 🏆 (kazanıldı)
- "Güvenilir Birikimci" ⭐ (kazanıldı)
- "Süper Ev Sahibi" 👑 (kilitli — grayscale, opacity-50)

### Ayarlar Listesi
Her satır: ikon emoji + label + "›" chevron
- 👤 Kişisel Bilgiler
- 🔒 Güvenlik ve Gizlilik
- ❓ Yardım ve Destek
- 🚪 Çıkış Yap (text-[#ba1a1a])

---

## Kapsam Dışı
- Create tab (ayrı session)
- Market tab (ayrı session)
- Gerçek backend bağlantısı
- Push notifications
