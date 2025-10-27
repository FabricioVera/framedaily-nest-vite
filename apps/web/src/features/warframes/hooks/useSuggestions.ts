import { useEffect, useState } from "react";

interface Warframe {
  name: string;
  wikiaThumbnail?: string;
}

export function useSuggestions<T>(path: string) {
  const [allWarframes, setAllWarframes] =
    useState<Warframe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/${path}/suggestions`
        );
        if (!response.ok)
          throw new Error(
            "Error al obtener los warframes"
          );
        const data: Warframe[] =
          await response.json();
        setAllWarframes(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error desconocido"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return { allWarframes, loading, error };
}
