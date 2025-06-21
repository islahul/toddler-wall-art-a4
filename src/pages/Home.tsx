import React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ModeToggle } from '@/components/mode-toggle'

interface Project {
  id: string
  title: string
  description: string
  imageCount: number
  route: string
  icon: string
}

export const Home: React.FC = () => {
  const projects: Project[] = [
    {
      id: 'alphabets-animals',
      title: 'Alphabets with Animals',
      description: '26 animal flashcards from A to Z, organized in 7 printable sheets',
      imageCount: 26,
      route: '/project/alphabets-animals',
      icon: '🦁'
    }
    // Add more projects here in the future
  ]

  return (
    <div className="min-h-screen bg-background font-sans p-5">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 py-10 relative">
          <div className="absolute top-5 right-5">
            <ModeToggle />
          </div>
          <h1 className="text-5xl font-extrabold text-foreground mb-4">📚 Flashcard Projects</h1>
          <p className="text-xl text-muted-foreground">Choose a project to view and print flashcards</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
              <Link to={project.route} className="block h-full">
                <CardHeader className="text-center">
                  <div className="text-7xl mb-6">{project.icon}</div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm text-muted-foreground text-center">
                    {project.imageCount} flashcards
                  </div>
                </CardContent>
              </Link>
              <CardFooter>
                <Link to={project.route} className="w-full">
                  <Button className="w-full">
                    View Project
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 