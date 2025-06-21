import React, { useState, useEffect } from 'react'
import { useParams, Link } from '@tanstack/react-router'
import { generateFlashcardData } from '@/utils/flashcardGenerator'
import { Flashcard } from '@/types/flashcard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface SheetPreview {
  sheetNumber: number
  cards: Flashcard[]
  letters: string
}

export const ProjectView: React.FC = () => {
  const { projectId } = useParams({ from: '/project/$projectId' })
  const [sheets, setSheets] = useState<SheetPreview[]>([])

  useEffect(() => {
    if (projectId === 'alphabets-animals') {
      const allSheets = generateFlashcardData()
      const sheetPreviews = allSheets.map((sheet, index) => ({
        sheetNumber: index + 1,
        cards: sheet,
        letters: sheet.map(card => card.letter).join(' - ')
      }))
      setSheets(sheetPreviews)
    }
  }, [projectId])

  const getProjectInfo = () => {
    switch (projectId) {
      case 'alphabets-animals':
        return {
          title: 'Alphabets with Animals',
          description: '7 printable sheets with 26 animal flashcards from A to Z',
          icon: '🦁'
        }
      default:
        return {
          title: 'Unknown Project',
          description: 'Project not found',
          icon: '❓'
        }
    }
  }

  const projectInfo = getProjectInfo()

  if (sheets.length === 0) {
    return <div className="text-center text-2xl text-muted-foreground my-12">Loading project...</div>
  }

  return (
    <div className="min-h-screen bg-background font-sans p-5">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <Button asChild variant="link" className="px-0">
            <Link to="/">
              <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
              Back to Projects
            </Link>
          </Button>
          <div className="text-center mt-6">
            <h1 className="text-5xl font-extrabold text-foreground m-0">{projectInfo.icon} {projectInfo.title}</h1>
            <p className="text-xl text-muted-foreground mt-3">{projectInfo.description}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sheets.map((sheet) => (
            <Card key={sheet.sheetNumber} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
               <Link to="/sheet/$sheetNumber" params={{ sheetNumber: sheet.sheetNumber.toString() }}>
                <CardHeader>
                  <CardTitle>Sheet {sheet.sheetNumber}</CardTitle>
                  <CardDescription className="font-mono">Letters: {sheet.letters}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {sheet.cards.map((card, index) => (
                      <div 
                        key={index}
                        className="aspect-w-1 aspect-h-1 rounded-lg border flex flex-col items-center justify-center p-2 text-xs"
                        style={{ backgroundColor: card.backgroundColor }}
                      >
                        <div className="text-2xl font-black text-gray-800">{card.letter}</div>
                        <div className="text-xs text-muted-foreground truncate w-full text-center mt-1">{card.animal}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Link>
              <CardFooter>
                <Link to="/sheet/$sheetNumber" params={{ sheetNumber: sheet.sheetNumber.toString() }} className="w-full">
                  <Button className="w-full">
                    View Sheet
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="p-8 mt-16">
          <CardHeader>
            <CardTitle>About this Project</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This project contains {sheets.length} printable sheets. Each sheet is designed to be printed on standard A4 paper and cut into four A6-sized flashcards.
            </p>
            <ul className="text-muted-foreground space-y-2 list-disc list-inside">
              <li>Each sheet contains 4 flashcards in a 2×2 grid.</li>
              <li>Cards are A6 size (105mm × 148.5mm) when cut.</li>
              <li>Print on A4 paper for best results.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 