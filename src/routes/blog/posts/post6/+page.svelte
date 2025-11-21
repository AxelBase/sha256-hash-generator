<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Base64 vs Base64URL: When to Use Which in Hashes | AxelBase Blog</title>
  <meta name="description" content="Learn the difference between Base64 and Base64URL encoding — and why Base64URL is required for JWTs, URLs, and filenames." />
  <meta property="og:title" content="Base64 vs Base64URL: The Complete Guide for Developers" />
  <meta property="og:description" content="Why AxelBase gives you both — and when you must use Base64URL." />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Base64 vs Base64URL</p>
  </div>

  <article class="prose">
    <h1>Base64 vs Base64URL: When to Use Which in Hashes</h1>
    <p class="post-meta">Published: November 21, 2025</p>

    <p>When you generate a SHA-256 hash, you often need it in text form. That’s where Base64 and Base64URL come in — but they’re not interchangeable.</p>

    <h2>The Difference in One Table</h2>
    <table class="table table-bordered">
      <thead><tr><th>Format</th><th>Characters</th><th>URL-Safe?</th><th>Used In</th></tr></thead>
      <tbody>
        <tr><td>Base64</td><td>+ / =</td><td>No</td><td>Email, JSON, general storage</td></tr>
        <tr><td>Base64URL</td><td>- _ (no padding)</td><td>Yes</td><td>JWTs, URLs, filenames, APIs</td></tr>
      </tbody>
    </table>

    <h2>Why Base64URL Was Created</h2>
    <p>The characters <code>+</code>, <code>/</code>, and <code>=</code> break URLs and filenames. Base64URL replaces them with safe alternatives and often removes padding — perfect for web tokens.</p>

    <h2>Example</h2>
    <p>Same SHA-256 hash of "hello":</p>
    <ul>
      <li><strong>Base64</strong>: <code>aGVsbG8gd29ybGQ=</code></li>
      <li><strong>Base64URL</strong>: <code>aGVsbG8gd29ybGQ</code></li>
    </ul>

    <h2>When to Use Which</h2>
    <ul>
      <li>Use <strong>Base64URL</strong> in JWTs, URLs, cookies, filenames</li>
      <li>Use <strong>Base64</strong> in JSON, databases, email</li>
      <li>AxelBase gives you both — instantly</li>
    </ul>

    <h2>FAQ</h2>
    <details>
      <summary>Can I convert between them?</summary>
      <p>Yes: replace <code>+</code> → <code>-</code>, <code>/</code> → <code>_</code>, remove <code>=</code></p>
    </details>

    <p class="italic-note">One wrong character breaks your token. Always use Base64URL when in doubt.</p>
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