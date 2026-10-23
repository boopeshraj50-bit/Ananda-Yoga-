// Navigation, program selection and enquiry form interactions.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll(".select-program").forEach((button) => {
  button.addEventListener("click", () => {
    const select = document.getElementById("programSelect");
    const chosen = button.dataset.program;
    const matchingOption = Array.from(select.options).find((option) => option.text === chosen);
    if (matchingOption) select.value = matchingOption.value;
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    document.getElementById("name").focus({ preventScroll: true });
  });
});

const form = document.getElementById("enquiryForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const program = String(formData.get("program"));
  const message = String(formData.get("message") || "").trim();

  const subject = encodeURIComponent(`Yoga program enquiry: ${program}`);
  const body = encodeURIComponent(
    `Hello Ananda Yoga Studio,\n\nMy name is ${name}.\nEmail: ${email}\nProgram of interest: ${program}\n\nMessage:\n${message || "I would like to know more about this program."}\n\nThank you.`
  );

  status.textContent = "Your email app should open with the enquiry prepared. Review it before sending.";
  // Replace the demo address in index.html with a real address before publishing.
  window.location.href = `mailto:hello@anandayoga.example?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
