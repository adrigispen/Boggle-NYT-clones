import axios from "axios";
import { Entry } from "../components/Types";
import { ponsApiSecret } from "../helpers";

export function checkWord(word: string, language: string) {
  return language == "English"
    ? axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((resp) => resp.data.map((el: Entry) => el.word))
    : axios({
        method: "get",
        url: `https://api.pons.com/v1/dictionary?q=${word}&l=deen`,
        headers: {
          "X-Secret": ponsApiSecret,
        },
      }).then((response) => {
        console.log(response.data);
      });
}
