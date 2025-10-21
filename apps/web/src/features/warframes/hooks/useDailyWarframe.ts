import { useEffect, useState } from "react";
import type { WarframeDto } from "shared/src/dtos/warframe.dto";

export function useDailyWarframe() {
  const [dailyWarframe, setDailyWarframe] =
    useState<WarframeDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchDailyWarframe = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/warframe-quiz/daily"
        );
        if (!response.ok)
          throw new Error(
            "Error al obtener el warframe diario"
          );
        const data: WarframeDto =
          await response.json();
        setDailyWarframe(data);
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

    fetchDailyWarframe();
  }, []);

  return { dailyWarframe, loading, error };
}
