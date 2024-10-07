const getAll = {
    get: {
      tags: ['Url Routes'],
      description: 'delete short url route',
      operationId: 'deleteRoute',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UrlGetAllRequest'
            }
          }
        }
      }
    },
    security: [{ Bearer: [] }], 
    responses: {
      201: {
        description: 'Url successufully deleted',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UrlGetAllResponse'
            }
          }
        }
      }
    }
  }
  export default getAll