import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DashboardScreen } from './features/market-dashboard/components/dashboardScreen'
import { DetailDrawer } from './features/coin-detail/components/drawerDetail'

// Inicialización del cliente de React Query
const queryClient = new QueryClient()

/**
 * Obtiene el ID de la moneda desde la URL actual
 */
const getCoinParam = () =>
  new URLSearchParams(window.location.search).get('coin')

/**
 * Actualiza o añade un parámetro en la URL sin recargar la página
 */
const setParam = (key: string, value: string): void => {
  const params = new URLSearchParams(window.location.search)
  params.set(key, value)
  window.history.pushState({}, '', `?${params.toString()}`)
}

const App = () => {
  // Estado inicial basado en la URL
  const [coinId, setCoinId] = useState<string | null>(getCoinParam)

  /**
   * Sincroniza el estado cuando el usuario navega con las flechas 
   * del navegador (atrás/adelante)
   */
  useEffect(() => {
    const handler = () => {
      const idFromUrl = getCoinParam()
      if (idFromUrl !== coinId) {
        setCoinId(idFromUrl)
      }
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [coinId])

  /**
   * Se ejecuta al hacer click en una fila de la tabla
   */
  const handleRowClick = (id: string) => {
    setParam('coin', id)
    setCoinId(id)
  }

  /**
   * Cierra el panel lateral y limpia la URL
   */
  const handleClose = () => {
        setCoinId(null)
    const params = new URLSearchParams(window.location.search)
    params.delete('coin')
    window.history.pushState({}, '', `?${params.toString()}`)

  }

  // Determinamos si el detalle está abierto para pausar el Dashboard
  const isDetailOpen = !!coinId

  return (
    <QueryClientProvider client={queryClient}>
      {/* IMPORTANTE: Pasamos isDetailOpen a DashboardScreen 
        para que este pueda detener el hook useCoins
      */}
      <DashboardScreen 
        onRowClick={handleRowClick} 
        isDetailOpen={isDetailOpen} 
      />
      
      <DetailDrawer 
        coinId={coinId} 
        onClose={handleClose} 
      />
    </QueryClientProvider>
  )
}

export default App