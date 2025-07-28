import axios from "axios";

export async function fetchQuestPartsList() {
  const response = await axios.post("https://gunsmith.quest/api/quest_parts/list");
  return response.data;
}