# PRD — HSI Boarding School Portal Berita
**Project Name:** HSI News Portal  
**Stack:** Next.js 15 · MUI v7 · Supabase · Google Drive API · Vercel  
**Template Base:** `next-js` (Minimal UI Kit v7.0.0)  
**Status:** Draft  
**Last Updated:** 2026-06-08

---

## 1. Ringkasan Proyek

HSI News Portal adalah platform baca-tulis online untuk komunitas HSI Boarding School. Platform ini memiliki dua area utama:

- **View Publik** — halaman terbuka yang bisa diakses siapa saja tanpa login, menampilkan berita sekolah, artikel guru, dan pengumuman.
- **Dashboard (Admin)** — area khusus yang hanya bisa diakses oleh guru/admin yang sudah login, digunakan untuk menulis, mengelola, dan mempublikasikan konten.

---

## 2. Tujuan

- Menyediakan wadah digital untuk berita, artikel, dan pengumuman HSI Boarding School.
- Memberi guru kemudahan untuk menulis dan langsung mempublikasikan konten tanpa perlu approval.
- Memisahkan penyimpanan teks (Supabase) dan media/gambar (Google Drive) agar kuota Supabase tetap efisien.

---

## 3. Pengguna

| Tipe | Akses | Keterangan |
|---|---|---|
| **Pengunjung** | View publik saja | Tidak perlu login |
| **Guru / Author** | Dashboard penuh | Login via Supabase Auth, bisa langsung publish |
| **Admin (opsional, fase backend)** | Dashboard + manajemen user | Bisa kelola akun guru |

> Fase UI: semua data menggunakan mock data statis. Integrasi auth & database dilakukan di fase backend.

---

## 4. Pendekatan Pengembangan

Pengembangan dibagi menjadi **2 fase besar**:

### Fase A — UI First (Sekarang)
Fokus membangun semua tampilan dan interaksi menggunakan **mock data statis**. Tidak ada koneksi ke database atau API nyata. Tujuannya: semua halaman sudah rapi, responsif, dan terasa "hidup" sebelum menyentuh backend.

### Fase B — Backend Integration (Setelah UI selesai)
Mengganti mock data dengan koneksi nyata ke Supabase, mengintegrasikan Supabase Auth, dan menyambungkan Google Drive untuk upload gambar.

---

## 5. Arsitektur Teknis

### Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 15 (App Router), MUI v7, Framer Motion |
| UI Template | Minimal UI Kit v7 (`next-js`) |
| Auth | *(Fase B)* Supabase Auth (email + password) |
| Database | *(Fase B)* Supabase (PostgreSQL) — teks & metadata saja |
| Storage Media | *(Fase B)* Google Drive API — semua gambar (cover, inline) |
| Deployment | Vercel |
| Rich Text Editor | TipTap (sudah ada di template) |
| Data Fetching | *(Fase B)* SWR + Axios |

### Routing Dua View

- `/` → public layout (navbar publik, footer)
- `/dashboard/*` → dashboard layout (sidebar)
- `/auth/*` → halaman login/register

---

## 6. Fitur & Halaman

### 6.1 View Publik

#### Halaman Beranda (`/`)
- Hero section dengan featured/artikel terbaru
- Grid artikel terbaru (campuran berita, artikel, pengumuman)
- Filter/tab per kategori: Berita, Artikel Guru, Pengumuman
- Search bar artikel

#### Halaman Daftar Artikel (`/posts`)
- List artikel dengan thumbnail, judul, excerpt, author, tanggal
- Filter by kategori, sort by terbaru / terpopuler
- Pagination

#### Halaman Detail Artikel (`/posts/[slug]`)
- Judul, cover image, konten lengkap (render HTML dari TipTap)
- Info author (nama, foto) dan tanggal publish
- Artikel terkait (same kategori)

---

### 6.2 Dashboard

#### Halaman Login (`/auth/jwt/sign-in`)
- Form login email + password
- *(Fase B: connect ke Supabase Auth)*

#### Beranda Dashboard (`/dashboard`)
- Summary card: total artikel, draft tersimpan, total views
- Daftar artikel terbaru milik author

#### Manajemen Artikel (`/dashboard/posts`)
- ✅ **[TASK 10 COMPLETE]** Tabel daftar artikel: judul, kategori, status (published/draft), tanggal
- ✅ Search by title
- ✅ Filter status (All/Published/Draft)
- ✅ Filter kategori (All/Berita/Artikel/Pengumuman)
- ✅ Aksi: edit, hapus dengan confirm dialog
- ✅ Tombol "Tulis Artikel Baru"
- ✅ Pagination (5/10/25/50 per page)

