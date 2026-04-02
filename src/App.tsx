import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DashboardScreen } from './features/market-dashboard/components/dashboardScreen'
import {  DetailDrawer } from './features/coin-detail/components/drawerDetail'

const queryClient = new QueryClient()

const getCoinParam = () =>
  new URLSearchParams(window.location.search).get('coin')

const App = () => {
  const [coinId, setCoinId] = useState<string | null>(getCoinParam)

  useEffect(() => {
    const handler = () => setCoinId(getCoinParam())
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const handleRowClick = (id: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set('coin', id)
    window.history.pushState({}, '', `?${params.toString()}`)
    setCoinId(id)
  }

  const handleClose = () => {
    const params = new URLSearchParams(window.location.search)
    params.delete('coin')
    window.history.pushState({}, '', `?${params.toString()}`)
    setCoinId(null)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardScreen onRowClick={handleRowClick} />
      <DetailDrawer coinId={coinId} onClose={handleClose} />
    </QueryClientProvider>
  )
}

export default App