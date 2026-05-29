export const LANDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>emptywine — Bespoke Corporate Wine Gifting</title>
<meta name="description" content="Custom AI-designed wine labels for corporate gifting. Curated premium wine. Unforgettable first impressions." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0c0b09;
    --bg-card: #141210;
    --bg-elevated: #1c1916;
    --gold: #c9a84c;
    --gold-light: #e2ca7e;
    --gold-border: rgba(201,168,76,0.2);
    --gold-glow: rgba(201,168,76,0.06);
    --text: #f0ece0;
    --text-2: #a09880;
    --text-3: #5a5040;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ─── NAV ─────────────────────────────────────── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 72px;
    transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease;
    border-bottom: 1px solid transparent;
  }

  nav.scrolled {
    background: rgba(12,11,9,0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-color: var(--gold-border);
  }

  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.5rem;
    color: var(--gold);
    text-decoration: none;
    letter-spacing: 0.02em;
  }

  .nav-links {
    display: flex;
    gap: 36px;
    list-style: none;
  }

  .nav-links a {
    color: var(--text-2);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--text); }

  .nav-cta {
    display: inline-block;
    padding: 9px 22px;
    border: 1px solid var(--gold);
    color: var(--gold);
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: background 0.2s, color 0.2s;
  }

  .nav-cta:hover {
    background: var(--gold);
    color: var(--bg);
  }

  /* ─── HERO ────────────────────────────────────── */
  #hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 120px 24px 80px;
    position: relative;
    overflow: hidden;
  }

  .hero-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -58%);
    width: 700px;
    height: 700px;
    background: radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-badge {
    display: inline-block;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 28px;
    position: relative;
  }

  .hero-badge::before,
  .hero-badge::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 32px;
    height: 1px;
    background: var(--gold);
    opacity: 0.5;
  }

  .hero-badge::before { right: calc(100% + 12px); }
  .hero-badge::after  { left:  calc(100% + 12px); }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5.5vw, 4.25rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: var(--text);
    max-width: 780px;
    margin-bottom: 28px;
  }

  .hero-sub {
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    font-weight: 300;
    color: var(--text-2);
    max-width: 520px;
    line-height: 1.75;
    margin-bottom: 44px;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 56px;
  }

  .btn-primary {
    display: inline-block;
    padding: 14px 32px;
    background: var(--gold);
    color: var(--bg);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: background 0.2s, transform 0.15s;
  }

  .btn-primary:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
  }

  .btn-ghost {
    display: inline-block;
    padding: 14px 32px;
    border: 1px solid var(--gold-border);
    color: var(--text-2);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: border-color 0.2s, color 0.2s, transform 0.15s;
  }

  .btn-ghost:hover {
    border-color: var(--gold);
    color: var(--gold);
    transform: translateY(-1px);
  }

  .hero-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 280px;
  }

  .hero-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), transparent);
    opacity: 0.4;
  }

  .hero-divider-diamond {
    width: 5px;
    height: 5px;
    background: var(--gold);
    transform: rotate(45deg);
    opacity: 0.6;
  }

  /* ─── HERO TWO-COLUMN LAYOUT ─────────────────── */
  .hero-inner {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
    width: 100%;
    max-width: 1100px;
  }

  .hero-content {
    flex: 1;
    min-width: 0;
    text-align: left;
  }

  .hero-content h1 { max-width: 520px; }

  .hero-content .hero-badge::before,
  .hero-content .hero-badge::after { display: none; }

  .hero-content .hero-divider {
    width: 200px;
    justify-content: flex-start;
  }

  .hero-visual {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottle-wrap {
    position: relative;
    width: 260px;
    height: 420px;
  }

  .bottle-skeleton {
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: linear-gradient(110deg, #1a1815 30%, #2a2520 50%, #1a1815 70%);
    background-size: 200% 100%;
    animation: shimmerSkeleton 1.6s linear infinite;
  }

  @keyframes shimmerSkeleton {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .bottle-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.6s ease;
    filter: drop-shadow(0 24px 48px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(201,168,76,0.12));
    animation: bottleFloat 7s ease-in-out infinite;
  }

  .bottle-img.loaded {
    opacity: 1;
  }

  @keyframes bottleFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }

  @media (max-width: 900px) {
    .hero-inner { flex-direction: column; text-align: center; }
    .hero-content { text-align: center; }
    .hero-visual { order: -1; }
    .bottle-wrap { width: 180px; height: 290px; }
    .hero-content .hero-badge::before,
    .hero-content .hero-badge::after { display: block; }
    .hero-content .hero-divider { width: 280px; justify-content: center; }
  }

  /* ─── TRUST BAR ───────────────────────────────── */
  #trust {
    border-top: 1px solid rgba(90,80,64,0.25);
    border-bottom: 1px solid rgba(90,80,64,0.25);
    padding: 32px 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    flex-wrap: wrap;
  }

  .trust-label {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--text-3);
    text-transform: uppercase;
  }

  .trust-chips {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .trust-chip {
    padding: 5px 14px;
    border: 1px solid rgba(90,80,64,0.3);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: var(--text-3);
    text-transform: uppercase;
  }

  /* ─── SECTIONS ────────────────────────────────── */
  section {
    padding: 120px 48px;
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-label {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 16px;
    display: block;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.2;
    color: var(--text);
    margin-bottom: 16px;
  }

  .section-sub {
    font-size: 1rem;
    color: var(--text-2);
    font-weight: 300;
    max-width: 480px;
    line-height: 1.75;
    margin-bottom: 64px;
  }

  /* ─── FEATURES ────────────────────────────────── */
  #features {
    background: var(--bg-card);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2px;
    margin-top: 64px;
  }

  .feature-card {
    background: var(--bg-card);
    border: 1px solid var(--gold-border);
    padding: 48px 40px;
    position: relative;
    transition: border-color 0.3s, background 0.3s;
  }

  .feature-card:hover {
    border-color: rgba(201,168,76,0.45);
    background: var(--bg-elevated);
  }

  .feature-numeral {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 400;
    color: var(--gold);
    opacity: 0.18;
    line-height: 1;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }

  .feature-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 14px;
  }

  .feature-desc {
    font-size: 0.9375rem;
    color: var(--text-2);
    font-weight: 300;
    line-height: 1.7;
  }

  /* ─── PROCESS ─────────────────────────────────── */
  #process { background: var(--bg); }

  .steps {
    display: flex;
    align-items: flex-start;
    gap: 0;
    margin-top: 64px;
    position: relative;
  }

  .step {
    flex: 1;
    text-align: center;
    padding: 0 24px;
    position: relative;
  }

  .step::after {
    content: '';
    position: absolute;
    top: 22px;
    right: -50%;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, var(--gold), transparent);
    opacity: 0.25;
  }

  .step:last-child::after { display: none; }

  .step-circle {
    width: 44px;
    height: 44px;
    border: 1px solid var(--gold);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 28px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 0.05em;
    background: var(--bg);
    position: relative;
    z-index: 1;
  }

  .step-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 12px;
  }

  .step-desc {
    font-size: 0.9rem;
    color: var(--text-2);
    font-weight: 300;
    line-height: 1.7;
    max-width: 220px;
    margin: 0 auto;
  }

  /* ─── PRICING ─────────────────────────────────── */
  #pricing { background: var(--bg-card); }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 64px;
  }

  .pricing-card {
    background: var(--bg);
    border: 1px solid var(--gold-border);
    padding: 44px 36px;
    position: relative;
    transition: border-color 0.3s;
    display: flex;
    flex-direction: column;
  }

  .pricing-card.featured {
    background: var(--bg-elevated);
    border-color: var(--gold);
    transform: translateY(-4px);
  }

  .pricing-card.featured::before {
    content: 'Most Popular';
    position: absolute;
    top: -1px; left: 50%;
    transform: translateX(-50%);
    background: var(--gold);
    color: var(--bg);
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 4px 16px;
  }

  .pricing-tier {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .pricing-price {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 6px;
    line-height: 1.1;
  }

  .pricing-price-note {
    font-size: 0.8125rem;
    color: var(--text-3);
    margin-bottom: 32px;
    font-weight: 300;
  }

  .pricing-divider {
    height: 1px;
    background: var(--gold-border);
    margin-bottom: 28px;
  }

  .pricing-features {
    list-style: none;
    margin-bottom: 36px;
    flex: 1;
  }

  .pricing-features li {
    font-size: 0.9rem;
    color: var(--text-2);
    font-weight: 300;
    padding: 7px 0;
    border-bottom: 1px solid rgba(90,80,64,0.15);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pricing-features li::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    background: var(--gold);
    transform: rotate(45deg);
    flex-shrink: 0;
    opacity: 0.7;
  }

  .pricing-btn {
    display: block;
    text-align: center;
    padding: 13px 24px;
    border: 1px solid var(--gold);
    color: var(--gold);
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
    background: none;
    width: 100%;
    font-family: 'Inter', sans-serif;
  }

  .pricing-btn:hover,
  .pricing-card.featured .pricing-btn {
    background: var(--gold);
    color: var(--bg);
  }

  .pricing-card.featured .pricing-btn:hover {
    background: var(--gold-light);
    border-color: var(--gold-light);
  }

  /* ─── CONTACT ─────────────────────────────────── */
  #contact { background: var(--bg); }

  .contact-inner {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 80px;
    align-items: start;
  }

  .contact-aside h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 16px;
    margin-top: 40px;
  }

  .contact-aside h3:first-child { margin-top: 0; }

  .contact-aside p {
    font-size: 0.9rem;
    color: var(--text-2);
    font-weight: 300;
    line-height: 1.7;
  }

  .contact-aside a {
    color: var(--gold);
    text-decoration: none;
    font-size: 0.9rem;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .form-group label {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--text-3);
    text-transform: uppercase;
  }

  .form-group input,
  .form-group textarea {
    background: var(--bg-card);
    border: 1px solid var(--gold-border);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-size: 0.9375rem;
    font-weight: 300;
    padding: 13px 16px;
    outline: none;
    transition: border-color 0.2s;
    resize: vertical;
    -webkit-appearance: none;
    border-radius: 0;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--text-3);
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: rgba(201,168,76,0.5);
  }

  .form-group textarea {
    min-height: 120px;
  }

  .form-submit {
    display: inline-block;
    padding: 15px 40px;
    background: var(--gold);
    color: var(--bg);
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    align-self: flex-start;
    border-radius: 0;
    -webkit-appearance: none;
  }

  .form-submit:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
  }

  .form-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .form-success {
    display: none;
    padding: 20px 24px;
    border: 1px solid rgba(201,168,76,0.4);
    background: rgba(201,168,76,0.06);
    font-size: 0.9375rem;
    color: var(--gold-light);
    font-weight: 300;
    line-height: 1.6;
  }

  .form-success.visible { display: block; }

  /* ─── FOOTER ──────────────────────────────────── */
  footer {
    border-top: 1px solid var(--gold-border);
    padding: 44px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.25rem;
    color: var(--gold);
    text-decoration: none;
  }

  .footer-copy {
    font-size: 0.8rem;
    color: var(--text-3);
    font-weight: 400;
  }

  .footer-right {
    display: flex;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  .footer-right a {
    font-size: 0.8125rem;
    color: var(--text-3);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-right a:hover { color: var(--text-2); }

  .footer-email {
    color: var(--gold) !important;
    font-weight: 500;
  }

  /* ─── REVEAL ANIMATIONS ───────────────────────── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.75s ease, transform 0.75s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  /* ─── RESPONSIVE ──────────────────────────────── */
  @media (max-width: 900px) {
    nav { padding: 0 24px; }
    .nav-links { display: none; }
    section { padding: 80px 24px; }
    #trust { padding: 24px 24px; gap: 20px; flex-direction: column; }
    .steps { flex-direction: column; gap: 40px; }
    .step::after { display: none; }
    .contact-inner { grid-template-columns: 1fr; gap: 48px; }
    footer { padding: 36px 24px; flex-direction: column; align-items: flex-start; }
  }

  @media (max-width: 600px) {
    .form-row { grid-template-columns: 1fr; }
    .pricing-card.featured { transform: none; }
    .hero-badge::before, .hero-badge::after { display: none; }
  }
</style>
</head>
<body>

<!-- ─── NAV ───────────────────────────────────── -->
<nav id="nav">
  <a href="#hero" class="nav-logo">emptywine</a>
  <ul class="nav-links">
    <li><a href="#process">How It Works</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <a href="#contact" class="nav-cta">Get a Quote</a>
</nav>

<!-- ─── HERO ──────────────────────────────────── -->
<section id="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="hero-inner">
    <div class="hero-content">
      <span class="hero-badge">Bespoke Corporate Gifting</span>
      <h1>Turn Every Bottle Into a&nbsp;Brand Moment</h1>
      <p class="hero-sub">Custom AI-designed wine labels that carry your brand into every boardroom, celebration, and thank-you. Curated wine. Unforgettable first impression.</p>
      <div class="hero-actions">
        <a href="#pricing" class="btn-primary">See Pricing</a>
        <a href="#process" class="btn-ghost">How It Works</a>
      </div>
      <div class="hero-divider" aria-hidden="true">
        <div class="hero-divider-line"></div>
        <div class="hero-divider-diamond"></div>
        <div class="hero-divider-line"></div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="bottle-wrap">
        <div class="bottle-skeleton" id="bottle-skeleton"></div>
        <img id="hero-bottle" class="bottle-img" alt="emptywine custom label bottle" />
      </div>
    </div>
  </div>
</section>

<!-- ─── TRUST BAR ──────────────────────────────── -->
<div id="trust">
  <span class="trust-label">Trusted by forward-thinking companies across</span>
  <div class="trust-chips">
    <span class="trust-chip">Finance</span>
    <span class="trust-chip">Tech</span>
    <span class="trust-chip">Real Estate</span>
    <span class="trust-chip">Consulting</span>
    <span class="trust-chip">Luxury Retail</span>
  </div>
</div>

<!-- ─── FEATURES ──────────────────────────────── -->
<section id="features">
  <div class="container">
    <span class="section-label reveal">Distinction</span>
    <h2 class="section-title reveal reveal-delay-1">Why emptywine</h2>
    <div class="features-grid">

      <div class="feature-card reveal">
        <div class="feature-numeral">I</div>
        <h3 class="feature-title">AI-Designed Labels</h3>
        <p class="feature-desc">Every label is generated uniquely for your brand — no templates, no off-the-shelf designs. Your identity, expressed in every detail.</p>
      </div>

      <div class="feature-card reveal reveal-delay-1">
        <div class="feature-numeral">II</div>
        <h3 class="feature-title">Curated Premium Wine</h3>
        <p class="feature-desc">We source only from acclaimed estates. Your clients will notice the difference — because the best gifts begin with what's inside.</p>
      </div>

      <div class="feature-card reveal reveal-delay-2">
        <div class="feature-numeral">III</div>
        <h3 class="feature-title">White-Glove Delivery</h3>
        <p class="feature-desc">Individually wrapped, branded, and delivered on your schedule — nationwide. Every detail handled. Every impression earned.</p>
      </div>

    </div>
  </div>
</section>

<!-- ─── PROCESS ───────────────────────────────── -->
<section id="process">
  <div class="container">
    <span class="section-label reveal">How It Works</span>
    <h2 class="section-title reveal reveal-delay-1">The Process</h2>
    <div class="steps">

      <div class="step reveal">
        <div class="step-circle">01</div>
        <h3 class="step-title">Share Your Brand</h3>
        <p class="step-desc">Send us your logo, brand colors, and occasion. Takes two minutes.</p>
      </div>

      <div class="step reveal reveal-delay-1">
        <div class="step-circle">02</div>
        <h3 class="step-title">We Design Your Label</h3>
        <p class="step-desc">Our AI generates a bespoke label, refined by our team until it's perfect.</p>
      </div>

      <div class="step reveal reveal-delay-2">
        <div class="step-circle">03</div>
        <h3 class="step-title">Delivered to Impress</h3>
        <p class="step-desc">Premium bottles, custom labels, beautifully packaged and shipped.</p>
      </div>

    </div>
  </div>
</section>

<!-- ─── PRICING ───────────────────────────────── -->
<section id="pricing">
  <div class="container">
    <span class="section-label reveal">Investment</span>
    <h2 class="section-title reveal reveal-delay-1">Pricing</h2>
    <p class="section-sub reveal reveal-delay-2">All orders include label design, premium wine selection, and branded packaging.</p>
    <div class="pricing-grid">

      <div class="pricing-card reveal">
        <div class="pricing-tier">Starter</div>
        <div class="pricing-price">from $249</div>
        <div class="pricing-price-note">12 bottles minimum</div>
        <div class="pricing-divider"></div>
        <ul class="pricing-features">
          <li>12 bottles minimum</li>
          <li>1 label design</li>
          <li>Standard delivery</li>
          <li>Email support</li>
        </ul>
        <button class="pricing-btn" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Get Started</button>
      </div>

      <div class="pricing-card featured reveal reveal-delay-1">
        <div class="pricing-tier">Business</div>
        <div class="pricing-price">from $699</div>
        <div class="pricing-price-note">36 bottles minimum</div>
        <div class="pricing-divider"></div>
        <ul class="pricing-features">
          <li>36 bottles minimum</li>
          <li>3 label variations</li>
          <li>Priority delivery</li>
          <li>Dedicated contact</li>
        </ul>
        <button class="pricing-btn" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Get Started</button>
      </div>

      <div class="pricing-card reveal reveal-delay-2">
        <div class="pricing-tier">Enterprise</div>
        <div class="pricing-price">Custom</div>
        <div class="pricing-price-note">Contact us for pricing</div>
        <div class="pricing-divider"></div>
        <ul class="pricing-features">
          <li>Unlimited scale</li>
          <li>Full white-label</li>
          <li>Dedicated account manager</li>
          <li>Same-day rush available</li>
        </ul>
        <button class="pricing-btn" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Get Started</button>
      </div>

    </div>
  </div>
</section>

<!-- ─── CONTACT ───────────────────────────────── -->
<section id="contact">
  <div class="container">
    <div class="contact-inner">

      <div class="contact-aside reveal">
        <span class="section-label">Reach Out</span>
        <h2 class="section-title" style="margin-bottom:12px;">Start Your Order</h2>
        <p style="color:var(--text-2);font-weight:300;font-size:0.9375rem;line-height:1.75;margin-bottom:40px;">Tell us about your gifting needs and we'll get back within 24 hours.</p>

        <h3>Turnaround</h3>
        <p>Standard orders ship within 7–10 business days. Rush and enterprise orders available on request.</p>

        <h3>Questions?</h3>
        <p>Email us at <a href="mailto:hello@emptywine.com">hello@emptywine.com</a> and we'll respond same day.</p>
      </div>

      <div class="reveal reveal-delay-1">
        <form class="contact-form" id="contact-form" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Jane Smith" required />
            </div>
            <div class="form-group">
              <label for="company">Company</label>
              <input type="text" id="company" name="company" placeholder="Acme Corp" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="jane@acme.com" required />
            </div>
            <div class="form-group">
              <label for="phone">Phone <span style="color:var(--text-3);font-weight:400;">(optional)</span></label>
              <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          <div class="form-group">
            <label for="message">Occasion / Message</label>
            <textarea id="message" name="message" placeholder="Tell us about the occasion, quantity, timeline, or any other details..."></textarea>
          </div>
          <button type="submit" class="form-submit" id="form-submit-btn">Send Inquiry</button>
        </form>
        <div class="form-success" id="form-success">
          Thank you &mdash; we'll be in touch within 24 hours.
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ─── FOOTER ────────────────────────────────── -->
<footer>
  <div class="footer-left">
    <a href="#hero" class="footer-logo">emptywine</a>
    <span class="footer-copy">&copy; 2026 emptywine. All rights reserved.</span>
  </div>
  <div class="footer-right">
    <a href="#process">How It Works</a>
    <a href="#pricing">Pricing</a>
    <a href="#contact">Contact</a>
    <a href="mailto:hello@emptywine.com" class="footer-email">hello@emptywine.com</a>
  </div>
</footer>

<script>
  (function () {
    'use strict';

    // ── Hero bottle image ──────────────────────
    var bottleImg = document.getElementById('hero-bottle');
    var bottleSkeleton = document.getElementById('bottle-skeleton');
    if (bottleImg) {
      bottleImg.addEventListener('load', function () {
        bottleImg.classList.add('loaded');
        if (bottleSkeleton) bottleSkeleton.style.display = 'none';
      });
      bottleImg.src = '/api/hero-image';
    }

    // ── Nav scroll effect ──────────────────────
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });

    // ── Scroll reveal ──────────────────────────
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('visible');
      });
    }

    // ── Contact form ───────────────────────────
    var form = document.getElementById('contact-form');
    var submitBtn = document.getElementById('form-submit-btn');
    var successMsg = document.getElementById('form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      var data = {
        name: form.name.value,
        company: form.company.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value
      };

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          form.style.display = 'none';
          successMsg.classList.add('visible');
        } else {
          throw new Error('unexpected response');
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Inquiry';
        alert('Something went wrong. Please email us directly at hello@emptywine.com');
      });
    });
  })();
</script>

</body>
</html>`;
