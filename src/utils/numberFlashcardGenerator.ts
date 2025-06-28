import { NumberFlashcard } from '../types/flashcard'
import { getBasePath } from '../config/app'
import type { CSSProperties } from 'react'

const CAT_BACKGROUND_COLOR: string = "#383738"

// --- LAYOUT CONFIGURATION ---
// This is the single source of truth for all layouts.
//
// - Numbers 1-4 use a flexbox layout. You can adjust `width` or `flexBasis`.
// - Numbers 5-10 use an absolute positioning layout. You can adjust `top`,
//   `left`, and `width` for pixel-perfect control.
const IMAGE_CONFIG: Record<string, string[]> = {
  '1': ['1.png'],
  '2': ['2.png', '3.png'],
  '3': ['3.png', '5.png', '6.png'],
  '4': ['7.png', '8.png', '9.png', '10.png'],
  '5': ['11.png', '12.png', '13.png', '1.png', '2.png'],
  '6': ['3.png', '13.png', '5.png', '6.png', '7.png', '8.png'],
  '7': ['9.png', '10.png', '11.png', '12.png', '13.png', '1.png', '2.png'],
  '8': ['3.png', '13.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png'],
  '9': ['1.png', '2.png', '3.png', '13.png', '5.png', '6.png', '7.png', '8.png', '9.png'],
  '10': ['1.png', '2.png', '3.png', '13.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png'],
};

const getCatLayouts = (): Record<string, { image: string, style: CSSProperties }[]> => ({
  // Flexbox layouts
  '1': IMAGE_CONFIG['1'].map(image => ({ image, style: { width: '50%' } })),
  '2': IMAGE_CONFIG['2'].map(image => ({ image, style: { width: '45%' } })),
  '3': IMAGE_CONFIG['3'].map((image, i) => ({ image, style: { width: '45%', ...(i === 2 && { flexBasis: '100%' }) } })),
  '4': IMAGE_CONFIG['4'].map(image => ({ image, style: { width: '45%' } })),

  // Absolute positioning layouts (seeded with a grid)
  '5': [
    { image: IMAGE_CONFIG['5'][0], style: { position: 'absolute', width: '30%', top: '15%', left: '0%' } },
    { image: IMAGE_CONFIG['5'][1], style: { position: 'absolute', width: '30%', top: '15%', left: '35%' } },
    { image: IMAGE_CONFIG['5'][2], style: { position: 'absolute', width: '30%', top: '15%', left: '70%' } },
    { image: IMAGE_CONFIG['5'][3], style: { position: 'absolute', width: '30%', top: '59%', left: '15.5%' } },
    { image: IMAGE_CONFIG['5'][4], style: { position: 'absolute', width: '30%', top: '59%', left: '55%' } },
  ],
  '6': [
    { image: IMAGE_CONFIG['6'][0], style: { position: 'absolute', width: '37%', top: '12%', left: '0%' } },
    { image: IMAGE_CONFIG['6'][1], style: { position: 'absolute', width: '30%', top: '18%', left: '33%' } },
    { image: IMAGE_CONFIG['6'][2], style: { position: 'absolute', width: '30%', top: '15%', left: '70%' } },
    { image: IMAGE_CONFIG['6'][3], style: { position: 'absolute', width: '40%', top: '51%', left: '0%' } },
    { image: IMAGE_CONFIG['6'][4], style: { position: 'absolute', width: '40%', top: '74%', left: '33%' } },
    { image: IMAGE_CONFIG['6'][5], style: { position: 'absolute', width: '40%', top: '51%', left: '61%' } },
  ],
  '7': [
    { image: IMAGE_CONFIG['7'][0], style: { position: 'absolute', width: '38%', top: '8%', left: '0%' } },
    { image: IMAGE_CONFIG['7'][1], style: { position: 'absolute', width: '35%', top: '4%', left: '44%' } },
    { image: IMAGE_CONFIG['7'][2], style: { position: 'absolute', width: '31%', top: '23%', left: '71%' } },
    { image: IMAGE_CONFIG['7'][3], style: { position: 'absolute', width: '28%', top: '36%', left: '8%' } },
    { image: IMAGE_CONFIG['7'][4], style: { position: 'absolute', width: '28%', top: '36%', left: '43%' } },
    { image: IMAGE_CONFIG['7'][5], style: { position: 'absolute', width: '28%', top: '60%', left: '66%' } },
    { image: IMAGE_CONFIG['7'][6], style: { position: 'absolute', width: '28%', top: '70%', left: '26%' } },
  ],
  '8': [
    { image: IMAGE_CONFIG['8'][0], style: { position: 'absolute', width: '33%', top: '8%', left: '6%' } },
    { image: IMAGE_CONFIG['8'][1], style: { position: 'absolute', width: '23%', top: '8%', left: '57%' } },
    { image: IMAGE_CONFIG['8'][2], style: { position: 'absolute', width: '33%', top: '35%', left: '0%' } },
    { image: IMAGE_CONFIG['8'][3], style: { position: 'absolute', width: '33%', top: '41%', left: '30%' } },
    { image: IMAGE_CONFIG['8'][4], style: { position: 'absolute', width: '33%', top: '40%', left: '64%' } },
    { image: IMAGE_CONFIG['8'][5], style: { position: 'absolute', width: '33%', top: '60%', left: '44%' } },
    { image: IMAGE_CONFIG['8'][6], style: { position: 'absolute', width: '33%', top: '70%', left: '0%' } },
    { image: IMAGE_CONFIG['8'][7], style: { position: 'absolute', width: '33%', top: '80%', left: '54%' } },
  ],
  '9': [
    { image: IMAGE_CONFIG['9'][0], style: { position: 'absolute', width: '28%', top: '10%', left: '2%' } },
    { image: IMAGE_CONFIG['9'][1], style: { position: 'absolute', width: '28%', top: '10%', left: '36%' } },
    { image: IMAGE_CONFIG['9'][2], style: { position: 'absolute', width: '28%', top: '10%', left: '70%' } },
    { image: IMAGE_CONFIG['9'][3], style: { position: 'absolute', width: '28%', top: '40%', left: '2%' } },
    { image: IMAGE_CONFIG['9'][4], style: { position: 'absolute', width: '28%', top: '40%', left: '36%' } },
    { image: IMAGE_CONFIG['9'][5], style: { position: 'absolute', width: '28%', top: '51%', left: '70%' } },
    { image: IMAGE_CONFIG['9'][6], style: { position: 'absolute', width: '35%', top: '80%', left: '4%' } },
    { image: IMAGE_CONFIG['9'][7], style: { position: 'absolute', width: '30%', top: '70%', left: '36%' } },
    { image: IMAGE_CONFIG['9'][8], style: { position: 'absolute', width: '30%', top: '78%', left: '70%' } },
  ],
  '10': [
    { image: IMAGE_CONFIG['10'][0], style: { position: 'absolute', width: '22%', top: '10%', left: '2%' } },
    { image: IMAGE_CONFIG['10'][1], style: { position: 'absolute', width: '26%', top: '10%', left: '37%' } },
    { image: IMAGE_CONFIG['10'][2], style: { position: 'absolute', width: '22%', top: '40%', left: '30%' } },
    { image: IMAGE_CONFIG['10'][3], style: { position: 'absolute', width: '22%', top: '10%', left: '66%' } },
    { image: IMAGE_CONFIG['10'][4], style: { position: 'absolute', width: '26%', top: '40%', left: '4%' } },
    { image: IMAGE_CONFIG['10'][5], style: { position: 'absolute', width: '26%', top: '56%', left: '65%' } },
    { image: IMAGE_CONFIG['10'][6], style: { position: 'absolute', width: '32%', top: '38%', left: '62%' } },
    { image: IMAGE_CONFIG['10'][7], style: { position: 'absolute', width: '32%', top: '70%', left: '6%' } },
    { image: IMAGE_CONFIG['10'][8], style: { position: 'absolute', width: '32%', top: '81%', left: '50%' } },
    { image: IMAGE_CONFIG['10'][9], style: { position: 'absolute', width: '29%', top: '66%', left: '38%' } },
  ],
});


