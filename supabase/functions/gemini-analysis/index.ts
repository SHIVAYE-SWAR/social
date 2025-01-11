import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { GoogleGenerativeAI } from '@google/generative-ai'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, type } = await req.json()

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI('AIzaSyAenU-xdfvhNkkNyBUmnsFnd3svvhJg_l8')
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    let result
    switch (type) {
      case 'title_suggestions':
        const response = await model.generateContent(prompt)
        const text = response.response.text()
        // Parse the response as JSON array
        result = { suggestions: JSON.parse(text) }
        break
      default:
        throw new Error('Invalid analysis type')
    }

    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})