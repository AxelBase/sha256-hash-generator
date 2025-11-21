<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | AxelBase SHA-256 Hash Generator</title>
  <meta name="description" content="AxelBase collects zero personal data. Everything runs 100% in your browser — no servers, no logs, no tracking." />
  <meta property="og:title" content="Privacy Policy | AxelBase SHA-256 Hash Generator" />
  <meta property="og:description" content="We don’t collect, store, or transmit any data. Ever. Full stop." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: November 21, 2025</p>

    <p>Welcome to <strong>AxelBase SHA-256 Hash Generator</strong> — a completely client-side, open-source web tool that computes SHA-256 hashes directly in your browser. We take your privacy extremely seriously. In fact, we take it so seriously that <strong>we collect no data at all</strong>.</p>

    <h2>1. Zero Data Collection — By Design</h2>
    <p>This tool runs <strong>100% in your browser</strong> using the native Web Crypto API. When you type text, upload a file, or click “Copy”, <em>everything happens locally on your device</em>. We do not:</p>
    <ul>
      <li>Collect, store, or transmit any input data</li>
      <li>Log IP addresses, browser fingerprints, or location data</li>
      <li>Use cookies, localStorage (beyond temporary session), or any tracking technology</li>
      <li>Load external analytics, ads, or third-party scripts</li>
    </ul>
    <p><strong>Nothing leaves your computer. Ever.</strong></p>

    <h2>2. How It Works Technically</h2>
    <p>All hashing is performed using <code>window.crypto.subtle.digest("SHA-256")</code> — the same hardened implementation used by banks and governments. After the initial page load, the tool works fully offline. You can even save the page as a PWA or download the source and run it from a USB stick.</p>

    <h2>3. No Third-Party Services</h2>
    <p>We do not use Google Analytics, Meta Pixel, Cloudflare Insights, Plausible, or any other analytics or advertising service. The only external resources are optional CDN-hosted fonts and icons (which do not track you).</p>

    <h2>4. File Uploads</h2>
    <p>When you upload a file, it is read using the File API and processed entirely in memory. The file never touches any server. Once you close or refresh the page, it is gone forever.</p>

    <h2>5. Children's Privacy</h2>
    <p>Our service is not directed to children under 13. Since no data is collected, we fully comply with COPPA and similar laws by default.</p>

    <h2>6. GDPR, CCPA, and Global Compliance</h2>
    <p>Because we collect zero personal data, we are compliant with GDPR, CCPA, LGPD, and all major privacy regulations without needing consent banners or data processing agreements.</p>

    <h2>7. Changes to This Policy</h2>
    <p>If we ever change our approach (highly unlikely), we will update this page and change the effective date above.</p>

    <h2>8. Contact</h2>
    <p>Questions? Open an issue on our <a href="https://github.com/axelbase/sha256-hash-generator" target="_blank" rel="noopener">GitHub repository</a>.</p>

    <p class="italic-note">
      <strong>Your privacy is not a feature — it’s the entire product.</strong><br>
      Thank you for trusting AxelBase.
    </p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
  .breadcrumbs { font-size: 0.95rem; color: #666; margin-bottom: 2rem; }
  .breadcrumbs a { color: var(--bs-primary); text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose h1 { font-size: 2.6rem; margin-bottom: 0.5rem; }
  .prose h2 { margin-top: 3rem; font-size: 1.8rem; color: var(--bs-primary); }
  .italic-note { text-align: center; font-style: italic; color: #555; margin-top: 4rem; font-size: 1.15rem; }
</style>