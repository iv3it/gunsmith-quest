import { useSearch } from "@/context/search-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { Link, usePathname, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import HamburgerMenu from "./hamburger";

export default function Header ({}) {
  const [expanded, setExpanded] = useState(false);
  const { query, setQuery } = useSearch();

  const router = useRouter();
  const pathname = usePathname();  

  const inputFlex = useRef(new Animated.Value(0)).current;
  const iconLeft = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<TextInput>(null);

  const MAX_WIDTH = 200;
  const ICON_MARGIN = 8;

  useEffect(() => {
    // collapse and clear value when we leave /search
    if (pathname !== "/search") {
      setExpanded(false);
      setQuery("");
    }
  }, [pathname]);

  const handlePressSearch = () => {
    setExpanded(true);

    Animated.timing(inputFlex, {
      toValue: 1,
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
  };

  const handleBlur = () => {
    if (query === "") {
      Animated.timing(inputFlex, {
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
          cachePolicy="memory-disk"
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
          <View style={styles.inputWrapper}>
            <Animated.View style={[styles.inputContainer, { flex: inputFlex }]}>
              <Animated.View style={{ position: "absolute", left: iconLeft }}>
                <Ionicons name="search-outline" size={24} color="#fff" />
              </Animated.View>
              <TextInput
                autoFocus
                ref={inputRef}
                placeholder="Search..."
                placeholderTextColor="#aaa"
                value={query}
                onChangeText={setQuery}
                onBlur={handleBlur}
                style={[styles.input, { paddingLeft: 40 }]}
                className="font-tomorrow"
              />
            </Animated.View>
          </View>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
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
  inputWrapper: {
    flex: 1,
    flexDirection: 'row-reverse',
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