// Dynamic Nav Menu using Object approach
const app = {
  sections: document.querySelectorAll("section"),
  ul: document.querySelector("#navbar__list"),
  fragment: document.createDocumentFragment(), //performance enhancment
  // build Nav Menu
  navMenu() {
    app.sections.forEach((section) => {
      const sectionName = section.dataset.nav;
      const sectionId = section.id;
      // create li Element
      const item = document.createElement("li");

      // create an a Element inside li
      const link = document.createElement("a");
      link.setAttribute("href", "#", sectionId);
      link.setAttribute("class", "menu__link");
      link.textContent = sectionName;
      // Scroll to section on link click with smooth behavior
      link.addEventListener("click", (event) => {
        event.preventDefault();
        section.scrollIntoView({
          behavior: "smooth",
        });
      });
      item.appendChild(link);
      app.fragment.appendChild(item);
    });
    app.ul.appendChild(app.fragment);
  },
  // Add class 'active' to section when near top of viewport
  highlight() {
    // Select all anchor using "a.menu__link" class
    const links = document.querySelectorAll("a.menu__link");
    app.sections.forEach((section) => {
      //Get the boundingrect for each section
      const top = section.getBoundingClientRect().top;
      section.classList.remove("your-active-class");
      //Check if the section is in viewport or not
      if (top > 0 && top < 300) {
        //add 'your-active-class' and 'active-link' classes to the specific section
        section.classList.add("your-active-class");
        links.forEach((link) => {
          if (link.textContent === section.dataset.nav) {
            link.classList.add("active-link");
          }
          //Remove both section and navButton active classes when section is off sight
          else {
            link.classList.remove("active-link");
          }
        });
      } else {
        section.classList.remove("your-active-class");
      }
    });
  },
};

// load dynamic navbar menu
window.addEventListener("load", app.navMenu);
// highlight section when scroll
window.addEventListener("scroll", app.highlight);
