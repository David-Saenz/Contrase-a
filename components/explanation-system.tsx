"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Lightbulb, Code, CheckCircle, BookOpen, Zap, Target } from "lucide-react"

interface CodeExplanation {
  line: number
  code: string
  explanation: string
  concept: string
  importance: "high" | "medium" | "low"
}

interface ExplanationRequest {
  id: string
  code: string
  language: string
  explanations: CodeExplanation[]
  summary: string
  concepts: string[]
  complexity: number
}

const sampleExplanations: ExplanationRequest[] = [
  {
    id: "modus-ponens-explanation",
    code: `function modusPonens(premisaCondicional: boolean, antecedente: boolean): boolean {
  if (premisaCondicional && antecedente) {
    return true;
  }
  return false;
}`,
    language: "typescript",
    explanations: [
      {
        line: 1,
        code: "function modusPonens(premisaCondicional: boolean, antecedente: boolean): boolean",
        explanation:
          "Definimos una función que implementa la regla de inferencia Modus Ponens. Recibe dos parámetros booleanos: la premisa condicional y el antecedente.",
        concept: "Definición de función",
        importance: "high",
      },
      {
        line: 2,
        code: "if (premisaCondicional && antecedente)",
        explanation:
          'Esta condición verifica que tanto la premisa condicional como el antecedente sean verdaderos. En lógica, esto corresponde a "Si P entonces Q" y "P es verdadero".',
        concept: "Modus Ponens",
        importance: "high",
      },
      {
        line: 3,
        code: "return true;",
        explanation:
          "Si ambas condiciones se cumplen, podemos inferir que el consecuente es verdadero. Esta es la conclusión válida del Modus Ponens.",
        concept: "Inferencia lógica",
        importance: "high",
      },
      {
        line: 5,
        code: "return false;",
        explanation:
          "Si las condiciones no se cumplen, no podemos hacer la inferencia. Retornamos false para indicar que la conclusión no es válida.",
        concept: "Manejo de casos",
        importance: "medium",
      },
    ],
    summary:
      "Esta función implementa la regla de inferencia Modus Ponens, una de las reglas fundamentales de la lógica deductiva. Permite derivar una conclusión válida cuando se tienen una premisa condicional verdadera y su antecedente también verdadero.",
    concepts: ["Modus Ponens", "Lógica deductiva", "Inferencia válida", "Premisas condicionales"],
    complexity: 2,
  },
  {
    id: "inductive-reasoning-explanation",
    code: `class RazonamientoInductivo {
  private observaciones: any[] = [];
  
  agregarObservacion(obs: any): void {
    this.observaciones.push(obs);
    this.actualizarPatron();
  }
  
  private actualizarPatron(): void {
    const frecuencias = this.calcularFrecuencias();
    this.patron = this.encontrarPatronMasFrecuente(frecuencias);
  }
}`,
    language: "typescript",
    explanations: [
      {
        line: 1,
        code: "class RazonamientoInductivo",
        explanation:
          "Definimos una clase para encapsular la lógica del razonamiento inductivo. Las clases nos permiten mantener estado y comportamiento relacionado.",
        concept: "Programación orientada a objetos",
        importance: "medium",
      },
      {
        line: 2,
        code: "private observaciones: any[] = [];",
        explanation:
          "Almacenamos las observaciones en un array privado. En razonamiento inductivo, acumulamos datos para identificar patrones.",
        concept: "Almacenamiento de datos",
        importance: "high",
      },
      {
        line: 4,
        code: "agregarObservacion(obs: any): void",
        explanation:
          "Método público para agregar nuevas observaciones. Cada nueva observación puede cambiar nuestro entendimiento del patrón.",
        concept: "Razonamiento inductivo",
        importance: "high",
      },
      {
        line: 5,
        code: "this.observaciones.push(obs);",
        explanation:
          "Agregamos la nueva observación a nuestro conjunto de datos. Más datos generalmente mejoran la calidad de la inferencia inductiva.",
        concept: "Acumulación de evidencia",
        importance: "high",
      },
      {
        line: 6,
        code: "this.actualizarPatron();",
        explanation:
          "Después de cada nueva observación, recalculamos el patrón. El razonamiento inductivo es iterativo y se refina con nueva información.",
        concept: "Actualización de hipótesis",
        importance: "high",
      },
    ],
    summary:
      "Esta clase implementa razonamiento inductivo, un proceso de inferencia que identifica patrones generales a partir de observaciones específicas. A diferencia del razonamiento deductivo, las conclusiones inductivas son probabilísticas y se fortalecen con más evidencia.",
    concepts: [
      "Razonamiento inductivo",
      "Identificación de patrones",
      "Inferencia probabilística",
      "Aprendizaje iterativo",
    ],
    complexity: 4,
  },
]

