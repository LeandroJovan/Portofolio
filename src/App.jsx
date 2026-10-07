import React, { useEffect, useRef, useState } from 'react';
import {
  Download,
  Mail,
  GraduationCap,
  BarChart3,
  ExternalLink,
  Check,
  X,
  Layers,
  LineChart,
  BrainCircuit,
  Globe,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Circle,
  Database,
  BookOpen,
  Menu
} from 'lucide-react';

/* ===== INLINE SVG ICONS ===== */
const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

/* ===== DATA ===== */
/* ===== DATA PROYEK (pisah dari markup — tambah objek baru di sini untuk proyek berikutnya) ===== */
const projectsList = [
  {
    id: 'pangantrack',
    num: '01',
    title: 'PanganTrack',
    subtitle: 'Sistem Prediksi Harga Komoditas Pangan Indonesia',
    desc: 'Dashboard interaktif untuk memantau dan memproyeksikan harga 21 komoditas pangan pokok di 9 wilayah Indonesia (plus tingkat nasional) hingga 24 bulan ke depan, memakai recursive forecasting.',
    role: 'Machine Learning & Modeling (tim 3 orang, Kelompok 9)',
    techStack: ['LightGBM', 'Ridge Regression', 'Scikit-Learn', 'FastAPI', 'Chart.js', 'Vercel', 'Render'],
    highlights: [
      'Pemilihan model otomatis per komoditas: LightGBM (utama), Ridge Regression (komoditas volatil, cegah overfitting), Naive baseline sebagai pembanding.',
      'Prediksi hingga 24 bulan dengan grafik historis vs prediksi dan tabel perbandingan wilayah.',
      'Insight tren otomatis (naik/turun) untuk membantu antisipasi inflasi daerah.'
    ],
    liveUrl: 'https://pangan-track.vercel.app/',
    codeUrl: 'https://github.com/nicolausprima/PanganTrack',
    categories: ['Machine Learning', 'Forecasting', 'Web Dashboard'],
    // Ganti null di bawah dengan '/assets/pangantrack.webp' setelah screenshot dashboard tersedia
    image: null,
    imageAlt: 'Tampilan dashboard PanganTrack'
  }
];

/* Frasa bergantian untuk efek typing di hero (frasa pertama = utama) */
const HERO_TYPING_PHRASES = [
  'DATA ANALYST & BUSINESS INTELLIGENCE ENTHUSIAST',
  'EXPLORATORY DATA ANALYSIS & DASHBOARD',
  'DATA MODELING & RISET'
];

const skills = [
  { name: 'Python & Data Analysis', pct: 90, icon: <LineChart size={14} /> },
  { name: 'SQL & Database', pct: 88, icon: <Database size={14} /> },
  { name: 'Data Visualization', pct: 85, icon: <BarChart3 size={14} /> },
  { name: 'Machine Learning', pct: 80, icon: <BrainCircuit size={14} /> },
  { name: 'Research & Writing', pct: 82, icon: <BookOpen size={14} /> },
];

