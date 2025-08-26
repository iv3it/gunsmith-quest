import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useSearch } from "../context/search-context";
import HamburgerMenu from "./hamburger";

export default function Header ({}) {
  const [expanded, setExpanded] = useState(false);
  const { query, setQuery } = useSearch();

  const router = useRouter();

  const inputWidth = useRef(new Animated.Value(0)).current;
  const iconLeft = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<TextInput>(null);

  const MAX_WIDTH = 200;
  const ICON_MARGIN = 8;

  const handlePressSearch = () => {
    setExpanded(true);

    Animated.timing(inputWidth, {
      toValue: MAX_WIDTH,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    Animated.timing(iconLeft, {
      toValue: ICON_MARGIN,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    Animated.timing(iconOpacity, {
      toValue: 0,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    router.push("/search");

    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleBlur = () => {
    if (query === "") {
      Animated.timing(inputWidth, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start(() => setExpanded(false));

      Animated.timing(iconLeft, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();

      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.header}>
      <Link href="/" style={styles.leftContainer}>
        <Image
          source={require('@/assets/images/gunsmith-logo.png')} 
          style={styles.image}
          />
      </Link>

      <View style={styles.rightContainer} className="mr-4">
        {!expanded ? (
          <Animated.View style={{ opacity: iconOpacity, marginRight: 12 }}>
            <TouchableOpacity onPress={handlePressSearch}>
              <Ionicons name="search-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View style={[styles.inputContainer, { width: inputWidth }]}>
            <Animated.View style={{ position: "absolute", left: iconLeft, top: 6 }}>
              <Ionicons name="search-outline" size={24} color="#fff" />
            </Animated.View>
            <TextInput
              ref={inputRef}
              placeholder="Search..."
              placeholderTextColor="#aaa"
              value={query}
              onChangeText={setQuery}
              onBlur={handleBlur}
              style={[styles.input, { paddingLeft: 40 }]}
            />
          </Animated.View>
        )}
        <HamburgerMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  image: {
    width: 70,
    height: 70,
  },
  inputContainer: {
    height: 36,
    backgroundColor: "#333",
    borderRadius: 6,
    justifyContent: "center",
    minWidth: 50,
  },
  input: {
    paddingLeft: 32,
    color: "white",
    paddingHorizontal: 8,
    borderRadius: 6,
    height: '100%',
  },
});