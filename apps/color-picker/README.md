# Color Picker - Interactive Color Palette Generator

A sleek and intuitive React application that helps you discover beautiful color palettes! This project demonstrates modern React patterns including Context API, TypeScript, and CSS modules.


## TODOS
- [ ] Add unit tests for color palette generation logic
- [ ] Implement "Copy All Colors" button for quick copying of palette
- [ ] Add accessibility improvements (keyboard navigation, ARIA labels)
- [ ] Support saving and loading favorite palettes (localStorage)
- [ ] Add option to export palettes as images (PNG/SVG)
- [ ] Improve mobile responsiveness and touch support
- [ ] Add dark/light theme toggle
- [ ] Write documentation for custom hooks and context usage
- [ ] Refactor color scheme logic for easier extension
- [ ] Polish UI with subtle animations and transitions


## Features

- **Interactive Color Selection**: Pick any color using the native color picker
- **Multiple Color Schemes**: Generate palettes using various color theory schemes:
  - Monochrome (light, dark, and regular)
  - Analogic
  - Complementary
  - Analogic-complementary
  - Triadic
- **Real-time Palette Generation**: Instantly see 5 harmonious colors based on your selection
- **Clean, Modern UI**: Responsive design with smooth interactions
- **Color Code Display**: Each generated color shows its hex code for easy copying

## How It Works

1. **Choose Your Base Color**: Use the color picker to select your starting color
2. **Select a Scheme**: Pick from 7 different color harmony schemes
3. **Generate Magic**: Click "Générer une palette" to create your perfect palette
4. **Copy & Use**: Each color displays its hex code for easy integration into your projects

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **CSS Modules** for scoped styling
- **Context API** for state management
- **External Color API** for professional color theory algorithms

## Perfect For

- **Designers** looking for inspiration
- **Developers** needing color schemes for projects
- **Anyone** who loves playing with colors!

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173` (or your Vite default port).

## API

Get your API key from [https://www.thecolorapi.com/] and add it to your `.env` file following the `.env.local` example.