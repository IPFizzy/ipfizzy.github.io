/* === Greeting Bubble === */

// Get time-based greeting text
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning,";
  if (hour < 18) return "Good afternoon,";
  return "Good evening,";
}

// Insert greeting into the bubble element
function displayGreeting() {
  const greetingEl = document.getElementById("greeting-bubble");
  if (greetingEl) {
    greetingEl.textContent = getGreeting() + " I'm Keon!";
  }
}

// Wait for page to load before inserting greeting
document.addEventListener("DOMContentLoaded", displayGreeting);

// === Bible Verse Popup (jQuery version) ===

// Store Bible verse data keyed by reference
const verseData = {
  "John 14:6": `"Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.”" – John 14:6 (NIV)`,
  "Romans 10:9": `"If you declare with your mouth, ‘Jesus is Lord,’ and believe in your heart that God raised him from the dead, you will be saved." – Romans 10:9 (NIV)`,
  "Ephesians 2:8-9": `"For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast." – Ephesians 2:8–9 (NIV)`,
  "2 Timothy 3:16": `"All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness." – 2 Timothy 3:16 (NIV)`,
  "Galatians 2:20": `"I have been crucified with Christ and I no longer live, but Christ lives in me..." – Galatians 2:20 (NIV)`,
};

// Wait for DOM to be fully loaded
$(document).ready(function () {
  // Style clickable Bible verse elements
  $(".bible-verse").css({
    cursor: "pointer", // Show pointer on hover
    color: "#0066cc", // Use consistent blue text
  });

  // When any verse is clicked
  $("body").on("click", ".bible-verse", function (e) {
    e.stopPropagation(); // Prevent click from closing popup
    $("#verse-popup").remove(); // Remove any previous popup

    const ref = $(this).data("reference"); // Get reference key
    const verse = verseData[ref] || "Verse not found."; // Fetch verse text

    // Build popup HTML using jQuery
    const popup = $(`
      <div id="verse-popup" class="verse-popup">
        <div>${verse}</div>
        <button class="close-btn" title="Close popup">×</button>
      </div>
    `);

    // Append popup to body
    $("body").append(popup);

    // Position popup directly below clicked verse
    const offset = $(this).offset();
    popup.css({
      top: offset.top + $(this).outerHeight() + 6, // 6px spacing below verse
      left: offset.left, // Align to left edge
    });
  });

  // Global click: remove popup if clicking anywhere else on page
  $(document).on("click", function () {
    $("#verse-popup").remove();
  });

  // Close button click: manually close the popup
  $("body").on("click", ".close-btn", function () {
    $("#verse-popup").remove();
  });
});