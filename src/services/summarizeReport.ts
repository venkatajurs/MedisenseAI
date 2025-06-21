// src/services/summarizeReport.ts

export interface ReportParameter {
  name: string;
  value: number | string;
  unit: string;
  reference_range: string;
  status: 'low' | 'normal' | 'high';
  explanation: string;
}

export interface Recommendations {
  diet: string[];
  exercise: string[];
  lifestyle: string[];
}

export interface AIReportSummary {
  summary: string;
  risk_level: 'low' | 'medium' | 'high';
  parameters: ReportParameter[];
  recommendations: Recommendations;
}

export async function summarizeReport(
  extractedText: string,
  apiKey: string
): Promise<AIReportSummary> {
  const unifiedPrompt = `
You are a medical report summarizer AI.

Analyze the following medical report and return a JSON response with:

1. "summary": a short summary of the report,
2. "risk_level": one of "low", "medium", or "high",
3. "parameters": a list of extracted key-value medical parameters with:
   - name
   - value
   - unit
   - reference_range
   - status (low/normal/high)
   - explanation
4. "recommendations": object with arrays of strings for:
   - diet
   - exercise
   - lifestyle

Strictly return ONLY a valid JSON object. Do NOT add any explanation, greeting, or markdown. Here is the report:

"""
${extractedText}
"""`.trim();

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages: [
        {
          role: 'user',
          content: unifiedPrompt
        }
      ],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter API error: ${err}`);
  }

  const data = await response.json();
  const textContent = data.choices?.[0]?.message?.content?.trim();

  if (!textContent) {
    throw new Error('No content returned from AI.');
  }

  try {
    // Strip code block markdown if present
    const cleaned = textContent.replace(/```json|```/g, '').trim();
    const parsed: AIReportSummary = JSON.parse(cleaned);
    return parsed;
  } catch (err) {
    console.error('Failed to parse AI response:', textContent);
    throw new Error(`Failed to parse AI response: ${textContent}`);
  }
}
