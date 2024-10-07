const user = {
  User: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'e-mail',
        example: 'user@email.com',
        required: true 
      },
      password: {
        type: 'string',
        description: 'password',
        example: 'super_secret',
        required: true
      }
    }
  },

  ClientResponse: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'e-mail',
        example: 'user@email.com'
      },
      password: {
        type: 'string',
        description: 'password',
        example: 'super_secret'
      },
      createdAt: {
        type: 'string',
        description: 'Creation Date',
        example: '2021-09-08T17:12:15.084Z',
        format: 'date-time'
      },
      updatedAt: {
        type: 'string',
        description: 'Update register date',
        example: '2021-09-08T17:12:15.084Z',
        format: 'date-time'
      }
    }
  },

  UserResponseGet: {
    type: 'array',
    items: {
      $ref: '#/components/schemas/ClientResponse'
    }
  }
}

export default user
