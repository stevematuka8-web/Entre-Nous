import { Info } from "lucide-react";

export interface DemoTableColumn {
  key: string;
  label: string;
}

export function DemoTable({
  columns,
  rows,
  note,
}: {
  columns: DemoTableColumn[];
  rows: Record<string, string>[];
  note?: string;
}) {
  return (
    <div>
      {note && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-mist">
          <Info size={14} className="mt-0.5 shrink-0 text-violet-bright" />
          {note}
        </div>
      )}
      <div className="glass-card overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-mist">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 text-mist">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
