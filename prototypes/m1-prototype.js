(() => {
  "use strict";

  const closeDetails = (details, restoreFocus = false) => {
    if (!details.open) return;
    details.open = false;
    if (restoreFocus) details.querySelector("summary")?.focus();
  };

  document.querySelectorAll("[data-mobile-nav], [data-mobile-toc]").forEach((details) => {
    details.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !details.open) return;
      event.preventDefault();
      closeDetails(details, true);
    });

    details.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeDetails(details));
    });
  });

  document.querySelectorAll("[data-review-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const className = button.dataset.reviewToggle;
      const isPressed = button.getAttribute("aria-pressed") === "true";
      document.body.classList.toggle(className, !isPressed);
      button.setAttribute("aria-pressed", String(!isPressed));
    });
  });

  document.querySelectorAll("[data-source-ref]").forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      requestAnimationFrame(() => target.focus({ preventScroll: true }));
    });
  });

  const tocLinks = [...document.querySelectorAll(".toc a[href^='#']")];
  const tocSections = [...new Set(tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean))];

  if ("IntersectionObserver" in window && tocSections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

      if (!visible) return;
      const activeHash = "#" + visible.target.id;
      tocLinks.forEach((link) => {
        if (link.getAttribute("href") === activeHash) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }, {
      rootMargin: "-18% 0px -68% 0px",
      threshold: 0
    });

    tocSections.forEach((section) => observer.observe(section));
  }

  const setStatus = (form, message) => {
    const status = form.querySelector("[role='status']");
    if (status) status.textContent = message;
  };

  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    const email = form.querySelector("input[type='email']");
    const consent = form.querySelector("#email-consent");
    const topic = form.querySelector("textarea");

    const clearPairingError = () => {
      consent?.setCustomValidity("");
      email?.setCustomValidity("");
      setStatus(form, "");
    };

    email?.addEventListener("input", clearPairingError);
    consent?.addEventListener("change", clearPairingError);
    topic?.addEventListener("input", () => setStatus(form, ""));

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearPairingError();

      if (form.dataset.formKind === "reader-request") {
        if (email?.value && !consent?.checked) {
          consent.setCustomValidity("Consent is required when an email address is entered.");
        }
        if (!email?.value && consent?.checked) {
          email.setCustomValidity("Enter an email address or clear the reply consent.");
        }
      }

      if (!form.reportValidity()) {
        setStatus(form, "Check the highlighted field. Nothing has been sent.");
        return;
      }

      const message = form.dataset.formKind === "reader-request"
        ? "Prototype request accepted locally. Nothing was sent or stored."
        : "Prototype signup accepted locally. Nothing was sent or stored.";
      setStatus(form, message);
    });
  });

  const fontReport = document.querySelector("[data-font-report]");
  if (fontReport) {
    let fontFaceCount = 0;
    [...document.styleSheets].forEach((sheet) => {
      try {
        fontFaceCount += [...sheet.cssRules]
          .filter((rule) => rule.type === CSSRule.FONT_FACE_RULE).length;
      } catch {
        // The M1 prototype has local same-origin CSS; keep the report usable if that changes.
      }
    });
    fontReport.textContent = "Project @font-face rules: " + fontFaceCount +
      ". Named targets in computed CSS are stacks, not proof of the glyph used. Confirm the rendered font in developer tools.";
  }
})();
