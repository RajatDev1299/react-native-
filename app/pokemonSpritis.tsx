import { ScrollView, Image, StyleSheet } from "react-native";
import { IPokemon } from "./PokemonDetail";

export default function PokemonImages({ pokemon }: { pokemon: IPokemon }) {
  // Create an array of images you want to show
  const images = [
    pokemon.sprites.front_default,
    pokemon.sprites.back_default,
    pokemon.sprites.front_shiny,
    pokemon.sprites.back_shiny,
    pokemon.sprites.other.dream_world.front_default,
    pokemon.sprites.other["official-artwork"].front_default,
  ].filter(Boolean); // remove nulls

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: 12 }}
    >
      {images.map((img, idx) => (
        <Image key={idx} source={{ uri: img! }} style={styles.image} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    marginHorizontal: 8,
    borderRadius: 12,
  },
});
