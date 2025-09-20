"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, RotateCcw, Copy, Check, AlertCircle, CheckCircle, Code2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CodeTemplate {
  id: string
  name: string
  description: string
  category: "deductive" | "inductive" | "abductive"
  code: string
  explanation: string
  testCases: Array<{
    input: string
    expectedOutput: string
    description: string
  }>
}

const codeTemplates: CodeTemplate[] = [
  {
    id: "modus-ponens-impl",
    name: "Modus Ponens",
    description: "Implementación de la regla de inferencia Modus Ponens",
    category: "deductive",
    code: `// Implementación de Modus Ponens
function modusPonens(premisaCondicional: boolean, antecedente: boolean): boolean {
  // Si P entonces Q, y P es verdadero, entonces Q es verdadero
  if (premisaCondicional && antecedente) {
    return true;
  }
  return false;
}

// Ejemplo de uso
const llueve = true;
const sueloMojado = modusPonens(true, llueve);
console.log(\`Si llueve, el suelo se moja: \${sueloMojado}\`);`,
    explanation:
      "Esta función implementa la regla Modus Ponens. Recibe una premisa condicional y el antecedente, y devuelve true si se puede inferir el consecuente.",
    testCases: [
      {
        input: "modusPonens(true, true)",
        expectedOutput: "true",
        description: "Premisa condicional verdadera y antecedente verdadero",
      },
      {
        input: "modusPonens(true, false)",
        expectedOutput: "false",
        description: "Premisa condicional verdadera pero antecedente falso",
      },
    ],
  },
  {
    id: "syllogism-impl",
    name: "Silogismo Categórico",
    description: "Implementación de un silogismo categórico básico",
    category: "deductive",
    code: `// Implementación de Silogismo Categórico
class SilogismoCategorico {
  private premisaMayor: string;
  private premisaMenor: string;
  private conclusion: string;

  constructor(mayor: string, menor: string) {
    this.premisaMayor = mayor;
    this.premisaMenor = menor;
    this.conclusion = this.inferirConclusion();
  }

  private inferirConclusion(): string {
    // Lógica simplificada para demostración
    return \`Por tanto, se puede concluir la relación lógica.\`;
  }

  public obtenerSilogismo(): object {
    return {
      premisaMayor: this.premisaMayor,
      premisaMenor: this.premisaMenor,
      conclusion: this.conclusion,
      esValido: this.validarSilogismo()
    };
  }

  private validarSilogismo(): boolean {
    // Validación básica
    return this.premisaMayor.length > 0 && this.premisaMenor.length > 0;
  }
}

// Ejemplo de uso
const silogismo = new SilogismoCategorico(
  "Todos los humanos son mortales",
  "Sócrates es humano"
);
console.log(silogismo.obtenerSilogismo());`,
    explanation:
      "Esta clase implementa un silogismo categórico, permitiendo crear argumentos lógicos válidos con premisa mayor, menor y conclusión.",
    testCases: [
      {
        input: 'new SilogismoCategorico("Todos los A son B", "C es A")',
        expectedOutput: "Objeto con silogismo válido",
        description: "Silogismo con premisas válidas",
      },
    ],
  },
  {
    id: "inductive-reasoning",
    name: "Razonamiento Inductivo",
    description: "Algoritmo para razonamiento inductivo basado en patrones",
    category: "inductive",
    code: `// Implementación de Razonamiento Inductivo
class RazonamientoInductivo {
  private observaciones: any[];
  private patron: any;

  constructor() {
    this.observaciones = [];
    this.patron = null;
  }

  agregarObservacion(observacion: any): void {
    this.observaciones.push(observacion);
    this.actualizarPatron();
  }

  private actualizarPatron(): void {
    if (this.observaciones.length < 2) return;
    
    // Buscar patrones simples
    const frecuencias = this.calcularFrecuencias();
    this.patron = this.encontrarPatronMasFrecuente(frecuencias);
  }

  private calcularFrecuencias(): Map<string, number> {
    const frecuencias = new Map<string, number>();
    
    this.observaciones.forEach(obs => {
      const clave = JSON.stringify(obs);
      frecuencias.set(clave, (frecuencias.get(clave) || 0) + 1);
    });
    
    return frecuencias;
  }

  private encontrarPatronMasFrecuente(frecuencias: Map<string, number>): any {
    let maxFrecuencia = 0;
    let patronMasFrecuente = null;
    
    frecuencias.forEach((frecuencia, patron) => {
      if (frecuencia > maxFrecuencia) {
        maxFrecuencia = frecuencia;
        patronMasFrecuente = JSON.parse(patron);
      }
    });
    
    return patronMasFrecuente;
  }

  predecir(): any {
    return this.patron;
  }

  obtenerConfianza(): number {
    if (this.observaciones.length === 0) return 0;
    
    const frecuencias = this.calcularFrecuencias();
    const maxFrecuencia = Math.max(...frecuencias.values());
    
    return maxFrecuencia / this.observaciones.length;
  }
}

// Ejemplo de uso
const razonamiento = new RazonamientoInductivo();
razonamiento.agregarObservacion({ color: "blanco", tipo: "cisne" });
razonamiento.agregarObservacion({ color: "blanco", tipo: "cisne" });
razonamiento.agregarObservacion({ color: "blanco", tipo: "cisne" });

console.log("Predicción:", razonamiento.predecir());
console.log("Confianza:", razonamiento.obtenerConfianza());`,
    explanation:
      "Esta clase implementa razonamiento inductivo, identificando patrones en observaciones y haciendo predicciones basadas en la frecuencia.",
    testCases: [
      {
        input: "Múltiples observaciones similares",
        expectedOutput: "Patrón identificado con alta confianza",
        description: "El algoritmo debe identificar patrones recurrentes",
      },
    ],
  },
]

