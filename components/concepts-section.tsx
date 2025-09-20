"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Lightbulb, ArrowRight, CheckCircle } from "lucide-react"

interface LogicConcept {
  id: string
  title: string
  category: "deductive" | "inductive" | "abductive"
  difficulty: "beginner" | "intermediate" | "advanced"
  description: string
  explanation: string
  example: string
  codeExample: string
  rules: string[]
}

const logicConcepts: LogicConcept[] = [
  {
    id: "modus-ponens",
    title: "Modus Ponens",
    category: "deductive",
    difficulty: "beginner",
    description: "Regla de inferencia fundamental que permite derivar conclusiones de premisas condicionales.",
    explanation:
      'Si tenemos una premisa condicional "Si P entonces Q" y sabemos que P es verdadero, entonces podemos concluir que Q también es verdadero.',
    example: "Premisa 1: Si llueve, entonces el suelo se moja.\nPremisa 2: Llueve.\nConclusión: El suelo se moja.",
    codeExample: `function modusPonens(premisa1: boolean, premisa2: boolean): boolean {
  // Si P entonces Q, y P es verdadero
  if (premisa1 && premisa2) {
    return true; // Entonces Q es verdadero
  }
  return false;
}`,
    rules: [
      "La premisa condicional debe ser verdadera",
      "El antecedente debe ser verdadero",
      "La conclusión se deriva lógicamente",
    ],
  },
  {
    id: "modus-tollens",
    title: "Modus Tollens",
    category: "deductive",
    difficulty: "beginner",
    description: "Regla de inferencia que permite negar el antecedente cuando se niega el consecuente.",
    explanation:
      'Si tenemos "Si P entonces Q" y sabemos que Q es falso, entonces podemos concluir que P también es falso.',
    example:
      "Premisa 1: Si llueve, entonces el suelo se moja.\nPremisa 2: El suelo no está mojado.\nConclusión: No llueve.",
    codeExample: `function modusTollens(condicional: boolean, consecuente: boolean): boolean {
  // Si P entonces Q, y Q es falso
  if (condicional && !consecuente) {
    return false; // Entonces P es falso
  }
  return true;
}`,
    rules: ["La premisa condicional debe ser verdadera", "El consecuente debe ser falso", "Se niega el antecedente"],
  },
  {
    id: "silogismo-hipotetico",
    title: "Silogismo Hipotético",
    category: "deductive",
    difficulty: "intermediate",
    description: "Cadena de razonamiento que conecta múltiples premisas condicionales.",
    explanation: 'Si tenemos "Si P entonces Q" y "Si Q entonces R", entonces podemos concluir "Si P entonces R".',
    example:
      "Premisa 1: Si estudio, entonces aprendo.\nPremisa 2: Si aprendo, entonces paso el examen.\nConclusión: Si estudio, entonces paso el examen.",
    codeExample: `function silogismoHipotetico(p_q: boolean, q_r: boolean, p: boolean): boolean {
  // Si P entonces Q, y Si Q entonces R, y P es verdadero
  if (p_q && q_r && p) {
    return true; // Entonces R es verdadero
  }
  return false;
}`,
    rules: [
      "Ambas premisas condicionales deben ser verdaderas",
      "El consecuente de la primera debe ser el antecedente de la segunda",
      "Se forma una cadena lógica",
    ],
  },
  {
    id: "induccion-generalizacion",
    title: "Inducción por Generalización",
    category: "inductive",
    difficulty: "intermediate",
    description: "Proceso de inferir una regla general a partir de casos específicos observados.",
    explanation:
      "Observamos varios casos particulares y extraemos un patrón general que puede aplicarse a casos similares.",
    example: "Observación: Todos los cisnes que he visto son blancos.\nConclusión: Todos los cisnes son blancos.",
    codeExample: `function induccionGeneralizacion(casos: boolean[], umbral: number): boolean {
  const casosVerdaderos = casos.filter(caso => caso).length;
  const porcentaje = casosVerdaderos / casos.length;
  
  // Si el porcentaje supera el umbral, generalizamos
  return porcentaje >= umbral;
}`,
    rules: [
      "Se basa en observaciones empíricas",
      "La conclusión es probable, no definitiva",
      "Más casos aumentan la confianza",
    ],
  },
  {
    id: "abduccion",
    title: "Razonamiento Abductivo",
    category: "abductive",
    difficulty: "advanced",
    description: "Inferencia hacia la mejor explicación posible de un fenómeno observado.",
    explanation:
      "Dado un resultado observado, buscamos la explicación más plausible que podría haber causado ese resultado.",
    example:
      "Observación: El césped está mojado.\nPosibles explicaciones: Llovió, se activó el riego, alguien regó.\nMejor explicación: Llovió (más simple y común).",
    codeExample: `function razonamientoAbductivo(observacion: string, explicaciones: Array<{explicacion: string, probabilidad: number}>): string {
  // Encontrar la explicación con mayor probabilidad
  return explicaciones.reduce((mejor, actual) => 
    actual.probabilidad > mejor.probabilidad ? actual : mejor
  ).explicacion;
}`,
    rules: ["Se busca la explicación más simple", "Se considera la probabilidad previa", "Es falible y revisable"],
  },
]

export function ConceptsSection() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set())

  const toggleExpanded = (conceptId: string) => {
    const newExpanded = new Set(expandedConcepts)
    if (newExpanded.has(conceptId)) {
      newExpanded.delete(conceptId)
    } else {
      newExpanded.add(conceptId)
    }
    setExpandedConcepts(newExpanded)
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
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Fundamentos de la Inferencia Lógica
          </CardTitle>
          <CardDescription>
            La inferencia lógica es el proceso de derivar conclusiones válidas a partir de premisas dadas. Explora los
            diferentes tipos de razonamiento y sus aplicaciones en programación.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Concepts Grid */}
      <div className="grid gap-4">
        {logicConcepts.map((concept) => (
          <Card key={concept.id} className="transition-all hover:shadow-md">
            <Collapsible open={expandedConcepts.has(concept.id)} onOpenChange={() => toggleExpanded(concept.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {expandedConcepts.has(concept.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{concept.title}</CardTitle>
                        <CardDescription className="mt-1">{concept.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getCategoryColor(concept.category)}>{concept.category}</Badge>
                      <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                        {concept.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Explanation */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Explicación
                      </h4>
                      <p className="text-muted-foreground">{concept.explanation}</p>
                    </div>

                    {/* Example */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-secondary" />
                        Ejemplo
                      </h4>
                      <div className="bg-muted p-3 rounded-md">
                        <pre className="text-sm whitespace-pre-line">{concept.example}</pre>
                      </div>
                    </div>

                    {/* Code Example */}
                    <div>
                      <h4 className="font-semibold mb-2">Implementación en Código</h4>
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">
                          <code>{concept.codeExample}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Rules */}
                    <div>
                      <h4 className="font-semibold mb-2">Reglas Importantes</h4>
                      <ul className="space-y-1">
                        {concept.rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  )
}
