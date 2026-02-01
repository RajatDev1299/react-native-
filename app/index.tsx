import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, FlatList, StyleSheet, Pressable } from "react-native";

interface IPokemon {
  name: string;
  image: string;
  url: string;
}

interface IPokemonListItem {
  name: string;
  url: string;
}

export default function Index() {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);

  const fetchPokemonDetails = async (item: IPokemonListItem) => {
    const res = await fetch(item.url);
    const data = await res.json();

    return {
      name: item.name,
      image: data.sprites.other["official-artwork"].front_default,
      url: item.url,
    };
  };

  const fetchPokemon = async () => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    );
    const data = await res.json();

    const detailedPokemon = await Promise.all(
      data.results.map((item: IPokemonListItem) => fetchPokemonDetails(item)),
    );

    setPokemon(detailedPokemon);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const renderItem = ({ item }: { item: IPokemon }) => (
    <Link
      href={{ pathname: "/PokemonDetail", params: { url: item.url } }}
      asChild
    >
      <Pressable style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </Pressable>
    </Link>
  );

  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
