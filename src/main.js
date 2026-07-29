import './style.css';

const glow = document.querySelector('#cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.setProperty('--x', `${event.clientX}px`);
  glow.style.setProperty('--y', `${event.clientY}px`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')} (${data.get('email')})`);
  document.querySelector('.form-status').textContent = 'Opening your email app…';
  window.location.href = `mailto:hello@yourdomain.com?subject=${subject}&body=${body}`;
});
