import { Flashcard } from '../types/flashcard'

// Default animal names from the original Python script
const DEFAULT_ANIMALS: string[] = [
  "Alligator", "Bear", "Cat", "Dog", "Elephant", "Fox", "Giraffe", "Hippo",
  "Iguana", "Jaguar", "Koala", "Lion", "Monkey", "Narwhal", "Owl", "Penguin",
  "Quail", "Rabbit", "Snake", "Tiger", "Urial", "Vulture", "Whale", "Xerus",
  "Yak", "Zebra",
]

const LETTER_SEQUENCE: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Generate background colors based on typical animal colors
const getAnimalBackgroundColor = (animal: string): string => {
  const colorMap: Record<string, string> = {
    "Alligator": "#90EE90", // Light green
    "Bear": "#DEB887", // Burlywood
    "Cat": "#F5DEB3", // Wheat
    "Dog": "#D2B48C", // Tan
    "Elephant": "#C0C0C0", // Silver
    "Fox": "#FFA500", // Orange
    "Giraffe": "#F4A460", // Sandy brown
    "Hippo": "#708090", // Slate gray
    "Iguana": "#32CD32", // Lime green
    "Jaguar": "#FFD700", // Gold
    "Koala": "#8B4513", // Saddle brown
    "Lion": "#DAA520", // Goldenrod
    "Monkey": "#CD853F", // Peru
    "Narwhal": "#87CEEB", // Sky blue
    "Owl": "#696969", // Dim gray
    "Penguin": "#000080", // Navy
    "Quail": "#8B7355", // Dark khaki
    "Rabbit": "#F5F5DC", // Beige
    "Snake": "#228B22", // Forest green
    "Tiger": "#FF8C00", // Dark orange
    "Urial": "#A0522D", // Sienna
    "Vulture": "#2F4F4F", // Dark slate gray
    "Whale": "#4682B4", // Steel blue
    "Xerus": "#D2691E", // Chocolate
    "Yak": "#8B7355", // Dark khaki
    "Zebra": "#FFFFFF", // White
  }
  
  return colorMap[animal] || "#F0F0F0"
}

// Generate flashcard data grouped into sheets of 4 cards each
export const generateFlashcardData = (): Flashcard[][] => {
  const allCards: Flashcard[] = LETTER_SEQUENCE.split('').map((letter, index) => ({
    letter,
    animal: DEFAULT_ANIMALS[index],
    imageSrc: `/animals/${letter}.png`,
    backgroundColor: getAnimalBackgroundColor(DEFAULT_ANIMALS[index])
  }))

  // Group into sheets of 4 cards each
  const sheets: Flashcard[][] = []
  for (let i = 0; i < allCards.length; i += 4) {
    sheets.push(allCards.slice(i, i + 4))
  }

  return sheets
}

// Get individual card data by letter
export const getCardByLetter = (letter: string): Flashcard | null => {
  const index = LETTER_SEQUENCE.indexOf(letter.toUpperCase())
  if (index === -1) return null
  
  return {
    letter: letter.toUpperCase(),
    animal: DEFAULT_ANIMALS[index],
    imageSrc: `/animals/${letter.toUpperCase()}.png`,
    backgroundColor: getAnimalBackgroundColor(DEFAULT_ANIMALS[index])
  }
} 