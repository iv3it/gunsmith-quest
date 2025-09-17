import axios from "axios";

export async function fetchQuestPart(id: number) {
  const response = await axios.get(`https://gunsmith.quest/api/quest_parts/${id}`);
  return response.data;
}