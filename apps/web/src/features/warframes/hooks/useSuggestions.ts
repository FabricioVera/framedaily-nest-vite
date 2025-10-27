import { useEffect, useState } from "react";

export function useSuggestions<T>(path: string) {
  const [all, setAll] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/${path}/suggestions`
        );
        if (!response.ok)
          throw new Error(
            `Error al obtener sugerencias: ${response.statusText}`
          );
        const data: T[] = await response.json();
        setAll(data);
      } catch (err) {
        console.error(
          "Error al obtener sugerencias:",
          err
        );
        setError(
          err instanceof Error
            ? err.message
            : "Error desconocido al obtener sugerencias"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [path]);

  return { all, loading, error };
}
