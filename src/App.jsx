import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './router/Router'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Router />
    </BrowserRouter>
  )
}

export default App
