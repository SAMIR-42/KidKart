// track.js - Handles Order Tracking Animation

const steps = document.querySelectorAll(".step");
const simulateBtn = document.getElementById("simulateBtn");

simulateBtn.addEventListener("click", () => {
  // Reset all steps
  steps.forEach((step) => step.classList.remove("active"));

  let current = 0;
  const interval = setInterval(() => {
    if (current < steps.length) {
      steps[current].classList.add("active");
      current++;
    } else {
      clearInterval(interval);
    }
  }, 1000); // Activate next step every 1 second
});
