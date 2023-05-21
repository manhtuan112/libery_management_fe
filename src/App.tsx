import { Suspense } from 'react'
import MainLayout from './layouts/MainLayout'
import AppRouter from './routers/AppRouter'
import Loading from './pages/Loading'

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<Loading />}>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </Suspense>
    </div>
  )
}

export default App
