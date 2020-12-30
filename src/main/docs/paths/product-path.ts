export const productPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Produtos'],
    summary: 'API para listar todas as produtos',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/products'
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
    tags: ['Produtos'],
    summary: 'API para criar uma produto',
    description: 'Essa rota só pode ser executada por **administradores**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addProductParams'
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
    tags: ['Produtos'],
    summary: 'API para atualizar uma categoria',
    description: 'Essa rota só pode ser executada por **administradores**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateProductParams'
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
