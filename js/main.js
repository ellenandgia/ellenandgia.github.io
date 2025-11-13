// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
  const faqContainer = document.querySelector('.faq-content');

  faqContainer.addEventListener('click', (e) => {
    const groupHeader = e.target.closest('.faq-group-header');

    if (!groupHeader) return;

    const group = groupHeader.parentElement;
    const groupBody = group.querySelector('.faq-group-body');
    const icon = groupHeader.querySelector('i');

    // Toggle icon
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');

    // Toggle visibility of body text
    groupBody.classList.toggle('open');

    // Close other open FAQ body texts
    const otherGroups = faqContainer.querySelectorAll('.faq-group');

    otherGroups.forEach((otherGroup) => {
      if (otherGroup !== group) {
        const otherGroupBody = otherGroup.querySelector('.faq-group-body');
        const otherIcon = otherGroup.querySelector('.faq-group-header i');  
        
        otherGroupBody.classList.remove('open');
        otherIcon.classList.remove('fa-minus');
        otherIcon.classList.add('fa-plus');
      }
    });

  })
});



// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.hamburger-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburgerButton.addEventListener('click', () => 
    mobileMenu.classList.toggle('active')
  );

  // make menu disappear after going to new section
  mobileMenu.addEventListener('click', () => 
    mobileMenu.classList.remove('active')
  );

});



// Countdown Timer
  const targetDate = new Date("2026-05-30T17:00:00").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const gap = targetDate - now;

    if (gap < 0) {
      // document.querySelector(".countdown").innerHTML = "<p class=time-finished>🎉 It's time! 🎉</p>";
      // return;
      gap = 0;
    }

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const days = Math.floor(gap / day);
    const hours = Math.floor((gap % day) / hour);
    const minutes = Math.floor((gap % hour) / minute);
    const seconds = Math.floor((gap % minute) / second);

    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
  };

  updateCountdown(); // Run immediately
  setInterval(updateCountdown, 1000); // Update every second


// Photo gallery with slide + fade animations

let slideIndex = 1;       // 1-based index of current slide
let isAnimating = false;

// Next/previous controls
function plusSlides(n) {
  if (isAnimating) return;
  const direction = n > 0 ? 1 : -1;
  goToSlide(slideIndex + n, direction);
}

// Thumbnail controls (n is 1-based)
function currentSlide(n) {
  if (isAnimating || n === slideIndex) return;
  const direction = n > slideIndex ? 1 : -1;
  goToSlide(n, direction);
}

function goToSlide(targetIndex, direction) {
  const slides = document.getElementsByClassName("mySlides");
  const dots   = document.getElementsByClassName("demo");

  if (!slides.length) return;

  const numSlides = slides.length;

  // Wrap around
  if (targetIndex > numSlides) targetIndex = 1;
  if (targetIndex < 1)         targetIndex = numSlides;

  const oldIndex = slideIndex;
  const newIndex = targetIndex;

  if (oldIndex === newIndex) return;

  const oldSlide = slides[oldIndex - 1];
  const newSlide = slides[newIndex - 1];

  const offsetIn  = direction > 0 ? 100 : -100; // where new slide starts
  const offsetOut = -offsetIn;                  // where old slide exits

  isAnimating = true;

  // Prep new slide off-screen
  newSlide.style.transition = "none";
  newSlide.style.transform = `translateX(${offsetIn}%)`;
  newSlide.style.opacity = "1";

  // Force reflow so browser registers the starting state
  void newSlide.offsetWidth;

  // Re-enable CSS transitions
  newSlide.style.transition = "";
  oldSlide.style.transition = "";

  // Animate old slide out + fade
  oldSlide.style.transform = `translateX(${offsetOut}%)`;
  oldSlide.style.opacity = "0";

  // Animate new slide in + fade
  newSlide.style.transform = "translateX(0)";
  newSlide.style.opacity = "1";

  // Update thumbnails (dots)
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (dots[newIndex - 1]) {
    dots[newIndex - 1].className += " active";
  }

  // Unlock animation after transition completes on the old slide
  const onTransitionEnd = (e) => {
    if (e.propertyName === "transform" || e.propertyName === "opacity") {
      isAnimating = false;
      oldSlide.removeEventListener("transitionend", onTransitionEnd);
    }
  };

  oldSlide.addEventListener("transitionend", onTransitionEnd);

  slideIndex = newIndex;
}
