/**
 * Main logical script for the "Nembak Cewe" interaction.
 * Handles the "Mau" (Yes) and "Gamau" (No) button behaviors,
 * including the runaway effect and confetti animation.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the interactive background
  createFloatingHearts();

  // DOM Elements
  const btnMau = document.getElementById("btn_mau");
  const btnGamau = document.getElementById("btn_gamau");

  /**
   * Event Listener for the "Mau" (Yes) button.
   * Triggers confetti and a success popup.
   */
  btnMau.addEventListener("click", () => {
    // Trigger Confetti Explosion
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#ff8fa3", "#ffe6eb"],
    });

    // Show SweetAlert2 Success Message
    Swal.fire({
      title: "I knew it! ❤️",
      text: "Makasih udah mau terima aku. See you soon, sayang! 😘",
      imageUrl: "assets/img/cute-couple.png",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Cute couple",
      confirmButtonText: "Chat Aku Sekarang 💌",
      confirmButtonColor: "#ff4d6d",
      background: "#fff0f3",
      backdrop: `
                rgba(0,0,123,0.4)
                url("https://media.tenor.com/images/f38234383c316af9351e97669d6757b4/tenor.gif")
                left top
                no-repeat
            `,
    }).then((result) => {
      if (result.isConfirmed) {
        // Optional: Redirect to WhatsApp
        // window.location.href = "https://wa.me/628xxxxxxxxxx";
        location.reload();
      }
    });
  });

  /**
   * Event Listeners for the "Gamau" (No) button.
   * Making the button run away on hover or touch.
   */

  // Desktop: Run away on mouse over
  btnGamau.addEventListener("mouseover", moveButton);

  // Mobile: Prevent tap and run away on touch start
  btnGamau.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveButton();
  });

  // Fallback: Prevent click and run away
  btnGamau.addEventListener("click", (e) => {
    e.preventDefault();
    moveButton();
  });

  /**
   * Moves the "Gamau" button to a random position within the viewport.
   * Ensures the button stays fully visible within the window.
   */
  function moveButton() {
    // Get viewport dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Get button dimensions
    const btnRect = btnGamau.getBoundingClientRect();

    // Calculate safe area (viewport - button size - padding)
    const maxX = windowWidth - btnRect.width - 20;
    const maxY = windowHeight - btnRect.height - 20;

    // Generate random coordinates
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Apply new position using fixed positioning
    btnGamau.style.position = "fixed";
    btnGamau.style.left = randomX + "px";
    btnGamau.style.top = randomY + "px";
  }

  /**
   * Creates floating heart elements in the background for atmosphere.
   */
  function createFloatingHearts() {
    const heartsContainer = document.querySelector(".bg-hearts");
    const heartSymbols = ["❤️", "💖", "💘", "💝", "💓"];

    // Create 20 random hearts
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart-bg");
      heart.innerText =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

      // Randomize position and animation properties
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 5 + 10 + "s"; // Between 10-15s
      heart.style.fontSize = Math.random() * 20 + 20 + "px"; // Between 20-40px
      heart.style.animationDelay = Math.random() * 5 + "s";

      heartsContainer.appendChild(heart);
    }
  }
});
