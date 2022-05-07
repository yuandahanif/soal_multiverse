import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import "./App.css";
import fetchJson from "./libs/fetcher";

const initUrl =
  "https://raw.githubusercontent.com/yuandahanif/soal_multiverse/story/public/story.json";

const AnswerPopup = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="popup-answer-container">
      <div className="popup-answer">{children}</div>
    </div>
  );
};

function App() {
  const [url, setUrl] = useState<string | null>(null);
  const [isFetchingNextStory, setIsFetchingNextStory] = useState(false);
  const [stories, setStories] = useState<{ [key: string]: any }>({});
  const [answers, setAnswers] = useState<any[]>([]);

  const [answerOptions, setAnsweroptions] = useState<any[] | null>(null);

  const query = useQuery("main_story", () => fetchJson(initUrl), {
    onSuccess: (data) => {
      setStories((s) => {
        return { ...s, [initUrl]: data };
      });
    },
  });

  const nextQuestionMutation = useMutation((url: string) => fetchJson(url), {
    onSuccess: (story) => {
      setIsFetchingNextStory(false);
      setStories((s) => {
        return { ...s, [url!]: story };
      });
    },
  });

  const answerQuestion = (answer: any) => {
    setAnswers((s) => {
      return [...s, answer.text];
    });

    setIsFetchingNextStory(true);
    setUrl(answer.url);
    setAnsweroptions(null);
    nextQuestionMutation.mutate(answer.url);
  };

  const askQuestion = (options: any) => {
    setAnsweroptions(options);
  };

  const closeQuestion = () => {
    setAnsweroptions(null);
  };

  const restartQuestion = () => {
    setAnswers([]);
    setStories({});
    query.refetch();
  };

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
          Object.keys(stories).map((key: string, index) => (
            <div key={key} className="story-section">
              {stories[key].main_story.split("[pilihan]")[0]}

              {answers[index] ? (
                answers[index]
              ) : stories[key].options.length > 0 ? (
                <button
                  className="button-answer redacted-font"
                  onClick={(e) => {
                    e.preventDefault();
                    askQuestion(stories[key].options);
                  }}
                >
                  [redacted]
                </button>
              ) : (
                <>
                  <div>
                    Tamat.
                    <button onClick={restartQuestion}>ulang cerita</button>
                  </div>
                </>
              )}

              {stories[key].main_story.split("[pilihan]")[1]}
            </div>
          ))}

        {(query.isLoading || isFetchingNextStory) && (
          <>
            <span>sedang memuat data......</span>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