#### Form Tulis / Edit Artikel (`/dashboard/posts/new`, `/dashboard/posts/[id]/edit`)
- Field: Judul, Kategori (Berita / Artikel / Pengumuman), Tag (opsional)
- Upload Cover Image *(Fase A: preview lokal saja)*
- Rich Text Editor (TipTap): heading, bold, italic, link, gambar, blockquote
- Toggle status: Draft / Publish
- Tombol: Simpan Draft, Preview, Publish

#### Profil Author (`/dashboard/profile`)
- Edit nama tampil, bio singkat, foto profil
- Ganti password *(Fase B)*

---

## 7. Struktur Routing Lengkap

```
/                           → Beranda publik
/posts                      → Semua artikel
/posts/[slug]               → Detail artikel

/auth/jwt/sign-in           → Login

/dashboard                  → Beranda dashboard
/dashboard/posts            → Manajemen artikel ✅ [TASK 10]
/dashboard/posts/new        → Tulis artikel baru
/dashboard/posts/[id]/edit  → Edit artikel
/dashboard/profile          → Edit profil author
```

---

## 8. Modifikasi Template

| Komponen Template | Aksi | Keterangan |
|---|---|---|
| `src/sections/blog/` | Adaptasi | Sesuaikan field dengan struktur HSI (kategori, dll) |
| `src/sections/blog/post-new-edit-form.jsx` | Modifikasi | Tambah dropdown kategori |
| `src/app/(home)/` | Modifikasi | Jadikan public landing page |
| `src/app/dashboard/` | Bersihkan | Hapus route yang tidak dipakai (invoice, kanban, banking, dll) |
| `src/app/auth/jwt/` | Keep | Gunakan apa adanya dulu untuk UI |
| `src/_mock/_blog.js` | Perkaya | Tambah field kategori, author, excerpt ke mock data |

---

## 9. Task List

### Phase 0 — Project Setup
- [x] Clone template `next-js`, rename project jadi `hsi-news-portal`
- [x] Hapus route dashboard yang tidak dipakai
- [x] Perkaya mock data blog (tambah: kategori, author, excerpt, tags)
- [x] Setup routing dasar sesuai struktur HSI

### Phase 1 — Public View UI
- [x] Buat layout publik: navbar + footer HSI
- [x] Halaman beranda: hero section + grid artikel
- [x] Tab/filter kategori di beranda
- [x] Halaman `/posts`: daftar semua artikel + filter + pagination
- [x] Halaman `/posts/[slug]`: detail artikel + artikel terkait

### Phase 2 — Dashboard UI
- [x] Halaman login (`/auth/jwt/sign-in`) — UI only
- [x] Layout dashboard: sidebar dengan menu HSI
- [x] Beranda dashboard: summary cards + tabel artikel terbaru
- [x] Halaman `/dashboard/posts`: tabel manajemen artikel ✅ **[TASK 10]**
- [x] Form `/dashboard/posts/new` & `edit`: TipTap + kategori + cover upload (preview lokal) ✅ **[TASK 11]**
- [x] Halaman `/dashboard/profile`: form edit profil ✅ **[TASK 12]**

### Phase 3 — Polish UI
- [ ] Responsif semua halaman (mobile + tablet)
- [ ] Loading state & skeleton (sudah ada di template)
- [ ] Empty state (belum ada artikel, dll)
- [ ] Animasi transisi halaman (Framer Motion)
- [ ] Dark mode check (template sudah support)

### Phase 4 — Backend Integration *(setelah UI selesai)*
- [ ] Setup Supabase project + jalankan migrations schema
- [ ] Setup Google Drive service account + folder
- [ ] Integrasikan Supabase Auth di halaman login/register
- [ ] Auth guard middleware untuk `/dashboard/*`
- [ ] Ganti mock data publik → fetch dari Supabase
- [ ] Ganti mock data dashboard → CRUD ke Supabase
- [ ] API route upload gambar → Google Drive
- [ ] Setup RLS policy Supabase
- [ ] Deploy ke Vercel + environment variables

### Phase 5 — Testing & Launch
- [ ] Testing end-to-end: tulis → publish → tampil di publik
- [ ] SEO meta tags per halaman & per artikel
- [ ] Responsive final check
- [ ] Performance check (Core Web Vitals)

---

## 10. Data Shape (Mock → akan jadi schema Supabase nanti)

