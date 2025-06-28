import type { CSSProperties } from 'react';

export interface Flashcard {
  letter: string
  animal: string
  imageSrc: string
  backgroundColor: string
}

export interface NumberFlashcard {
  number: number;
  cats: {
    imageSrc: string;
    style: CSSProperties;
  }[];
  backgroundColor: string;
}

export interface FlashcardSheet {
  cards: Flashcard[]
  sheetNumber: number
}

export interface NumberFlashcardSheet {
  cards: NumberFlashcard[]
  sheetNumber: number
}

export interface FlashcardData {
  sheets: FlashcardSheet[]
}

export interface NumberFlashcardData {
  sheets: NumberFlashcardSheet[]
} 