type Props = { search: string };

export const EmptyPage = ({ search }: Props) => (
  <div className="flex flex-col items-center justify-center py-16 gap-2">
    <p className="text-slate-700 text-sm">
      No results for <span className="font-medium">"{search}"</span>
    </p>
    <p className="text-slate-400 text-xs">
      Try searching by full name or ticker symbol
    </p>
  </div>
);