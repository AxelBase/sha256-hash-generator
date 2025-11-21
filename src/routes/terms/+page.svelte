<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | AxelBase SHA-256 Hash Generator</title>
  <meta name="description" content="Terms of use for the free, open-source, client-side SHA-256 hashing tool by AxelBase." />
  <meta property="og:title" content="Terms & Conditions | AxelBase" />
  <meta property="og:description" content="Free to use, no warranty, no liability — open source the way it should be." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Last Updated: November 21, 2025</p>

    <p>By using <strong>AxelBase SHA-256 Hash Generator</strong> ("the Tool"), you agree to these Terms. If you do not agree, please do not use the Tool.</p>

    <h2>1. Nature of the Tool</h2>
    <p>The Tool is a <strong>free, open-source</strong>, client-side web application that computes SHA-256 hashes using your browser’s native Web Crypto API. It is provided "as is" for informational, educational, and personal use.</p>

    <h2>2. License</h2>
    <p>The source code is licensed under the <strong>MIT License</strong>. You are free to:</p>
    <ul>
      <li>Use the Tool online or offline</li>
      <li>Modify, fork, and redistribute the code</li>
      <li>Deploy your own instance</li>
    </ul>
    <p>No attribution is required, but always appreciated.</p>

    <h2>3. No Warranty</h2>
    <p>The Tool is provided <strong>without any warranty</strong>, express or implied. While we strive for accuracy, we do not guarantee:</p>
    <ul>
      <li>That the hashes produced are correct in every edge case (though they match official test vectors)</li>
      <li>That the Tool will be available 100% of the time</li>
      <li>Fitness for any particular purpose</li>
    </ul>

    <h2>4. Limitation of Liability</h2>
    <p>In no event shall AxelBase, its creators, or contributors be liable for any direct, indirect, incidental, special, or consequential damages arising from:</p>
    <ul>
      <li>Use or inability to use the Tool</li>
      <li>Incorrect hashes due to browser bugs</li>
      <li>Loss of data or privacy on your device</li>
    </ul>
    <p>You use the Tool at your own risk.</p>

    <h2>5. Prohibited Uses</h2>
    <p>You may not:</p>
    <ul>
      <li>Use the Tool for unlawful purposes</li>
      <li>Attempt to overload or attack the hosted version</li>
      <li>Remove or alter the open-source license</li>
    </ul>

    <h2>6. Changes to Terms</h2>
    <p>We may update these Terms at any time. Continued use after changes constitutes acceptance.</p>

    <h2>7. Governing Law</h2>
    <p>These Terms are governed by the laws of <strong>Planet Earth</strong> — specifically, the principles of open-source software and common sense.</p>

    <p class="italic-note">
      <strong>Thank you for using AxelBase.</strong><br>
      Keep hashing securely — and keep your data private.
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