import './App.css'
import TodoWrapper from './components/TodoWrapper'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <Toaster position='top-right' richColors />
      <TodoWrapper />
    </>
  )
}

export default App
