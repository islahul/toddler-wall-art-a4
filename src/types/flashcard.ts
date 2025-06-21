export interface Flashcard {
  letter: string
  animal: string
  imageSrc: string
  backgroundColor: string
}

export interface FlashcardSheet {
  cards: Flashcard[]
  sheetNumber: number
}

export interface FlashcardData {
  sheets: FlashcardSheet[]
} 