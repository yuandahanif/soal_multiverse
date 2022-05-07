import { useState } from "react";
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
  const [urls, setUrls] = useState([
    "https://raw.githubusercontent.com/yuandahanif/soal_multiverse/story/public/story.json",
  ]);

  const query = useQuery("main_story", () => fetchJson(urls[urls.length - 1]));

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
