Simple Task Management Board

Ini adalah aplikasi full-stack "Simple Task Management Board" yang dibuat untuk Tes Fullstack Developer, sesuai dengan dokumen Fullstack Developer Test_ Aplikasi _Simple Task Management Board__2.pdf.

Aplikasi ini adalah papan Kanban (mirip Trello) di mana pengguna dapat membuat, melihat, memperbarui (melalui drag-and-drop), dan menghapus tugas.

Fitur Unggulan

CRUD Penuh: Buat, Baca, Update, dan Hapus tugas.

Bonus: Drag and Drop: Pindahkan tugas antar kolom ("To Do", "In Progress", "Done") dengan @dnd-kit.

Nilai Plus: Arsitektur Modern:

Backend (Express) dan Frontend (React) sepenuhnya terpisah.

Frontend disajikan menggunakan Nginx dengan multi-stage build untuk image Docker yang ringan dan aman.

Nginx berfungsi sebagai reverse proxy untuk menangani permintaan API ke backend.

Persistensi Data: Data database tetap aman dan tersimpan di Docker Volume, bahkan setelah container di-restart.

Tech Stack

Backend: Express.js, Sequelize, PostgreSQL

Frontend: React.js (Vite), @dnd-kit/core

Infrastruktur: Docker, Docker Compose, Nginx

Daftar Environment Variables

Sebelum menjalankan, Anda perlu membuat file .env di root proyek. Salin isi dari .env.example (sudah ada di repositori).

cp .env.example .env


Isi dari file .env.example adalah sebagai berikut:

# PostgreSQL
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=task_db

# Backend 
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=task_db
DB_HOST=db
DB_PORT=5432


Catatan: Nilai default di atas sudah diatur untuk berjalan mulus dengan konfigurasi docker-compose.yml.

Instruksi Menjalankan Proyek

Pastikan Anda memiliki Docker dan Docker Compose terinstal dan sedang berjalan.

Menjalankan dengan Satu Perintah (Sesuai Permintaan)

Cukup jalankan satu perintah ini dari root folder proyek:

docker-compose up --build


Apa yang terjadi:

Perintah ini akan mem-build image backend (Express).

Perintah ini akan mem-build image frontend (React + Nginx) menggunakan multi-stage build.

Ini akan menjalankan 3 service: db, backend, dan frontend.

Service backend akan menunggu db siap sebelum memulai (menggunakan depends_on dan logic process.exit(1) untuk restart otomatis jika race condition terjadi).

Akses Aplikasi

Setelah semua service berjalan (Anda akan melihat log Database connection has been established successfully. dari backend-1), buka browser Anda dan kunjungi:

http://localhost