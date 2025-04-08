
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { ThemeProvider } from './components/context/ThemeContext'


function App() {

  return (
    <>
      <ThemeProvider>
      <div className="flex flex-col min-h-screen"> 
        <Navbar />
        <main className="flex-grow max-w-screen-2xl mx-auto w-full px-4 font-primary pt-16">
         <Outlet /> 
        </main>
      </div>
    </ThemeProvider>

    </>
  )
}

export default App