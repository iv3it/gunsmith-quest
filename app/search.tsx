import CustomTitleText from "@/components/custom-title-text";
import ItemsList from "@/components/items-list";
import { useSearch } from "@/context/search-context";
import { WeaponWithQuestParts } from "@/types/types";
import { fetchAllItemsList } from "@/utils/allItemsList";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function SearchPage() {
  const { query } = useSearch();
  const [allItems, setAllItems] = useState<WeaponWithQuestParts[]>([]);
  const [results, setResults] = useState<WeaponWithQuestParts[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetchAllItemsList();
      setAllItems(response.items)
    };

    load();
  }, [])

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) || item.slug.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <View className="flex-1 bg-[#1c1c1c] px-4 pt-4">
      {query.length < 2 ? (
        <CustomTitleText className="text-gray-400">Search by item name...</CustomTitleText>
      ) : (
        <ItemsList items={results}/>
      )}
    </View>
  );
}
