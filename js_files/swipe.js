// Variables to track touch start and end positions
let startX;
let endX;

// Add event listeners for touch events
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

// Function to handle touch start event
function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

// Function to handle touch move event
function handleTouchMove(event) {
    endX = event.touches[0].clientX;
}

// Function to determine swipe direction
function detectSwipe() {
    if (startX && endX) {
        let deltaX = endX - startX;
        if (deltaX > 0) {
            // Swipe right
            previousWord();
        } else if (deltaX < 0) {
            // Swipe left
            nextWord();
        }
    }
}

// Add event listener for touch end event
document.addEventListener('touchend', detectSwipe, false);
