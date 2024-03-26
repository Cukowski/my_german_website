const navbar1 = document.querySelector(".navbar-1");
const navbarOffsetTop1 = navbar1.offsetTop;
const navbar2 = document.querySelector(".navbar-2");
const navbarOffsetTop2 = navbar2.offsetTop;
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar-link");
const progress = document.querySelector(".progress-bars-wrapper");
const progressBarPercents = [90, 80, 70, 60, 50, 40, 30];

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