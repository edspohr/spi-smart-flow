import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No se recibió ningún archivo'
      }, { status: 400 });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      // Return mock data for demo purposes when no API key
      console.log('No GEMINI_API_KEY configured, returning mock data');
      await new Promise(r => setTimeout(r, 2000)); // Simulate processing time
      
      return NextResponse.json({
        success: true,
        name: 'Carlos Andrés Mendoza Fuentes',
        documentNumber: '12.345.678-9',
        expirationDate: '15/02/2028',
        message: 'Documento validado exitosamente (modo demo)'
      });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    // Determine mime type
    const mimeType = file.type || 'image/jpeg';

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create the prompt
    const prompt = `Actúa como un validador legal experto. Analiza esta imagen de documento.

Si es un documento de identidad (cédula, DNI, pasaporte, etc.), extrae la siguiente información:
1. Nombre completo de la persona
2. Número de documento/RUT
3. Fecha de vencimiento del documento

Responde ÚNICAMENTE en formato JSON con la siguiente estructura:
{
  "success": true,
  "name": "Nombre completo",
  "documentNumber": "Número de documento",
  "expirationDate": "Fecha de vencimiento en formato DD/MM/YYYY"
}

Si el documento no es legible, no es un documento de identidad, o no puedes extraer la información, responde:
{
  "success": false,
  "error": "Descripción del problema"
}

IMPORTANTE: Responde SOLO con el JSON, sin texto adicional ni markdown.`;

    // Generate content with the image
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      },
      prompt
    ]);

    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    try {
      // Clean the response in case it has markdown formatting
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const jsonResponse = JSON.parse(cleanedText);
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      console.error('Error parsing AI response:', text);
      return NextResponse.json({
        success: false,
        error: 'Error al procesar la respuesta de la IA'
      });
    }

  } catch (error) {
    console.error('Error in document analysis:', error);
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor. Por favor intenta de nuevo.'
    }, { status: 500 });
  }
}
