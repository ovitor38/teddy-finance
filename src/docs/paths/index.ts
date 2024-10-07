import redirectRoute from './redirect'
import urlRoutes from './url'
import userRoutes from './user'

const paths = {
  ...userRoutes,
  ...urlRoutes,
  ...redirectRoute
}

export default paths
