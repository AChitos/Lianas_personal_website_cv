// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('noscroll', isOpen);
  });
  siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('noscroll');
  }));
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Active link highlighting using IntersectionObserver
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"], .footer-nav a[href^="#"]');
const linkMap = new Map();
navLinks.forEach(link => linkMap.set(link.getAttribute('href')?.slice(1), link));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = linkMap.get(id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] });

sections.forEach(s => io.observe(s));

// Contact form handling
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // Simple validation
    const emailOk = /.+@.+\..+/.test(email);
    const setErr = (id, msg) => (document.getElementById(id).textContent = msg || '');
    setErr('err-name', name ? '' : 'Please enter your name');
    setErr('err-email', emailOk ? '' : 'Please enter a valid email');
    setErr('err-subject', subject ? '' : 'Please add a subject');
    setErr('err-message', message ? '' : 'Please write a short message');

    if (!name || !emailOk || !subject || !message) return;

    // Option A: Formspree endpoint (set to enable)
    const FORMSPREE = '';
    if (FORMSPREE) {
      fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(async (res) => {
        if (res.ok) {
          alert('Thanks! Your message has been sent.');
          form.reset();
        } else {
          const data = await res.json().catch(() => ({}));
          alert('There was an issue sending your message.' + (data?.error ? `\n${data.error}` : ''));
        }
      }).catch(() => alert('Network error. Please try again later.'));
      return;
    }

    // Option B: mailto fallback
    const body = encodeURIComponent(`Hi Liana,%0D%0A%0D%0A${message}%0D%0A%0D%0A— ${name} (${email})`);
    const mailto = `mailto:gdrakopoulou7@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailto;
  });
}
