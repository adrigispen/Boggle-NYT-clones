import axios from "axios";
import { Entry, dwdsEntry } from "./Types";

export function getEntryFromAPI(word: string, language: string) {
  return language == "English"
    ? axios
        .get(
          `https://tranquil-dusk-99289-fa442f1129a2.herokuapp.com/https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        )
        .then((resp) => resp.data.map((el: Entry) => el.word))
    : axios
        .get(
          `https://tranquil-dusk-99289-fa442f1129a2.herokuapp.com/https://www.dwds.de/api/wb/snippet/?q=${word}`
        )
        .then((resp) => resp.data.map((el: dwdsEntry) => el.lemma));
}
