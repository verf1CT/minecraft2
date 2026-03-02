(function() {
  const FAKE_IPS = [
    'никогда.не.зайдёшь.лох',
    '127.0.0.1',
    '0.0.0.0',
    'ты.думал.здесь.айпи',
    'minecraft.vrfct.ru'
  ];
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  let konamiIndex = 0;

  function pickFakeIp() {
    return FAKE_IPS[Math.floor(Math.random() * FAKE_IPS.length)];
  }

  const ipEl = document.getElementById('fakeIp');
  if (ipEl) {
    ipEl.textContent = 'minecraft.vrfct.ru';
  }

  const copyBtn = document.getElementById('copyIp');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const t = ipEl ? ipEl.textContent : 'minecraft.vrfct.ru';
      navigator.clipboard.writeText(t).then(function() {
        copyBtn.textContent = 'Скопировано! Теперь плачь';
        setTimeout(function() {
          copyBtn.textContent = 'Скопировать и плакать';
        }, 2000);
      }).catch(function() {
        copyBtn.textContent = 'Не получилось, лох';
        setTimeout(function() {
          copyBtn.textContent = 'Скопировать и плакать';
        }, 2000);
      });
    });
  }

  const btnVirus = document.getElementById('btnVirus');
  const virusModal = document.getElementById('virusModal');
  const modalClose = document.getElementById('modalClose');
  if (btnVirus && virusModal) {
    btnVirus.addEventListener('click', function() {
      virusModal.classList.remove('hidden');
      btnVirus.textContent = 'ЕЩЁ РАЗ НАЖМИ (бесплатно)';
    });
  }
  if (modalClose && virusModal) {
    modalClose.addEventListener('click', function() {
      virusModal.classList.add('hidden');
    });
  }
  if (virusModal) {
    virusModal.addEventListener('click', function(e) {
      if (e.target === virusModal) virusModal.classList.add('hidden');
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.code === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        const toast = document.getElementById('konamiToast');
        if (toast) {
          toast.classList.remove('hidden');
          setTimeout(function() {
            toast.classList.add('hidden');
          }, 4000);
        }
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  let trailEl = document.querySelector('.cursor-trail');
  if (trailEl) {
    document.addEventListener('mousemove', function(e) {
      trailEl.style.left = e.clientX + 'px';
      trailEl.style.top = e.clientY + 'px';
      trailEl.style.opacity = '0.4';
    });
    document.addEventListener('mouseleave', function() {
      trailEl.style.opacity = '0';
    });
  }

  const container = document.getElementById('floatingTrolls');
  const trollUrl = 'https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg';
  if (container) {
    for (let i = 0; i < 6; i++) {
      const img = document.createElement('img');
      img.src = trollUrl;
      img.alt = '';
      img.style.left = (10 + Math.random() * 80) + '%';
      img.style.top = (10 + Math.random() * 80) + '%';
      img.style.animationDelay = (i * 2) + 's';
      img.style.animationDuration = (12 + Math.random() * 8) + 's';
      container.appendChild(img);
    }
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  let clickCount = 0;
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function() {
      clickCount++;
      if (clickCount >= 5) {
        if (ipEl) ipEl.textContent = pickFakeIp();
        clickCount = 0;
      }
    });
  }
})();
