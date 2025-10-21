import { useEffect, useState } from 'react'
import './App.css'
import type {WarframeDto} from 'shared/src/dtos/warframe.dto'

function App() {
  const [warframe, setWarframe] = useState<WarframeDto | null>( null )

  useEffect(() => {
    fetch('http://localhost:3000/warframe-quiz/daily')
      .then((response) => response.json())
      .then((data) => setWarframe(data))
      .catch((error) => console.error("Error al cargar el warframe:", error));
  }, []);

  if (!warframe) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-lg">Cargando warframe del día...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Warframe del Día</h1>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-2">{warframe.name}</h2>
        <p className="text-gray-400">{warframe.description || "Sin descripción"}</p>
      </div>
    </div>
    </>
  )
}

export default App
