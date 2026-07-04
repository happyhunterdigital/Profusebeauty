# Project-Scoped Rules

### HTML5 Video & Cloudinary Best Practices
When embedding auto-playing background or showcase videos:
1. **Explicit Booleans**: Always use explicit boolean attributes in React (`autoPlay={true}`, `muted={true}`, `playsInline={true}`, `loop={true}`) instead of shorthand, to satisfy strict mobile browser auto-play policies.
2. **Preload & Source**: Always include `preload="auto"` and use a nested `<source src="..." type="video/mp4" />` tag rather than a direct `src` attribute on the video tag.
3. **Cloudinary Optimization**: When using Cloudinary URLs, always inject `q_auto,f_auto` into the URL path (e.g., `/upload/q_auto,f_auto/v...`) to ensure optimal format delivery and prevent codec-related black screens.