export function ExplanationSystem() {
  const [selectedExplanation, setSelectedExplanation] = useState<string>(sampleExplanations[0].id)
  const [userCode, setUserCode] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(0)

  const currentExplanation = sampleExplanations.find((e) => e.id === selectedExplanation) || sampleExplanations[0]

  const analyzeUserCode = async () => {
    setIsAnalyzing(true)
    setCurrentStep(0)

    // Simulación de análisis paso a paso
    const steps = [
      "Analizando sintaxis...",
      "Identificando patrones lógicos...",
      "Generando explicaciones...",
      "Finalizando análisis...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setCurrentStep(i + 1)
    }

    setIsAnalyzing(false)
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Sistema de Explicaciones de Código
          </CardTitle>
          <CardDescription>
            Obtén explicaciones detalladas línea por línea de implementaciones de inferencia lógica. Comprende no solo
            qué hace el código, sino por qué funciona desde una perspectiva lógica.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="examples" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="examples">Ejemplos Explicados</TabsTrigger>
          <TabsTrigger value="analyze">Analizar Mi Código</TabsTrigger>
        </TabsList>

        <TabsContent value="examples" className="space-y-6">
          {/* Example Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Seleccionar Ejemplo</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedExplanation} onValueChange={setSelectedExplanation}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un ejemplo para explicar" />
                </SelectTrigger>
                <SelectContent>
                  {sampleExplanations.map((explanation) => (
                    <SelectItem key={explanation.id} value={explanation.id}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Complejidad: {explanation.complexity}/5</Badge>
                        {explanation.id.replace("-explanation", "").replace("-", " ")}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Code Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Código a Explicar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
                <pre className="text-sm">
                  <code>{currentExplanation.code}</code>
                </pre>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <Badge variant="outline">Lenguaje: {currentExplanation.language}</Badge>
                <Badge variant="outline">Líneas: {currentExplanation.code.split("\n").length}</Badge>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Complejidad:</span>
                  <Progress value={currentExplanation.complexity * 20} className="w-20" />
                  <span className="text-sm">{currentExplanation.complexity}/5</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line by Line Explanations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-secondary" />
                Explicaciones Línea por Línea
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentExplanation.explanations.map((explanation, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Línea {explanation.line}</Badge>
                      <Badge className={getImportanceColor(explanation.importance)}>{explanation.importance}</Badge>
                    </div>

                    <div className="bg-slate-900 text-slate-100 p-3 rounded font-mono text-sm">{explanation.code}</div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-sm">Concepto: {explanation.concept}</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">{explanation.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary and Concepts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Resumen General
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{currentExplanation.summary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-secondary" />
                  Conceptos Clave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentExplanation.concepts.map((concept, index) => (
                    <Badge key={index} variant="secondary">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analyze" className="space-y-6">
          {/* User Code Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Tu Código
              </CardTitle>
              <CardDescription>Pega tu código aquí para obtener explicaciones detalladas</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                placeholder="Pega tu código de inferencia lógica aquí..."
                className="font-mono text-sm min-h-[200px]"
              />

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Líneas: {userCode.split("\n").length} | Caracteres: {userCode.length}
                </div>
                <Button onClick={analyzeUserCode} disabled={isAnalyzing || !userCode.trim()}>
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {isAnalyzing ? "Analizando..." : "Analizar Código"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary animate-pulse" />
                  Analizando Código
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={(currentStep / 4) * 100} />
                  <div className="text-sm text-muted-foreground">
                    {currentStep === 0 && "Iniciando análisis..."}
                    {currentStep === 1 && "Analizando sintaxis..."}
                    {currentStep === 2 && "Identificando patrones lógicos..."}
                    {currentStep === 3 && "Generando explicaciones..."}
                    {currentStep === 4 && "Finalizando análisis..."}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {!isAnalyzing && userCode.trim() && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Análisis Completado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <p className="text-sm">
                      <strong>Análisis simulado:</strong> Tu código ha sido analizado. En una implementación completa,
                      aquí verías explicaciones detalladas línea por línea, identificación de patrones lógicos, y
                      sugerencias de mejora basadas en principios de inferencia lógica.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-primary">{userCode.split("\n").length}</div>
                      <div className="text-sm text-muted-foreground">Líneas analizadas</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-secondary">{Math.floor(Math.random() * 5) + 1}</div>
                      <div className="text-sm text-muted-foreground">Conceptos identificados</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-md">
                      <div className="text-2xl font-bold text-accent">{Math.floor(Math.random() * 3) + 2}</div>
                      <div className="text-sm text-muted-foreground">Complejidad (1-5)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
