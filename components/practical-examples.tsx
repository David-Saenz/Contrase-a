"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, CheckCircle, XCircle, RotateCcw, Trophy, Target, BookOpen, Lightbulb, Brain } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Exercise {
  id: string
  title: string
  category: "deductive" | "inductive" | "abductive"
  difficulty: "beginner" | "intermediate" | "advanced"
  description: string
  scenario: string
  question: string
  type: "multiple-choice" | "code-completion" | "logical-reasoning"
  options?: string[]
  correctAnswer: string | number
  explanation: string
  codeTemplate?: string
  hints: string[]
}

const exercises: Exercise[] = [
  {
    id: "modus-ponens-basic",
    title: "Modus Ponens Básico",
    category: "deductive",
    difficulty: "beginner",
    description: "Identifica la conclusión válida usando Modus Ponens",
    scenario: "Tienes las siguientes premisas:\n1. Si llueve, entonces el suelo se moja.\n2. Está lloviendo.",
    question: "¿Cuál es la conclusión válida?",
    type: "multiple-choice",
    options: ["El suelo se moja", "No llueve", "El suelo no se moja", "No se puede concluir nada"],
    correctAnswer: 0,
    explanation:
      'Usando Modus Ponens: Si P entonces Q, y P es verdadero, entonces Q es verdadero. Como llueve (P) y tenemos "Si llueve entonces el suelo se moja" (P→Q), podemos concluir que el suelo se moja (Q).',
    hints: [
      "Recuerda la estructura del Modus Ponens: Si P entonces Q, P, por tanto Q",
      "Identifica qué representa P y qué representa Q en las premisas",
    ],
  },
  {
    id: "modus-tollens-implementation",
    title: "Implementar Modus Tollens",
    category: "deductive",
    difficulty: "intermediate",
    description: "Completa la implementación de Modus Tollens",
    scenario: "Necesitas implementar una función que aplique la regla Modus Tollens",
    question: "Completa el código para que funcione correctamente",
    type: "code-completion",
    correctAnswer: "return !antecedente;",
    explanation:
      'Modus Tollens establece que si tenemos "Si P entonces Q" y "no Q", entonces podemos concluir "no P". En el código, si la premisa condicional es verdadera y el consecuente es falso, entonces el antecedente debe ser falso.',
    codeTemplate: `function modusTollens(premisaCondicional: boolean, consecuente: boolean): boolean {
  // Si P entonces Q, y no Q, entonces no P
  if (premisaCondicional && !consecuente) {
    // Completa esta línea
    _______________
  }
  return true; // No se puede aplicar Modus Tollens
}`,
    hints: [
      "Modus Tollens niega el antecedente cuando se niega el consecuente",
      "Si Q es falso y P→Q es verdadero, entonces P debe ser falso",
    ],
  },
  {
    id: "inductive-pattern",
    title: "Reconocimiento de Patrones Inductivos",
    category: "inductive",
    difficulty: "intermediate",
    description: "Identifica el patrón en una secuencia de observaciones",
    scenario:
      "Has observado los siguientes datos:\n- Día 1: Temperatura 20°C, Lluvia: No\n- Día 2: Temperatura 18°C, Lluvia: Sí\n- Día 3: Temperatura 16°C, Lluvia: Sí\n- Día 4: Temperatura 22°C, Lluvia: No",
    question: "¿Qué patrón inductivo puedes identificar?",
    type: "multiple-choice",
    options: [
      "Llueve cuando la temperatura es menor a 20°C",
      "Llueve cuando la temperatura es mayor a 20°C",
      "La lluvia es independiente de la temperatura",
      "Llueve cada dos días",
    ],
    correctAnswer: 0,
    explanation:
      "Basándose en las observaciones, parece que llueve cuando la temperatura es menor a 20°C (días 2 y 3) y no llueve cuando es 20°C o mayor (días 1 y 4). Esta es una inferencia inductiva basada en el patrón observado.",
    hints: [
      "Compara las temperaturas con la presencia o ausencia de lluvia",
      "Busca un umbral que separe los casos con lluvia de los sin lluvia",
    ],
  },
  {
    id: "abductive-reasoning",
    title: "Razonamiento Abductivo: Diagnóstico",
    category: "abductive",
    difficulty: "advanced",
    description: "Encuentra la mejor explicación para un conjunto de síntomas",
    scenario:
      "Un sistema de software presenta los siguientes síntomas:\n- Respuesta lenta en consultas a la base de datos\n- Alto uso de CPU\n- Memoria disponible normal\n- Red funcionando correctamente",
    question: "¿Cuál es la explicación más probable?",
    type: "multiple-choice",
    options: [
      "Consultas SQL mal optimizadas",
      "Falta de memoria RAM",
      "Problemas de conectividad de red",
      "Disco duro lleno",
    ],
    correctAnswer: 0,
    explanation:
      "El razonamiento abductivo busca la mejor explicación. Dado que hay respuesta lenta en BD + alto CPU, pero memoria y red normales, lo más probable son consultas SQL mal optimizadas que requieren mucho procesamiento.",
    hints: [
      "Considera qué explicación es más consistente con todos los síntomas",
      "Piensa en la navaja de Occam: la explicación más simple suele ser la correcta",
    ],
  },
  {
    id: "syllogism-construction",
    title: "Construcción de Silogismos",
    category: "deductive",
    difficulty: "advanced",
    description: "Construye un silogismo válido",
    scenario: "Tienes que crear un argumento lógico válido usando la estructura de silogismo categórico",
    question: 'Completa el silogismo: "Todos los programadores son lógicos. Juan es programador. Por tanto, ___"',
    type: "logical-reasoning",
    correctAnswer: "Juan es lógico",
    explanation:
      'Este es un silogismo categórico clásico. Premisa mayor: "Todos los A son B", Premisa menor: "C es A", Conclusión: "C es B". Por tanto, Juan es lógico.',
    hints: [
      "Sigue la estructura: Todos los A son B, C es A, por tanto C es B",
      "La conclusión debe conectar el sujeto de la premisa menor con el predicado de la premisa mayor",
    ],
  },
]

