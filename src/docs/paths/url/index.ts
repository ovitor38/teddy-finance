import create from './create'
import del from './delete'
import getAll from './get-all'
import update from './update'

const urlRoutes = {
  '/api/url': {
    ...create,
    ...del,
    ...update,
    ...getAll
  }
}
export default urlRoutes
