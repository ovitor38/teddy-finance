import swaggerJSDoc from 'swagger-jsdoc'
import tags from './tags/tags'
import paths from './paths'
import schemas from './schemas'
import responses from './response'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Encurtador de URLs',
      description: 'API para encurtamento de URLs',
      version: '1.0.0',
      contact: {
        name: 'Repository(GitHub)',
        url: 'https://git.com/ovitor38/teddy-finance'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor Principal'
      }
    ],
    security: [
      {
        apiKeyAuth: []
      }
    ],
    tags: tags,
    paths: paths,
    components: schemas.components,
    responses: responses
  },
  apis: []
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export default swaggerSpec