const practicalScenarios = [
  {
    id: "debugging-scenario",
    title: "Depuración de Software",
    description: "Aplicar inferencia lógica para encontrar bugs",
    scenario:
      "Tu aplicación web falla intermitentemente. Aplica diferentes tipos de razonamiento para diagnosticar el problema.",
    steps: [
      "Recolecta evidencia (logs, patrones de fallo)",
      "Aplica razonamiento abductivo para generar hipótesis",
      "Usa razonamiento deductivo para probar hipótesis",
      "Emplea razonamiento inductivo para identificar patrones",
    ],
  },
  {
    id: "ai-decision-making",
    title: "Toma de Decisiones en IA",
    description: "Cómo los sistemas de IA usan inferencia lógica",
    scenario: "Un sistema de recomendaciones debe decidir qué productos sugerir a un usuario.",
    steps: [
      "Análisis inductivo del comportamiento pasado del usuario",
      "Razonamiento deductivo basado en reglas de negocio",
      "Inferencia abductiva para explicar preferencias",
      "Combinación de evidencias para la decisión final",
    ],
  },
]

export function PracticalExamples() {
  const [currentExercise, setCurrentExercise] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [userCode, setUserCode] = useState<string>("")
  const [showResult, setShowResult] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [showHint, setShowHint] = useState<boolean>(false)

  const exercise = exercises[currentExercise]
  const progress = (completedExercises.size / exercises.length) * 100

  const checkAnswer = () => {
    let correct = false

    if (exercise.type === "multiple-choice") {
      correct = Number.parseInt(selectedAnswer) === exercise.correctAnswer
    } else if (exercise.type === "code-completion") {
      correct = userCode
        .trim()
        .toLowerCase()
        .includes((exercise.correctAnswer as string).toLowerCase())
    } else if (exercise.type === "logical-reasoning") {
      correct = userCode
        .trim()
        .toLowerCase()
        .includes((exercise.correctAnswer as string).toLowerCase())
    }

    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setCompletedExercises((prev) => new Set([...prev, exercise.id]))
    }
  }

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      resetExercise()
    }
  }

  const resetExercise = () => {
    setSelectedAnswer("")
    setUserCode("")
    setShowResult(false)
    setIsCorrect(false)
    setShowHint(false)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "deductive":
        return "bg-primary text-primary-foreground"
      case "inductive":
        return "bg-secondary text-secondary-foreground"
      case "abductive":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
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
            <Play className="h-5 w-5 text-primary" />
            Ejemplos Prácticos y Ejercicios
          </CardTitle>
          <CardDescription>
            Pon en práctica tus conocimientos de inferencia lógica con ejercicios interactivos y escenarios del mundo
            real.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso General</span>
            <span className="text-sm text-muted-foreground">
              {completedExercises.size}/{exercises.length} completados
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Ejercicios completados: {completedExercises.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm">Precisión: {completedExercises.size > 0 ? "100%" : "0%"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="exercises" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exercises">Ejercicios Interactivos</TabsTrigger>
          <TabsTrigger value="scenarios">Escenarios Prácticos</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-6">
          {/* Exercise Navigation */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Ejercicio {currentExercise + 1} de {exercises.length}
                  </span>
                  {completedExercises.has(exercise.id) && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
                    disabled={currentExercise === 0}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1))}
                    disabled={currentExercise === exercises.length - 1}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {exercises.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentExercise ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setCurrentExercise(index)
                      resetExercise()
                    }}
                    className="w-8 h-8 p-0"
                  >
                    {completedExercises.has(exercises[index].id) ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Exercise */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  {exercise.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getCategoryColor(exercise.category)}>{exercise.category}</Badge>
                  <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                </div>
              </div>
              <CardDescription>{exercise.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Scenario */}
              <div>
                <h4 className="font-semibold mb-2">Escenario:</h4>
                <div className="bg-muted p-3 rounded-md">
                  <pre className="text-sm whitespace-pre-line">{exercise.scenario}</pre>
                </div>
              </div>

              {/* Question */}
              <div>
                <h4 className="font-semibold mb-2">Pregunta:</h4>
                <p className="text-sm">{exercise.question}</p>
              </div>

              {/* Answer Input */}
              {exercise.type === "multiple-choice" && exercise.options && (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {exercise.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {(exercise.type === "code-completion" || exercise.type === "logical-reasoning") && (
                <div>
                  {exercise.codeTemplate && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Template:</h4>
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">
                          <code>{exercise.codeTemplate}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                  <Textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder={
                      exercise.type === "code-completion" ? "Completa el código..." : "Escribe tu respuesta..."
                    }
                    className="font-mono text-sm"
                  />
                </div>
              )}

              {/* Hints */}
              {!showResult && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)}>
                    <Lightbulb className="h-4 w-4 mr-1" />
                    {showHint ? "Ocultar" : "Mostrar"} Pistas
                  </Button>
                </div>
              )}

              {showHint && !showResult && (
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="space-y-1">
                      {exercise.hints.map((hint, index) => (
                        <li key={index} className="text-sm">
                          • {hint}
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!showResult ? (
                  <Button
                    onClick={checkAnswer}
                    disabled={
                      (exercise.type === "multiple-choice" && !selectedAnswer) ||
                      ((exercise.type === "code-completion" || exercise.type === "logical-reasoning") &&
                        !userCode.trim())
                    }
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verificar Respuesta
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={resetExercise}>
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reintentar
                    </Button>
                    {currentExercise < exercises.length - 1 && (
                      <Button onClick={nextExercise}>Siguiente Ejercicio</Button>
                    )}
                  </div>
                )}
              </div>

              {/* Result */}
              {showResult && (
                <Alert className={isCorrect ? "border-green-500" : "border-red-500"}>
                  {isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-semibold">{isCorrect ? "¡Correcto!" : "Incorrecto"}</p>
                      <p className="text-sm">{exercise.explanation}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          {/* Practical Scenarios */}
          {practicalScenarios.map((scenario) => (
            <Card key={scenario.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {scenario.title}
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Escenario:</h4>
                    <p className="text-sm text-muted-foreground">{scenario.scenario}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Pasos a seguir:</h4>
                    <ol className="space-y-2">
                      {scenario.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Badge variant="outline" className="mt-0.5 text-xs">
                            {index + 1}
                          </Badge>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
