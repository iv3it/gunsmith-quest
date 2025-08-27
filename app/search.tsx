import { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import CustomTitleText from "./components/custom-title-text";
import ItemsList from "./components/items-list";
import { useSearch } from "./context/search-context";
import { WeaponWithoutTask } from "./types/types";

const allItems = [
  {
    "slug": "tbl",
    "name": "NcSTAR Tactical Blue Laser",
    "icon": "https://gunsmith.quest/static/tbl.png",
    "traders": [
      {
        "trader": {
          "slug": "skier",
          "name": "Skier"
        },
        "loyalty": 1,
        "isBarter": false
      }
    ]
  },
  {
    "slug": "xc1",
    "name": "SureFire XC1 tactical flashlight",
    "icon": "https://gunsmith.quest/static/xc1.png",
    "traders": [
      {
        "trader": {
          "slug": "mechanic",
          "name": "Mechanic"
        },
        "loyalty": 1,
        "isBarter": false
      }
    ]
  }
]

export default function SearchPage() {
  const { query } = useSearch();
  const [results, setResults] = useState<WeaponWithoutTask[]>([]);

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-[#1c1c1c] px-4 pt-4">
        {query.length < 2 ? (
          <CustomTitleText className="text-gray-400">Search by item name...</CustomTitleText>
        ) : (
          <ItemsList items={results}/>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
