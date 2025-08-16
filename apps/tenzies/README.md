# 🎲 Tenzies - A React Dice Game

Welcome to **Tenzies**, a fun and addictive dice game built with React and TypeScript! This project is part of my React practices and demonstrates modern React concepts like hooks, state management, and component composition.

## 🎮 How to Play

**Tenzies** is a dice game where the goal is simple: roll the dice until all 10 dice show the same number!

### Game Rules:
1. **Start**: You begin with 10 dice showing random numbers (1-9)
2. **Roll**: Click the "Roll" button to randomize all unfrozen dice
3. **Freeze**: Click on any dice to "freeze" its value - it won't change on future rolls
4. **Strategy**: You can only freeze dice that match the first value you choose to freeze
5. **Win**: Get all 10 dice to show the same number to win! 🎉

### Key Features:
- **Interactive Dice**: Click to freeze/unfreeze dice values
- **Confetti Celebration**: Beautiful confetti animation when you win!
- **Smart Rolling**: Only unfrozen dice change when you roll
- **Strategic Gameplay**: Choose your target number wisely!
- **Clean UI**: Modern, responsive design with smooth animations

## 🛠️ Tech Stack

This project showcases modern React development practices:

- **React 19.1.1** - Latest React with hooks and modern patterns
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning-fast build tool and dev server
- **React Confetti** - Beautiful celebration animations
- **CSS3** - Custom styling with modern CSS features

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd tenzies
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
tenzies/
├── src/
│   ├── components/
│   │   └── dice.tsx          # Individual dice component
│   ├── lib/
│   │   └── utils.ts          # Game logic utilities
│   ├── App.tsx               # Main game component
│   ├── App.css               # Game styles
│   └── main.tsx              # App entry point
├── public/                   # Static assets
└── package.json              # Dependencies and scripts
```

## Key React Concepts Demonstrated

This project is perfect for learning React fundamentals:

- **useState Hook**: Managing game state (dice, frozen count, success)
- **useEffect Hook**: Detecting win conditions
- **Component Composition**: Breaking down the game into reusable components
- **Props & TypeScript**: Type-safe component interfaces
- **Event Handling**: Click events for dice interaction
- **Conditional Rendering**: Showing confetti on win

## Learning Objectives

This project helps practice:
- React hooks (useState, useEffect)
- TypeScript integration with React
- Component state management
- Event handling and user interactions
- CSS styling and animations
- Modern React development patterns

## Customization Ideas

Want to extend the game? Here are some fun ideas:
- Add a timer to track how fast you can win
- Implement a high score system
- Add different dice themes or colors
- Create multiple difficulty levels
- Add sound effects for rolling and winning

## Contributing

This is a learning project, but feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests with improvements
- Share your own variations of the game!

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy rolling! May the dice be ever in your favor!**
