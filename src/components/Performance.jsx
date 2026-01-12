// Import React hook to create mutable references to DOM elements
import { useRef } from "react";

// Hook provided by GSAP React plugin to run animations safely in React lifecycle
import { useGSAP } from "@gsap/react";

// Core GSAP animation library
import { gsap } from "gsap";

// Import image data and their target positions from constants file
import {
  performanceImages,
  performanceImgPositions,
} from "../constants/index.js";

// Hook to detect screen size using media queries
import { useMediaQuery } from "react-responsive";

// Functional React component
const Performance = () => {
  // Check if screen width is 1024px or less (mobile/tablet)
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  // Reference to the <section> DOM element
  const sectionRef = useRef(null);

  // Run GSAP animations when component mounts or when dependencies change
  useGSAP(
    () => {
      // Get actual DOM element from ref
      const sectionEl = sectionRef.current;
      if (!sectionEl) return; // Safety check

      // -------------------------------
      // TEXT ANIMATION
      // -------------------------------

      // Animate paragraph from invisible + slightly down to visible + normal position
      gsap.fromTo(
        ".content p", // Target element
        { opacity: 0, y: 10 }, // Starting state
        {
          opacity: 1, // End fully visible
          y: 0, // End at original position
          ease: "power1.out", // Smooth easing
          scrollTrigger: {
            // Trigger animation on scroll
            trigger: ".content p", // Element that triggers animation
            start: "top bottom", // When top of p hits bottom of viewport
            end: "top center", // When top of p hits center of viewport
            scrub: true, // Sync animation with scroll
            invalidateOnRefresh: true, // Recalculate on resize/refresh
          },
        }
      );

      // If device is mobile, skip heavy image animations
      if (isMobile) return;

      // -------------------------------
      // IMAGE POSITIONING TIMELINE
      // -------------------------------

      // Create a GSAP timeline controlled by scroll
      const tl = gsap.timeline({
        defaults: {
          duration: 2, // Default animation duration
          ease: "power1.inOut", // Smooth in and out
          overwrite: "auto", // Avoid conflicting tweens
        },
        scrollTrigger: {
          trigger: sectionEl, // Section controls the animation
          start: "top bottom", // Start when section enters viewport
          end: "bottom top", // End when section leaves viewport
          scrub: 1, // Tie timeline to scroll
          invalidateOnRefresh: true, // Recalculate positions on resize
        },
      });

      // Loop through image position config
      performanceImgPositions.forEach((item) => {
        // Skip image with id "p5"
        if (item.id === "p5") return;

        // Build class selector like ".p1", ".p2", etc.
        const selector = `.${item.id}`;

        // Object to store animation properties
        const vars = {};

        // If left position exists, set it in %
        if (typeof item.left === "number") vars.left = `${item.left}%`;

        // If right position exists, set it in %
        if (typeof item.right === "number") vars.right = `${item.right}%`;

        // If bottom position exists, set it in %
        if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

        // If transform exists (like rotate/scale), apply it
        if (item.transform) vars.transform = item.transform;

        // Animate this image to its final position at timeline start
        tl.to(selector, vars, 0);
      });
    },
    {
      scope: sectionRef, // Limit GSAP selectors to this section only
      dependencies: [isMobile], // Re-run animation logic when screen size changes
    }
  );

  // -------------------------------
  // JSX UI RENDER
  // -------------------------------

  return (
    // Main section with ref for GSAP
    <section id="performance" ref={sectionRef}>
      {/* Section heading */}
      <h2>Next-level graphics performance. Game on.</h2>

      {/* Wrapper that holds all performance images */}
      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img
            key={index} // React list key
            src={item.src} // Image source
            className={item.id} // Class used for GSAP targeting
            alt={item.alt || `Performance Image #${index + 1}`} // Accessibility text
          />
        ))}
      </div>

      {/* Text content area */}
      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

// Export component so it can be used in other files
export default Performance;
