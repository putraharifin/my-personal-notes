# 📝 Aplikasi Catatan Pribadi (Personal Notes App)

Aplikasi manajemen catatan pribadi berbasis web yang dibangun menggunakan **React**. Proyek ini merupakan submission tugas akhir untuk kelas React dari Dicoding Indonesia dan telah diimplementasikan dengan memenuhi seluruh kriteria **Mastery-Based Grading (Advanced Level)**.

---

## ✨ Fitur Utama (Advanced Grade)

### 🧩 1. Pengklasifikasian Array & Pengelompokan Lanjut (Advanced Grouping)

- **Pengelompokan Catatan:** Catatan secara otomatis dikelompokkan berdasarkan kombinasi **Bulan-Tahun** pembuatannya dari properti `createdAt`.
- **Tata Letak Horizontal:** Menampilkan komponen dalam struktur `<section className="notes-group">` di mana judul bulan berada di atas dan kartu catatan berjejer rapi secara horizontal ke samping menggunakan class bawaan.
- **Penghitung Grup:** Setiap grup memiliki indikator jumlah catatan yang dinamis.

### 🔍 2. Pencarian Eksak & Reusable Component

- **Komponen Modular:** Struktur komponen dipisah dengan bersih menjadi `App.jsx`, `NoteInput.jsx`, `NotesList.jsx`, `NoteItem.jsx`, `NoteSearch.jsx`, dan `NoteActionButton.jsx`.
- **Penyorotan Teks (Highlighting):** Menggunakan fungsi khusus `highlightText` dengan elemen `<mark>` untuk menyorot kata kunci pencarian secara _case-insensitive_ pada judul dan isi catatan.
- **Tombol Reusable:** Menggunakan komponen `NoteActionButton` yang fleksibel untuk menangani aksi hapus dan arsip.

### 💾 3. Manajemen Status (State & Event Management)

- **Dua Area Terpisah:** Aplikasi memisahkan dengan jelas antara area **Catatan Aktif** dan **Arsip**, lengkap dengan counter jumlah catatan masing-masing.
- **Empty State:** Menampilkan pesan pemberitahuan yang informatif apabila daftar catatan aktif atau arsip sedang kosong.

### 🎛️ 4. Formulir Terkontrol & Validasi Ketat (Controlled Form)

- **Controlled Component:** Input judul dan isi catatan terikat sepenuhnya dengan state React.
- **Batas Karakter Judul:** Membatasi input judul maksimal **50 karakter** langsung melalui state (tanpa atribut `maxLength` HTML) dan menampilkan counter sisa karakter secara dinamis.
- **Validasi Panjang Karakter:** Formulir akan menolak _submit_ jika isi catatan kurang dari **10 karakter** dan otomatis memunculkan pesan error dengan class validasi.

---

## 🛠️ Teknologi yang Digunakan

- **React** (Class Components / Hooks sesuai starter)
- **Vite** (Build tool & development server)
- **CSS** (Styling responsif bawaan submission)

---

## 🚀 Cara Menjalankan Proyek secara Lokal

Pastikan Anda sudah menginstal **Node.js** (Minimal versi 18 atau lebih tinggi) di komputer Anda.

1. **Clone repositori ini:**

   ```bash
   git clone https://github.com/putraharifin/my-personal-notes.git
   cd NAMA_REPOSITORI
   ```

2. **Instal seluruh dependensi (dependencies):**

   ```bash
   npm install
   ```

3. **Jalankan Development Server:**

   ```bash
   npm run dev
   ```

4. **Buka di Browser:**
   Akses aplikasi melalui URL yang tertera di terminal Anda, biasanya di [http://localhost:5173](http://localhost:5173).

---

## 🧪 Pengujian Otomatis (Automated Testing)

Aplikasi ini mempertahankan seluruh atribut pengujian bawaan (`data-testid`) seperti `note-app`, `active-notes-list`, `note-input-title-field`, dan lainnya untuk memastikan kecocokan penuh dengan _automated test script_ dari Dicoding.
