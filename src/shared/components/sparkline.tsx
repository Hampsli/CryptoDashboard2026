type Props = {
  data:     number[];
  positive: boolean;
};

export const Sparkline = ({ data, positive }: Props) => {
  if (!data?.length) return null;

  const w = 80, h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#15803d' : '#b91c1c'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};