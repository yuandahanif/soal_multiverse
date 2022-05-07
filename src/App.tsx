import { useQuery, useMutation, useQueryClient } from "react-query";
import "./App.css";
import fetchJson from "./libs/fetcher";

const AnswerPopup = () => {
  return (
    <div className="popup-answer-container">
      <div className="popup-answer">
        <button className="button-choice">ayam</button>
        <button className="button-choice">telur</button>
      </div>
    </div>
  );
};

function App() {
  const url =
    "https://raw.githubusercontent.com/yuandahanif/soal_multiverse/story/public/story.json";

  const query = useQuery("todos", () => fetchJson(url));
  return (
    <div className="App">
      <AnswerPopup />
      <div className="container handwriting-font">
        {query.isSuccess && query.data?.main_story}
        <br />
        <button className="button-answer redacted-font">[redacted]</button>
      </div>
    </div>
  );
}

export default App;
