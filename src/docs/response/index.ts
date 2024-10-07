const responses = {
  BadRequest: {
    description: 'Requisição inválida',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  NotFound: {
    description: 'URL não encontrada'
  }
}

export default responses
