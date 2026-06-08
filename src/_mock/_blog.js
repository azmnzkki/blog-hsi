// ============================================================
// PUBLISH & SORT OPTIONS
// ============================================================

export const POST_PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ============================================================
// MOCK AUTHORS
// ============================================================

const AUTHORS = {
  imam: {
    id: 'author-1',
    name: 'Imam Fauzi',
    avatarUrl: '/assets/images/avatars/avatar_1.jpg',
    role: 'Kepala Sekolah',
  },
  hendra: {
    id: 'author-2',
    name: 'Hendra Wijaya',
    avatarUrl: '/assets/images/avatars/avatar_2.jpg',
    role: 'Wali Kelas',
  },
  siti: {
    id: 'author-3',
    name: 'Siti Nurhaliza',
    avatarUrl: '/assets/images/avatars/avatar_3.jpg',
    role: 'Guru',
  },
  ahmad: {
    id: 'author-4',
    name: 'Ahmad Rijal',
    avatarUrl: '/assets/images/avatars/avatar_4.jpg',
    role: 'Guru',
  },
  fatimah: {
    id: 'author-5',
    name: 'Fatimah Az-Zahra',
    avatarUrl: '/assets/images/avatars/avatar_5.jpg',
    role: 'Guru',
  },
};

// ============================================================
// MOCK BLOG POSTS - HSI BOARDING SCHOOL
// ============================================================

