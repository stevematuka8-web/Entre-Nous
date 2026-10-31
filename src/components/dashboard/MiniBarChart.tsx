export function MiniBarChart({
  data,
  title,
}: {
  data: { label: string; value: number }[];
  title: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="font-display text-sm font-semibold text-white">{title}</h3>
      <div className="mt-5 flex h-32 items-stretch gap-2.5">
        {data.map((d) => (
          <div
            key={d.label}
            className="flex flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${Math.max((d.value / max) * 100, 6)}%`,
                background: "linear-gradient(180deg,#8b5cf6,#fb7a2a)",
              }}
            />
            <span className="text-[10px] text-mist">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
