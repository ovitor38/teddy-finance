const create = {
  post: {
    tags: ['Url Routes'],
    description: 'Create short url route',
    operationId: 'createRoute',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UrlCreateRequest'
          }
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Url successufully created',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UrlResponse'
          }
        }
      }
    }
  }
}
export default create