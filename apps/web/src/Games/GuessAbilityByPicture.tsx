import { useDailyObject } from "../features/warframes/hooks/useDailyObject";
import type { AbilitiesDto } from "shared/src/dtos/abilities.dto";

function GuessAbilityByPicture() {
  const {
    dailyObject: dailyAbility,
    loading,
    error,
  } = useDailyObject<AbilitiesDto>("abilities");
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {dailyAbility && (
        <div>
          <h2>
            Daily Ability: {dailyAbility.name}
          </h2>
          <p>{dailyAbility.description}</p>
        </div>
      )}
    </div>
  );
}

export default GuessAbilityByPicture;
