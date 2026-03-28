/***Stažení CV */
document.addEventListener("DOMContentLoaded", function() {
  const cvLinks = document.querySelectorAll('a.track-cv-download');

  cvLinks.forEach(link => {
    link.addEventListener("click", function() {
      if (typeof gtag === "function") {
        gtag('event', 'download_cv', {
          'event_category': 'Downloads',
          'event_label': link.getAttribute('href')
        });
      }
    });
  });
});
  
  /***Přepnutí na Light/Dark mode */
  document.addEventListener("DOMContentLoaded", () => {
    const toggleInput = document.querySelector(".theme-toggle input");
    const userTheme = localStorage.getItem("theme");
  
    const setTheme = (isLight) => {
      document.documentElement.classList.toggle("dark", !isLight);
      toggleInput.checked = isLight;
    };
  
    // Výchozí: tmavý, pokud není výslovně "light"
    if (userTheme === "light") {
      setTheme(true);
    } else {
      setTheme(false);
    }
  
    toggleInput.addEventListener("change", () => {
      const isLight = toggleInput.checked;
      setTheme(isLight);
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  });
  
/***Scrolování na stránce - z headeru */
document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('.scroll-start');
  const endTarget = document.querySelector('.scroll-end');

  if (startButton && endTarget) {
      startButton.addEventListener('click', function (e) {
          e.preventDefault();

          const offset = 100; // o kolik pixelů níž než začátek cílového elementu
          const top = endTarget.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
              top: top,
              behavior: 'smooth'
          });

          history.replaceState(null, null, ' ');
      });
  }
});

// Při opětovném načtení stránky skoč nahoru
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

window.addEventListener("load", function () {
  setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, 0);
});

  /***Scrolování k formuláři*/
document.addEventListener('DOMContentLoaded', function () {
    const scrollLinks = document.querySelectorAll('.jq--scroll-form');
    const target = document.getElementById('contact-form');
  
    if (scrollLinks.length && target) {
      scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
  
          const yOffset = -90;
          const y = target.getBoundingClientRect().top + window.window.scrollY + yOffset;
  
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        });
      });
    }
  });

    /* Scrolování po odeslání formuláře */
  document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('success')) {
        const formResult = document.querySelector('.form-result');
        if (formResult) {
            formResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  });
  
  /*Scrolování k adrese*/
  document.addEventListener("DOMContentLoaded", () => {
    // Počkej pár milisekund po načtení DOM, aby byl obsah opravdu připraven
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          const offset = -90; // posun kvůli fixnímu headeru
          const top = target.getBoundingClientRect().top + window.window.scrollY + offset;
  
          window.scrollTo({
            top: top,
            behavior: "smooth"
          });
        }
      }
    }, 200); // delay
  });
  

/*** Change Hamburger to Cross vice versa */
/*** Burger menu s ARIA podporou */
document.addEventListener("DOMContentLoaded", function () {
    const burgerButton = document.querySelector('.mobile-nav-icon');
    const navMenu = document.getElementById('navMenu');

    if (burgerButton && navMenu) {
        // Nastavit výchozí ARIA atributy
        burgerButton.setAttribute('aria-expanded', 'false');
        
        burgerButton.addEventListener('click', function (event) {
            event.preventDefault();

            // Zjistit současný stav
            const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true';
            
            // Změna ikony burger ↔ close
            const burgerImg = burgerButton.querySelector('.burger-menu');
            if (burgerImg) {
                const currentSrc = burgerImg.getAttribute('src');
                const isBurger = currentSrc.endsWith('/img/burger-barw.png');
                burgerImg.setAttribute('src', isBurger ? '/img/closew.png' : '/img/burger-barw.png');
            }

            // Toggle menu
            navMenu.classList.toggle('nav');
            
            // Aktualizovat ARIA atributy
            burgerButton.setAttribute('aria-expanded', !isExpanded);
            burgerButton.setAttribute('aria-label', 
                isExpanded ? 'Otevřít navigační menu' : 'Zavřít navigační menu'
            );
        });

        // Zavřít menu při kliku mimo
        document.addEventListener('click', function(event) {
            const isClickInside = burgerButton.contains(event.target) || navMenu.contains(event.target);
            const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true';
            
            if (!isClickInside && isExpanded) {
                navMenu.classList.remove('nav');
                burgerButton.setAttribute('aria-expanded', 'false');
                burgerButton.setAttribute('aria-label', 'Otevřít navigační menu');
                
                const burgerImg = burgerButton.querySelector('.burger-menu');
                if (burgerImg) {
                    burgerImg.setAttribute('src', '/img/burger-barw.png');
                }
            }
        });

        // Zavřít menu klávesou Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    navMenu.classList.remove('nav');
                    burgerButton.setAttribute('aria-expanded', 'false');
                    burgerButton.setAttribute('aria-label', 'Otevřít navigační menu');
                    
                    const burgerImg = burgerButton.querySelector('.burger-menu');
                    if (burgerImg) {
                        burgerImg.setAttribute('src', '/img/burger-barw.png');
                    }
                }
            }
        });
    }
});

