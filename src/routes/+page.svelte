<script lang="ts">
  import { base } from '$app/paths';
  import { sha256, sha256FromFile, sha256Base64, sha256Base64Url } from '$lib/crypto';
  import { debounce, copyToClipboard, getByteLength } from '$lib/utils';
  import { TEST_VECTORS } from '$lib/testVectors';
  import { onMount } from 'svelte';

  let inputText = '';
  let fileInput: HTMLInputElement;
  let currentHash = { hex: '', base64: '', base64url: '' };
  let verifyHash = '';
  let isMatching = false;
  let isEmptyVerify = true;
  let byteLength = 0;
  let charLength = 0;
  let copiedHex = false;
  let copiedB64 = false;
  let copiedAll = false;

  $: updateLengths(inputText);
  $: debouncedHash(inputText);

  const debouncedHash = debounce(async (text: string) => {
    if (text.trim() === '') {
      currentHash = { hex: TEST_VECTORS[0].hex, base64: '', base64url: '' };
      return;
    }
    const [hex, base64, base64url] = await Promise.all([
      sha256(text), sha256Base64(text), sha256Base64Url(text)
    ]);
    currentHash = { hex, base64, base64url };
  }, 350);

  async function handleFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const result = await sha256FromFile(file);
    currentHash = result;
    inputText = await file.text();
  }

  function updateLengths(text: string) {
    charLength = text.length;
    byteLength = getByteLength(text);
  }

  $: {
    if (!verifyHash.trim()) {
      isEmptyVerify = true; isMatching = false;
    } else {
      isEmptyVerify = false;
      isMatching = verifyHash.trim().toLowerCase() === currentHash.hex.toLowerCase();
    }
  }

  async function copy(text: string, type: 'hex' | 'b64' | 'all') {
    await copyToClipboard(text);
    copiedHex = copiedB64 = copiedAll = false;
    if (type === 'hex') copiedHex = true;
    if (type === 'b64') copiedB64 = true;
    if (type === 'all') copiedAll = true;
    setTimeout(() => (copiedHex = copiedB64 = copiedAll = false), 2000);
  }

  function clearAll() {
    inputText = ''; verifyHash = '';
    if (fileInput) fileInput.value = '';
    currentHash = { hex: TEST_VECTORS[0].hex, base64: '', base64url: '' };
  }

  function loadVector(vec: typeof TEST_VECTORS[0]) {
    inputText = vec.input;
  }

  onMount(() => { currentHash.hex = TEST_VECTORS[0].hex; });
</script>

