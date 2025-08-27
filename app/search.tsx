import { useEffect, useState } from "react";
import { FlatList, Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import CustomTitleText from "./components/custom-title-text";
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-[#1c1c1c] px-4 pt-4">
        {query.length < 2 ? (
          <CustomTitleText className="text-gray-400">Search by item name...</CustomTitleText>
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
    </TouchableWithoutFeedback>
  );
}
