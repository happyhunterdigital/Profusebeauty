# Project-Scoped Rules

### HTML5 Video & Cloudinary Best Practices
When embedding auto-playing background or showcase videos:
1. **Explicit Booleans**: Always use explicit boolean attributes in React (`autoPlay={true}`, `muted={true}`, `playsInline={true}`, `loop={true}`) instead of shorthand, to satisfy strict mobile browser auto-play policies.
2. **Preload & Source**: Always include `preload="auto"` and use a nested `<source src="..." type="video/mp4" />` tag rather than a direct `src` attribute on the video tag.
3. **Cloudinary Optimization**: When using Cloudinary URLs, always inject `q_auto,f_auto` into the URL path (e.g., `/upload/q_auto,f_auto/v...`) to ensure optimal format delivery and prevent codec-related black screens.

### Seamless Framer Motion Carousel Transitions
When building image or video carousels/sliders:
1. **Pre-render Stacked Slides**: Avoid mounting/unmounting slides dynamically (e.g., using `AnimatePresence` with conditionally rendered indices). Instead, render all images/videos stacked absolutely inside a relative container.
2. **Direct Opacity Crossfade**: Control slide transitions by animating their `opacity` property directly (e.g., `animate={{ opacity: activeIndex === idx ? 1 : 0 }}`). This overlays the incoming slide directly over the outgoing one, preventing any black background or blank flashes during the transition.
