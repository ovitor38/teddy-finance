const create = {
  post: {
    tags: ['User Routes'],
    description: 'Create new user route',
    operationId: 'createUser',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User'
          }
        }
      }
    }
  },
  responses: {
    201: {
      description: 'User successufully created',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserResponse'
          }
        }
      }
    }
  }
}
export default create