# UTS-Project-Cryptofolio-
A Crypto Portfolio Management web application built with Vanilla JavaScript, HTML, and CSS. Created for the Front-End Web Development Midterm Exam.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## 📸 Tangkapan Layar (Screenshots)
Halaman Login
-------------

## ✨ Fitur
### 1. 🔐 Sistem Autentikasi (Simulasi)
- Halaman Login interaktif dengan validasi input.
- Proteksi halaman (Dashboard tidak bisa diakses tanpa login).
- **Akun Demo:** Username: `admin` | Password: `123`

### 2. 💰 Manajemen Aset (CRUD & DOM Manipulation)
- **Catat Transaksi:** Input pembelian aset dengan kalkulasi total investasi otomatis.
- **Holding Table:** Menampilkan daftar aset yang sedang dimiliki secara dinamis.
- **Hapus Data:** Fitur untuk menghapus aset yang salah input.

### 3. 🤖 Integrasi API Real-time
- Terhubung dengan **CoinGecko API**.
- Pengguna cukup memasukkan ID Koin (misal: `bitcoin`), dan sistem akan mengambil harga pasar terbaru secara otomatis.

### 4. 📈 Smart Profit Calculator
- Fitur **Jual Aset** yang cerdas.
- Menghitung selisih harga Jual vs Beli secara otomatis.
- Saldo **Profit/Cuan** terpisah dari saldo Aset, memudahkan analisis kinerja trading.

### 5. 💾 Penyimpanan Data (Local Storage)
- Data tidak hilang saat browser di-refresh atau ditutup.
- Menggunakan `localStorage` browser sebagai database sederhana.

### 6. 📄 Laporan & Ekspor Data
- Riwayat transaksi penjualan tercatat rapi di halaman **History**.
- Fitur **Download CSV** untuk mengekspor laporan ke Excel.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi Web Standar (Vanilla) tanpa Framework, sesuai ketentuan UTS:

* **HTML:** Struktur semantik (Header, Main, Section, Table).
* **CSS:**
    * Desain Modern **Dark Mode** & Glassmorphism.
    * Layouting menggunakan **Flexbox** dan **CSS Grid**.
    * Responsif untuk tampilan Mobile & Desktop.
* **JavaScript:**
    * **DOM Manipulation:** Render tabel, update saldo, modal popup.
    * **Event Handling:** Form submit, click events.
    * **Async/Await:** Fetch data dari API CoinGecko.
    * **Web Storage API:** Menyimpan data persisten.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🎨 Desain UI/UX (Figma)

Perancangan antarmuka aplikasi ini dimulai melalui tahap Wireframe hingga High-Fidelity Mockup menggunakan Figma.

🔗 **Link Desain Figma:**
[]

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Cara Menjalankan Proyek

1.  Clone repository ini atau download sebagai ZIP.
2.  Pastikan koneksi internet aktif (untuk memuat Font Inter & API CoinGecko).
3.  Buka file `index.html` atau `login.html` menggunakan browser (Chrome/Edge).
4.  Login menggunakan kredensial demo:
    * User: **admin**
    * Pass: **123**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📂 Struktur Folder
/cryptofolio │ ├── index.html 
# Halaman Utama (Dashboard Holding) ├── login.html 
# Halaman Login ├── history.html 
# Halaman Laporan Riwayat ├── style.css 
# Styling Global (Tema & Layout) ├── script.js 
# Logika Aplikasi (API, DOM, Storage) ├── logo.png
# Aset Logo 



