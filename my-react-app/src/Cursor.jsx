// Import dependencies.
import { useEffect } from 'react'; // Import React's useEffect hook.
import './Cursor.css'; // Import the custom CSS file for cursor styling


// Define the functional component named Cursor.
function Cursor() {

    // useEffect runs once when the component mounts (empty dependency array)
    useEffect(() => {

        // Select the DOM element that represents the cursor elements.
        const cursorDot = document.querySelector("[data-cursor-dot]"); // Select the DOM element that represents the cursor dot.
        const cursorOutline = document.querySelector("[data-cursor-outline]"); // Select the DOM element that represents the cursor outline.

        // Define the mousemove event handler.
        const handleMouseMove = (event) => {

            // Get the mouse position.
            const posX = event.clientX; // Get the horizontal mouse position in the viewport.
            const posY = event.clientY; // Get the vertical mouse position in the viewport.

            // Directly set the cursor dot to follow the exact mouse position
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Animate the outline from its current position to the new mouse position.
            cursorOutline.animate(
                [
                    { left: cursorOutline.style.left, top: cursorOutline.style.top }, // From: current left and top style values.
                    { left: `${posX}px`, top: `${posY}px` } // To: target position.
                ],
                {
                    duration: 400, // Duration of the animation in milliseconds.
                    fill: "forwards", // Keep the final position after the animation ends.
                    easing: "ease-out" // Use a smooth ease-out motion.
                }
            );
        };

        // Add the mousemove event listener to the whole window.
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup: remove the event listener when the component unmounts.
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };

    }, []); // Empty dependency array means this effect runs only once.

    // Return the cursor dot and outline elements as JSX.
    return (
        <>
            <div className="cursor-dot" data-cursor-dot></div>
            <div className="cursor-outline" data-cursor-outline></div>
        </>
    );
}


// Export the Cursor component.
export default Cursor;