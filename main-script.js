const navbar1 = document.querySelector(".navbar-1");
const navbarOffsetTop1 = navbar1.offsetTop;
const navbar2 = document.querySelector(".navbar-2");
const navbarOffsetTop2 = navbar2.offsetTop;
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar-link");
const progress = document.querySelector(".progress-bars-wrapper");
const progressBarPercents = [90, 80, 70, 60, 50, 40, 30];

const translations = {
  en: {
    "language.label": "Learning language:",
    "language.option.en": "English-German",
    "language.option.tr": "Turkish-German",
    "navbar.login": "Login",
    "navbar.signup": "Signup",
    "nav.home": "Home",
    "nav.lessons": "Lessons",
    "nav.progress": "Your Progress",
    "nav.contact": "Contact",
    "hero.lessons": "Lessons",
    "hero.progress": "Your Progress",
    "section2.heading": "Lessons",
    "lesson.upload.title": "Installation",
    "lesson.upload.subtitle": "Installation Notes",
    "lesson.prepositions.title": "Verbs with Prepositions",
    "lesson.prepositions.subtitle": "Verbs with Prepositions",
    "lesson.fixedprepositions.title": "Verbs with Fixed Prepositions",
    "lesson.fixedprepositions.subtitle": "Verbs with Fixed Prepositions",
    "lesson.a1.title": "A1 Learning",
    "lesson.a1.subtitle": "A1 Verbs, Grammar and Quiz",
    "lesson.quiz.title": "Quiz",
    "lesson.quiz.subtitle": "Word Quiz, Match the Words",
    "lesson.grammar.title": "Grammar",
    "lesson.grammar.subtitle": "Grammar Exercises",
    "lesson.wordtraining.title": "Word Training",
    "lesson.wordtraining.subtitle": "Practice Words",
    "lesson.coming.title": "More features coming soon!",
    "lesson.coming.subtitle": "More features coming soon!",
    "lesson.link": "Go to lesson",
    "section3.heading": "Your Progress",
    "section4.heading": "Contact Us",
    "contact.name.placeholder": "Name (not functioning yet)",
    "contact.email.placeholder": "Email (not functioning yet)",
    "contact.message.placeholder": "Message (not functioning yet)",
    "contact.submit": "Submit",
    "footer.copyright": "Copyright © 2024 AA Deutsch. All Rights Reserved",
    "login.email.placeholder": "Email or mobile number",
    "login.password.placeholder": "Password",
    "login.submit": "Log In",
    "login.help": "Having trouble logging in?",
    "login.or": "or",
    "login.signup": "Sign Up",
    "signup.login": "Log In",
    "signup.subtitle": "See for yourself why people learn German.",
    "signup.heading": "Sign up for AA Deutsch, it's free",
    "signup.choose": "Choose from two types of accounts:",
    "signup.premium.title": "Premium Account",
    "signup.premium.description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus minima, incidunt beatae veritatis ad delectus temporibus eaque enim ea!",
    "signup.free.title": "Free Account",
    "signup.free.description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus minima, incidunt beatae veritatis ad delectus temporibus eaque enim ea!",
    "signup.continue": "Continue"
  },
  tr: {
    "language.label": "Öğrenme dili:",
    "language.option.en": "İngilizce-Almanca",
    "language.option.tr": "Türkçe-Almanca",
    "navbar.login": "Giriş Yap",
    "navbar.signup": "Kayıt Ol",
    "nav.home": "Ana Sayfa",
    "nav.lessons": "Dersler",
    "nav.progress": "İlerlemen",
    "nav.contact": "İletişim",
    "hero.lessons": "Dersler",
    "hero.progress": "İlerlemen",
    "section2.heading": "Dersler",
    "lesson.upload.title": "Yükleme",
    "lesson.upload.subtitle": "Yükleme Notları",
    "lesson.prepositions.title": "Edatlı Fiiller",
    "lesson.prepositions.subtitle": "Edatlı Fiiller",
    "lesson.fixedprepositions.title": "Sabit Edatlı Fiiller",
    "lesson.fixedprepositions.subtitle": "Sabit Edatlı Fiiller",
    "lesson.a1.title": "A1 Öğrenme",
    "lesson.a1.subtitle": "A1 Fiiller, Dilbilgisi ve Quiz",
    "lesson.quiz.title": "Quiz",
    "lesson.quiz.subtitle": "Kelime Testi, Kelimeleri Eşleştir",
    "lesson.grammar.title": "Dilbilgisi",
    "lesson.grammar.subtitle": "Dilbilgisi Alıştırmaları",
    "lesson.wordtraining.title": "Kelime Eğitimi",
    "lesson.wordtraining.subtitle": "Kelimeleri Çalış",
    "lesson.coming.title": "Daha fazla özellik yakında!",
    "lesson.coming.subtitle": "Daha fazla özellik yakında!",
    "lesson.link": "Derse git",
    "section3.heading": "İlerlemen",
    "section4.heading": "Bize Ulaşın",
    "contact.name.placeholder": "İsim (henüz çalışmıyor)",
    "contact.email.placeholder": "E-posta (henüz çalışmıyor)",
    "contact.message.placeholder": "Mesaj (henüz çalışmıyor)",
    "contact.submit": "Gönder",
    "footer.copyright": "Telif hakkı © 2024 AA Deutsch. Tüm hakları saklıdır",
    "login.email.placeholder": "E-posta veya telefon numarası",
    "login.password.placeholder": "Şifre",
    "login.submit": "Giriş Yap",
    "login.help": "Giriş yaparken sorun mu yaşıyorsun?",
    "login.or": "veya",
    "login.signup": "Kayıt Ol",
    "signup.login": "Giriş Yap",
    "signup.subtitle": "İnsanların neden Almanca öğrendiğini kendin gör.",
    "signup.heading": "AA Deutsch'a kaydol, ücretsizdir",
    "signup.choose": "İki hesap türünden birini seç:",
    "signup.premium.title": "Premium Hesap",
    "signup.premium.description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus minima, incidunt beatae veritatis ad delectus temporibus eaque enim ea!",
    "signup.free.title": "Ücretsiz Hesap",
    "signup.free.description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus minima, incidunt beatae veritatis ad delectus temporibus eaque enim ea!",
    "signup.continue": "Devam et"
  }
};

