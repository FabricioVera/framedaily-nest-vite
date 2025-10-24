import { useEffect, useState } from "react";

export function useDailyObject<T>(path: string) {
  const [dailyObject, setDailyObject] =
    useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchDailyObject = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/${path}/daily`
        );
        if (!response.ok)
          throw new Error(
            "Error al obtener el objeto diario"
          );
        const data: T = await response.json();
        setDailyObject(data);
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

    fetchDailyObject();
  }, [path]);

  return { dailyObject, loading, error };
}
