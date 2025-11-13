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
