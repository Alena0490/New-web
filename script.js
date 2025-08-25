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
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        });
      });
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
          const top = target.getBoundingClientRect().top + window.pageYOffset + offset;
  
          window.scrollTo({
            top: top,
            behavior: "smooth"
          });
        }
      }
    }, 200); // delay = klíčová část!
  });
  

/*** Change Hamburger to Cross vice versa */
document.addEventListener("DOMContentLoaded", function () {
    const burgerIcon = document.querySelector('.jq--nav-icon');
    const navMenu = document.getElementById('navMenu');

    console.log("JS načten. burgerIcon:", burgerIcon, "| navMenu:", navMenu);

    if (burgerIcon && navMenu) {
        burgerIcon.addEventListener('click', function (event) {
            event.preventDefault();

            // Přepni obrázek burger ↔ close
            const currentSrc = burgerIcon.getAttribute('src');
            const isBurger = currentSrc.endsWith('/img/burger-barw.png');
            burgerIcon.setAttribute('src', isBurger ? '/img/closew.png' : '/img/burger-barw.png');

            // Přepni třídu .nav
            navMenu.classList.toggle('nav');
            console.log("Klik - aktuální třídy na <ul>:", navMenu.className);
        });
    } else {
        console.warn("burgerIcon nebo navMenu nenalezen!");
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
    const offset = window.pageYOffset;

    parallaxElements.forEach((parallaxImage) => {
      parallaxImage.style.transform = `translateY(${offset * -0.017}px)`;
    });
  });
}


/*** Automatický text***/
// if (window.matchMedia("(min-width: 351px)").matches) {
//   const heading = document.querySelector(".introduction");
//   if (heading) {
//     const text = "„Jsem začínající front-end vývojářka, která ráda zkouší nové věci a posouvá svoje hranice.“";
//     let idLetter = 1;
//     let delay = 100;

//     function printText() {
//       heading.innerText = text.slice(0, idLetter);
//       idLetter++;

//       setTimeout(printText, delay);

//       if (idLetter > text.length) {
//         idLetter = 1;
//       }
//     }

//     printText();
//   }
// }

