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
  const targetDate = new Date("2026-05-30T16:00:00").getTime();

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