// --- DATA GENERATION (No need to edit below) ---
export const generateNumberFlashcardData = (): NumberFlashcard[][] => {
  const basePath = getBasePath();
  const allCards: NumberFlashcard[] = [];
  const CAT_LAYOUTS = getCatLayouts();

  for (let number = 1; number <= 10; number++) {
    const layout = CAT_LAYOUTS[number];
    if (!layout) continue;

    const card: NumberFlashcard = {
      number,
      cats: layout.map(cat => ({
        imageSrc: `${basePath}/cats/${cat.image}`,
        style: cat.style,
      })),
      backgroundColor: CAT_BACKGROUND_COLOR
    };
    allCards.push(card);
  }

  const sheets: NumberFlashcard[][] = [];
  for (let i = 0; i < allCards.length; i += 4) {
    sheets.push(allCards.slice(i, i + 4));
  }
  return sheets;
}

export const getNumberCardByNumber = (number: number): NumberFlashcard | null => {
  if (number < 1 || number > 10) return null;
  
  const basePath = getBasePath();
  const CAT_LAYOUTS = getCatLayouts();
  const layout = CAT_LAYOUTS[number];
  if (!layout) return null;

  return {
    number,
    cats: layout.map(cat => ({
      imageSrc: `${basePath}/cats/${cat.image}`,
      style: cat.style,
    })),
    backgroundColor: CAT_BACKGROUND_COLOR
  };
} 