import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Sprites interface
export interface IPokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: { front_default: string | null; front_female: string | null };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions: {
    [generation: string]: {
      [game: string]: {
        [key: string]: string | null | { [key: string]: string | null };
      };
    };
  };
}

// Main Pokémon interface
export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: { name: string; url: string } }[];
  sprites: IPokemonSprites;
}

export default function PokemonDetail() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);

  const fetchPokemonDetail = async () => {
    if (!url) return;
    try {
      const res = await fetch(url);
      const data: IPokemon = await res.json();
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokémon detail:", error);
    }
  };

  useEffect(() => {
    fetchPokemonDetail();
  }, [url]);

  if (!pokemon) {
    return (
      <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: pokemon.sprites.other["official-artwork"].front_default || "",
        }}
      />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text>Height: {pokemon.height}</Text>
      <Text>Weight: {pokemon.weight}</Text>
      <View style={styles.types}>
        {pokemon.types.map((t) => (
          <Text key={t.slot} style={styles.type}>
            {t.type.name}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 400,
    objectFit: "contain",
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginVertical: 12,
  },
  types: {
    flexDirection: "row",
    marginTop: 8,
  },
  type: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 4,
    textTransform: "capitalize",
  },
});
