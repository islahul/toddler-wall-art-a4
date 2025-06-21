# 🦁 Animal Alphabet Wall Art - Web App

A modern React web application that generates beautiful, printable A4 sheets containing four A6 toddler wall art pieces per page. Each piece features a large uppercase letter, a centered animal illustration, and the animal's name.

## ✨ Features

- **True A4 output** (210mm × 297mm) optimized for printing
- **Interactive web interface** with sheet navigation
- **Print functionality** with one-click printing
- **Responsive design** that works on desktop and mobile
- **Automatic page breaks** – 4 pieces per sheet in A-D, E-H… order
- **Rounded corner borders** with grey dashed cut lines for easy separation
- **Dynamic background colors** for each animal
- **Perfect text alignment** with proper centering and spacing
- **Built with modern React and Vite** for fast development and deployment

## 🎨 Sample Output

The app generates beautiful wall art pieces like these:

```
┌─────────────┐  ┌─────────────┐
│      A      │  │      B      │
│             │  │             │
│   🐊        │  │   🐻        │
│             │  │             │
│  Alligator  │  │    Bear     │
└─────────────┘  └─────────────┘
```

Each sheet contains 4 pieces with:
- Large, clear uppercase letters
- Cute animal illustrations
- Easy-to-read animal names
- Color-coordinated backgrounds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone or download this repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🌐 Deployment

### GitHub Pages (Recommended)

This project is configured for automatic deployment to GitHub Pages:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
   - The workflow will automatically deploy on every push to main

3. **Manual deployment** (if needed):
   ```bash
   npm run deploy
   ```

Your app will be available at: `https://[your-username].github.io/toddler-wall-art-a4/`

### Other Hosting Platforms

The built files in the `dist/` directory can be deployed to any static hosting service:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront

## 🖨️ Printing Instructions

1. **Navigate through sheets** using the Previous/Next buttons
2. **Click "Print Current Sheet"** to open the print dialog
3. **Use A4 paper** for best results
4. **Cut along the dashed lines** to separate individual wall art pieces
5. **Each piece is A6 size** (105mm × 148mm)

## 🎨 Default Animals

The app includes these default animal names:

| Letter | Animal | Letter | Animal | Letter | Animal | Letter | Animal |
|--------|--------|--------|--------|--------|--------|--------|--------|
| A | Alligator | G | Giraffe | M | Monkey | S | Snake |
| B | Bear | H | Hippo | N | Narwhal | T | Tiger |
| C | Cat | I | Iguana | O | Owl | U | Urial |
| D | Dog | J | Jaguar | P | Penguin | V | Vulture |
| E | Elephant | K | Koala | Q | Quail | W | Whale |
| F | Fox | L | Lion | R | Rabbit | X | Xerus |
| | | | | | | Y | Yak |
| | | | | | | Z | Zebra |

## 🛠️ Customization

### Adding Custom Images

Place your animal images in the `public/animals/` folder:
- Name them `A.png`, `B.png`, `C.png`... `Z.png`
- Use any common image format (PNG, JPG, SVG)

### Modifying Animal Names

Edit the `DEFAULT_ANIMALS` array in `src/utils/flashcardGenerator.js` to change animal names.

### Customizing Colors

Modify the `getAnimalBackgroundColor` function in `src/utils/flashcardGenerator.js` to change background colors.

## 🖨️ Printing Guidelines

- **Paper**: Standard A4 (210mm × 297mm)
- **Colors**: Full color recommended
- **Cutting**: Follow the grey dashed lines to separate pieces
- **Piece size**: Each wall art piece is A6 size (105mm × 148mm)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is open source. Feel free to use and modify as needed.

---

*Made with ❤️ for early childhood education*
