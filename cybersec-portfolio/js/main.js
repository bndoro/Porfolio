// ============ MOBILE NAV ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ SCROLL REVEAL ============
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealEls = document.querySelectorAll('.reveal');
if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
}

// ============ TERMINAL TYPING SEQUENCE ============
const terminalBody = document.getElementById('terminalBody');

if (terminalBody) {
const sequence = [
  { type: 'prompt', text: 'whoami' },
  { type: 'out', text: 'blessing_ndoro' },
  { type: 'prompt', text: 'cat focus.txt' },
  { type: 'accent-out', text: 'Digital Forensics & Incident Response' },
  { type: 'prompt', text: 'cat status.txt' },
  { type: 'out', text: 'Cybersecurity @ SEMO — grad Dec 2026' },
  { type: 'out', text: '1st place, solo CTF (Cyber Pro AI)' },
  { type: 'out', text: 'Pursuing: Security+, CHFI' },
  { type: 'prompt', text: './connect --now' },
];

function typeLine(container, text, className, speed) {
  return new Promise(resolve => {
    const line = document.createElement('span');
    line.className = 'tline ' + className;
    container.appendChild(line);
    let i = 0;
    const interval = setInterval(() => {
      line.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function runSequence() {
  if (reduceMotion) {
    // Render instantly, no animation
    sequence.forEach(step => {
      const line = document.createElement('span');
      line.className = 'tline ' + step.type;
      line.textContent = (step.type === 'prompt' ? '$ ' : '  ') + step.text;
      terminalBody.appendChild(line);
    });
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    terminalBody.lastChild.appendChild(cursor);
    return;
  }

  for (const step of sequence) {
    const prefix = step.type === 'prompt' ? '$ ' : '  ';
    await typeLine(terminalBody, prefix + step.text, step.type, step.type === 'prompt' ? 38 : 14);
    await new Promise(r => setTimeout(r, step.type === 'prompt' ? 260 : 160));
  }
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  terminalBody.lastChild.appendChild(cursor);
}

runSequence();
}

// ============ NAV BACKGROUND ON SCROLL ============
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(250,250,248,0.95)';
  } else {
    nav.style.background = 'rgba(250,250,248,0.85)';
  }
});

// ============ COPY BIO ============
const copyBioBtn = document.getElementById('copyBioBtn');
const bioText = document.getElementById('bioText');
if (copyBioBtn && bioText) {
  copyBioBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bioText.innerText.trim());
      const original = copyBioBtn.textContent;
      copyBioBtn.textContent = 'Copied!';
      setTimeout(() => { copyBioBtn.textContent = original; }, 1600);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  });
}
