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

        <div className="flex justify-between items-center mb-6 p-4 bg-card rounded-2xl print:hidden">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost"
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
              variant="ghost"
              onClick={() => navigateSheet(1)}
              disabled={currentSheet === allSheets.length - 1}
            >
              Next
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Button>
          </div>
          
          <Button 
            variant="default" 
            size="icon" 
            className="size-14 rounded-2xl border-4 border-black bg-teal-400 text-4xl shadow-[6px_6px_0_black] transition-all duration-100 ease-in-out hover:-translate-y-1 hover:shadow-[8px_8px_0_black] active:translate-y-1 active:shadow-[2px_2px_0_black] hover:bg-teal-500 dark:border-white dark:bg-teal-500 dark:shadow-[6px_6px_0_white] dark:hover:shadow-[8px_8px_0_white] dark:active:shadow-[2px_2px_0_white] dark:hover:bg-teal-600"
            onClick={handlePrint}
            aria-label="Print Sheet"
          >
            🖨️
          </Button>
        </div>

        <div className="flex justify-center my-8 print:my-0">
          <FlashcardSheet 
            cards={currentSheetData} 
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