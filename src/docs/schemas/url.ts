const url = {
  Url: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'unique id of 6 characters',
        example: 'sDG579'
      },
      completeUrl: {
        type: 'string',
        description: 'complete Url to short',
        example: 'http://google.com',
        required: true
      },
      createdAt: {
        type: 'string',
        description: 'Creation Date',
        example: '2021-09-08T17:12:15.084Z',
        format: 'date-time'
      },
      userId: {
        type: 'string',
        description: ' user owner Id (uuid)',
        example: '012a44e0-4766-41c5-8e7e-9ac40939f8a5',
        require: false
      },
      updatedAt: {
        type: 'string',
        description: 'Update register date',
        example: '2021-09-08T17:12:15.084Z',
        format: 'date-time'
      },
      deletedAt: {
        type: 'string',
        description: 'delete register date',
        example: '2021-09-08T17:12:15.084Z',
        format: 'date-time'
      }
    }
  },

  UrlResponse: {
    type: 'object',
    properties: {
      completeUrl: {
        type: 'string',
        description: 'complete Url to short',
        example: 'http://google.com'
      }
    }
  },
  UrlCreateRequest: {
    type: 'object',
    properties: {
      completeUrl: {
        type: 'string',
        description: 'complete Url to short',
        example: 'http://google.com',
        required: true
      },
      BearerToken: {
        type: 'string',
        description: 'token access for signed up users',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        required: false
      }
    }
  },
  UrlUpdateRequest: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'unique id url',
        example: 'd4wFFg',
        required: true
      },
      completeUrl: {
        type: 'string',
        description: 'complete Url to short',
        example: 'http://google.com',
        required: true
      }
    }
  },
  UrlDeleteRequest: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'unique id url',
        example: 'd4wFFg',
        required: true
      }
    }
  },
  UrlGetAllRequest: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        description: 'unique id user',
        example:
          ' "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"',
        required: true
      }
    }
  },

  UrlGetAllResponse: {
    type: 'array',
    items: {
      $ref: '#/components/schemas/Url'
    },
    description: 'List of shortened URLs'
  },
  
}

export default url
