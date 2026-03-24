const reveals = document.querySelectorAll('.reveal, .reveal-left');
const bars    = document.querySelectorAll('.bar-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // stagger each bar fill animation
      const fills = e.target.querySelectorAll('.bar-fill');
      fills.forEach((f, i) => {
        setTimeout(() => {
          f.style.transitionDelay = (i * 0.15) + 's';
          e.target.classList.add('visible');
        }, i * 80);
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(r => observer.observe(r));

const barSection = document.querySelector('.bar-section');
if (barSection) {
  const barObserver2 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.bar-item').forEach((item, i) => {
          setTimeout(() => item.classList.add('visible'), i * 120);
        });
        barObserver2.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  barObserver2.observe(barSection);
}

const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(8,11,9,0.97)';
  } else {
    nav.style.background = 'rgba(8,11,9,0.92)';
  }
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + e.target.id) {
          a.style.color = 'var(--green-bright)';
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));