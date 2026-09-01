/**
 * ==========================================================================
 * MOHAMED ADEL ELHAG ALI - DEVELOPER PORTFOLIO JAVASCRIPT
 * Features:
 * - Dark (Default) & Light Mode Toggle with Persistence (localStorage)
 * - Sticky Glassmorphic Header & Scroll Spy Active Nav Highlighting
 * - Accessible Mobile Navigation Drawer with Keyboard Support
 * - Intersection Observer Scroll Reveal Animations
 * - Hero Code Terminal Interactive Tab Switcher
 * - Smooth Back-to-Top Floating Button
 * - Client-Side Contact Form Validation & Friendly User Feedback
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. THEME TOGGLE (DARK MODE DEFAULT / LIGHT MODE)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Check stored theme or default to 'dark'
  const storedTheme = localStorage.getItem('mohamed-portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme ? storedTheme : (systemPrefersDark ? 'dark' : 'dark'); // Dark mode default

  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('mohamed-portfolio-theme', theme);

    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggleBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0f1d' : '#f8fafc');
    }
  }

  /* --------------------------------------------------------------------------
     2. STICKY HEADER WITH SCROLL STATE
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* --------------------------------------------------------------------------
     3. MOBILE DRAWER NAVIGATION
     -------------------------------------------------------------------------- */
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const mobileCloseBtn = document.getElementById('mobile-close');
  const mobileNav = document.getElementById('mobile-nav');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileNav || !drawerBackdrop) return;
    mobileNav.classList.add('open');
    drawerBackdrop.classList.add('active');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    if (!mobileNav || !drawerBackdrop) return;
    mobileNav.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close drawer when clicking any mobile menu link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close drawer on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     4. HERO CODE TERMINAL TAB SWITCHER
     -------------------------------------------------------------------------- */
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const codePanes = document.querySelectorAll('.code-pane');

  terminalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetPaneId = tab.getAttribute('aria-controls');
      const targetPane = document.getElementById(targetPaneId);

      terminalTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      codePanes.forEach((pane) => {
        pane.classList.remove('active');
        pane.setAttribute('hidden', '');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      if (targetPane) {
        targetPane.classList.add('active');
        targetPane.removeAttribute('hidden');
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. SCROLL SPY & ACTIVE NAVIGATION LINK HIGHLIGHTING
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 110;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* --------------------------------------------------------------------------
     6. INTERSECTION OBSERVER SCROLL REVEAL ANIMATIONS
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once revealed, no need to observe again
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* --------------------------------------------------------------------------
     7. BACK TO TOP FLOATING BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. CLIENT-SIDE CONTACT FORM VALIDATION & FEEDBACK
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const subjectInput = document.getElementById('user-subject');
  const messageInput = document.getElementById('user-message');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  // Error span elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Email regex validator
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function validateField(input, errorElement, validationFn, errorMessage) {
    if (!input || !errorElement) return true;
    const value = input.value.trim();
    const isValid = validationFn(value);

    if (!isValid) {
      input.classList.add('invalid');
      errorElement.textContent = errorMessage;
      return false;
    } else {
      input.classList.remove('invalid');
      errorElement.textContent = '';
      return true;
    }
  }

  // Real-time input listeners to clear errors on typing
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        nameInput.classList.remove('invalid');
        nameError.textContent = '';
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.remove('invalid');
        emailError.textContent = '';
      }
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('input', () => {
      if (subjectInput.value.trim().length >= 3) {
        subjectInput.classList.remove('invalid');
        subjectError.textContent = '';
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) {
        messageInput.classList.remove('invalid');
        messageError.textContent = '';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields
      const isNameValid = validateField(
        nameInput,
        nameError,
        val => val.length >= 2,
        'Please enter your name (at least 2 characters).'
      );

      const isEmailValid = validateField(
        emailInput,
        emailError,
        val => emailPattern.test(val),
        'Please provide a valid email address.'
      );

      const isSubjectValid = validateField(
        subjectInput,
        subjectError,
        val => val.length >= 3,
        'Please enter a subject (at least 3 characters).'
      );

      const isMessageValid = validateField(
        messageInput,
        messageError,
        val => val.length >= 10,
        'Please write a message (at least 10 characters).'
      );

      // If all valid, simulate successful submission
      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const originalBtnHTML = submitBtn.innerHTML;

        // Visual feedback state on button
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="btn-text">Validating &amp; Sending...</span>
        `;

        setTimeout(() => {
          // Show friendly inline success message
          if (formFeedback) {
            formFeedback.removeAttribute('hidden');
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          // Reset form inputs
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;

          // Auto-hide success message after 8 seconds
          setTimeout(() => {
            if (formFeedback) {
              formFeedback.setAttribute('hidden', '');
            }
          }, 8000);
        }, 800);
      }
    });
  }

});
