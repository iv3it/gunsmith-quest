import axios from "axios";

export async function fetchAllItemsList() {
  const response = await axios.get("https://gunsmith.quest/api/search/items");
  return response.data;
}