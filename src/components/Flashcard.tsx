import React from 'react'

interface FlashcardProps {
  letter: string
  animal: string
  imageSrc: string
  backgroundColor: string
}

const Flashcard: React.FC<FlashcardProps> = ({ letter, animal, imageSrc, backgroundColor }) => {
  return (
    <div 
      className="relative flex flex-col items-center justify-start p-4 text-center border-r border-b border-dashed border-gray-300"
      style={{ backgroundColor }}
    >
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-8xl font-black text-gray-800 tracking-tighter">{letter}</h1>
        <p className="text-3xl font-bold text-gray-700 mt-2">{animal}</p>
      </div>

      <div className="w-full h-48 flex items-center justify-center my-4">
        <img 
          src={imageSrc} 
          alt={`${animal} for letter ${letter}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  )
}

export default Flashcard 