/**Zobrazení galerie*/
  document.addEventListener("DOMContentLoaded", () => {
  const fadeIn = (el, duration) => {
    el.style.opacity = 0;
    el.style.transition = `opacity ${duration}ms`;
    requestAnimationFrame(() => el.style.opacity = 1);
  };

  const sliderWrapper = document.querySelector(".slider-wrapper");
  if (sliderWrapper) fadeIn(sliderWrapper, 3000);

  document.querySelectorAll(".album").forEach(el => fadeIn(el, 4000));
  document.querySelectorAll("iframe").forEach(el => fadeIn(el, 4000));
});


  /****Slider nevigase - focus */
  document.querySelectorAll('.bar').forEach(label => {
  label.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const forAttr = label.getAttribute('for');
      const input = document.getElementById(forAttr);
      if (input) {
        input.checked = true;
      }
    }
  });
});

  /****Slider animace */
  document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll('input[name="r"]');
    if (radios.length === 0) return; // Tady žádný slider není → dál nic nespouštěj
  
    const bars = document.querySelectorAll('.bar');
    let current = [...radios].findIndex(r => r.checked);
    const total = radios.length;
    let autoplay = true;
  
    const updateSlider = (index) => {
      radios[index].checked = true;
      bars.forEach(bar => bar.classList.remove('active'));
      if (bars[index]) bars[index].classList.add('active');
      current = index;
    };
  
    let interval = setInterval(() => {
      if (!autoplay) return;
      const next = (current + 1) % total;
      updateSlider(next);
    }, 5000);
  
    radios.forEach((radio, index) => {
      radio.addEventListener("change", () => {
        updateSlider(index);
        autoplay = false;
        clearTimeout(autoResume);
        autoResume = setTimeout(() => autoplay = true, 15000);
      });
    });
  
    updateSlider(current === -1 ? 0 : current);
  
    let autoResume;
  });
  
/***Swipe */
  (function() {
  const slider = document.querySelector('.sliderhome');
  if (!slider) return;
  const radios = Array.from(slider.querySelectorAll('input[name="r"]'));
  const bars = document.querySelectorAll('.bar');
  let current = radios.findIndex(input => input.checked);
  const total = radios.length;
  let startX = 0;
  let endX = 0;

  const updateSlider = (index) => {
    radios[index].checked = true;
    bars.forEach(bar => bar.classList.remove('active'));
    if (bars[index]) bars[index].classList.add('active');
    current = index;
  };

  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 30;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // swipe doprava
        current = (current - 1 + total) % total;
      } else {
        // swipe doleva
        current = (current + 1) % total;
      }
      updateSlider(current);
    }
  }
})();

/***Cookies*/
document.addEventListener("DOMContentLoaded", function() {
    // Zkontrolujeme, zda uživatel už cookies přijal
    if (!localStorage.getItem("cookiesAccepted")) {
        // Zobrazíme banner, pokud ještě nejsou cookies přijaty
        document.getElementById("cookie-banner").style.display = "block";
    }

    // Přidáme posluchač události na tlačítko
    document.getElementById("accept-cookies").addEventListener("click", function() {
        // Uložíme souhlas do localStorage
        localStorage.setItem("cookiesAccepted", "true");
        // Skryjeme banner
        document.getElementById("cookie-banner").style.display = "none";
    });
});

/**Parallax*/
// Zkontroluj, jestli uživatel povolil pohyb
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!motionQuery.matches) {
  // Jen pokud není omezený pohyb, přidej efekt
  window.addEventListener("scroll", function () {
    const parallaxElements = document.querySelectorAll(".parallax");
    const offset = window.window.scrollY;

    parallaxElements.forEach((parallaxImage) => {
      parallaxImage.style.transform = `translateY(${offset * -0.017}px)`;
    });
  });
}