/* ===== COMPONENT ===== */
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ref untuk efek visual hero (parallax foto & gerak kursor bundaran)
  const heroRef = useRef(null);
  const photoWrapRef = useRef(null);
  const circleRef = useRef(null);
  // Ref container tagline: untuk mengunci 1 baris di desktop saat frasa panjang
  const roleRef = useRef(null);

  /* ===== EFEK TYPING TAGLINE HIJAU =====
     Ketik huruf demi huruf (~52ms/huruf, mulai 750ms setelah load),
     lalu loop: tahan 2 detik -> hapus mundur (~26ms) -> ketik frasa
     berikutnya. Teks asli tetap utuh di DOM (placeholder tersembunyi)
     untuk screen reader & SEO. Reduced-motion / error: tampil langsung. */
  const [typedText, setTypedText] = useState(HERO_TYPING_PHRASES[0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mqDesktop = window.matchMedia('(min-width: 561px)');
    let cancelled = false;
    let timer = 0;

    const syncLayout = (phrase) => {
      // Desktop: saat frasa terpanjang diketik, kecilkan font sedikit
      // agar tetap satu baris (lebar tidak pernah melebihi placeholder)
      roleRef.current?.classList.toggle(
        'is-long',
        mqDesktop.matches && phrase === HERO_TYPING_PHRASES[0]
      );
    };

    const type = (phrase, idx, done) => {
      if (cancelled) return;
      if (idx <= phrase.length) {
        setTypedText(phrase.slice(0, idx));
        timer = window.setTimeout(() => type(phrase, idx + 1, done), 52);
      } else {
        done();
      }
    };

    const erase = (phrase, idx, done) => {
      if (cancelled) return;
      if (idx >= 0) {
        setTypedText(phrase.slice(0, idx));
        timer = window.setTimeout(() => erase(phrase, idx - 1, done), 26);
      } else {
        done();
      }
    };

    const loop = (i) => {
      if (cancelled) return;
      const phrase = HERO_TYPING_PHRASES[i];
      syncLayout(phrase);
      type(phrase, 0, () => {
        // selesai mengetik -> tahan 2 detik -> hapus mundur -> frasa berikutnya
        timer = window.setTimeout(() => {
          erase(phrase, phrase.length, () => {
            timer = window.setTimeout(() => loop((i + 1) % HERO_TYPING_PHRASES.length), 350);
          });
        }, 2000);
      });
    };

    try {
      setTypedText(''); // mulai kosong tepat sebelum penjadwalan (render sama)
      roleRef.current?.classList.add('is-animating'); // aktifkan kursor berkedip
      timer = window.setTimeout(() => loop(0), 750);
    } catch (err) {
      setTypedText(HERO_TYPING_PHRASES[0]); // fallback: tampil lengkap
      roleRef.current?.classList.remove('is-animating');
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  /* ===== ANIMASI MASUK HERO =====
     Tunggu 2x requestAnimationFrame agar state awal (hidden) sempat
     ter-paint dulu, lalu tambahkan .is-loaded -> CSS transition berjalan.
     Lepas will-change via .anim-done setelah semua selesai. */
  useEffect(() => {
    let raf2 = 0;
    let doneTimer = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        document.body.classList.add('is-loaded');
        // Animasi hero terpanjang: delay 460ms + durasi 640ms ≈ 1100ms + buffer
        doneTimer = window.setTimeout(() => {
          document.body.classList.add('anim-done');
        }, 1250);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(doneTimer);
      document.body.classList.remove('is-loaded');
      document.body.classList.remove('anim-done');
    };
  }, []);

  /* ===== REVEAL SAAT SCROLL (semua section) =====
     Fade-up sekali via IntersectionObserver (threshold 0.15),
     unobserve setelah tampil. Fallback: tampilkan semua jika gagal. */
  useEffect(() => {
    const els = document.querySelectorAll('.io-reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('io-fallback'));
      return;
    }

    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('io-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -32px 0px' }
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    } catch (err) {
      // Jika terjadi error apapun, konten harus tetap terlihat
      els.forEach((el) => el.classList.add('io-fallback'));
    }
  }, []);

  /* ===== NAVBAR: blur + bayangan tipis setelah scroll > 10px ===== */
  useEffect(() => {
    const header = document.querySelector('.header');
    if (!header) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update(); // nilai awal (mis. setelah reload di tengah halaman)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ===== PARALLAX FOTO + GERAK KURSOR BUNDARAN (desktop saja) =====
     - Foto naik perlahan mengikuti scroll (maks ±28px), via rAF.
     - Bundaran mengikuti kursor maks 8px dengan lerp agar mulus.
     Keduanya dibatalkan di mobile / prefers-reduced-motion. */
  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 921px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let enabled = false;
    let rafId = 0;

    // state parallax
    let scrollTarget = 0;

    // state kursor (lerp)
    let mouseTX = 0, mouseTY = 0;
    let mouseCX = 0, mouseCY = 0;

    const heroEl = heroRef.current;
    const photoEl = photoWrapRef.current;
    const circleEl = circleRef.current;

    const resetOffsets = () => {
      if (photoEl) photoEl.style.setProperty('--py', '0px');
      if (circleEl) {
        circleEl.style.setProperty('--mx', '0px');
        circleEl.style.setProperty('--my', '0px');
      }
    };

    const computeScrollTarget = () => {
      if (!heroEl) return 0;
      const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
      // progress 0 -> 1 selama hero masih terlihat di layar
      const progress = Math.min(Math.max(window.scrollY / Math.max(heroBottom, 1), 0), 1);
      return -progress * 28; // naik maksimal 28px, lebih lambat dari scroll
    };

    const tick = () => {
      if (!enabled) return;
      // lerp kursor (factor 0.08 -> gerak sangat halus)
      mouseCX += (mouseTX - mouseCX) * 0.08;
      mouseCY += (mouseTY - mouseCY) * 0.08;

      if (circleEl) {
        circleEl.style.setProperty('--mx', `${mouseCX.toFixed(2)}px`);
        circleEl.style.setProperty('--my', `${mouseCY.toFixed(2)}px`);
      }
      if (photoEl) {
        photoEl.style.setProperty('--py', `${scrollTarget.toFixed(2)}px`);
      }
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      scrollTarget = computeScrollTarget();
    };

    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;   // -1 .. 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;  // -1 .. 1
      mouseTX = nx * 8;  // maksimal 8px
      mouseTY = ny * 8;
    };

    const start = () => {
      if (enabled) return;
      enabled = true;
      scrollTarget = computeScrollTarget();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!enabled) return;
      enabled = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      mouseTX = mouseTY = mouseCX = mouseCY = 0;
      resetOffsets();
    };

    const evaluate = () => {
      if (mqDesktop.matches && !mqMotion.matches) start();
      else stop();
    };

    evaluate();
    mqDesktop.addEventListener('change', evaluate);
    mqMotion.addEventListener('change', evaluate);
    window.addEventListener('resize', evaluate);

    return () => {
      stop();
      mqDesktop.removeEventListener('change', evaluate);
      mqMotion.removeEventListener('change', evaluate);
      window.removeEventListener('resize', evaluate);
    };
  }, []);

  /* ===== MASALAH 2: Scroll progress bar (0% -> 100% sesuai scroll) ===== */
  useEffect(() => {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    let ticking = false;
    const updateProgress = () => {
      ticking = false;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };

    // Passive listener + requestAnimationFrame agar tidak berat
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress(); // set nilai awal
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll); // hitung ulang saat resize
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* ===== BONUS: Highlight menu aktif sesuai section yang terlihat ===== */
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ===== BONUS: Animasi masuk (fade-up bertahap) untuk item "Tentang" ===== */
  useEffect(() => {
    const rows = document.querySelectorAll('.stat-row');
    if (!rows.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  /* BONUS spotlight: update CSS variable --x/--y mengikuti kursor di dalam item */
  const handleStatRowMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} berhasil disalin!`);
  };

  return (
    <div className="portfolio-app">
      <a href="#main-content" className="skip-link">Lewati ke konten utama</a>

      {/* ===== MASALAH 2: Scroll progress indicator (hijau, di atas navbar) ===== */}
      <div id="scroll-progress" aria-hidden="true"></div>

      {/* ===== HEADER ===== */}
      <header className="header" role="banner">
        <div className="container">
          {/* Layout grid 3 area: kiri (logo+tagline) | tengah (menu) | kanan (CV) */}
          <nav className="nav" aria-label="Navigasi utama">
            {/* Kiri: logo + tagline kecil di bawahnya */}
            <a href="#home" className="logo nav-logo-group" aria-label="Kembali ke beranda">
              <span>
                <span className="nav-logo-mono">Portfolio</span>
                Leandro<span className="logo-dot">.</span>
              </span>
              <span className="nav-tagline">Data Analyst &amp; BI</span>
            </a>

            {/* Tengah: menu navigasi */}
            <ul className="nav-links" role="menubar">
              {[['home','Home'],['about','Tentang'],['skills','Keahlian'],['projects','Proyek'],['contact','Kontak']].map(([id, label]) => (
                <li key={id} role="none">
                  <a
                    href={`#${id}`}
                    className={`nav-link ${activeSection === id ? 'active' : ''}`}
                    role="menuitem"
                    aria-current={activeSection === id ? 'page' : undefined}
                  >{label}</a>
                </li>
              ))}
            </ul>

            {/* Kanan: tombol Unduh CV + hamburger (mobile) */}
            <div className="nav-actions">
              <a
                href="/CV ATS.pdf"
                download="CV_Leandro_Jovan_Falviano.pdf"
                className="btn-nav-cv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={14} />
                <span>Unduh CV</span>
              </a>
              <button
                type="button"
                className="nav-toggle"
                aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Menu dropdown mobile */}
        <div id="mobile-nav" className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul role="menu">
            {[['home','Home'],['about','Tentang'],['skills','Keahlian'],['projects','Proyek'],['contact','Kontak']].map(([id, label]) => (
              <li key={id} role="none">
                <a
                  href={`#${id}`}
                  className={`mobile-nav-link ${activeSection === id ? 'active' : ''}`}
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >{label}</a>
              </li>
            ))}
            {/* Tombol Unduh CV masuk ke panel agar tap target besar di HP */}
            <li role="none" className="mobile-nav-cv">
              <a
                href="/CV ATS.pdf"
                download="CV_Leandro_Jovan_Falviano.pdf"
                className="mobile-nav-link mobile-nav-cv-link"
                role="menuitem"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download size={16} />
                Unduh CV
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main id="main-content">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section" id="home" aria-labelledby="hero-heading" ref={heroRef}>
        <h1 id="hero-heading" className="visually-hidden">Leandro Jovan Falviano - Data Analyst &amp; Business Intelligence</h1>

        <div className="hero-inner">
          {/* Kolom teks: nama besar, tagline, CTA */}
          <div className="hero-text">
            <div className="hero-name" aria-hidden="true">
              {/* Tiap baris dibungkus mask overflow:hidden -> efek reveal dari bawah */}
              <span className="hero-name-mask">
                <span className="hero-name-line" style={{ '--line-i': 0 }}>LEANDRO</span>
              </span>
              <span className="hero-name-mask">
                <span className="hero-name-line" style={{ '--line-i': 1 }}>JOVAN</span>
              </span>
            </div>

            <div className="hero-meta">
              <div className="hero-role" ref={roleRef}>
                {/* Placeholder tersembunyi: mengunci ukuran container (CLS 0)
                    sekaligus teks lengkap untuk screen reader & SEO */}
                <span className="hero-role-size">{HERO_TYPING_PHRASES[0]}</span>
                <span className="hero-role-live" aria-hidden="true">
                  <span id="hero-typing">{typedText}</span>
                  <span className="hero-typing-cursor"></span>
                </span>
              </div>
              <p className="hero-tagline">
                Mengubah data menjadi wawasan strategis yang mudah dipahami.
                Spesialisasi pada EDA, dashboard interaktif, dan pemodelan analitik.
              </p>
              <div className="hero-accent-line" aria-hidden="true"></div>
              <div className="hero-cta-group">
                <a
                  href="/CV ATS.pdf"
                  download="CV_Leandro_Jovan_Falviano.pdf"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={16} />
                  Unduh CV
                </a>
                <div className="hero-socials">
                  <button
                    className="social-icon-btn"
                    title="Email"
                    onClick={() => copyToClipboard('leandrojovan12@gmail.com', 'Email')}
                  >
                    <Mail size={16} />
                  </button>
                  <a href="https://wa.me/6282245952967" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="WhatsApp">
                    <WhatsAppIcon size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/leandro-jovan-97a797392/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                    <LinkedinIcon size={16} />
                  </a>
                  <a href="https://instagram.com/leandrojv_" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Instagram">
                    <InstagramIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom foto: wrapper relative membungkus lingkaran + foto */}
          <div className="hero-photo-stage" aria-hidden="true">
            <div className="hero-photo-frame">
              <div className="hero-photo-circle" ref={circleRef}></div>
              <picture className="hero-photo-wrap" ref={photoWrapRef}>
                <source
                  type="image/webp"
                  srcSet="/JopanHalf-1x.webp 1x, /JopanHalf-2x.webp 2x"
                />
                <img
                  src="/JopanHalf-1x.webp"
                  srcSet="/JopanHalf-1x.webp 1x, /JopanHalf-2x.webp 2x"
                  width="760"
                  height="868"
                  alt=""
                  className="hero-photo-img"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="about-section" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-grid">
            {/* Left sticky column */}
            <div className="about-left">
              <div className="io-reveal" style={{ '--d': '0ms' }}>
                <div className="section-eyebrow">01 — Tentang Saya</div>
                <h2 id="about-heading" className="section-title">Profil &amp;<br />Latar Belakang</h2>
                <div className="about-rule"></div>
              </div>
              <div className="io-reveal" style={{ '--d': '90ms' }}>
                <p className="about-desc">
                  Halo! Saya <strong>Leandro Jovan Falviano</strong> (Jovan), mahasiswa{' '}
                  <strong>Sains Data Terapan di PENS Surabaya</strong>. Saya tertarik pada{' '}
                  <strong>Data Analytics</strong>: mengolah data, menemukan pola tersembunyi, dan
                  merancang visualisasi yang bermakna bagi para pengambil keputusan.
                </p>
              </div>
              <div className="io-reveal" style={{ '--d': '170ms' }}>
                <a
                  href="/CV ATS.pdf"
                  download="CV_Leandro_Jovan_Falviano.pdf"
                  className="btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={15} />
                  Unduh CV (ATS PDF)
                </a>
              </div>
            </div>

            {/* Right stats column */}
            <div className="about-stats">
              <div className="stat-row" tabIndex={0} onMouseMove={handleStatRowMouseMove} style={{ '--row-i': 0 }}>
                <div className="stat-row-icon"><GraduationCap size={20} /></div>
                <div className="stat-row-content">
                  <h4>PENS Surabaya</h4>
                  <p>Mahasiswa Sains Data Terapan — D4</p>
                </div>
              </div>
              <div className="stat-row" tabIndex={0} onMouseMove={handleStatRowMouseMove} style={{ '--row-i': 1 }}>
                <div className="stat-row-icon"><BarChart3 size={20} /></div>
                <div className="stat-row-content">
                  <h4>Data Analytics</h4>
                  <p>Pengolahan Data, Exploratory Data Analysis, Dashboard & KPI Metrics</p>
                </div>
              </div>
              <div className="stat-row" tabIndex={0} onMouseMove={handleStatRowMouseMove} style={{ '--row-i': 2 }}>
                <div className="stat-row-icon"><BrainCircuit size={20} /></div>
                <div className="stat-row-content">
                  <h4>Data Modeling & Riset</h4>
                  <p>Segmentasi Data, Evaluasi Model & Publikasi Ilmiah</p>
                </div>
              </div>
              <div className="stat-row" tabIndex={0} onMouseMove={handleStatRowMouseMove} style={{ '--row-i': 3 }}>
                <div className="stat-row-icon"><Layers size={20} /></div>
                <div className="stat-row-content">
                  <h4>Big Data & Pipeline</h4>
                  <p>Apache Spark, Hive SQL, Docker — Otomasi pemrosesan data skala besar</p>
                </div>
              </div>
              <div className="stat-row" tabIndex={0} onMouseMove={handleStatRowMouseMove} style={{ '--row-i': 4 }}>
                <div className="stat-row-icon"><Globe size={20} /></div>
                <div className="stat-row-content">
                  <h4>Web-Based Dashboard</h4>
                  <p>Membangun dashboard interaktif berbasis web untuk bisnis & kebijakan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="skills-layout">
            {/* Left: progress bars */}
            <div>
              <div className="skills-col-header io-reveal" style={{ '--d': '0ms' }}>
                <div className="section-eyebrow">02 — Keahlian &amp; Tools</div>
                <h2 className="section-title">Skills &amp;<br />Toolkit</h2>
              </div>
              <div className="skill-list">
                {skills.map((s, i) => (
                  <div className="skill-item io-reveal" key={s.name} style={{ '--d': `${i * 80}ms` }}>
                    <div className="skill-row">
                      <div className="skill-icon-name">
                        {s.icon}
                        {s.name}
                      </div>
                      <span className="skill-percent">{s.pct}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${s.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: impact stats + quote */}
            <div>
              <div className="skills-col-header io-reveal" style={{ '--d': '0ms' }}>
                <div className="section-eyebrow">Impact &amp; Experience</div>
                <h3 className="section-title">Pengalaman &amp;<br />Dampak</h3>
              </div>

              <div className="impact-stats io-reveal" style={{ '--d': '90ms' }}>
                <div className="impact-stat">
                  <div className="impact-number">4+</div>
                  <div className="impact-label">Proyek<br />Selesai</div>
                </div>
                <div className="impact-stat">
                  <div className="impact-number">2+</div>
                  <div className="impact-label">Tahun<br />Belajar</div>
                </div>
                <div className="impact-stat">
                  <div className="impact-number">1</div>
                  <div className="impact-label">Jurnal<br />Ilmiah</div>
                </div>
              </div>

              <div className="impact-quote-card io-reveal" style={{ '--d': '170ms' }}>
                <span className="impact-quote-mark">"</span>
                <p className="impact-quote-text">
                  In God we trust. All others must bring data.
                </p>
                <div className="impact-quote-author">W. Edwards Deming</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="projects-section" aria-labelledby="projects-heading">
        <div className="container">
          {/* Header — konsisten dgn section Tentang (label bernomor + judul besar + garis hijau) */}
          <div className="projects-header io-reveal" style={{ '--d': '0ms' }}>
            <div className="section-eyebrow">03 — Proyek</div>
            <h2 id="projects-heading" className="section-title">Proyek Pilihan</h2>
            <div className="projects-rule" aria-hidden="true"></div>
            <p className="section-body" style={{ marginTop: 14, maxWidth: 520 }}>
              Kumpulan proyek data & machine learning yang saya bangun — dari riset hingga dashboard interaktif yang siap dipakai.
            </p>
          </div>

          {/* Grid kartu — tambah objek di projectsList untuk menampilkan kartu berikutnya */}
          <div className="projects-grid">
            {projectsList.map((p, i) => (
              <a
                className="project-card io-reveal"
                style={{ '--d': `${120 + i * 80}ms` }}
                key={p.id}
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka ${p.title} (live demo)`}
              >
                {/* Kiri: pratinjau */}
                <div className="project-media">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      loading="lazy"
                      decoding="async"
                      width="1600"
                      height="1000"
                    />
                  ) : (
                    /* Placeholder — ganti image di data dengan '/assets/pangantrack.webp' */
                    <div className="project-media-placeholder" role="img" aria-label={p.imageAlt}>
                      <LineChart size={44} strokeWidth={1.25} aria-hidden="true" />
                      <span className="project-media-placeholder-title">{p.title}</span>
                      <span className="project-media-placeholder-sub">{p.subtitle}</span>
                    </div>
                  )}
                </div>

                {/* Kanan: detail */}
                <div className="project-body">
                  <div className="project-body-top">
                    <span className="project-num" aria-hidden="true">{p.num}</span>
                    <div className="project-categories">
                      {p.categories.map((c, k) => (
                        <span className="project-category" key={k}>{c}</span>
                      ))}
                    </div>
                  </div>

                  <h3 className="project-card-title">{p.title}</h3>
                  <p className="project-subtitle">{p.subtitle}</p>
                  <p className="project-card-desc">{p.desc}</p>

                  <div className="project-role">
                    <span className="project-role-label">Peran saya</span>
                    <span className="project-role-value">{p.role}</span>
                  </div>

                  <div className="project-chips">
                    {p.techStack.map((t, k) => (
                      <span className="project-chip" key={k}>{t}</span>
                    ))}
                  </div>

                  <ul className="project-highlights">
                    {p.highlights.map((h, k) => (
                      <li key={k}>
                        <span className="project-hl-num" aria-hidden="true">{String(k + 1).padStart(2, '0')}</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="project-actions">
                    <span className="project-cta-live">
                      Lihat Live Demo
                      <ExternalLink size={14} aria-hidden="true" />
                    </span>
                    <a
                      className="project-cta-code"
                      href={p.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buka kode sumber ${p.title} di GitHub`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubIcon size={14} />
                      Kode
                    </a>
                  </div>
                </div>

                {/* Garis hijau bawah yang memanjang saat hover */}
                <span className="project-card-line" aria-hidden="true"></span>
                {/* Ikon panah pojok */}
                <span className="project-corner" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <div className="container">
          <div className="contact-layout">
            {/* Left: big heading */}
            <div className="contact-col io-reveal" style={{ '--d': '0ms' }}>
              <div className="section-eyebrow">04 — Kontak</div>
              <h2 id="contact-heading" className="contact-title-big">LET'S<br />CONNECT</h2>
              <div className="contact-rule"></div>
              <p className="contact-availability">
                Terbuka untuk kesempatan Data Analytics, Business Intelligence, dashboard interaktif, riset akademis, atau diskusi seputar data.
              </p>
            </div>

            {/* Middle: contact list */}
            <div className="contact-col">
              <div className="contact-items">
                <div
                  className="contact-item io-reveal"
                  style={{ '--d': '0ms' }}
                  onClick={() => copyToClipboard('leandrojovan12@gmail.com', 'Email')}
                >
                  <div className="contact-item-icon"><Mail size={16} /></div>
                  <div>
                    <div className="contact-item-type">Email</div>
                    <div className="contact-item-label">leandrojovan12@gmail.com</div>
                  </div>
                </div>

                <a href="https://www.linkedin.com/in/leandro-jovan-97a797392/" target="_blank" rel="noopener noreferrer" className="contact-item io-reveal" style={{ '--d': '80ms' }}>
                  <div className="contact-item-icon"><LinkedinIcon size={16} /></div>
                  <div>
                    <div className="contact-item-type">LinkedIn</div>
                    <div className="contact-item-label">Leandro Jovan Falviano</div>
                  </div>
                </a>

                <a href="https://instagram.com/leandrojv_" target="_blank" rel="noopener noreferrer" className="contact-item io-reveal" style={{ '--d': '160ms' }}>
                  <div className="contact-item-icon"><Globe size={16} /></div>
                  <div>
                    <div className="contact-item-type">Instagram</div>
                    <div className="contact-item-label">@leandrojv_</div>
                  </div>
                </a>

                <div className="contact-item io-reveal" style={{ '--d': '240ms' }}>
                  <div className="contact-item-icon"><MapPin size={16} /></div>
                  <div>
                    <div className="contact-item-type">Lokasi</div>
                    <div className="contact-item-label">Surabaya, Jawa Timur, Indonesia</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA box */}
            <div className="contact-col io-reveal" style={{ '--d': '120ms' }}>
              <a
                href="/CV ATS.pdf"
                download="CV_Leandro_Jovan_Falviano.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cta-box"
              >
                <p className="contact-cta-text">LET'S BUILD SOMETHING GREAT TOGETHER</p>
                <div className="contact-cta-arrow">
                  <ArrowRight size={18} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOAST ===== */}
      {toastMessage && (
        <div className="copy-toast" role="status" aria-live="polite">
          <Check size={16} aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}

      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-content">
            <span>© 2026 Leandro Jovan Falviano — Applied Data Science @ PENS</span>
            <span>PORTFOLIO · 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
