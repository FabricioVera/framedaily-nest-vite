import { Routes, Route } from "react-router-dom";
import GuessTheWarframe from "./Games/GuessTheWarframe";
import GuessAbilityByPicture from "./Games/GuessAbilityByPicture";
import Home from "./Games/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/guess-the-warframe"
        element={<GuessTheWarframe />}
      />
      <Route
        path="/guess-abilities-by-picture"
        element={<GuessAbilityByPicture />}
      />
    </Routes>
  );
}
