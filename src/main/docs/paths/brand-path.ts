export const brandPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Marcas'],
    summary: 'API para criar uma marcas',
    description: 'Essa rota só pode ser executada por **administradores**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addBrandParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso, mas sem dados para exibir'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