const fallbackLanguage = "en";
const languageSelect = document.getElementById("language-select");

const applyTranslations = (lang) => {
  const effectiveLanguage = translations[lang] ? lang : fallbackLanguage;
  document.documentElement.lang = effectiveLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation =
      translations[effectiveLanguage][key] ?? translations[fallbackLanguage][key];
    if (translation) {
      element.textContent = translation;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const translation =
      translations[effectiveLanguage][key] ?? translations[fallbackLanguage][key];
    if (translation) {
      element.setAttribute("placeholder", translation);
    }
  });

  document.querySelectorAll("[data-i18n-value]").forEach((element) => {
    const key = element.getAttribute("data-i18n-value");
    const translation =
      translations[effectiveLanguage][key] ?? translations[fallbackLanguage][key];
    if (translation) {
      element.value = translation;
    }
  });

  document.querySelectorAll("[data-i18n-option]").forEach((element) => {
    const key = element.getAttribute("data-i18n-option");
    const translation =
      translations[effectiveLanguage][key] ?? translations[fallbackLanguage][key];
    if (translation) {
      element.textContent = translation;
    }
  });
};

if (languageSelect) {
  const storedLanguage =
    localStorage.getItem("aa-deutsch-language") || languageSelect.value || fallbackLanguage;
  const availableLanguages = Array.from(languageSelect.options).map((option) => option.value);
  const initialLanguage = availableLanguages.includes(storedLanguage)
    ? storedLanguage
    : fallbackLanguage;
  languageSelect.value = initialLanguage;
  applyTranslations(initialLanguage);

  languageSelect.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem("aa-deutsch-language", selectedLanguage);
    applyTranslations(selectedLanguage);
  });
} else {
  applyTranslations(fallbackLanguage);
}

window.addEventListener("scroll", () => {
  mainFn();
});

// Pages
document.querySelectorAll('.logo-img').forEach(logo => {
  logo.addEventListener('click', () => {
      document.querySelector('.front-page').style.display = 'block'
      document.querySelector('.login-page').style.display = 'none'
      document.querySelector('.signup-page').style.display = 'none'
  })
})

document.querySelectorAll('.login').forEach(loginBtn => {
  loginBtn.addEventListener('click', () => {
      document.querySelector('.front-page').style.display = 'none'
      document.querySelector('.login-page').style.display = 'block'
      document.querySelector('.signup-page').style.display = 'none'
  })
})

document.querySelectorAll('.signup').forEach(signupBtn => {
  signupBtn.addEventListener('click', () => {
      document.querySelector('.front-page').style.display = 'none'
      document.querySelector('.login-page').style.display = 'none'
      document.querySelector('.signup-page').style.display = 'flex'
  })
})
// End of Pages

const mainFn = () => {
  if (window.scrollY >= navbarOffsetTop1) {
    navbar1.classList.add("sticky");
  } else {
    navbar1.classList.remove("sticky");
  }
  if (window.scrollY >= navbarOffsetTop2) {
    navbar2.classList.add("sticky");
  } else {
    navbar2.classList.remove("sticky");
  }

  sections.forEach((section, i) => {
    if (window.scrollY >= section.offsetTop - 10) {
      navbarLinks.forEach((navbarLink) => {
        navbarLink.classList.remove("change");
      });
      navbarLinks[i].classList.add("change");
    }
  });

  if (window.scrollY + window.innerHeight >= progress.offsetTop) {
    document.querySelectorAll(".progress-percent").forEach((el, i) => {
      el.style.width = `${progressBarPercents[i]}%`;
      el.previousElementSibling.firstElementChild.textContent =
        progressBarPercents[i];
    });
  }
};

mainFn();
