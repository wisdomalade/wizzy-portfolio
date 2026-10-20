"use strict";

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (menuToggle && navLinks) {
  const setMenuOpen = (isOpen) => {
    navLinks.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    const icon = menuToggle.querySelector(".menu-icon");
    if (icon) icon.textContent = isOpen ? "✕" : "☰";
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (
      menuToggle.getAttribute("aria-expanded") === "true" &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) setMenuOpen(false);
  });
}