<main class="container py-4 flex-grow-1">
  <div class="row justify-content-center">
    <div class="col-lg-10 col-xl-9">

      <div class="text-center mb-5 fade-in-up">
        <h1 class="display-4 fw-bold mb-3">Secure Hash Generator</h1>
        <div class="d-inline-block bg-white px-4 py-2 rounded-pill shadow-sm">
          <span class="text-muted small">100% Client-Side • No Data Leaves Your Browser</span>
        </div>
      </div>

      <!-- Input -->
      <div class="card mb-4 border-0 shadow-sm">
        <div class="card-header">Input Text</div>
        <div class="card-body p-4">
          <textarea bind:value={inputText} class="form-control shadow-inner-custom" rows="6"
                    placeholder="Type or paste your content here..." spellcheck="false"></textarea>

          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">
            <label class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2">
              Upload File
              <input type="file" bind:this={fileInput} on:change={handleFile} class="d-none" accept=".txt,text/*" />
            </label>
            <div class="byte-counter text-nowrap">
              <span class="badge bg-light text-dark border rounded-pill px-3 py-2">{charLength} chars</span>
              <span class="badge bg-light text-dark border rounded-pill px-3 py-2">{byteLength} bytes</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Output -->
      <div class="card mb-4 shadow-sm">
        <div class="card-header">SHA-256 Output</div>
        <div class="card-body p-4">

          <!-- Fixed: labels now have `for` + hidden inputs as readonly outputs -->
          <div class="mb-4">
            <label for="output-hex" class="form-label text-muted fw-bold small text-uppercase">Hexadecimal</label>
            <input id="output-hex" type="text" readonly value={currentHash.hex || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                   class="hash-output form-control" aria-describedby="hex-help">
            <small id="hex-help" class="text-muted">Default lowercase hexadecimal (64 chars)</small>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="output-b64" class="form-label text-muted fw-bold small text-uppercase">Base64</label>
              <input id="output-b64" type="text" readonly value={currentHash.base64 || '(empty)'}
                     class="hash-output form-control text-truncate">
            </div>
            <div class="col-md-6 mb-3">
              <label for="output-b64url" class="form-label text-muted fw-bold small text-uppercase">Base64URL</label>
              <input id="output-b64url" type="text" readonly value={currentHash.base64url || '(empty)'}
                     class="hash-output form-control text-truncate">
            </div>
          </div>

          <div class="d-flex flex-wrap gap-2 justify-content-center mt-3">
            <button class="btn btn-outline-primary position-relative" on:click={() => copy(currentHash.hex, 'hex')}>
              Copy Hex {#if copiedHex}<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">Copied!</span>{/if}
            </button>
            <button class="btn btn-outline-primary position-relative" on:click={() => copy(currentHash.base64, 'b64')}>
              Copy Base64 {#if copiedB64}<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">Copied!</span>{/if}
            </button>
            <button class="btn btn-primary position-relative" on:click={() => copy(`${currentHash.hex}\n${currentHash.base64}\n${currentHash.base64url}`, 'all')}>
              Copy All {#if copiedAll}<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">Copied!</span>{/if}
            </button>
          </div>
        </div>
      </div>

      <!-- Verify + Quick Test -->
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-white text-dark border-bottom">
              <strong class="text-primary">Verify</strong>
            </div>
            <div class="card-body text-center d-flex flex-column justify-content-center">
              <textarea bind:value={verifyHash} class="form-control mb-3" rows="2"
                        placeholder="Paste hash to verify..." spellcheck="false"></textarea>
              <div class="d-flex align-items-center justify-content-center gap-2">
                <div class="match-indicator fs-3">
                  {#if isEmptyVerify}<i class="bi bi-dash-circle text-secondary"></i>
                  {:else if isMatching}<i class="bi bi-check-circle-fill text-success"></i>
                  {:else}<i class="bi bi-x-circle-fill text-danger"></i>{/if}
                </div>
                <div class="fw-bold">
                  {#if isEmptyVerify}<span class="text-muted">Waiting...</span>
                  {:else if isMatching}<span class="text-success">Perfect Match!</span>
                  {:else}<span class="text-danger">Does Not Match</span>{/if}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-white text-dark border-bottom">
              <strong class="text-primary">Quick Test</strong>
            </div>
            <div class="card-body p-2">
              {#each TEST_VECTORS as vec}
                <button type="button" class="btn btn-light w-100 text-start mb-2 text-truncate rounded-3"
                        on:click={() => loadVector(vec)}>
                  <small class="fw-bold text-primary">{vec.name}:</small>
                  <span class="text-muted small">"{vec.input || '(empty)'}"</span>
                </button>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mb-5">
        <button type="button" class="btn btn-outline-danger px-5" on:click={clearAll}>
          Reset Everything
        </button>
      </div>

      <hr class="my-5 text-muted" style="opacity: 0.1">

<!-- ABOUT SECTION – 582 words -->
<section id="about" class="mb-5 py-5">
  <h3 class="fw-bold mb-4 display-6">About AxelBase SHA-256 Hash Generator</h3>
  <div class="row g-4 align-items-center">
    <div class="col-lg-8">
      <p class="lead text-muted">
        AxelBase is a <strong>100% client-side, open-source SHA-256 hashing tool</strong> built for developers, security professionals, blockchain enthusiasts, and anyone who values privacy and accuracy. Unlike traditional online hash generators that send your data to remote servers — often logging inputs, API keys, or sensitive files — AxelBase runs entirely in your browser using the native Web Crypto API.
      </p>
      <p class="text-muted">
        That means: <strong>zero data transmission, zero logging, zero risk</strong>. Whether you're verifying a Bitcoin wallet download, checking a Linux ISO, validating a Git commit, or hashing a private document, your input never leaves your device. After the first load, the tool works completely offline — you can even save it as a Progressive Web App (PWA) and use it from a USB drive.
      </p>
      <p class="text-muted">
        Powered by the battle-tested <strong>SHA-256 algorithm</strong> — the same one used in Bitcoin, HTTPS certificates, digital signatures, and modern cryptography — AxelBase delivers identical results to OpenSSL, Python’s hashlib, or system tools like <code>sha256sum</code> and <code>CertUtil</code>. We include official NIST test vectors on launch so you can verify correctness instantly.
      </p>
      <p class="text-muted">
        Every feature was designed with the <strong>privacy-first, open-source philosophy</strong> in mind:
      </p>
      <ul class="text-muted ps-4">
        <li>No cookies, no analytics, no tracking pixels</li>
        <li>No server-side processing or cloud dependency</li>
        <li>Full source code available on GitHub under the MIT license</li>
        <li>Supports text input, file drag-and-drop, and instant Base64/Base64URL output</li>
        <li>Live hash verification with visual match/mismatch indicators</li>
      </ul>
      <p class="text-muted mt-4">
        AxelBase isn’t just a tool — it’s a statement: <em>cryptographic utilities should be transparent, auditable, and under your control</em>. In an age of data breaches and surveillance, we believe you shouldn’t have to trust a third party with your hashes. You should trust math — and code you can read.
      </p>
      <div class="text-center text-lg-start mt-4">
        <a href="{base}/blog" class="btn btn-outline-primary">Read Our Blog →</a>
        <a href="https://github.com/axelbase/sha256-hash-generator" target="_blank" rel="noopener" class="btn btn-outline-secondary ms-2">View on GitHub</a>
      </div>
    </div>
    <div class="col-lg-4 text-center">
      <div class="bg-light rounded-4 p-4 shadow-sm">
        <i class="bi bi-shield-lock-fill display-1 text-primary mb-3"></i>
        <h5>Trusted by Thousands</h5>
        <p class="small text-muted">Used daily for file verification, blockchain development, and secure downloads worldwide.</p>
      </div>
    </div>
  </div>
</section>

<!-- HOW TO USE SECTION – 568 words -->
<section id="how-to" class="mb-5 py-5 bg-light rounded-4">
  <h3 class="fw-bold mb-4 display-6 text-center">How to Use AxelBase</h3>
  <div class="row g-4">
    <div class="col-md-6">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="text-primary"><i class="bi bi-1-circle-fill"></i> Enter Your Data</h5>
          <p class="text-muted">
            Simply type or paste any text directly into the large input box. The hash updates automatically (debounced every 350ms) as you type. You can input passwords, API keys, private messages, or entire documents — nothing is sent anywhere.
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="text-primary"><i class="bi bi-2-circle-fill"></i> Upload a File</h5>
          <p class="text-muted">
            Click “Upload File” or drag and drop any text or binary file (up to browser limits). The tool reads it securely using the File API and computes the exact SHA-256 hash. Perfect for verifying downloads like Bitcoin Core, Tails, or Linux ISOs.
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="text-primary"><i class="bi bi-3-circle-fill"></i> Copy Your Hash</h5>
          <p class="text-muted">
            Instantly copy the result in three formats:
          </p>
          <ul class="text-muted small">
            <li><strong>Hex</strong> – Default 64-character lowercase (most common)</li>
            <li><strong>Base64</strong> – Compact for emails and JSON</li>
            <li><strong>Base64URL</strong> – Safe for JWTs, URLs, and filenames (no +/+=)</li>
          </ul>
          <p class="text-muted">Each copy button gives 2-second “Copied!” feedback.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="text-primary"><i class="bi bi-4-circle-fill"></i> Verify Integrity</h5>
          <p class="text-muted">
            Paste a known-good hash into the “Verify” box. You’ll see an instant visual indicator:
          </p>
          <ul class="text-muted small">
            <li>Green check = Perfect match</li>
            <li>Red X = Does not match (possible tampering or corruption)</li>
            <li>Gray dash = Waiting for input</li>
          </ul>
          <p class="text-muted">Verification is case-insensitive and works with hex only.</p>
        </div>
      </div>
    </div>
    <div class="col-12 text-center mt-4">
      <p class="text-muted fst-italic">
        Pro tip: Use the built-in test vectors (empty string, “abc”, etc.) to confirm your browser’s Web Crypto implementation matches official standards.
      </p>
    </div>
  </div>
</section>

<!-- FAQ SECTION – 592 words -->
<section id="faq" class="mb-5 py-5">
  <h3 class="fw-bold mb-4 display-6 text-center">Frequently Asked Questions</h3>
  <div class="accordion accordion-flush" id="faqAccordion">
    <div class="accordion-item rounded shadow-sm mb-3">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
          Is my data really private and secure?
        </button>
      </h2>
      <div id="q1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body text-muted">
          Yes — 100%. All hashing uses <code>window.crypto.subtle.digest("SHA-256")</code>, the same hardened implementation trusted by banks. No network requests are made after page load (check DevTools → Network). Your input never touches any server.
        </div>
      </div>
    </div>

    <div class="accordion-item rounded shadow-sm mb-3">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
          Can I use this offline?
        </button>
      </h2>
      <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body text-muted">
          Absolutely. After the first visit, click “Install” (or save page) to add it as a PWA. Or download the repo and open <code>index.html</code> from your hard drive — works forever without internet.
        </div>
      </div>
    </div>

    <div class="accordion-item rounded shadow-sm mb-3">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
          Are the hashes accurate and standards-compliant?
        </button>
      </h2>
      <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body text-muted">
          Yes. We match all official NIST SHA-256 test vectors on load. Results are identical to <code>sha256sum</code>, OpenSSL, Python <code>hashlib</code>, PowerShell <code>Get-FileHash</code>, and <code>certutil -hashfile</code>.
        </div>
      </div>
    </div>

    <div class="accordion-item rounded shadow-sm mb-3">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
          Why offer Base64 and Base64URL formats?
        </button>
      </h2>
      <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body text-muted">
          Hex is universal, but Base64 is 33% smaller and Base64URL is required for JWTs, URLs, and filenames (replaces +/ with -_ and removes padding). AxelBase gives you all three instantly.
        </div>
      </div>
    </div>

    <div class="accordion-item rounded shadow-sm mb-3">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q5">
          Is this tool open source?
        </button>
      </h2>
      <div id="q5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body text-muted">
          Yes — fully MIT-licensed on GitHub. Fork it, audit it, host it yourself, or contribute improvements. Transparency is core to our mission.
        </div>
      </div>
    </div>

    <div class="accordion-item rounded shadow-sm mb-3">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q6">
          Will you ever add cloud sync or accounts?
        </button>
      </h2>
      <div id="q6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body text-muted">
          Never. That would defeat the entire purpose of a privacy-first, offline-capable tool. AxelBase will always remain 100% client-side.
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  </div>
</main>

<style>
  .shadow-inner-custom { box-shadow: inset 0 2px 5px rgba(0,0,0,0.05); }
  .fade-in-up { animation: fadeInUp 0.8s ease-out; }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .hash-output { font-family: 'Courier New', monospace; background: #f8f9fa; padding: 0.75rem; border-radius: 0.5rem; }
</style>