export const POSTS = [
  {
    id: 'post-1',
    title: 'Peluncuran Program Tahfidz Al-Qur\'an Tahun Akademik 2024/2025',
    slug: 'peluncuran-program-tahfidz-alquran-2024',
    excerpt:
      'HSI Boarding School dengan bangga mengumumkan peluncuran program Tahfidz Al-Qur\'an yang ditingkatkan untuk tahun akademik 2024/2025. Program ini dirancang khusus untuk mengarahkan santri mencapai hafalan 10 juz dalam waktu satu tahun ajaran.',
    content: `
      <p>Assalamu'alaikum warahmatullahi wabarakatuh.</p>
      
      <p>Dengan rasa syukur kepada Allah SWT, HSI Boarding School dengan bangga mengumumkan peluncuran program Tahfidz Al-Qur'an yang telah ditingkatkan untuk tahun akademik 2024/2025. Program unggulan ini telah menjadi jantung dari pendidikan spiritual kami selama bertahun-tahun dan terus berkembang dengan inovasi-inovasi terbaru yang telah kami kembangkan bersama para ahli pendidikan Islam terkemuka dari berbagai negara.</p>

      <h3>Visi dan Misi Program Tahfidz</h3>
      <p>Program Tahfidz Al-Qur'an kami dirancang dengan tujuan mulia untuk menghasilkan generasi muda yang tidak hanya hafal Al-Qur'an, tetapi juga memahami dan mengamalkan isinya dalam kehidupan sehari-hari. Kami percaya bahwa hafalan Al-Qur'an adalah investasi spiritual yang akan membawa berkah bagi santri, keluarga, dan masyarakat luas. Dalam era digital ini, kami juga mengintegrasikan teknologi pembelajaran modern sambil tetap mempertahankan tradisi pesantren yang kaya.</p>

      <h3>Target Ambisius dan Kurikulum Terintegrasi</h3>
      <p>Tahun ini, kami menetapkan target ambisius dimana santri diharapkan dapat menghafal minimal 10 juz dalam satu tahun ajaran. Untuk mencapai target ini, kurikulum kami dirancang dengan cermat dan mencakup berbagai aspek pembelajaran Al-Qur'an yang komprehensif:</p>
      <ul>
        <li>Program Intensif muraja'ah (pengulangan) setiap pagi dengan sesi 2-3 jam</li>
        <li>Kelas tajweed dan tafsir yang didampingi oleh Qari berpengalaman secara berkala</li>
        <li>Tasmi'ah (mendengarkan hafalan) setiap malam untuk evaluasi dan perbaikan</li>
        <li>Mentoring pribadi dan kelompok dari Qari bersertifikat internasional</li>
        <li>Program penghargaan dan insentif untuk memotivasi santri</li>
      </ul>

      <h3>Fasilitas Penunjang dan Dukungan Sistem</h3>
      <p>Untuk mendukung kesuksesan program ini, kami telah mempersiapkan fasilitas dan dukungan sistem yang komprehensif dan modern. Investasi kami mencakup ruang pembelajaran berstandar internasional, perpustakaan Al-Qur'an digital dan fisik yang lengkap, tim pendamping yang terlatih khusus, dan sistem reward berkelanjutan yang memotivasi santri untuk terus maju dalam hafalan mereka. Kami juga menyediakan konseling psikologis untuk membantu santri mengatasi kendala mental dalam proses hafalan.</p>

      <p>Kami mengundang seluruh orang tua dan santri untuk bergabung dalam perjalanan mulia ini. Bersama-sama, kita akan membangun generasi muda yang kuat dalam iman dan ilmu pengetahuan, siap menghadapi tantangan zaman dengan nilai-nilai spiritualitas yang kokoh dan pengetahuan yang luas.</p>

      <p>Wassalamu'alaikum warahmatullahi wabarakatuh.</p>
    `,
    coverUrl: '/assets/illustrations/illustration-rocket-large.webp',
    category: 'pengumuman',
    tags: ['tahfidz', 'program-unggulan', 'akademik', 'spiritual'],
    status: 'published',
    totalViews: 1250,
    totalComments: 28,
    author: AUTHORS.imam,
    publishedAt: new Date('2024-06-15'),
    createdAt: new Date('2024-06-10'),
  },

  {
    id: 'post-2',
    title: 'Prestasi Gemilang: Tim Debat HSI Raih Juara 1 Musim Debat Nasional',
    slug: 'tim-debat-hsi-juara-musim-debat-nasional',
    excerpt:
      'Dalam ajang Musim Debat Nasional yang diikuti 150 sekolah dari seluruh Indonesia, tim debat HSI Boarding School berhasil meraih juara 1 dengan performa yang memukau.',
    content: `
      <p>Alhamdulillah, prestasi demi prestasi terus diraih oleh santri-santri terbaik kami. Kali ini, tim debat HSI Boarding School berhasil meraih juara 1 dalam ajang Musim Debat Nasional yang bergengsi, mengalahkan lebih dari 150 peserta sekolah terbaik dari seluruh Indonesia. Pencapaian luar biasa ini adalah bukti dedikasi, kerja keras, dan dukungan dari seluruh komunitas HSI.</p>

      <h3>Kompetisi Sengit dan Performa Memukau</h3>
      <p>Musim Debat Nasional tahun ini diikuti oleh lebih dari 150 sekolah dari berbagai daerah di seluruh nusantara. Dalam kompetisi sengit yang berlangsung selama 3 hari penuh, tim kami menunjukkan performa yang benar-benar memukau dengan memenangkan 8 dari 9 pertandingan. Juri-juri berpengalaman sangat terkesan dengan argumentasi yang kuat, retorika yang meyakinkan, dan penguasaan materi yang mendalam dari setiap anggota tim kami.</p>

      <h3>Profil Anggota Tim Juara</h3>
      <p>Tim yang terdiri dari 3 orang santri berbakat kami telah mempersiapkan diri selama berbulan-bulan. Masing-masing anggota membawa keunikan dan kekuatan tersendiri ke dalam pertandingan:</p>
      <ul>
        <li><strong>Muhammad Rizky Ramadhan (Kelas 3 SMA)</strong> - Ketua Tim, pemimpin yang tegas dan strategis dalam setiap putaran debat</li>
        <li><strong>Zahra Putri Islami (Kelas 3 SMA)</strong> - Pembicara 1, orator yang elegan dan argument yang tajam</li>
        <li><strong>Fahmi Nurul Haq (Kelas 2 SMA)</strong> - Pembicara 2, pembicara penutup yang mampu merangkum dengan sempurna</li>
      </ul>

      <h3>Penghargaan Individual yang Membanggakan</h3>
      <p>Selain meraih penghargaan juara umum, santri-santri kami juga berhasil menerima penghargaan individual bergengsi yang mengakui kontribusi dan keunggulan mereka secara personal dalam kompetisi. Penghargaan ini tidak hanya menambah prestise HSI, tetapi juga motivasi bagi para santri lainnya untuk terus berprestasi:</p>
      <ul>
        <li><strong>Best Speaker Award</strong> - Muhammad Rizky Ramadhan (Pembicara Terbaik)</li>
        <li><strong>Adjudicator's Award</strong> - Zahra Putri Islami (Pilihan Hakim)</li>
      </ul>

      <h3>Ucapan Apresiasi dan Motivasi Lanjutan</h3>
      <p>Kami mengucapkan terima kasih yang sebesar-besarnya kepada semua pendamping debat, guru-guru, orangtua, dan teman-teman yang telah memberikan dukungan luar biasa. Prestasi ini membuktikan bahwa dengan kerja keras yang konsisten, dedikasi yang tinggi, dan doa yang tulus, tidak ada yang mustahil untuk dicapai. Tim debat kami telah berhasil membawa nama baik HSI Boarding School ke tingkat nasional dan menjadi inspirasi nyata bagi santri-santri lainnya untuk terus berjuang meraih prestasi tertinggi.</p>

      <p>Semoga prestasi ini menjadi motivasi berkelanjutan bagi semua santri untuk terus berjuang dan meraih cita-cita setinggi langit, serta mengingatkan kita semua bahwa dengan niat yang mulia dan usaha yang keras, kesuksesan pasti akan datang.</p>
    `,
    coverUrl: '/assets/illustrations/illustration-upgrade.webp',
    category: 'berita',
    tags: ['prestasi', 'debat', 'kompetisi', 'nasional', 'santri'],
    status: 'published',
    totalViews: 2840,
    totalComments: 45,
    author: AUTHORS.hendra,
    publishedAt: new Date('2024-06-12'),
    createdAt: new Date('2024-06-08'),
  },

  {
    id: 'post-3',
    title: 'Artikel: Mengenal Lebih Dekat Program Pondok Pembelajaran Agama',
    slug: 'program-pondok-pembelajaran-agama',
    excerpt:
      'Dalam artikel ini, kami akan membahas secara mendalam tentang program pondok pembelajaran agama yang menjadi fondasi pembentukan karakter santri HSI Boarding School.',
    content: `
      <p>Program pondok pembelajaran agama adalah jantung dari HSI Boarding School. Melalui program ini, kami tidak hanya mengajarkan ilmu agama tetapi juga membentuk kepribadian santri yang berakhlak mulia dan mampu menjadi teladan bagi masyarakat sekitarnya. Program ini telah berkembang selama puluhan tahun dan terus disempurnakan mengikuti kebutuhan zaman.</p>

      <h3>Filosofi Pendidikan Holistik</h3>
      <p>Pondok pembelajaran agama kami didasarkan pada filosofi bahwa pendidikan agama bukan hanya transfer pengetahuan tetapi juga transfer nilai dan pembentukan karakter yang mendalam. Setiap santri diharapkan menjadi Muslim yang utuh dan seimbang - tidak hanya mengerti ilmu tetapi juga mengamalkannya dengan bijak dalam kehidupan sehari-hari. Pendekatan holistik ini mempertimbangkan perkembangan intelektual, spiritual, emosional, dan sosial setiap santri dengan sama pentingnya.</p>

      <h3>Struktur Kurikulum Komprehensif dan Modern</h3>
      <p>Program kami mencakup berbagai disiplin ilmu Islam tradisional dan kontemporer yang dirancang untuk menghasilkan alumni yang memahami Islam secara menyeluruh dan mampu berkontribusi pada pembangunan masyarakat. Kurikulum ini telah dikembangkan melalui riset mendalam dan masukan dari para ulama dan akademisi terkemuka:</p>
      <ul>
        <li><strong>Qur'an dan Hadis:</strong> Studi mendalam tentang Al-Qur'an, tafsir kontekstual, dan hadis Nabawi dengan pemahaman maudu'i (tematik)</li>
        <li><strong>Fiqh Dinamis:</strong> Pemahaman hukum Islam dengan berbagai madzhab dan aplikasinya dalam konteks modern</li>
        <li><strong>Akidah Rasional:</strong> Studi teologi Islam yang komprehensif dengan pendekatan rasional dan konteks kontemporer</li>
        <li><strong>Sirah Nabawi:</strong> Sejarah dan biografi Nabi Muhammad SAW dan para sahabat sebagai sumber inspirasi</li>
        <li><strong>Bahasa Arab Praktis:</strong> Penguasaan bahasa Arab sebagai pintu utama ilmu Islam dan komunikasi global</li>
        <li><strong>Akhlak dan Tasawuf:</strong> Pembentukan karakter dan spiritualitas yang menjadi inti pendidikan kami</li>
      </ul>

      <h3>Metode Pengajaran Interaktif dan Inovatif</h3>
      <p>Kami menerapkan berbagai metode pengajaran yang interaktif, engaging, dan telah terbukti efektif dalam pembelajaran agama Islam. Kombinasi metode tradisional dan modern ini dirancang untuk mengakomodasi berbagai gaya belajar santri dan meningkatkan pemahaman yang mendalam:</p>
      <ul>
        <li>Sorogan (pembelajaran individual dari guru untuk pemahaman mendalam)</li>
        <li>Bandongan (pembelajaran klasikal untuk penyampaian materi berskal besar)</li>
        <li>Diskusi kelompok dan debat ilmiah untuk mengasah kemampuan analisis</li>
        <li>Praktik ibadah langsung sebagai bagian integral pembelajaran</li>
        <li>Studi lapangan ke situs-situs bersejarah Islam dan museum untuk konteks historis</li>
        <li>Pembelajaran berbasis proyek untuk aplikasi praktis ilmu agama</li>
      </ul>

      <h3>Pembimbing Spiritual Profesional dan Berkomitmen</h3>
      <p>Setiap santri ditugaskan seorang pembimbing spiritual yang memonitor perkembangan spiritual dan akademik mereka secara holistik. Pembimbing ini adalah seorang pendidik yang terlatih khusus, berkomitmen penuh, dan siap memberikan konseling, motivasi, dan bimbingan praktis dalam menghadapi tantangan kehidupan pondok. Mereka juga menjadi perantara komunikasi antara santri dan keluarga mereka.</p>

      <h3>Hasil Nyata dan Dampak Jangka Panjang</h3>
      <p>Alumni program pondok pembelajaran agama kami tersebar di berbagai universitas terkemuka, lembaga agama internasional, dan bidang profesional lainnya di seluruh dunia. Mereka tidak hanya sukses secara akademik tetapi juga membawa nilai-nilai yang telah ditanamkan selama di HSI untuk terus berkontribusi kepada masyarakat dan bangsa. Banyak alumni kami yang menjadi pemimpin di bidang pendidikan, dakwah, dan pemberdayaan masyarakat.</p>

      <p>Program pondok pembelajaran agama ini adalah bukti konkret dari komitmen HSI Boarding School dalam menciptakan generasi Muslim yang tidak hanya cerdas secara intelektual tetapi juga kaya akan spiritualitas, akhlak mulia, dan siap menghadapi tantangan zaman dengan bijaksana.</p>
    `,
    coverUrl: '/assets/illustrations/illustration-dashboard.webp',
    category: 'artikel',
    tags: ['pendidikan-agama', 'kurikulum', 'santri', 'spiritualitas', 'karakter'],
    status: 'published',
    totalViews: 1890,
    totalComments: 32,
    author: AUTHORS.siti,
    publishedAt: new Date('2024-06-10'),
    createdAt: new Date('2024-06-05'),
  },

  {
    id: 'post-4',
    title: 'Pengumuman: Jadwal Ujian Semester Ganjil 2024/2025',
    slug: 'jadwal-ujian-semester-ganjil-2024-2025',
    excerpt:
      'Dengan ini kami umumkan jadwal ujian semester ganjil untuk tahun akademik 2024/2025. Seluruh santri diharapkan untuk mempersiapkan diri dengan baik dan mengikuti semua tata tertib ujian yang telah ditetapkan.',
    content: `
      <p>Assalamu'alaikum warahmatullahi wabarakatuh.</p>

      <p>Dengan ini kami sampaikan pengumuman penting mengenai jadwal Ujian Semester Ganjil untuk tahun akademik 2024/2025. Pengumuman ini berisi informasi lengkap tentang waktu pelaksanaan, tata tertib, dan persiapan yang perlu dilakukan oleh seluruh santri. Kami mohon seluruh santri dan wali kelas untuk memperhatikan pengumuman ini dengan seksama dan memastikan semua informasi tersampaikan dengan baik.</p>

      <h3>Waktu Pelaksanaan Ujian yang Jelas</h3>
      <p>Berikut adalah jadwal lengkap pelaksanaan ujian semester ganjil untuk tahun akademik 2024/2025 yang telah ditetapkan melalui pertemuan koordinasi dengan semua staf pengajar dan pimpinan sekolah:</p>
      <ul>
        <li><strong>Ujian Teori:</strong> 1-15 Desember 2024 (dilaksanakan di ruang kelas masing-masing)</li>
        <li><strong>Ujian Praktik:</strong> 16-22 Desember 2024 (dilaksanakan sesuai jadwal yang akan diumumkan kemudian)</li>
        <li><strong>Ujian Remedial (Perbaikan):</strong> 23-29 Desember 2024 (untuk santri yang belum mencapai nilai standar)</li>
      </ul>

      <h3>Tata Tertib Ujian yang Ketat dan Konsisten</h3>
      <p>Untuk menjamin kelancaran ujian dan menjaga integritas akademik, kami menetapkan tata tertib ujian yang ketat dan konsisten untuk semua peserta. Semua santri wajib mematuhi tata tertib berikut tanpa terkecuali:</p>
      <ul>
        <li>Peserta ujian harus hadir 15 menit sebelum waktu ujian dimulai di ruangan yang telah ditentukan</li>
        <li>Peserta dilarang keras membawa alat komunikasi apapun (handphone, smartwatch, airpods, atau perangkat lainnya)</li>
        <li>Penggunaan kalkulator hanya diperbolehkan untuk mata pelajaran Matematika dan Sains dengan izin pengawas</li>
        <li>Konsultasi dengan pengawas atau peserta lain dilarang keras dan akan mendapat sanksi</li>
        <li>Keterlambatan lebih dari 30 menit tidak diperbolehkan masuk ruangan ujian</li>
        <li>Peserta harus mengumpulkan lembar jawaban tepat pada waktu yang ditentukan</li>
      </ul>

      <h3>Persiapan Optimal untuk Santri</h3>
      <p>Menghadapi ujian semester yang ketat ini, kami mengimbau seluruh santri untuk melakukan persiapan yang optimal dengan strategi yang tepat:</p>
      <ul>
        <li>Memaksimalkan waktu belajar dengan membuat jadwal belajar yang teratur dan realistis</li>
        <li>Mengikuti semua sesi bimbingan belajar yang telah dijadwalkan oleh guru mata pelajaran</li>
        <li>Menjaga kesehatan fisik dan mental melalui olahraga, istirahat, dan nutrisi yang seimbang</li>
        <li>Tidur yang cukup setiap malam minimal 7-8 jam untuk memastikan otak tetap segar</li>
        <li>Menghindari perilaku yang dapat mengganggu konsentrasi belajar seperti bermain game berlebihan</li>
        <li>Membentuk kelompok belajar untuk diskusi dan saling mengajar sesama santri</li>
      </ul>

      <h3>Komunikasi dengan Orang Tua</h3>
      <p>Orangtua santri akan menerima informasi lebih detail tentang progress belajar melalui Aplikasi SIAKAD dan laporan berkala dari wali kelas. Untuk pertanyaan, kendala, atau permintaan bimbingan khusus, silakan menghubungi wali kelas masing-masing santri atau kantor akademik dengan membuat janji terlebih dahulu.</p>

      <p>Semoga semua santri dapat menjalani ujian ini dengan percaya diri dan mencapai hasil yang maksimal. Kami percaya bahwa dengan persiapan yang baik dan doa yang tulus, kesuksesan pasti akan diraih. Amin.</p>

      <p>Wassalamu'alaikum warahmatullahi wabarakatuh.</p>
    `,
    coverUrl: '/assets/illustrations/illustration-receipt.webp',
    category: 'pengumuman',
    tags: ['ujian', 'akademik', 'jadwal', 'semester'],
    status: 'published',
    totalViews: 3120,
    totalComments: 52,
    author: AUTHORS.hendra,
    publishedAt: new Date('2024-06-08'),
    createdAt: new Date('2024-06-03'),
  },

  {
    id: 'post-5',
    title: 'Kegiatan Bulanan: Hari Santri Nasional di HSI',
    slug: 'hari-santri-nasional-hsi',
    excerpt:
      'Santri HSI Boarding School merayakan Hari Santri Nasional dengan berbagai kegiatan seni budaya, pembicaraan inspiratif, dan kompetisi akademik yang meriah dan penuh makna.',
    content: `
      <p>Hari Santri Nasional yang dirayakan setiap tanggal 22 Oktober adalah momentum istimewa bagi HSI Boarding School untuk merayakan dan mengenang jasa-jasa para santri dalam membangun bangsa Indonesia. Perayaan tahun ini menghadirkan berbagai kegiatan menarik yang dirancang untuk mengingatkan santri tentang peran penting mereka dalam masyarakat.</p>

      <h3>Rangkaian Kegiatan Hari Santri yang Komprehensif</h3>
      <p>Tahun ini, HSI mengadakan serangkaian kegiatan menarik dan bermakna untuk memperingati Hari Santri Nasional. Setiap kegiatan dirancang dengan matang untuk memberikan pembelajaran dan pengalaman yang berkesan bagi seluruh santri kami. Berikut rangkaian kegiatan lengkapnya:</p>

      <h4>1. Upacara Bendera Khusus dan Pembicaraan Inspiratif</h4>
      <p>Pagi hari dimulai dengan upacara bendera yang khidmat dihadiri oleh seluruh santri, guru, dan staf. Dalam kesempatan yang istimewa ini, Kepala Sekolah memberikan pembicaraan inspiratif tentang peran santri dalam mengisi kemerdekaan dan membangun bangsa yang lebih baik. Beliau menekankan pentingnya kombinasi antara ilmu, iman, dan amal shaleh dalam menghadapi tantangan zaman modern.</p>

      <h4>2. Pameran Seni Budaya Lintas Generasi</h4>
      <p>Santri menampilkan karya seni dan budaya mereka dalam sebuah pameran yang meriah. Pameran ini mencakup berbagai medium dan ekspresi artistik yang menunjukkan kreativitas dan keterampilan santri di berbagai bidang:</p>
      <ul>
        <li>Pameran Seni Rupa (Lukisan, Kaligraf, Batik, dan Patung Islami)</li>
        <li>Pameran Fotografi (Dokumentasi Kegiatan Pondok dan Momen Bersejarah)</li>
        <li>Pameran Kriya (Kerajinan Tangan, Bordiran, dan Produk Lokal)</li>
        <li>Pameran Digital (Desain Grafis dan Karya Multimedia)</li>
      </ul>

      <h4>3. Pertunjukan Seni Panggung Spektakuler</h4>
      <p>Malam harinya diadakan pertunjukan seni panggung yang spektakuler dan meriah dengan menampilkan talenta-talenta terbaik dari santri HSI. Pertunjukan ini menghadirkan berbagai jenis seni tradisional dan modern yang menggabungkan nilai-nilai spiritual dengan ekspresi seni kontemporer:</p>
      <ul>
        <li>Qasidah Modern dan Tradisional dengan lirik yang mengena</li>
        <li>Drama Islami tentang Perjuangan Santri dan Nilai-nilai Kepatriotan</li>
        <li>Tari Tradisional Indonesia dari berbagai daerah</li>
        <li>Musikalisasi Puisi Islami yang Menyentuh Hati</li>
        <li>Pertunjukan Seni Bela Diri Tradisional</li>
      </ul>

      <h4>4. Kompetisi Akademik yang Menantang</h4>
      <p>Kompetisi akademik yang melibatkan seluruh santri dirancang untuk mengasah kemampuan intelektual dan merayakan pencapaian akademik mereka. Berbagai kategori kompetisi menawarkan kesempatan bagi santri dengan berbagai kemampuan dan minat untuk berkompetisi:</p>
      <ul>
        <li>Tilawatil Qur'an (Kompetisi Membaca Al-Qur'an dengan Tajweed Sempurna)</li>
        <li>Lomba Pidato 3 Bahasa (Indonesia, Arab, Inggris)</li>
        <li>Kompetisi Cerdas Cermat Agama Islam dan Sejarah</li>
        <li>Lomba Baca Puisi Islami dengan Penghayatan Mendalam</li>
        <li>Kompetisi Fotografi dengan Tema Keislaman</li>
      </ul>

      <h3>Semangat Persatuan dan Nilai-nilai Persaudaraan</h3>
      <p>Kegiatan Hari Santri Nasional ini mengingatkan kami semua tentang nilai-nilai fundamental yang harus dipegang teguh dalam perjalanan menjadi santri yang berkualitas dan bermakna bagi masyarakat. Perayaan ini memperkuat semangat persatuan dan gotong royong di antara seluruh santri, guru, dan staf HSI Boarding School.</p>

      <p>Melalui perayaan ini, kami berkomitmen untuk terus menghasilkan santri-santri yang tidak hanya cerdas secara akademik tetapi juga bijaksana dalam menggunakan ilmu mereka untuk kebaikan bersama dan pembangunan bangsa yang berkelanjutan.</p>
    `,
    coverUrl: '/assets/illustrations/illustration-rocket-small.webp',
    category: 'berita',
    tags: ['kegiatan', 'seni-budaya', 'santri', 'perayaan', 'komunitas'],
    status: 'published',
    totalViews: 1456,
    totalComments: 38,
    author: AUTHORS.ahmad,
    publishedAt: new Date('2024-06-05'),
    createdAt: new Date('2024-05-28'),
  },

  {
    id: 'post-6',
    title: 'Tips dan Trik: Bagaimana Menyeimbangkan Akademik dan Spiritual',
    slug: 'tips-seimbangkan-akademik-spiritual',
    excerpt:
      'Dalam artikel ini, kami berbagi tips praktis tentang bagaimana santri dapat menyeimbangkan antara tanggung jawab akademik dan pengembangan spiritual mereka dengan bijaksana.',
    content: `
      <p>Salah satu tantangan utama santri di boarding school adalah menyeimbangkan antara tuntutan akademik yang tinggi dengan komitmen spiritual yang mendalam. Artikel ini akan memberikan tips praktis yang telah terbukti efektif dan telah diimplementasikan oleh ribuan santri sukses kami. Keseimbangan ini bukan sesuatu yang mudah tetapi sangat mungkin dicapai dengan strategi yang tepat.</p>

      <h3>Pemahaman Filosofis tentang Keseimbangan Sejati</h3>
      <p>Keseimbangan bukan berarti membagi waktu sama rata, tetapi mengalokasikan waktu sesuai dengan prioritas dan kondisi yang dinamis. Dalam Islam, keseimbangan ini disebut dengan "Wasathiyyah" - jalan tengah yang bijaksana yang mengajarkan kita untuk tidak ekstrem dalam hal apapun. Memahami filosofi ini sebagai fondasi akan membantu santri dalam membuat keputusan yang tepat ketika dihadapkan dengan berbagai pilihan.</p>

      <h3>Strategi Manajemen Waktu yang Efektif dan Realistis</h3>

      <h4>1. Buat Jadwal yang Realistis dan Fleksibel</h4>
      <p>Buatlah jadwal harian yang realistis dan dapat disesuaikan dengan kondisi yang berubah. Jadwal yang baik harus mempertimbangkan secara serius dan proporsional waktu untuk berbagai aspek kehidupan santri. Jangan membuat jadwal yang terlalu ketat dan tidak mungkin dijalankan, karena akan menyebabkan frustrasi dan kegagalan. Sebaliknya, buat jadwal yang dapat diikuti dengan konsisten namun memiliki fleksibilitas untuk menyesuaikan dengan kondisi yang tidak terduga:</p>
      <ul>
        <li>Waktu kelas dan belajar akademik (belajar berkelanjutan)</li>
        <li>Waktu shalat lima waktu dan dzikir (fondasi spiritual)</li>
        <li>Waktu istirahat dan rekreasi (kesehatan fisik mental)</li>
        <li>Waktu untuk keluarga dan teman dekat (hubungan sosial)</li>
      </ul>

      <h4>2. Prioritaskan dengan Benar Berdasarkan Nilai</h4>
      <p>Ingatlah bahwa dalam Islam, kewajiban adalah prioritas tertinggi yang tidak boleh ditawar. Jangan pernah mengorbankan shalat lima waktu demi akademik, karena shalat adalah pondasi keimanan yang akan memberikan energi spiritual untuk aktivitas lainnya. Sebaliknya, gunakan ibadah sebagai pengisi energi spiritual yang akan meningkatkan produktivitas akademik secara signifikan dan membuat belajar menjadi lebih bermakna.</p>

      <h4>3. Teknik Pomodoro untuk Belajar Efisien</h4>
      <p>Gunakan teknik Pomodoro (belajar 25 menit dengan fokus penuh, istirahat 5 menit) untuk meningkatkan fokus dan mengurangi beban mental. Setelah menyelesaikan 4 siklus (sekitar 2 jam), istirahat lebih lama selama 15-30 menit untuk pemulihan. Teknik ini terbukti secara ilmiah meningkatkan produktivitas dan mengurangi kelelahan mental dalam jangka panjang.</p>

      <h3>Pengembangan Spiritual yang Konsisten dan Bermakna</h3>

      <h4>1. Awal Hari dengan Al-Qur'an dan Refleksi</h4>
      <p>Mulai hari dengan membaca dan merenungi Al-Qur'an minimal 10-15 menit sebelum aktivitas lain dimulai. Ini akan memberikan motivasi spiritual dan panduan nilai untuk seluruh hari. Pilih surah yang bermakna dan renungkan pelajaran yang bisa diterapkan dalam kehidupan sehari-hari santri sebagai seorang pelajar.</p>

      <h4>2. Dzikir dan Do'a Terstruktur</h4>
      <p>Luangkan waktu untuk dzikir pagi dan sore sebagai bentuk dekat diri kepada Allah yang konsisten. Jelang ujian atau menghadapi tantangan, perbanyak doa dan tawakkal dengan hati yang tulus. Doa bukan hanya meminta tetapi juga bentuk ketaatan dan pengakuan akan keterbatasan diri di hadapan Allah.</p>

      <h4>3. Istighfar dan Taubat Berkelanjutan</h4>
      <p>Setiap kali melakukan kesalahan atau merasa lemah, segera minta maaf kepada Allah melalui istighfar yang tulus. Istighfar adalah restarter spiritual yang ampuh dan membuka peluang untuk memperbaiki diri. Jangan biarkan kesalahan atau kegagalan membuat santri merasa hopeless, tetapi gunakan sebagai pembelajaran untuk menjadi lebih baik.</p>

      <h3>Integrasi Harmonis Akademik dan Spiritual</h3>

      <p>Yang terbaik adalah ketika akademik dan spiritual terintegrasi dengan harmonis, bukan terpisah-pisah. Pandekatan ini menciptakan sinergi yang kuat dan membuat keduanya saling mendukung:</p>
      <ul>
        <li>Pandang belajar sebagai bentuk ibadah (menuntut ilmu adalah bagian dari agama)</li>
        <li>Aplikasikan nilai-nilai spiritual dalam setiap tugas akademik dan interaksi sosial</li>
        <li>Gunakan ilmu yang dipelajari untuk memperdalam pemahaman agama dan menghargai kebesaran Allah</li>
        <li>Berbagi pengetahuan dengan teman sebagai bentuk berbagi berkah</li>
      </ul>

      <h3>Kesimpulan: Perjalanan Panjang Menuju Keseimbangan</h3>
      <p>Keseimbangan antara akademik dan spiritual bukanlah sesuatu yang didapat sekali untuk selamanya, tetapi sebuah perjalanan panjang yang terus dilatih dan diperkuat setiap hari. Dengan strategi yang tepat, konsistensi dalam implementasi, dan doa yang tulus, santri dapat mencapai kesuksesan di kedua bidang ini dan menjadi lulusan yang tidak hanya cerdas tetapi juga berakhlak mulia serta siap berkontribusi pada masyarakat dan bangsa.</p>
    `,
    coverUrl: '/assets/illustrations/illustration-integration.webp',
    category: 'artikel',
    tags: ['tips', 'manajemen-waktu', 'akademik', 'spiritual', 'motivasi'],
    status: 'published',
    totalViews: 2105,
    totalComments: 41,
    author: AUTHORS.fatimah,
    publishedAt: new Date('2024-06-02'),
    createdAt: new Date('2024-05-25'),
  },

  {
    id: 'post-7',
    title: 'Pengumuman: Pendaftaran Kegiatan Ekstrakurikuler 2024/2025',
    slug: 'pendaftaran-ekstrakurikuler-2024-2025',
    excerpt:
      'HSI Boarding School membuka pendaftaran untuk berbagai kegiatan ekstrakurikuler yang akan berlangsung pada tahun akademik 2024/2025. Santri didorong untuk mengembangkan bakat dan minat mereka.',
    content: `
      <p>Assalamu'alaikum warahmatullahi wabarakatuh.</p>

      <p>HSI Boarding School dengan senang hati mengumumkan pembukaan pendaftaran untuk kegiatan ekstrakurikuler tahun akademik 2024/2025. Kegiatan ini dirancang khusus untuk mengembangkan bakat, minat, dan potensi santri di luar jam pelajaran formal. Program ekstrakurikuler kami telah terbukti memberikan kontribusi signifikan terhadap pengembangan kepribadian dan keterampilan santri secara menyeluruh.</p>

      <h3>Tujuan Strategis Kegiatan Ekstrakurikuler</h3>
      <p>Setiap program ekstrakurikuler kami dirancang dengan tujuan-tujuan strategis yang jelas dan terukur untuk memberikan nilai tambah yang signifikan bagi perkembangan santri:</p>
      <ul>
        <li>Mengembangkan potensi dan bakat santri yang beragam dan unik</li>
        <li>Membangun kepercayaan diri dan keterampilan sosial melalui praktik langsung</li>
        <li>Menciptakan networking dan persahabatan yang kuat dengan peer di berbagai bidang</li>
        <li>Mempersiapkan santri untuk kompetisi tingkat regional, nasional, dan internasional</li>
        <li>Melatih leadership dan tanggung jawab melalui peran-peran dalam organisasi</li>
      </ul>

      <h3>Daftar Lengkap Kegiatan Ekstrakurikuler yang Tersedia</h3>

      <h4>A. Kegiatan Seni dan Kreativitas</h4>
      <ul>
        <li>Qasidah dan Tari (Seni Pertunjukan Islami dan Tradisional)</li>
        <li>Seni Rupa (Melukis, Kaligraf, Batik, Seramik)</li>
        <li>Teater dan Drama (Seni Drama dan Pertunjukan Panggung)</li>
        <li>Fotografi dan Videografi (Seni Visual Kontemporer)</li>
        <li>Musik Tradisional dan Modern (Gitar, Rebana, Keyboard)</li>
      </ul>

      <h4>B. Kegiatan Akademik dan Intelektual</h4>
      <ul>
        <li>Debat dan Pidato (Public Speaking dan Argumentation)</li>
        <li>English Club (Peningkatan Kemampuan Berbahasa Inggris)</li>
        <li>Arabic Club (Peningkatan Kemampuan Berbahasa Arab)</li>
        <li>Cerdas Cermat (Kompetisi Akademik Umum dan Khusus)</li>
        <li>Math Club (Pengembangan Kemampuan Matematika Tingkat Lanjut)</li>
      </ul>

      <h4>C. Kegiatan Olahraga dan Kebugaran</h4>
      <ul>
        <li>Futsal (Sepak Bola Dalam Ruangan)</li>
        <li>Badminton (Olahraga Raket)</li>
        <li>Basket (Bola Keranjang)</li>
        <li>Atletik (Lari, Lompat, Lempar)</li>
        <li>Pencak Silat (Seni Bela Diri Tradisional)</li>
      </ul>

      <h4>D. Kegiatan Pengembangan Diri dan Kepemimpinan</h4>
      <ul>
        <li>Kepramukaan (Scouting dan Outdoor Activities)</li>
        <li>Program Kerohanian (Deepening Islamic Knowledge and Practice)</li>
        <li>Kelas Kepemimpinan (Leadership Training dan Development)</li>
        <li>Workshop Soft Skills (Komunikasi, Presentasi, Problem Solving)</li>
      </ul>

      <h3>Tata Cara dan Timeline Pendaftaran</h3>
      <ul>
        <li><strong>Waktu Pendaftaran:</strong> 1-15 Juli 2024</li>
        <li><strong>Tempat Pendaftaran:</strong> Kantor Kesiswaan atau Online melalui Portal SIAKAD</li>
        <li><strong>Biaya Pendaftaran:</strong> Gratis (sudah termasuk dalam biaya sekolah)</li>
        <li><strong>Persyaratan Umum:</strong> Santri aktif dan memiliki nilai akademik minimal B di semester sebelumnya</li>
        <li><strong>Pengumuman Hasil:</strong> 20 Juli 2024</li>
        <li><strong>Persiapan dan Latihan:</strong> 21-30 Juli 2024</li>
        <li><strong>Kegiatan Resmi Dimulai:</strong> 1 Agustus 2024</li>
      </ul>

      <h3>Informasi Penting dan Ketentuan Umum</h3>
      <ul>
        <li>Setiap santri minimal mengikuti 1 kegiatan ekstrakurikuler dan maksimal mengikuti 3 kegiatan</li>
        <li>Kehadiran minimal 80% untuk tetap aktif dan mendapat sertifikat</li>
        <li>Sanksi untuk absen tanpa alasan yang jelas</li>
        <li>Kegiatan akan berlangsung 1-2 kali per minggu tergantung jenis kegiatan</li>
        <li>Performa dalam ekstrakurikuler akan berpengaruh dalam penilaian karakter dan rekomendasi</li>
      </ul>

      <h3>Kontak dan Informasi Lebih Lanjut</h3>
      <p>Untuk informasi lebih lengkap dan pertanyaan, silakan menghubungi kami melalui berbagai saluran komunikasi yang tersedia:</p>
      <ul>
        <li>Kantor Kesiswaan: Ext. 125</li>
        <li>Email: ekstrakurikuler@hsi.sch.id</li>
        <li>WhatsApp: 0812-3456-7890</li>
      </ul>

      <p>Kami menunggu partisipasi aktif dan antusias dari semua santri. Mari kita bersama-sama kembangkan potensi dan bakat kalian dalam suasana yang mendukung dan penuh kasih sayang.</p>

      <p>Wassalamu'alaikum warahmatullahi wabarakatuh.</p>
    `,
    coverUrl: '/assets/illustrations/illustration-rocket-large.webp',
    category: 'pengumuman',
    tags: ['ekstrakurikuler', 'kegiatan', 'pendaftaran', 'bakat', 'minat'],
    status: 'published',
    totalViews: 1678,
    totalComments: 35,
    author: AUTHORS.siti,
    publishedAt: new Date('2024-05-28'),
    createdAt: new Date('2024-05-20'),
  },

  {
    id: 'post-8',
    title: 'Berita: Kunjungan Pendidik dari Al-Azhar University Mesir',
    slug: 'kunjungan-pendidik-al-azhar-mesir',
    excerpt:
      'HSI Boarding School menerima kunjungan istimewa dari delegasi pendidik Al-Azhar University Mesir untuk berbagi pengalaman dan memperkuat kerjasama pendidikan Islam internasional.',
    content: `
      <p>Alhamdulillah, HSI Boarding School memiliki kehormatan yang luar biasa menerima kunjungan delegasi pendidik dari Al-Azhar University Mesir, salah satu institusi pendidikan Islam tertua dan paling prestisius di dunia. Kunjungan ini adalah bagian dari upaya strategis memperkuat jaringan pendidikan Islam internasional dan berbagi best practices dalam pengembangan pendidikan agama Islam kontemporer.</p>

      <h3>Profil dan Latar Belakang Delegasi</h3>
      <p>Delegasi yang terdiri dari 5 orang profesor dan peneliti berpengalaman dari berbagai fakultas Al-Azhar datang dengan tujuan yang jelas dan terstruktur. Mereka adalah akademisi senior yang memiliki pengalaman puluhan tahun di bidang pendidikan Islam dan telah berkontribusi signifikan dalam pengembangan kurikulum pendidikan Islam di berbagai negara. Tujuan kunjungan mereka antara lain:</p>
      <ul>
        <li>Mempelajari secara mendalam sistem pendidikan Islam di HSI Boarding School</li>
        <li>Berbagi pengalaman dan hasil riset pendidikan Islam terkini dari Al-Azhar</li>
        <li>Mendiskusikan peluang kolaborasi akademik jangka panjang yang saling menguntungkan</li>
        <li>Memperkuat hubungan antar institusi pendidikan Islam untuk kepentingan bersama</li>
      </ul>

      <h3>Program dan Kegiatan Kunjungan Bertiga Hari</h3>

      <h4>Hari Pertama: Orientasi Komprehensif dan Tur Fasilitas</h4>
      <p>Di hari pertama, delegasi diberikan orientasi lengkap tentang sejarah HSI, visi misi, dan perkembangan institusi dari awal hingga saat ini. Mereka juga mengunjungi secara langsung berbagai fasilitas akademik yang modern termasuk ruang kelas berstandar internasional, asrama santri yang nyaman, perpustakaan dengan koleksi lengkap, dan laboratorium sains yang canggih. Tur ini memberikan gambaran menyeluruh tentang komitmen HSI terhadap keunggulan pendidikan.</p>

      <h4>Hari Kedua: Seminar Panel dan Diskusi Ilmiah Intensif</h4>
      <p>Diadakan seminar panel dengan tema "Tren Pendidikan Islam Kontemporer: Tantangan dan Peluang" yang dihadiri oleh guru-guru terbaik, peneliti, dan santri berprestasi HSI. Profesor-profesor dari Al-Azhar berbagi insight berharga tentang berbagai topik relevan:</p>
      <ul>
        <li>Metodologi Pengajaran Tafsir dan Hadis dengan Pendekatan Modern dan Kontekstual</li>
        <li>Integrasi Teknologi Digital dalam Pendidikan Islam Tanpa Mengorbankan Nilai Tradisional</li>
        <li>Penelitian dan Riset Berkelanjutan di Bidang Pendidikan Agama Islam</li>
        <li>Pengembangan Kurikulum yang Relevan dengan Perkembangan Zaman Global</li>
      </ul>

      <h4>Hari Ketiga: Diskusi Strategis tentang Kerja Sama</h4>
      <p>Pertemuan khusus dengan pimpinan HSI untuk membahas kemungkinan kerja sama yang lebih dalam dan berkelanjutan dalam berbagai bentuk dan dimensi. Hasil diskusi ini sangat menjanjikan dan mencakup peluang kolaborasi yang sangat konkret:</p>
      <ul>
        <li>Program pertukaran guru dan peneliti untuk studi lanjut dan pengembangan profesional</li>
        <li>Pengembangan kurikulum bersama yang menggabungkan best practices dari kedua institusi</li>
        <li>Program beasiswa untuk santri berprestasi yang ingin melanjutkan studi ke Al-Azhar</li>
        <li>Publikasi penelitian bersama di jurnal internasional untuk berbagi pengetahuan</li>
        <li>Workshop dan training bersama untuk guru dan tenaga pendidik</li>
      </ul>

      <h3>Kesan dan Apresiasi Delegasi Al-Azhar</h3>
      <p>Profesor Mohamed El-Sayed, ketua delegasi, mengungkapkan kagumannya yang mendalam terhadap dedikasi dan komitmen HSI dalam menjaga standar pendidikan Islam yang tinggi sambil tetap relevan dengan perkembangan zaman. Beliau juga menyampaikan bahwa pengalaman dan pembelajaran dari kunjungan ke HSI memberikan inspirasi bagi Al-Azhar untuk terus berinovasi dan mengembangkan program-program pendidikan yang lebih responsif terhadap kebutuhan masyarakat Muslim global.</p>

      <h3>Harapan dan Rencana Tindak Lanjut</h3>
      <p>Kunjungan ini diharapkan menjadi awal dari kolaborasi yang lebih mendalam, berkelanjutan, dan saling menguntungkan antara HSI dan Al-Azhar. Kami optimis bahwa kerja sama ini akan membawa manfaat signifikan bagi pengembangan pendidikan Islam di kedua institusi dan secara lebih luas bagi umat Muslim di seluruh dunia. Tim dari kedua institusi telah membentuk panitia khusus untuk menindaklanjuti semua poin kesepakatan yang telah ditetapkan.</p>

      <h3>Ucapan Terima Kasih yang Tulus</h3>
      <p>Kami mengucapkan terima kasih yang sebesar-besarnya kepada delegasi Al-Azhar atas kesempatan istimewa ini dan kesediaannya berbagi pengalaman dan pengetahuan berharga. Semoga hubungan baik ini terus berkembang dan memperkuat menjadi kemitraan strategis yang membawa berkah bagi pendidikan Islam dan umat Muslim di seluruh dunia. Mudah-mudahan kolaborasi ini menjadi contoh bagaimana institusi pendidikan Islam dapat bekerja sama untuk mencapai tujuan bersama yang mulia.</p>
    `,
    coverUrl: '/assets/illustrations/illustration-dashboard.webp',
    category: 'berita',
    tags: ['kerjasama-internasional', 'al-azhar', 'pendidikan', 'islam', 'riset'],
    status: 'published',
    totalViews: 987,
    totalComments: 22,
    author: AUTHORS.imam,
    publishedAt: new Date('2024-05-25'),
    createdAt: new Date('2024-05-18'),
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get posts by category
 * @param {string} category - 'berita', 'artikel', 'pengumuman'
 * @returns {Array} Posts filtered by category
 */
export const _postsByCategory = (category) => {
  return POSTS.filter((post) => post.category === category);
};

/**
 * Get single post by slug
 * @param {string} slug - Post slug identifier
 * @returns {Object|null} Post object or null if not found
 */
export const _postBySlug = (slug) => {
  return POSTS.find((post) => post.slug === slug) || null;
};

/**
 * Get all published posts
 * @returns {Array} Published posts only
 */
export const _publishedPosts = () => {
  return POSTS.filter((post) => post.status === 'published');
};

/**
 * Get posts sorted by views (popular)
 * @returns {Array} Posts sorted by totalViews descending
 */
export const _popularPosts = () => {
  return [...POSTS].sort((a, b) => b.totalViews - a.totalViews);
};

/**
 * Get posts sorted by date (latest first)
 * @returns {Array} Posts sorted by publishedAt descending
 */
export const _latestPosts = () => {
  return [...POSTS].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

/**
 * Get posts by tag
 * @param {string} tag - Tag name
 * @returns {Array} Posts with specified tag
 */
export const _postsByTag = (tag) => {
  return POSTS.filter((post) => post.tags.includes(tag));
};
