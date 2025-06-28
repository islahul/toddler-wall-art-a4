import React from 'react'
import NumberFlashcard from './NumberFlashcard'
import { NumberFlashcard as NumberFlashcardType } from '@/types/flashcard'

interface NumberFlashcardSheetProps {
  cards: NumberFlashcardType[]
}

const NumberFlashcardSheet: React.FC<NumberFlashcardSheetProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-[210mm] h-[297mm] bg-white border-2 border-gray-300 [print-color-adjust:exact]">
      {cards.map((card, index) => (
        <NumberFlashcard
          key={index}
          number={card.number}
          cats={card.cats}
          backgroundColor={card.backgroundColor}
        />
      ))}
    </div>
  )
}

export default NumberFlashcardSheet 