export function CodeEditor() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(codeTemplates[0].id)
  const [code, setCode] = useState<string>(codeTemplates[0].code)
  const [output, setOutput] = useState<string>("")
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])

  const currentTemplate = codeTemplates.find((t) => t.id === selectedTemplate) || codeTemplates[0]

  useEffect(() => {
    const template = codeTemplates.find((t) => t.id === selectedTemplate)
    if (template) {
      setCode(template.code)
      setOutput("")
      setErrors([])
    }
  }, [selectedTemplate])

  const runCode = async () => {
    setIsRunning(true)
    setErrors([])

    try {
      // Simulación de ejecución de código
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Análisis básico del código
      const lines = code.split("\n")
      const hasFunction = lines.some((line) => line.includes("function") || line.includes("class"))
      const hasConsoleLog = lines.some((line) => line.includes("console.log"))

      let simulatedOutput = ""

      if (hasFunction && hasConsoleLog) {
        simulatedOutput = `✅ Código ejecutado exitosamente\n\n`

        // Simular salida basada en el template
        if (selectedTemplate === "modus-ponens-impl") {
          simulatedOutput += `Si llueve, el suelo se moja: true\n`
        } else if (selectedTemplate === "syllogism-impl") {
          simulatedOutput += `{\n  premisaMayor: "Todos los humanos son mortales",\n  premisaMenor: "Sócrates es humano",\n  conclusion: "Por tanto, se puede concluir la relación lógica.",\n  esValido: true\n}\n`
        } else if (selectedTemplate === "inductive-reasoning") {
          simulatedOutput += `Predicción: { color: "blanco", tipo: "cisne" }\nConfianza: 1\n`
        }

        simulatedOutput += `\n📊 Análisis del código:\n- Funciones detectadas: ${hasFunction ? "Sí" : "No"}\n- Salida de consola: ${hasConsoleLog ? "Sí" : "No"}\n- Líneas de código: ${lines.length}`
      } else {
        simulatedOutput = `⚠️ El código necesita funciones y salida de consola para ejecutarse correctamente.`
      }

      setOutput(simulatedOutput)
    } catch (error) {
      setErrors(["Error al ejecutar el código: " + (error as Error).message])
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    const template = codeTemplates.find((t) => t.id === selectedTemplate)
    if (template) {
      setCode(template.code)
      setOutput("")
      setErrors([])
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error al copiar:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Editor de Código Interactivo
          </CardTitle>
          <CardDescription>
            Experimenta con implementaciones de diferentes tipos de inferencia lógica. Modifica el código y observa cómo
            funcionan los algoritmos.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Template Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Seleccionar Template</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un template de código" />
            </SelectTrigger>
            <SelectContent>
              {codeTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    {template.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-4 p-4 bg-muted rounded-md">
            <h4 className="font-semibold mb-2">{currentTemplate.name}</h4>
            <p className="text-sm text-muted-foreground mb-3">{currentTemplate.description}</p>
            <p className="text-sm">{currentTemplate.explanation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Editor</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetCode}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Resetear
                </Button>
                <Button variant="outline" size="sm" onClick={copyCode}>
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? "Copiado" : "Copiar"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm min-h-[400px] resize-none"
              placeholder="Escribe tu código aquí..."
            />
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Líneas: {code.split("\n").length} | Caracteres: {code.length}
              </div>
              <Button onClick={runCode} disabled={isRunning}>
                <Play className="h-4 w-4 mr-1" />
                {isRunning ? "Ejecutando..." : "Ejecutar"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Salida</CardTitle>
          </CardHeader>
          <CardContent>
            {errors.length > 0 && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-slate-900 text-slate-100 p-4 rounded-md min-h-[400px] font-mono text-sm">
              {output || <div className="text-slate-400">La salida aparecerá aquí cuando ejecutes el código...</div>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Casos de Prueba</CardTitle>
          <CardDescription>Casos de prueba predefinidos para validar la implementación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentTemplate.testCases.map((testCase, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div>
                  <div className="font-mono text-sm">{testCase.input}</div>
                  <div className="text-xs text-muted-foreground mt-1">{testCase.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Esperado: {testCase.expectedOutput}</Badge>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
