# SPI Smart Flow - Environment Variables

Para configurar la integración con Gemini AI, crea un archivo `.env.local` con:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Obtén tu API key en: https://makersuite.google.com/app/apikey

**Nota:** Sin esta API key, el sistema funcionará en "modo demo" y mostrará datos de ejemplo para la validación de documentos.

## Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. En Settings > Environment Variables, añade:
   - `GEMINI_API_KEY` = tu API key de Gemini
3. Deploy

La URL de producción estará lista para la presentación.
