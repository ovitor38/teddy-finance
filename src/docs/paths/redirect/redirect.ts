const redirect = {
  post: {
    tags: ['Redirect Routes'],
    description: 'Redirect to original url',
    operationId: 'redirectRoute',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UrlIdParams'
          }
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Url successufully created',
      content: {
        'application/json': {}
      }
    }
  }
}
export default redirect
