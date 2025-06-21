import React, { useState, useEffect } from 'react'
import { useParams, Link, useRouter } from '@tanstack/react-router'
import { generateFlashcardData } from '@/utils/flashcardGenerator'
import FlashcardSheet from '@/components/FlashcardSheet'
import { Flashcard } from '@/types/flashcard'
import { Button } from '@/components/ui/button'

export const SheetView: React.FC = () => {
  const router = useRouter()
  const { sheetNumber } = useParams({ from: '/sheet/$sheetNumber' })
  const [currentSheet, setCurrentSheet] = useState<number>(0)
  const [allSheets, setAllSheets] = useState<Flashcard[][]>([])

  useEffect(() => {
    const sheets = generateFlashcardData()
    setAllSheets(sheets)
    
    const sheetIndex = parseInt(sheetNumber) - 1
    if (sheetIndex >= 0 && sheetIndex < sheets.length) {
      setCurrentSheet(sheetIndex)
    }
  }, [sheetNumber])

  const handlePrint = (): void => {
    window.print()
  }

  const navigateSheet = (offset: number) => {
    const newSheetIndex = currentSheet + offset;
    if (newSheetIndex >= 0 && newSheetIndex < allSheets.length) {
      setCurrentSheet(newSheetIndex);
      router.navigate({ to: '/sheet/$sheetNumber', params: { sheetNumber: (newSheetIndex + 1).toString() } })
    }
  }

  if (allSheets.length === 0) {
    return <div className="text-center text-2xl text-muted-foreground my-12">Loading sheet...</div>
  }

  const currentSheetData = allSheets[currentSheet]
  const letters = currentSheetData?.map((card: Flashcard) => card.letter).join(' - ') || ''

  return (
    <div className="min-h-screen bg-background font-sans p-5 print:p-0">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 print:hidden">
          <Button asChild variant="link" className="px-0">
            <Link to="/project/$projectId" params={{ projectId: 'alphabets-animals' }}>
              <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
              Back to Project
            </Link>
          </Button>
          <div className="text-center mt-4">
            <h1 className="text-4xl font-extrabold text-foreground m-0">🦁 Sheet {currentSheet + 1}</h1>
            <p className="text-lg text-muted-foreground mt-2 font-mono">Letters: {letters}</p>
          </div>
        </header>

        <div className="flex justify-between items-center mb-6 p-4 bg-card border rounded-2xl shadow-sm print:hidden">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => navigateSheet(-1)}
              disabled={currentSheet === 0}
            >
              <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
              Previous
            </Button>
            <div className="flex items-baseline">
              <span className="font-bold text-foreground text-lg">
                {currentSheet + 1}
              </span>
              <span className="text-muted-foreground text-sm">/ {allSheets.length}</span>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigateSheet(1)}
              disabled={currentSheet === allSheets.length - 1}
            >
              Next
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Button>
          </div>
          
          <Button onClick={handlePrint}>
            <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4h10a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1H5z"></path><path d="M15 14H5a1 1 0 000 2h10a1 1 0 000-2zM4 8a1 1 0 011-1h1a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V8z"></path></svg>
            Print Sheet
          </Button>
        </div>

        <div className="flex justify-center my-8 print:my-0">
          <FlashcardSheet 
            cards={currentSheetData} 
            sheetNumber={currentSheet + 1}
          />
        </div>

        <div className="bg-card border p-8 rounded-2xl mt-12 print:hidden">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">Printing Instructions</h3>
          <p className="text-muted-foreground mb-4">
            Click the "Print Sheet" button to open the print dialog. For best results, use standard A4 paper. After printing, you can cut along the dashed lines to separate the wall art pieces.
          </p>
          <ul className="text-muted-foreground space-y-2 list-disc list-inside">
            <li>Paper Size: A4 (210mm × 297mm)</li>
            <li>Card Size: A6 (105mm × 148.5mm)</li>
            <li>Layout: 4 cards per sheet (2x2 grid)</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 