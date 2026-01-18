import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalysisRequest {
  code: string;
  language: string;
  filename: string;
}

interface CodeIssue {
  type: "bug" | "security" | "performance" | "code_smell";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  line_start?: number;
  line_end?: number;
  suggestion: string;
  code_example?: string;
}

interface AnalysisResponse {
  summary: string;
  overall_severity: "high" | "medium" | "low" | "clean";
  issues: CodeIssue[];
  stats: {
    total_issues: number;
    bugs: number;
    security: number;
    performance: number;
    code_smells: number;
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, language, filename } = await req.json() as AnalysisRequest;

    if (!code || !code.trim()) {
      return new Response(
        JSON.stringify({ error: "No code provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are CodeForensics, an expert code analysis AI. Analyze code for bugs, security vulnerabilities, performance issues, and code quality problems.

CRITICAL: You must respond ONLY with a valid JSON object using the exact schema below. No markdown, no explanation, just pure JSON.

Analyze the provided ${language} code and return your findings in this exact JSON structure:
{
  "summary": "Brief 1-2 sentence summary of the code quality",
  "overall_severity": "high" | "medium" | "low" | "clean",
  "issues": [
    {
      "type": "bug" | "security" | "performance" | "code_smell",
      "severity": "high" | "medium" | "low",
      "title": "Short descriptive title",
      "description": "Clear explanation of the issue and its impact",
      "line_start": number or null,
      "line_end": number or null,
      "suggestion": "How to fix this issue",
      "code_example": "Optional corrected code snippet"
    }
  ],
  "stats": {
    "total_issues": number,
    "bugs": number,
    "security": number,
    "performance": number,
    "code_smells": number
  }
}

Analysis Guidelines:
- For BUGS: Look for null pointer issues, off-by-one errors, logic errors, race conditions, unhandled exceptions
- For SECURITY: Look for injection vulnerabilities, authentication flaws, data exposure, insecure practices
- For PERFORMANCE: Look for inefficient algorithms, unnecessary operations, memory leaks, blocking operations
- For CODE_SMELLS: Look for duplicated code, long functions, unclear naming, missing error handling

Be thorough but practical. Only report real issues, not style preferences. Provide actionable suggestions.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this ${language} file "${filename}":\n\n\`\`\`${language}\n${code}\n\`\`\`` }
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI analysis failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No content in AI response:", data);
      return new Response(
        JSON.stringify({ error: "AI returned empty response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON response from the AI
    let analysis: AnalysisResponse;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      analysis = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content, parseError);
      return new Response(
        JSON.stringify({ error: "Failed to parse analysis results" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate and ensure all required fields
    const validatedAnalysis: AnalysisResponse = {
      summary: analysis.summary || "Analysis complete",
      overall_severity: analysis.overall_severity || "clean",
      issues: Array.isArray(analysis.issues) ? analysis.issues : [],
      stats: {
        total_issues: analysis.stats?.total_issues || analysis.issues?.length || 0,
        bugs: analysis.stats?.bugs || 0,
        security: analysis.stats?.security || 0,
        performance: analysis.stats?.performance || 0,
        code_smells: analysis.stats?.code_smells || 0,
      },
    };

    console.log(`Analysis complete: ${validatedAnalysis.stats.total_issues} issues found`);

    return new Response(
      JSON.stringify(validatedAnalysis),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
