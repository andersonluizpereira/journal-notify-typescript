export const categoryPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Categorias'],
    summary: 'API para listar todas as categorias',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/categorys'
              }
            }
          }
        }
      },
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
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Categorias'],
    summary: 'API para criar uma categoria',
    description: 'Essa rota só pode ser executada por **administradores**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addCategoryParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso, exibindo os dados'
      },
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
  },
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Categorias'],
    summary: 'API para atualizar uma categoria',
    description: 'Essa rota só pode ser executada por **administradores**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateCategoryParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso, exibindo os dados'
      },
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
