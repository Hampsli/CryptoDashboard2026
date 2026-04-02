import { useMemo } from 'react'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { Line } from 'react-chartjs-2'
import type { priceChart } from '../../../shared/types'

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Filler)

type Props = {
  data:     priceChart
  coinName: string
}

export const CoinChart = ({ data, coinName }: Props) => {
  const chartData = useMemo(() => ({
    datasets: [{
      data: data.prices.map(([timestamp, price]) => ({
        x: timestamp,
        y: price,
      })),
      borderColor:     '#15803d',
      backgroundColor: 'rgba(21, 128, 61, 0.08)',
      borderWidth:     2,
      pointRadius:     0,
      fill:            true,
      tension:         0.3,
    }],
  }), [data])

  const options = useMemo(() => ({
    responsive:          true,
    maintainAspectRatio: false,
    plugins: {
      legend:  { display: false },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (ctx: any) =>
            new Intl.NumberFormat('en-US', {
              style:    'currency',
              currency: 'USD',
            }).format(ctx.parsed.y),
        },
        bodyColor:       '#1e293b',
        backgroundColor: '#ffffff',
        borderColor:     '#e2e8f0',
        borderWidth:     1,
      },
    },
    scales: {
      x: {
        type:   'time' as const,
        time:   { unit: 'day' as const },
        grid:   { display: false },
        ticks:  { color: '#475569', font: { size: 11 } },
      },
      y: {
        grid:   { color: '#f1f5f9' },
        ticks:  {
          color: '#475569',
          font:  { size: 11 },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (value: any) =>
            new Intl.NumberFormat('en-US', {
              style:    'currency',
              currency: 'USD',
              notation: 'compact',
            }).format(value),
        },
      },
    },
  }), [])

  return (
    <div
      role="img"
      aria-label={`7-day price history chart for ${coinName}`}
      className="h-48 w-full"
    >
      <Line data={chartData} options={options} />
    </div>
  )
}