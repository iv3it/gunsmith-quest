import axios from "axios";

export async function fetchQuestPartsList() {
  const response = await axios.get("https://gunsmith.quest/api/quest_parts/list");
  return response.data;
}