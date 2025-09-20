"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, Brain, Play } from "lucide-react"
import { ConceptsSection } from "./concepts-section"
import { CodeEditor } from "./code-editor"
import { ExplanationSystem } from "./explanation-system"
import { PracticalExamples } from "./practical-examples"

export function LogicInferenceSystem() {
  const [activeTab, setActiveTab] = useState("concepts")

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-balance">Sistema de Inferencia Lógica</h1>
        </div>
        <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
          Aprende los fundamentos de la inferencia lógica a través de explicaciones interactivas, ejemplos de código y
          ejercicios prácticos con explicaciones detalladas.
        </p>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="concepts" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Conceptos
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Editor de Código
          </TabsTrigger>
          <TabsTrigger value="explanations" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Explicaciones
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Ejemplos Prácticos
          </TabsTrigger>
        </TabsList>

        {/* Content Sections */}
        <TabsContent value="concepts">
          <ConceptsSection />
        </TabsContent>

        <TabsContent value="code">
          <CodeEditor />
        </TabsContent>

        <TabsContent value="explanations">
          <ExplanationSystem />
        </TabsContent>

        <TabsContent value="examples">
          <PracticalExamples />
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Tipos de Inferencia</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-secondary">25+</div>
            <div className="text-sm text-muted-foreground">Ejemplos de Código</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Ejercicios Prácticos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-secondary">100%</div>
            <div className="text-sm text-muted-foreground">Explicaciones Detalladas</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
