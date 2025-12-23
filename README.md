# FitAI - AI Fitness Coach

An AI-powered fitness web application that generates personalized workout plans, diet suggestions, exercise images, and voice guidance using modern AI APIs, with smart client-side caching for performance and cost optimization.

---

## Features

- **AI-Generated Fitness Plans**

  - Personalized workout plans based on user input
  - Structured JSON output for easy UI rendering

- **AI Exercise & Diet Images**

  - Dynamic image generation using Pollinations API
  - Cached images to avoid regeneration and improve speed

- **Text-to-Speech Voice Guidance**

  - Converts workout instructions and diet plans into audio
  - Cached voice output to prevent repeated API calls to ElevenLabs

- **Client-Side Caching**

  - Fitness plans cached in `localStorage`
  - Images cached via URL reuse
  - Audio cached as Base64 for instant replay

- 🎨 **Modern Animated UI**
  - Responsive design with Tailwind CSS
  - Smooth animations using Framer Motion
  - Shadcn/ui cards and transitions

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Framer Motion
- Shadcn/ui

### AI & APIs

- Google Gemini – Fitness plan generation
- Pollinations AI – Image generation
- Text-to-Speech API (ElevenLabs)

### Storage & Optimization

- localStorage – Cached plans, images, and audio
