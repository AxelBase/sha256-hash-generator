<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';

  const paypalUsername = 'AxelLab427';
  const donationAmounts = [1, 3, 5, 10];

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
    return { destroy() { document.removeEventListener('click', handleClick, true); } };
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
          <button class="btn btn-bmac d-flex align-items-center gap-2" on:click={toggleDropdown}>
            <i class="bi bi-cup-hot-fill"></i>
            <span class="d-none d-sm-inline">Coffee?</span>
          </button>

          {#if isDropdownOpen}
            <div class="bmac-dropdown shadow" transition:fly={{ y: -10, duration: 250 }}>
              <div class="d-grid gap-2">
                {#each donationAmounts as amount}
                  <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer"
                     class="dropdown-item rounded" on:click={closeDropdown}>
                    ${amount}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Fixed: aria-label added -->
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
    <div>&copy; {new Date().getFullYear()} <strong>AxelBase</strong> Text SHA-256 Hash Generator.</div>
    <div class="d-flex gap-3">
      <a href="{base}/privacy" class="text-decoration-none text-muted hover-ochre">Privacy</a>
      <a href="{base}/terms" class="text-decoration-none text-muted hover-ochre">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* Same styles as before — unchanged */
  header nav { background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(149,95,32,0.1); padding: 0.75rem 0; transition: padding .3s; }
  .nav-link { color: var(--text-dark); position: relative; transition: color .3s; }
  .nav-link:hover, .nav-link:focus { color: var(--ochre-primary); }
  .nav-link::after { content: ''; position: absolute; width: 0; height: 2px; bottom: 0; left: 0; background-color: var(--ochre-primary); transition: width .3s; }
  .nav-link:hover::after { width: 100%; }
  .nav-link.btn::after { display: none; }
  .btn-bmac { background-color: #FFDD00; color: #000; border: none; border-radius: 50px; font-weight: 600; font-size: .9rem; padding: .4rem 1rem; box-shadow: 0 4px 10px rgba(255,221,0,.3); }
  .btn-bmac:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(255,221,0,.4); background-color: #ffea5c; }
  .bmac-dropdown { position: absolute; top: 120%; left: 0; background: white; border-radius: 15px; padding: .5rem; width: 120px; z-index: 1050; border: 1px solid #f0f0f0; }
  .dropdown-item { display: block; padding: .5rem 1rem; text-decoration: none; color: var(--text-dark); transition: background .2s; text-align: center; font-weight: bold; }
  .dropdown-item:hover { background-color: var(--ochre-light); color: var(--ochre-primary); }
  .hover-ochre:hover { color: var(--ochre-primary) !important; }
</style>