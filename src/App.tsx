import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "./App.css";
import fetchJson from "./libs/fetcher";

const AnswerPopup = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="popup-answer-container">
      <div className="popup-answer">{children}</div>
    </div>
  );
};

function App() {
  const [url, setUrl] = useState<string | null>(
    "https://raw.githubusercontent.com/yuandahanif/soal_multiverse/story/public/story.json"
  );

  const [stories, setStories] = useState<{ [key: string]: any }[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);

  const [answerOptions, setAnsweroptions] = useState<any[] | null>(null);

  const answerQuestion = (answer: any) => {
    setAnswers(answer.text);
    setUrl(answer.url);
  };

  const askQuestion = (options: any) => {
    setAnsweroptions(options);
  };

  const closeQuestion = () => {
    setAnsweroptions(null);
  };

  const query = useQuery("main_story", () => fetchJson(url!), {
    enabled: url !== null,
  });

  useEffect(() => {
    if (query.isSuccess && url !== null) {
      setStories((s) => {
        const newStory: any = {};
        newStory[url] = query.data;
        return { ...s };
      });
    }
  }, [query.data, query.isSuccess, url]);

  return (
    <div className="App">
      {answerOptions && (
        <AnswerPopup>
          <button
            type="button"
            className="button-choice"
            onClick={() => answerQuestion(answerOptions[0])}
          >
            {answerOptions[0]?.text}
          </button>
          <button
            type="button"
            className="button-choice"
            onClick={() => answerQuestion(answerOptions[1])}
          >
            {answerOptions[1]?.text}
          </button>
          <button className="button-choice" onClick={closeQuestion}>
            tutup
          </button>
        </AnswerPopup>
      )}

      <div className="container handwriting-font">
        {stories &&
          stories.map((story, index) => (
            <div key={story.id}>
              {query.isSuccess && query.data?.main_story.split("[pilihan]")[0]}
              {answers[index] ? (
                answers[index]?.text
              ) : (
                <button
                  className="button-answer redacted-font"
                  onClick={(e) => {
                    e.preventDefault();
                    askQuestion(query.data.options);
                  }}
                >
                  [redacted]
                </button>
              )}
              {query.isSuccess && query.data?.main_story.split("[pilihan]")[1]}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
