import { useQuery, useMutation, useQueryClient } from "react-query";
import "./App.css";
import fetchJson from "./libs/fetcher";

function App() {
  const url =
    "https://raw.githubusercontent.com/yuandahanif/soal_multiverse/story/public/story.json";

  const query = useQuery("todos", () => fetchJson(url));
  return (
    <div className="App">
      <div className="container">
        {query.isSuccess && query.data?.main_story}
      </div>
    </div>
  );
}

export default App;
