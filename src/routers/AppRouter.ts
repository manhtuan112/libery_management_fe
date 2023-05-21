import { useRoutes } from 'react-router-dom'
import {routes} from './router'


export default function AppRouter() {
  const router = useRoutes(routes)
  return router
}