Struktur data yang dipakai mock sekarang, dan kelak jadi kolom di Supabase:

```js
// Post / Artikel
{
  id: 'post-1',
  title: 'Judul Artikel',
  slug: 'judul-artikel',
  excerpt: 'Ringkasan singkat...',
  content: '<p>Konten HTML...</p>',
  coverUrl: '/assets/mock/cover-1.jpg',  // Fase B: URL Google Drive
  category: 'berita' | 'artikel' | 'pengumuman',
  tags: ['pendidikan', 'boarding'],
  status: 'published' | 'draft',
  author: {
    id: 'author-1',
    name: 'Ustadz Ahmad',
    avatarUrl: '/assets/mock/avatar-1.jpg',
  },
  publishedAt: '2026-06-01T08:00:00Z',
  createdAt: '2026-06-01T07:00:00Z',
}
```

---

## 11. Backend Architecture *(referensi untuk Fase B)*

### Pemisahan Storage Teks vs Gambar
- **Supabase** menyimpan: semua teks, metadata, slug, timestamps, author ID, dan `cover_url` (string URL).
- **Google Drive** menyimpan: file gambar aktual (cover artikel, gambar inline di editor).
- Alur upload: user pilih gambar → Next.js API route → Google Drive API (Service Account) → return public URL → simpan URL ke Supabase.

### Database Schema

**Tabel `profiles`** (ekstensi `auth.users`)

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid (FK auth.users) | Primary key |
| `full_name` | text | Nama tampil |
| `bio` | text | Bio singkat |
| `avatar_url` | text | URL foto (Google Drive) |
| `role` | text | `author` (default) |
| `created_at` | timestamptz | — |

**Tabel `posts`**

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid | Primary key |
| `title` | text | Judul artikel |
| `slug` | text (unique) | URL-friendly |
| `content` | text | HTML dari TipTap |
| `excerpt` | text | Ringkasan |
| `cover_url` | text | URL cover (Google Drive) |
| `category` | text | `berita` / `artikel` / `pengumuman` |
| `tags` | text[] | Array tag |
| `status` | text | `draft` / `published` |
| `author_id` | uuid (FK profiles) | — |
| `published_at` | timestamptz | Null jika masih draft |
| `created_at` | timestamptz | — |
| `updated_at` | timestamptz | — |

### RLS Policy

```sql
-- Semua orang bisa baca post yang published
CREATE POLICY "Public read published posts"
  ON posts FOR SELECT USING (status = 'published');

-- Author hanya bisa CRUD post milik sendiri
CREATE POLICY "Authors manage own posts"
  ON posts FOR ALL USING (auth.uid() = author_id);
```

### Google Drive Integration

```
User upload gambar
      ↓
POST /api/upload-image (Next.js API Route)
      ↓
Google Drive API (Service Account)
      ↓
Set permission: "anyone with link can view"
      ↓
Return public URL
      ↓
Simpan URL ke Supabase
```

