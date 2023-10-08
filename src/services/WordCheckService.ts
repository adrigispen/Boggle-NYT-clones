import axios from "axios";
import { Entry } from "../components/Types";

export function checkWord(word: string) {
  return axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((resp) => resp.data.map((el: Entry) => el.word));
}
