import React from 'react'
import Flashcard from './Flashcard'
import { Flashcard as FlashcardType } from '../types/flashcard'

interface FlashcardSheetProps {
  cards: FlashcardType[]
}

const FlashcardSheet: React.FC<FlashcardSheetProps> = ({ cards }) => {
  return (
    <div className="w-[210mm] h-[297mm] bg-white mx-auto relative overflow-hidden border shadow-dramatic">
      <div className="grid grid-cols-2 grid-rows-2 h-full">
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