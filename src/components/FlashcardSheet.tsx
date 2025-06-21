import React from 'react'
import Flashcard from './Flashcard'
import { Flashcard as FlashcardType } from '../types/flashcard'

interface FlashcardSheetProps {
  cards: FlashcardType[]
  sheetNumber: number
}

const FlashcardSheet: React.FC<FlashcardSheetProps> = ({ cards, sheetNumber }) => {
  return (
    <div className="w-[210mm] h-[297mm] bg-white border border-gray-300 shadow-lg mx-auto relative overflow-hidden">
      <div className="text-center p-3 bg-gray-50 border-b border-gray-300">
        <h2 className="text-lg font-bold text-gray-700 mb-1">Animal Alphabet Flashcards - Sheet {sheetNumber}</h2>
        <p className="text-sm text-gray-600">Cut along dashed lines to separate cards</p>
      </div>
      
      <div className="grid grid-cols-2 grid-rows-2 h-[calc(297mm-80px)]">
        {cards.map((card, index) => (
          <Flashcard 
            key={index}
            letter={card.letter}
            animal={card.animal}
            imageSrc={card.imageSrc}
            backgroundColor={card.backgroundColor}
          />
        ))}
      </div>
    </div>
  )
}

export default FlashcardSheet 