import axios from "axios";
import { Entry } from "../components/Types";



export function checkWord(word: string, language: string) {
  return language == "English"
    ? axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((resp) => resp.data.map((el: Entry) => el.word))
    : axios
        .get(`https://www.dwds.de/api/wb/snippet/?q=${word}`)
        .then((response) => {
          console.log(response.data);
        });
}
