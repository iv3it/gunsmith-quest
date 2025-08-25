import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSearch } from "./context/search-context";

const allItems = ["item 1", "item 2", "item 3"];

export default function SearchPage() {
  const { query } = useSearch();
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = allItems.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <View className="flex-1 bg-[#1c1c1c] px-4 pt-4">
      {query.length < 2 ? (
        <Text className="text-gray-400">Search by item name...</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Text className="text-white text-lg py-2">{item}</Text>
          )}
        />
      )}
    </View>
  );
}
