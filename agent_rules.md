# LookRides Redesign: Agent Rules & Guidelines

These rules dictate the behavior and coding standards for the AI agent during the LookRides redesign project.

## 1. Design & Aesthetics (CRITICAL)
- **Visual Excellence:** The UI must evoke a "WOW" reaction. Use modern web design best practices: vibrant but professional colors, sleek dark modes, glassmorphism, and smooth gradients.
- **Dynamic Interaction:** The interface must feel alive. Implement hover effects, transitions, and micro-animations for all interactive elements (buttons, cards, inputs).
- **Premium Feel:** Avoid generic colors (plain red, blue, green). Use curated HSL color palettes and modern typography (e.g., Inter, Outfit).
- **No Placeholders:** Never use placeholder images (like `via.placeholder.com`). Use the `generate_image` tool to create realistic, high-quality assets for the fleet and backgrounds.

## 2. Technology Stack
- **Structure & Logic:** Use standard HTML for structure and JavaScript/React for logic.
- **Styling:** Use **Vanilla CSS**. Do NOT use Tailwind CSS unless the user explicitly requests it. Create a robust `index.css` or modular CSS system with predefined design tokens (variables).
- **Framework:** Utilize a modern framework like **Next.js** (preferred for its SEO capabilities) or Vite, as this is a complex business application requiring multi-page architecture and strong search engine visibility.

## 3. Implementation Workflow
1. **Foundation:** Establish the core design system (colors, typography, spacing) in CSS first.
2. **Components:** Build reusable, encapsulated UI components based on the design system.
3. **Assembly:** Construct pages using the components, ensuring responsive layouts for all screen sizes (mobile-first approach).
4. **Integration:** Implement the booking form logic without redirecting users to external domains.

## 4. SEO Requirements
- **Tags:** Automatically implement proper Title and Meta Description tags for every page.
- **Structure:** Enforce a strict single `<h1>` tag per page and logical heading hierarchy (`<h2>`, `<h3>`).
- **Semantics:** Use HTML5 semantic elements correctly.
- **Accessibility:** Ensure all interactive elements have unique IDs and proper ARIA labels where necessary.

## 5. Code Quality
- Keep components focused and modular.
- Avoid inline styles.
- Maintain clean, well-documented code.
