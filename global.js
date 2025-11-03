
// Simple 3-card rotator: clicking dot rotates cards so that
// dot 0 -> [0,1,2], dot 1 -> [1,2,0], dot 2 -> [2,0,1]
(function() {
  const container = document.querySelector('.intro-cards');
  if (!container) return;
  let cards = Array.from(container.querySelectorAll('.card'));
  if (cards.length !== 3) return;

  const dots = Array.from(document.querySelectorAll('.slider-dots .dot'));
  function setRotation(rot) {
    // Remove existing cards then re-append in rotated order
    const order = [0,1,2].map((_, i) => (i + rot) % 3);
    const newOrder = [cards[order[0]], cards[order[1]], cards[order[2]]];

    // Clear large class
    cards.forEach(c => c.classList.remove('card-large'));
    // The center card is index 1
    newOrder[1].classList.add('card-large');

    // Re-append to update visual order
    newOrder.forEach(c => container.appendChild(c));

    // Update active dot
    dots.forEach((d, i) => d.classList.toggle('active', i === rot));
  }

  // Attach handlers
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const rot = parseInt(dot.getAttribute('data-rot') || '0', 10);
      setRotation(rot);
    });
  });

  // Initialize
  setRotation(0);
})();