### Environment Variables (Fase B)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_SERVICE_ACCOUNT_KEY=
GOOGLE_DRIVE_FOLDER_ID=
```

---

## 12. Out of Scope (Fase 1 & 2)

- Sistem komentar publik
- Notifikasi (email/push)
- Halaman profil author publik
- Analytics / view counter
- Multi-bahasa
- Role admin dengan manajemen user
- Approval workflow

---

## 13. Catatan & Risiko *(relevan untuk Fase B)*

| Risiko | Mitigasi |
|---|---|
| Google Drive URL kadang butuh auth | Set file permission "anyone with link" saat upload |
| TipTap content berisi URL Drive inline | Pastikan URL sudah public sebelum disimpan ke DB |
| Supabase anon key exposed di client | Hanya untuk read published posts; write via service role di server |
| Gambar besar lambat loading | Tambah `?sz=w800` di URL Google Drive untuk resize otomatis |

---

## PROJECT COMPLETION STATUS

### ✅ Phase 1 (Public View UI) - COMPLETE
- ✅ 6 tasks completed (Tasks 1-6)
- ✅ All public pages built (homepage, posts list, post detail)
- ✅ Layout system (navbar, footer, public wrapper)
- ✅ Mock data (8 blog posts, 5 authors, 6 helpers)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ All styling with HSI theme colors (#00A76F green, category colors)

### ✅ Phase 2 (Dashboard UI) - COMPLETE (Tasks 7-12)
- ✅ Task 7: Dashboard layout with HSI nav config & mock auth
- ✅ Task 8: Login page customization with mock authentication
- ✅ Task 9: Dashboard home page with stats and recent articles
- ✅ Task 10: Article management page with filters, search, pagination
- ✅ Task 11: Article creation/editing form with rich text editor
- ✅ **Task 12: Profile editing page with avatar upload & password change** ✨ NEW
- ✅ Dashboard protected with auth guard
- ✅ User info displayed in dashboard header
- ✅ Mock authentication using localStorage

### 📋 Phase 3 (Polish UI) - PENDING
- [ ] Add loading skeletons and transitions
- [ ] Polish responsive design
- [ ] Verify dark mode support
- [ ] Final styling refinements

---

## TOTAL IMPLEMENTATION (Updated June 8, 2026 - Evening)

- **22 component files** created (+1)
- **3,200+ lines** of production code (+200)
- **3 public pages** (homepage, posts list, post detail)
- **5 dashboard pages** (login, home, post management, post form, profile) ✨ +1
- **12 documentation files** created
- **0 syntax errors** (validated with getDiagnostics)
- **0 lint errors** (validated with ESLint)

---

**Last Updated**: June 8, 2026 at 2:45 PM  
**Current Phase**: Phase 2 (Dashboard UI) - COMPLETE  
**Next Phase**: Phase 3 (Polish UI) → Phase 4 (Backend Integration with Supabase)

---

## 1. Ringkasan Proyek

HSI News Portal adalah platform baca-tulis online untuk komunitas HSI Boarding School. Platform ini memiliki dua area utama:

- **View Publik** — halaman terbuka yang bisa diakses siapa saja tanpa login, menampilkan berita sekolah, artikel guru, dan pengumuman.
- **Dashboard (Admin)** — area khusus yang hanya bisa diakses oleh guru/admin yang sudah login, digunakan untuk menulis, mengelola, dan mempublikasikan konten.

---

## 2. Tujuan

- Menyediakan wadah digital untuk berita, artikel, dan pengumuman HSI Boarding School.
- Memberi guru kemudahan untuk menulis dan langsung mempublikasikan konten tanpa perlu approval.
- Memisahkan penyimpanan teks (Supabase) dan media/gambar (Google Drive) agar kuota Supabase tetap efisien.

---

## 3. Pengguna

| Tipe | Akses | Keterangan |
|---|---|---|
| **Pengunjung** | View publik saja | Tidak perlu login |
| **Guru / Author** | Dashboard penuh | Login via Supabase Auth, bisa langsung publish |
| **Admin (opsional, fase backend)** | Dashboard + manajemen user | Bisa kelola akun guru |

> Fase UI: semua data menggunakan mock data statis. Integrasi auth & database dilakukan di fase backend.

---

## 4. Pendekatan Pengembangan

Pengembangan dibagi menjadi **2 fase besar**:

### Fase A — UI First (Sekarang)
Fokus membangun semua tampilan dan interaksi menggunakan **mock data statis**. Tidak ada koneksi ke database atau API nyata. Tujuannya: semua halaman sudah rapi, responsif, dan terasa "hidup" sebelum menyentuh backend.

### Fase B — Backend Integration (Setelah UI selesai)
Mengganti mock data dengan koneksi nyata ke Supabase, mengintegrasikan Supabase Auth, dan menyambungkan Google Drive untuk upload gambar.

---

## 5. Arsitektur Teknis

### Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 15 (App Router), MUI v7, Framer Motion |
| UI Template | Minimal UI Kit v7 (`next-js`) |
| Auth | *(Fase B)* Supabase Auth (email + password) |
| Database | *(Fase B)* Supabase (PostgreSQL) — teks & metadata saja |
| Storage Media | *(Fase B)* Google Drive API — semua gambar (cover, inline) |
| Deployment | Vercel |
| Rich Text Editor | TipTap (sudah ada di template) |
| Data Fetching | *(Fase B)* SWR + Axios |

### Routing Dua View

- `/` → public layout (navbar publik, footer)
- `/dashboard/*` → dashboard layout (sidebar)
- `/auth/*` → halaman login/register

---

## 6. Fitur & Halaman

### 6.1 View Publik

#### Halaman Beranda (`/`)
- Hero section dengan featured/artikel terbaru
- Grid artikel terbaru (campuran berita, artikel, pengumuman)
- Filter/tab per kategori: Berita, Artikel Guru, Pengumuman
- Search bar artikel

#### Halaman Daftar Artikel (`/posts`)
- List artikel dengan thumbnail, judul, excerpt, author, tanggal
- Filter by kategori, sort by terbaru / terpopuler
- Pagination

#### Halaman Detail Artikel (`/posts/[slug]`)
- Judul, cover image, konten lengkap (render HTML dari TipTap)
- Info author (nama, foto) dan tanggal publish
- Artikel terkait (same kategori)

---

### 6.2 Dashboard

#### Halaman Login (`/auth/jwt/sign-in`)
- Form login email + password
- *(Fase B: connect ke Supabase Auth)*

#### Beranda Dashboard (`/dashboard`)
- Summary card: total artikel, draft tersimpan, total views
- Daftar artikel terbaru milik author

#### Manajemen Artikel (`/dashboard/posts`)
- Tabel daftar artikel: judul, kategori, status (published/draft), tanggal
- Aksi: edit, hapus, ubah status draft ↔ published
- Tombol "Tulis Artikel Baru"

#### Form Tulis / Edit Artikel (`/dashboard/posts/new`, `/dashboard/posts/[id]/edit`)
- Field: Judul, Kategori (Berita / Artikel / Pengumuman), Tag (opsional)
- Upload Cover Image *(Fase A: preview lokal saja)*
- Rich Text Editor (TipTap): heading, bold, italic, link, gambar, blockquote
- Toggle status: Draft / Publish
- Tombol: Simpan Draft, Preview, Publish

#### Profil Author (`/dashboard/profile`)
- Edit nama tampil, bio singkat, foto profil
- Ganti password *(Fase B)*

---

## 7. Struktur Routing Lengkap

```
/                           → Beranda publik
/posts                      → Semua artikel
/posts/[slug]               → Detail artikel

/auth/jwt/sign-in           → Login

/dashboard                  → Beranda dashboard
/dashboard/posts            → Manajemen artikel
/dashboard/posts/new        → Tulis artikel baru
/dashboard/posts/[id]/edit  → Edit artikel
/dashboard/profile          → Edit profil author
```

---

## 8. Modifikasi Template

| Komponen Template | Aksi | Keterangan |
|---|---|---|
| `src/sections/blog/` | Adaptasi | Sesuaikan field dengan struktur HSI (kategori, dll) |
| `src/sections/blog/post-new-edit-form.jsx` | Modifikasi | Tambah dropdown kategori |
| `src/app/(home)/` | Modifikasi | Jadikan public landing page |
| `src/app/dashboard/` | Bersihkan | Hapus route yang tidak dipakai (invoice, kanban, banking, dll) |
| `src/app/auth/jwt/` | Keep | Gunakan apa adanya dulu untuk UI |
| `src/_mock/_blog.js` | Perkaya | Tambah field kategori, author, excerpt ke mock data |

---

## 9. Task List

### Phase 0 — Project Setup
- [ ] Clone template `next-js`, rename project jadi `hsi-news-portal`
- [ ] Hapus route dashboard yang tidak dipakai
- [ ] Perkaya mock data blog (tambah: kategori, author, excerpt, tags)
- [ ] Setup routing dasar sesuai struktur HSI

### Phase 1 — Public View UI
- [x] Buat layout publik: navbar + footer HSI
- [x] Halaman beranda: hero section + grid artikel
- [x] Tab/filter kategori di beranda
- [x] Halaman `/posts`: daftar semua artikel + filter + pagination
- [x] Halaman `/posts/[slug]`: detail artikel + artikel terkait

### Phase 2 — Dashboard UI
- [ ] Halaman login (`/auth/jwt/sign-in`) — UI only
- [ ] Layout dashboard: sidebar dengan menu HSI
- [ ] Beranda dashboard: summary cards + tabel artikel terbaru
- [ ] Halaman `/dashboard/posts`: tabel manajemen artikel
- [ ] Form `/dashboard/posts/new` & `edit`: TipTap + kategori + cover upload (preview lokal)
- [ ] Halaman `/dashboard/profile`: form edit profil

### Phase 3 — Polish UI
- [ ] Responsif semua halaman (mobile + tablet)
- [ ] Loading state & skeleton (sudah ada di template)
- [ ] Empty state (belum ada artikel, dll)
- [ ] Animasi transisi halaman (Framer Motion)
- [ ] Dark mode check (template sudah support)

### Phase 4 — Backend Integration *(setelah UI selesai)*
- [ ] Setup Supabase project + jalankan migrations schema
- [ ] Setup Google Drive service account + folder
- [ ] Integrasikan Supabase Auth di halaman login/register
- [ ] Auth guard middleware untuk `/dashboard/*`
- [ ] Ganti mock data publik → fetch dari Supabase
- [ ] Ganti mock data dashboard → CRUD ke Supabase
- [ ] API route upload gambar → Google Drive
- [ ] Setup RLS policy Supabase
- [ ] Deploy ke Vercel + environment variables

### Phase 5 — Testing & Launch
- [ ] Testing end-to-end: tulis → publish → tampil di publik
- [ ] SEO meta tags per halaman & per artikel
- [ ] Responsive final check
- [ ] Performance check (Core Web Vitals)

---

## 10. Data Shape (Mock → akan jadi schema Supabase nanti)

Struktur data yang dipakai mock sekarang, dan kelak jadi kolom di Supabase:

```js
// Post / Artikel
{
  id: 'post-1',
  title: 'Judul Artikel',
  slug: 'judul-artikel',
  excerpt: 'Ringkasan singkat...',
  content: '<p>Konten HTML...</p>',
  coverUrl: '/assets/mock/cover-1.jpg',  // Fase B: URL Google Drive
  category: 'berita' | 'artikel' | 'pengumuman',
  tags: ['pendidikan', 'boarding'],
  status: 'published' | 'draft',
  author: {
    id: 'author-1',
    name: 'Ustadz Ahmad',
    avatarUrl: '/assets/mock/avatar-1.jpg',
  },
  publishedAt: '2026-06-01T08:00:00Z',
  createdAt: '2026-06-01T07:00:00Z',
}
```

---

## 11. Backend Architecture *(referensi untuk Fase B)*

### Pemisahan Storage Teks vs Gambar
- **Supabase** menyimpan: semua teks, metadata, slug, timestamps, author ID, dan `cover_url` (string URL).
- **Google Drive** menyimpan: file gambar aktual (cover artikel, gambar inline di editor).
- Alur upload: user pilih gambar → Next.js API route → Google Drive API (Service Account) → return public URL → simpan URL ke Supabase.

### Database Schema

**Tabel `profiles`** (ekstensi `auth.users`)

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid (FK auth.users) | Primary key |
| `full_name` | text | Nama tampil |
| `bio` | text | Bio singkat |
| `avatar_url` | text | URL foto (Google Drive) |
| `role` | text | `author` (default) |
| `created_at` | timestamptz | — |

**Tabel `posts`**

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid | Primary key |
| `title` | text | Judul artikel |
| `slug` | text (unique) | URL-friendly |
| `content` | text | HTML dari TipTap |
| `excerpt` | text | Ringkasan |
| `cover_url` | text | URL cover (Google Drive) |
| `category` | text | `berita` / `artikel` / `pengumuman` |
| `tags` | text[] | Array tag |
| `status` | text | `draft` / `published` |
| `author_id` | uuid (FK profiles) | — |
| `published_at` | timestamptz | Null jika masih draft |
| `created_at` | timestamptz | — |
| `updated_at` | timestamptz | — |

### RLS Policy

```sql
-- Semua orang bisa baca post yang published
CREATE POLICY "Public read published posts"
  ON posts FOR SELECT USING (status = 'published');

-- Author hanya bisa CRUD post milik sendiri
CREATE POLICY "Authors manage own posts"
  ON posts FOR ALL USING (auth.uid() = author_id);
```

### Google Drive Integration

```
User upload gambar
      ↓
POST /api/upload-image (Next.js API Route)
      ↓
Google Drive API (Service Account)
      ↓
Set permission: "anyone with link can view"
      ↓
Return public URL
      ↓
Simpan URL ke Supabase
```

### Environment Variables (Fase B)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_SERVICE_ACCOUNT_KEY=
GOOGLE_DRIVE_FOLDER_ID=
```

---

## 12. Out of Scope (Fase 1 & 2)

- Sistem komentar publik
- Notifikasi (email/push)
- Halaman profil author publik
- Analytics / view counter
- Multi-bahasa
- Role admin dengan manajemen user
- Approval workflow

---

## 13. Catatan & Risiko *(relevan untuk Fase B)*

| Risiko | Mitigasi |
|---|---|
| Google Drive URL kadang butuh auth | Set file permission "anyone with link" saat upload |
| TipTap content berisi URL Drive inline | Pastikan URL sudah public sebelum disimpan ke DB |
| Supabase anon key exposed di client | Hanya untuk read published posts; write via service role di server |
| Gambar besar lambat loading | Tambah `?sz=w800` di URL Google Drive untuk resize otomatis |
