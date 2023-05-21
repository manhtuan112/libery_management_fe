import Home from '../pages/Home'
import { lazy } from 'react'

const Detail = lazy(() => import('../pages/Detail'))

const routes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/book/:id/detail',
    element: <Detail />
  },
  {
    path: '/book/add',
    element: <Detail />
  }
]

export { routes }
