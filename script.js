(function() {
  const FAKE_IPS = [
    'никогда.не.зайдёшь.лох',
    '127.0.0.1',
    '0.0.0.0',
    'ты.думал.здесь.айпи',
    'minecraft.vrfct.ru'
  ];
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  const RANDOM_TOASTS = [
    'Ты красавчик! (нет)',
    'Админ одобряет* *админ спит',
    '+100 к криповости',
    'Сервер перезапустится через 999 лет',
    'Пинг обновлён: 9999 ms',
    'Ты нажал не туда. Или туда.',
    'Здесь могла быть твоя реклама',
    'Ошибка 404: админ не найден',
    'Включи звук! (звука нет)',
    'Спасибо за донат! (мы ничего не получили)',
    'Читер не обнаружен. Мы не искали.',
    'Подключение разорвано. Как и наши нервы.',
    'Мем одобрен админом (админ — собака)',
    'Ты прошёл проверку. Никто не проверял.'
  ];
  const CONFETTI_COLORS = ['#ff6b6b', '#feca57', '#7ee787', '#ff7eb6', '#79c0ff', '#00ffff', '#bf5af2'];
  let konamiIndex = 0;
  const trollUrl = 'https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg';

  function pickFakeIp() {
    return FAKE_IPS[Math.floor(Math.random() * FAKE_IPS.length)];
  }

  function showRandomToast() {
    const el = document.getElementById('randomToast');
    if (!el) return;
    el.textContent = RANDOM_TOASTS[Math.floor(Math.random() * RANDOM_TOASTS.length)];
    el.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    el.style.color = '#000';
    el.classList.remove('hidden');
    setTimeout(function() {
      el.classList.add('hidden');
    }, 2500);
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
  const confettiContainer = document.getElementById('confettiContainer');
  function spawnConfetti() {
    if (!confettiContainer) return;
    for (var i = 0; i < 60; i++) {
      var c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.top = '-10px';
      c.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      c.style.animationDuration = (2 + Math.random() * 2) + 's';
      c.style.animationDelay = Math.random() * 0.5 + 's';
      confettiContainer.appendChild(c);
      setTimeout(function() {
        if (c.parentNode) c.parentNode.removeChild(c);
      }, 4000);
    }
  }
  if (btnVirus && virusModal) {
    btnVirus.addEventListener('click', function() {
      virusModal.classList.remove('hidden');
      btnVirus.textContent = 'ЕЩЁ РАЗ НАЖМИ (бесплатно)';
      spawnConfetti();
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

  var banModal = document.getElementById('banModal');
  var banModalClose = document.getElementById('banModalClose');
  if (banModalClose && banModal) {
    banModalClose.addEventListener('click', function() { banModal.classList.add('hidden'); });
  }
  if (banModal) {
    banModal.addEventListener('click', function(e) {
      if (e.target === banModal) banModal.classList.add('hidden');
    });
  }

  var adminModal = document.getElementById('adminModal');
  var adminModalClose = document.getElementById('adminModalClose');
  if (adminModalClose && adminModal) {
    adminModalClose.addEventListener('click', function() { adminModal.classList.add('hidden'); });
  }
  if (adminModal) {
    adminModal.addEventListener('click', function(e) {
      if (e.target === adminModal) adminModal.classList.add('hidden');
    });
  }

  var btnConnect = document.getElementById('btnConnect');
  var connectingOverlay = document.getElementById('connectingOverlay');
  var connectingBar = document.getElementById('connectingBar');
  var connectingSub = document.getElementById('connectingSub');
  if (btnConnect && connectingOverlay && connectingBar && connectingSub) {
    var steps = [
      'Проверка версии...',
      'Загрузка чанков...',
      'Скачивание модов (0%)...',
      'Поиск админа...',
      'Админ не найден. Продолжаем...',
      'Пинг 9999 ms...'
    ];
    btnConnect.addEventListener('click', function() {
      connectingOverlay.classList.remove('hidden');
      connectingBar.style.width = '0%';
      connectingSub.textContent = steps[0];
      var step = 0;
      var iv = setInterval(function() {
        step++;
        var pct = Math.min(step * 18, 95);
        connectingBar.style.width = pct + '%';
        connectingSub.textContent = steps[Math.min(step % steps.length, steps.length - 1)];
        if (step >= 6) {
          clearInterval(iv);
          connectingBar.style.width = '100%';
          connectingSub.textContent = 'Таймаут. Сервер спит.';
          setTimeout(function() {
            connectingOverlay.classList.add('hidden');
          }, 1500);
        }
      }, 600);
    });
  }

  var btnAnticheat = document.getElementById('btnAnticheat');
  var anticheatBar = document.getElementById('anticheatBar');
  var anticheatStatus = document.getElementById('anticheatStatus');
  if (btnAnticheat && anticheatBar && anticheatStatus) {
    btnAnticheat.addEventListener('click', function() {
      anticheatBar.style.width = '0%';
      anticheatStatus.textContent = 'Проверяем... (мы ничего не проверяем)';
      var p = 0;
      var iv = setInterval(function() {
        p += 5 + Math.floor(Math.random() * 15);
        if (p >= 99) {
          p = 99;
          clearInterval(iv);
          anticheatBar.style.width = '99%';
          anticheatStatus.textContent = 'Читер не обнаружен. Мы не искали.';
          setTimeout(function() {
            anticheatBar.style.width = '0%';
            anticheatStatus.textContent = 'Нажми «Проверить» — мы никого не ловим';
          }, 3000);
        } else {
          anticheatBar.style.width = p + '%';
        }
      }, 200);
    });
  }

  var btnDontClick = document.getElementById('btnDontClick');
  if (btnDontClick && banModal) {
    btnDontClick.addEventListener('click', function() {
      banModal.classList.remove('hidden');
    });
  }

  var btnGetAdmin = document.getElementById('btnGetAdmin');
  if (btnGetAdmin && adminModal) {
    btnGetAdmin.addEventListener('click', function() {
      adminModal.classList.remove('hidden');
    });
  }

  var memeCards = document.querySelectorAll('.meme-card');
  memeCards.forEach(function(card) {
    card.addEventListener('click', function() {
      showRandomToast();
    });
  });

  var btnRunaway = document.getElementById('btnRunaway');
  if (btnRunaway) {
    var zone = btnRunaway.parentElement;
    btnRunaway.addEventListener('mouseenter', function(e) {
      var rect = btnRunaway.getBoundingClientRect();
      var zoneRect = zone.getBoundingClientRect();
      var cx = rect.left - zoneRect.left + rect.width / 2;
      var cy = rect.top - zoneRect.top + rect.height / 2;
      var dx = (e.clientX - zoneRect.left) - cx;
      var dy = (e.clientY - zoneRect.top) - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        var nx = (dist > 0 ? dx / dist : 1);
        var ny = (dist > 0 ? dy / dist : 0);
        var move = 90 + Math.random() * 30;
        var newLeft = (rect.left - zoneRect.left) + nx * move + (Math.random() * 20 - 10);
        var newTop = (rect.top - zoneRect.top) + ny * move + (Math.random() * 20 - 10);
        newLeft = Math.max(10, Math.min(zoneRect.width - rect.width - 10, newLeft));
        newTop = Math.max(50, Math.min(zoneRect.height - rect.height - 10, newTop));
        btnRunaway.style.left = newLeft + 'px';
        btnRunaway.style.top = newTop + 'px';
        btnRunaway.style.transform = 'none';
      }
    });
    btnRunaway.addEventListener('click', function() {
      showRandomToast();
    });
  }

  var fakeNotif = document.getElementById('fakeNotification');
  var fakeNotifClose = document.getElementById('fakeNotifClose');
  if (fakeNotif) {
    setTimeout(function() {
      fakeNotif.classList.remove('hidden');
    }, 3000);
  }
  if (fakeNotifClose && fakeNotif) {
    fakeNotifClose.addEventListener('click', function() {
      fakeNotif.classList.add('hidden');
    });
  }

  var onlineCount = document.getElementById('onlineCount');
  if (onlineCount) {
    function updateOnline() {
      var n = Math.floor(Math.random() * 5) + 1;
      if (Math.random() > 0.7) n = 0;
      onlineCount.textContent = n;
    }
    updateOnline();
    setInterval(updateOnline, 4000);
  }

  var heroTroll = document.getElementById('heroTroll');
  var spawnTrollsContainer = document.getElementById('spawnTrolls');
  if (heroTroll && spawnTrollsContainer) {
    heroTroll.addEventListener('click', function(e) {
      for (var i = 0; i < 3; i++) {
        var img = document.createElement('img');
        img.src = trollUrl;
        img.className = 'spawn-troll';
        img.style.left = (e.clientX + (Math.random() * 80 - 40)) + 'px';
        img.style.top = (e.clientY + (Math.random() * 80 - 40)) + 'px';
        img.alt = '';
        spawnTrollsContainer.appendChild(img);
        setTimeout(function() {
          if (img.parentNode) img.parentNode.removeChild(img);
        }, 1200);
      }
    });
  }

  var rulesList = document.getElementById('rulesList');
  if (rulesList) {
    var rules = rulesList.querySelectorAll('li');
    var altTexts = [
      'Читерить можно. Мы не смотрим.',
      'Админ уже плачет. Не мешай.',
      'Обновление выйдет в 2099',
      'Поддержка = чёрная дыра',
      'Вирус качают только умные'
    ];
    rules.forEach(function(li, idx) {
      li.addEventListener('mouseenter', function() {
        if (Math.random() > 0.6) {
          var orig = li.getAttribute('data-text');
          li.textContent = altTexts[idx] || orig;
          setTimeout(function() {
            li.textContent = orig;
          }, 800);
        }
      });
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.code === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        var toast = document.getElementById('konamiToast');
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

  var trailEl = document.querySelector('.cursor-trail');
  var trailDots = [];
  var lastTrail = 0;
  if (trailEl) {
    document.addEventListener('mousemove', function(e) {
      trailEl.style.left = e.clientX + 'px';
      trailEl.style.top = e.clientY + 'px';
      trailEl.style.opacity = '0.4';
      var now = Date.now();
      if (now - lastTrail > 50) {
        lastTrail = now;
        var dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.width = (8 + Math.random() * 8) + 'px';
        dot.style.height = dot.style.width;
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        dot.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        dot.style.opacity = '0.7';
        document.body.appendChild(dot);
        setTimeout(function() {
          if (dot.parentNode) dot.parentNode.removeChild(dot);
        }, 800);
      }
    });
    document.addEventListener('mouseleave', function() {
      trailEl.style.opacity = '0';
    });
  }

  var container = document.getElementById('floatingTrolls');
  if (container) {
    for (var i = 0; i < 6; i++) {
      var img = document.createElement('img');
      img.src = trollUrl;
      img.alt = '';
      img.style.left = (10 + Math.random() * 80) + '%';
      img.style.top = (10 + Math.random() * 80) + '%';
      img.style.animationDelay = (i * 2) + 's';
      img.style.animationDuration = (12 + Math.random() * 8) + 's';
      container.appendChild(img);
    }
  }

  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (Math.random() > 0.7) showRandomToast();
    });
  });

  var clickCount = 0;
  var logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function() {
      clickCount++;
      if (clickCount >= 5) {
        if (ipEl) ipEl.textContent = pickFakeIp();
        clickCount = 0;
      } else if (clickCount >= 2 && Math.random() > 0.5) {
        showRandomToast();
      }
    });
  }

  var memeBadges = document.querySelectorAll('.meme-badge');
  memeBadges.forEach(function(b) {
    b.addEventListener('click', function() {
      b.style.animation = 'none';
      b.offsetHeight;
      b.style.animation = 'badge-pulse 1.5s ease-in-out infinite';
      showRandomToast();
    });
  });

  setTimeout(function() {
    if (Math.random() > 0.5) showRandomToast();
  }, 8000);
})();
