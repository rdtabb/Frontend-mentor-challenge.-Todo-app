let darkMode = localStorage.getItem("darkMode");
localStorage.setItem("darkMode", "enabled");

const body = document.querySelector("body");
const themeToggle = document.getElementById("theme-toggle");

const enableDarkMode = () => {
  body.classList.remove("light");
  body.setAttribute("data-theme", "dark");
  themeToggle.classList.remove("primary-header__button--dark-theme");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  body.classList.add("light");
  body.setAttribute("data-theme", "light");
  themeToggle.classList.add("primary-header__button--dark-theme");
  localStorage.setItem("darkMode", "disabled");
};

if (darkMode == "enabled") {
  enableDarkMode()
} else {
  disableDarkMode()
}

themeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode == "enabled") {
    disableDarkMode()
  } else if (darkMode == "disabled") {
    enableDarkMode()
  }
});