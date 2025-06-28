import React from 'react'

interface CatProps {
  imageSrc: string;
  style: React.CSSProperties;
}

interface NumberFlashcardProps {
  number: number
  cats: CatProps[]
  backgroundColor: string
}

const NumberFlashcard: React.FC<NumberFlashcardProps> = ({ 
  number, 
  cats, 
  backgroundColor 
}) => {
  // Check the style of the first cat to determine the layout type
  const isAbsoluteLayout = cats.length > 0 && cats[0].style.position === 'absolute';

  return (
    <div 
      className="relative flex flex-col items-center justify-start h-full p-6 text-center border-r border-b border-dashed border-gray-300 [print-color-adjust:exact]"
      style={{ backgroundColor }}
    >
      {/* Number at the top */}
      <div className="font-fun">
        <h1 className="text-8xl font-black text-white tracking-tighter">{number}</h1>
      </div>

      {/* This outer container handles vertical centering for both layouts */}
      <div className="flex-grow flex items-center justify-center w-full">
        {isAbsoluteLayout ? (
          // --- ABSOLUTE LAYOUT ---
          <div className="w-full h-full relative">
            {cats.map((cat, index) => (
              <div key={index} style={cat.style}>
                <img 
                  src={cat.imageSrc} 
                  alt={`Cat ${index + 1}`}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          // --- FLEXBOX LAYOUT ---
          <div className="flex flex-row flex-wrap justify-center items-center content-center gap-2 w-full h-full">
            {cats.map((cat, index) => (
              <div key={index} style={cat.style} className="flex justify-center items-center">
                <img 
                  src={cat.imageSrc} 
                  alt={`Cat ${index + 1}`}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NumberFlashcard 