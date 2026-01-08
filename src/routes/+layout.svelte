<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';

  const currentYear = new Date().getFullYear();

  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }
</script>

<header class="fixed-top">
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <div class="d-flex align-items-center gap-3">
        <a class="navbar-brand d-flex align-items-center gap-2" href="{base}/">
          <img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" width="32" height="32" class="d-inline-block align-text-top rounded-circle shadow-sm">
          <span class="fw-bold" style="color: var(--ochre-primary);">AxelBase</span>
        </a>

        <div class="d-none d-md-block border-end mx-2" style="height: 24px; border-color: #ddd;"></div>

        <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
          <button
            class="bmac-button d-flex align-items-center gap-2 text-white border-0 shadow-sm"
            on:click={toggleDropdown}
            aria-label="Support options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
            </svg>
            <span class="d-none d-sm-inline fw-semibold">Buy me a Coffee</span>
          </button>

          {#if isDropdownOpen}
            <div class="bmac-dropdown mt-2 shadow" transition:fly={{ y: -10, duration: 250 }}>
              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                <span class="amount">$3</span> One Coffee
              </a>
              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                <span class="amount">$5</span> Two Coffees
              </a>
              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                <span class="amount">$10</span> Three Coffees
              </a>

              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown} class="custom-amount">
                Custom Amount
              </a>

              <a
                href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
                on:click={closeDropdown}
                class="custom-amount"
              >
                Buy via Crypto (Bitcoin)
              </a>
            </div>
          {/if}
        </div>
      </div>

      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav gap-lg-3 text-center mt-3 mt-lg-0">
          <li class="nav-item"><a class="nav-link fw-medium" href="{base}/">Home</a></li>
          <li class="nav-item"><a class="nav-link fw-medium" href="{base}/#about">About</a></li>
          <li class="nav-item"><a class="nav-link fw-medium" href="{base}/#how-to">How to use</a></li>
          <li class="nav-item"><a class="nav-link fw-medium" href="{base}/#faq">FAQ</a></li>
          <li class="nav-item">
            <a class="nav-link btn btn-sm btn-outline-primary px-3 ms-lg-2 rounded-pill" href="{base}/blog">Blog</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>

<div class="content-wrapper min-vh-100 d-flex flex-column">
  <slot />
</div>

<footer class="releative bg-white border-top py-3 shadow-lg">
  <div class="container d-flex justify-content-between align-items-center text-muted small">
    <div>&copy; {currentYear} <strong>AxelBase</strong> Text SHA-256 Hash Generator.</div>
    <div class="d-flex gap-3">
      <a href="{base}/privacy" class="text-decoration-none text-muted hover-ochre">Privacy</a>
      <a href="{base}/terms" class="text-decoration-none text-muted hover-ochre">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* Existing navbar styles remain unchanged */
  header nav { 
    background: rgba(255,255,255,0.9); 
    backdrop-filter: blur(10px); 
    border-bottom: 1px solid rgba(149,95,32,0.1); 
    padding: 0.75rem 0; 
    transition: padding .3s; 
  }
  .nav-link { 
    color: var(--text-dark); 
    position: relative; 
    transition: color .3s; 
  }
  .nav-link:hover, .nav-link:focus { 
    color: var(--ochre-primary); 
  }
  .nav-link::after { 
    content: ''; 
    position: absolute; 
    width: 0; 
    height: 2px; 
    bottom: 0; 
    left: 0; 
    background-color: var(--ochre-primary); 
    transition: width .3s; 
  }
  .nav-link:hover::after { 
    width: 100%; 
  }
  .nav-link.btn::after { 
    display: none; 
  }
  .hover-ochre:hover { 
    color: var(--ochre-primary) !important; 
  }

  /* BMAC Button & Dropdown – Keeping File 1's visual style, adapted to ochre theme */
  .bmac-button {
    background: var(--ochre-primary);
    font-size: 0.95rem;
    padding: 0.5rem 1.2rem;
    border-radius: 50px; /* pill shape */
    transition: all 0.3s ease;
  }

  .bmac-button:hover {
    background: var(--ochre-hover);
    transform: translateY(-2px);
  }

  .bmac-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 12px 32px rgba(149, 95, 32, 0.15);
    overflow: hidden;
    border: 1px solid rgba(149, 95, 32, 0.1);
    z-index: 1050;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    font-size: 0.98rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: var(--ochre-light);
    color: var(--ochre-primary);
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 700;
    color: var(--ochre-primary);
    font-size: 1.1rem;
  }

  .bmac-dropdown a:hover .amount {
    color: var(--ochre-primary);
  }

  .bmac-dropdown .custom-amount {
    font-weight: 600;
    color: var(--ochre-primary);
    border-top: 1px solid #eee;
    justify-content: center !important;
  }

  .bmac-dropdown .custom-amount:hover {
    background: var(--ochre-light);
    color: var(--ochre-primary);
  }

  /* Responsive text hide on small screens (as in File 1) */
  @media (max-width: 576px) {
    .bmac-button span {
      display: none;
    }
    .bmac-button {
      padding: 0.5rem 0.8rem;
    }
  }
</style>