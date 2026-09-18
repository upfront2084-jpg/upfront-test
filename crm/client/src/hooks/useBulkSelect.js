import { useCallback, useState } from 'react';

// Shared checkbox-selection state for list pages with a bulk action bar.
export function useBulkSelect() {
  const [selected, setSelected] = useState(() => new Set());

  const toggle = useCallback((id) => {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback((ids) => {
    setSelected((s) => {
      const allSelected = ids.length > 0 && ids.every((id) => s.has(id));
      return allSelected ? new Set() : new Set(ids);
    });
  }, []);

  const clear = useCallback(() => setSelected(new Set()), []);

  return { selected, toggle, toggleAll, clear, setSelected };
}
