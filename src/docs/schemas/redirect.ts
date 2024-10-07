const redirect = {
  UrlIdParams: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Unique ID of the shortened URL',
        example: 'd4wFFg',
        required: true
      }
    }
  }
}
export default redirect
