<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Open Source & Offline-First: The AxelBase Philosophy | AxelBase Blog</title>
  <meta name="description" content="Why AxelBase is 100% open source, works offline, and will never phone home — the principles behind our privacy-first tools." />
  <meta property="og:title" content="Why AxelBase Is Open Source and Offline-First" />
  <meta property="og:description" content="No servers. No tracking. No compromise. This is how privacy-first tools should be built." />
  <meta property="og:url" content="{base}/blog/posts/post7" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Philosophy</p>
  </div>

  <article class="prose">
    <h1>Open Source & Offline-First: The AxelBase Philosophy</h1>
    <p class="post-meta">Published: November 21, 2025</p>

    <p>In an age of data harvesting and cloud dependency, AxelBase takes a different path: <strong>radical transparency and total independence</strong>.</p>

    <h2>Our Core Principles</h2>
    <ul>
      <li><strong>100% Open Source</strong>: Full code on GitHub. Audit it. Fork it. Improve it.</li>
      <li><strong>Offline-First</strong>: Works without internet after first load. Save as PWA.</li>
      <li><strong>No Telemetry</strong>: Zero analytics, tracking, or phoning home.</li>
      <li><strong>No Build Steps</strong>: Pure HTML + JS. Runs anywhere.</li>
      <li><strong>No Accounts</strong>: No login. No limits. No data collection.</li>
    </ul>

    <h2>Why This Matters</h2>
    <p>When you hash a private key, password, or legal document, you shouldn’t have to trust a company. You should trust math — and code you can read.</p>

    <h2>You Own Your Tools</h2>
    <p>Download AxelBase once, save it locally, and use it forever — even if the site goes down. That’s true digital sovereignty.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can I host AxelBase myself?</summary>
      <p>Yes! Just clone the repo and deploy anywhere — even on a USB drive.</p>
    </details>
    <details>
      <summary>Will you ever add cloud sync?</summary>
      <p>Never. That would defeat the entire purpose.</p>
    </details>

    <p class="italic-note">The future of privacy isn’t in the cloud. It’s in your hands.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; margin: 0 auto; }
  .breadcrumbs { font-size: 0.95rem; color: #666; margin-bottom: 2rem; }
  .breadcrumbs a { color: var(--bs-primary); text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .post-meta { color: #888; border-bottom: 1px solid #eee; padding-bottom: 1rem; margin-bottom: 2rem; }
  .prose h1 { font-size: 2.6rem; margin-bottom: 0.5rem; }
  .prose h2 { margin-top: 3rem; font-size: 1.8rem; color: var(--bs-primary); }
  .prose ul { padding-left: 1.5rem; }
  .prose details { background: #f8f9fa; border-radius: 8px; padding: 1rem; margin: 1rem 0; }
  .prose details[open] { background: #e9f7ff; }
  .prose summary { cursor: pointer; font-weight: 600; color: var(--bs-primary); }
  .prose summary::before { content: "+ "; font-weight: bold; color: var(--bs-primary); }
  .prose details[open] summary::before { content: "− "; }
  .italic-note { text-align: center; font-style: italic; color: #666; margin-top: 4rem; font-size: 1.1rem; }
</style>