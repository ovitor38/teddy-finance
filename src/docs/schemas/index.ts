import url from './url'
import user from './user'

const schemas = {
  components: {
    schemas: {
      ...user,
      ...url,
      Error: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number'
          },
          message: {
            type: 'string'
          }
        }
      }
    }
  }
}

export default schemas
