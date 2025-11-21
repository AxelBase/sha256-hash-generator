<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    { href: '/blog/posts/post1', title: 'What is SHA-256 and Why It Matters', description: 'A beginner-friendly introduction to the SHA-256 algorithm and its critical role in modern cryptography.' },
    { href: '/blog/posts/post2', title: 'How Client-Side Hashing Protects Your Privacy', description: 'Why AxelBase never sends your data to a server — and how true client-side hashing works.' },
    { href: '/blog/posts/post3', title: 'Verifying File Integrity with SHA-256 Hashes', description: 'Step-by-step guide to checking if a downloaded file has been tampered with using hash verification.' },
    { href: '/blog/posts/post4', title: 'SHA-256 vs MD5 vs SHA-1: Which One Should You Use?', description: 'A clear comparison of hash algorithms and why SHA-256 is the gold standard in 2025.' },
    { href: '/blog/posts/post5', title: 'Common Use Cases for SHA-256 in Development', description: 'From password storage to blockchain, Git commits, and digital signatures — real-world applications.' },
    { href: '/blog/posts/post6', title: 'How to Use Base64URL Hashes in APIs and JWTs', description: 'Understanding when and why to use the Base64URL variant of SHA-256 in web tokens.' },
    { href: '/blog/posts/post7', title: 'Building Your Own Offline Hash Tool (Open Source)', description: 'Behind the scenes of AxelBase — and how you can fork and customize it on GitHub.' },
  ];
</script>

<svelte:head>
  <title>Blog • AxelBase SHA-256 Insights</title>
  <meta name="description" content="Learn about SHA-256, cryptographic hashing, privacy-first tools, and best practices from the team behind AxelBase." />
</svelte:head>

<div class="container py-5 blog-index">
  <header class="blog-header text-center mb-5">
    <h1 class="display-5 fw-bold mb-4">AxelBase Blog</h1>
    <p class="lead text-muted col-lg-8 mx-auto">
      Deep dives into cryptographic hashing, privacy tools, web security, and open-source development. 
      All brought to you by the creators of the <strong>100% client-side SHA-256 Hash Generator</strong>.
    </p>
    <p class="text-muted small mt-3">
      <a href="https://github.com/axelbase/sha256-hash-generator" target="_blank" rel="noopener noreferrer" class="text-decoration-none">
        View on GitHub → Open Source & Free Forever
      </a>
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card h-100 text-decoration-none border-0 shadow-sm hover-shadow-lg transition-all">
        <div class="card-body d-flex flex-column">
          <h3 class="post-title h5 fw-bold text-primary mb-3">{post.title}</h3>
          <p class="post-description text-muted flex-grow-1 small">{post.description}</p>
          <span class="read-more text-primary fw-semibold mt-3 d-inline-block">
            Read Article →
          </span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index { max-width: 1200px; margin: 0 auto; }
  .post-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: var(--bs-light);
  }
  .post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
  }
  .post-title { line-height: 1.4; }
  .read-more { 
    opacity: 0.8; 
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .post-card:hover .read-more {
    opacity: 1;
    transform: translateX(6px);
  }
  .transition-all { transition: all 0.3s ease; }
</style>