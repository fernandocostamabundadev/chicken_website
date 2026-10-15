const menu = document.getElementById('nav-menu');
const toggle = document.getElementById('nav-toggle');
const close = document.getElementById('nav-close');
const mobileViewport = window.matchMedia('(max-width: 767px)');

const setMenuOpen = (isOpen) => {
  menu.classList.toggle('show-menu', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-hidden', String(mobileViewport.matches && !isOpen));
  menu.inert = mobileViewport.matches && !isOpen;
};

setMenuOpen(false);
toggle.addEventListener('click', () => {
  setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
});
close.addEventListener('click', () => setMenuOpen(false));
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenuOpen(false);
});
mobileViewport.addEventListener('change', () => setMenuOpen(false));

const header = document.getElementById('header');
const scrollUp = document.getElementById('scroll-up');
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav__link')];

const onScroll = () => {
  header.classList.toggle('header-shadow', window.scrollY > 40);
  scrollUp.classList.toggle('show-scroll', window.scrollY > 400);

  let current = sections[0];
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section;
  });
  links.forEach(link => {
    const isCurrent = link.hash === `#${current.id}`;
    link.classList.toggle('active-link', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

const revealElements = document.querySelectorAll('[data-reveal]');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  revealElements.forEach(element => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
}

let order = [];
const status = document.getElementById('order-status');
document.querySelectorAll('.order-button').forEach(button => {
  button.addEventListener('click', () => {
    order.push(button.dataset.item);
    const total = order.length;
    const quantityLabel = total === 1 ? 'artigo' : 'artigos';
    status.textContent = `${button.dataset.item} adicionado ao pedido. Tem ${total} ${quantityLabel} na sua seleção de demonstração.`;
  });
});
