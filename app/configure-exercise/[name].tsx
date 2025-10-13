/**
 * [name].tsx - Skärmen där vi konfigurerar en övning
 *
 * Det här är en "dynamisk route" - [name] i filnamnet betyder att det
 * kan vara vilket namn som helst. Om vi går till /configure-exercise/Bänkpress
 * så blir "name" = "Bänkpress".
 *
 * Här väljer vi:
 * - Hur många repetitioner (1-12)
 * - Hur mycket vikt (0-14 kg)
 * - Skapar 5 set med dessa värden
 */

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EXERCISES, PendingExercise, PendingSet } from "@/models/exercise";
import { usePendingStore } from "@/states/pending";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * ConfigureExerciseScreen - Konfigurera vikt och reps för en övning
 *
 * Här kan vi välja hur många reps och hur mycket vikt vi ska lyfta.
 * När vi klickar "Lägg till" så skapas en PendingExercise med 5 set
 * som läggs till i träningsplanen.
 */
export default function ConfigureExerciseScreen() {
  // Hämtar övningens namn från URL:en (t.ex. "Bänkpress")
  const { name } = useLocalSearchParams();

  // State för de valda värdena (useState = kom ihåg värdet mellan renders)
  const [selectedRepetitions, setRepetitions] = useState(1);
  const [selectedWeight, setWeight] = useState(1);

  // Hämtar funktionen för att lägga till övningen i träningsplanen
  const addStateExercise = usePendingStore((store) => store.addExercise);

  /**
   * addExercise - Skapar övningen och lägger till den i träningsplanen
   *
   * När vi klickar på "Lägg till" så:
   * 1. Letar upp övningen från EXERCISES-listan
   * 2. Skapar 5 set med de valda reps och vikten
   * 3. Skapar en PendingExercise
   * 4. Lägger till den i PendingStore
   * 5. Navigerar tillbaka till new-workout skärmen
   */
  const addExercise = () => {
    // Hittar övningen baserat på namnet i URL:en
    const exercise = EXERCISES.find((exercise) => exercise.name === name);
    if (exercise === undefined) {
      Alert.alert("Fel!"); // Om övningen inte finns, visa felmeddelande
      return;
    }

    // Skapar 5 set med samma reps och vikt
    const sets: PendingSet[] = [];
    for (let i = 0; i < 5; i++) {
      sets.push(new PendingSet(selectedRepetitions, selectedWeight));
    }

    // Skapar en PendingExercise med övningen och seten
    const pending = new PendingExercise(exercise, sets);

    // Lägger till övningen i träningsplanen (PendingStore)
    addStateExercise(pending);

    // Navigerar tillbaka till new-workout skärmen
    router.navigate("/new-workout");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {/* Sektion för att välja antal repetitioner */}
        <ThemedText>Repetitioner</ThemedText>
        <View style={styles.list}>
          {/* Skapar knappar för 1-12 reps */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((rep) => (
            <ItemButton
              active={rep === selectedRepetitions} // Markera den valda
              title={rep + ""}
              key={rep}
              onPress={() => setRepetitions(rep)} // Uppdatera state när vi trycker
            />
          ))}
        </View>

        {/* Sektion för att välja vikt */}
        <ThemedText>Vikt</ThemedText>
        <View style={styles.list}>
          {/* Skapar knappar för 0-14 kg */}
          {/* Array(15).keys() = [0, 1, 2, ..., 14] */}
          {[...Array(15).keys()].map((weight) => (
            <ItemButton
              active={weight === selectedWeight} // Markera den valda
              title={weight + "kg"}
              key={weight}
              onPress={() => setWeight(weight)} // Uppdatera state när vi trycker
            />
          ))}
        </View>
      </ScrollView>

      {/* Knapp för att lägga till övningen i träningsplanen */}
      <Button title="Lägg till" onPress={addExercise} />
    </ThemedView>
  );
}

// Props som ItemButton förväntar sig
interface ItemButtonProps {
  title: string;    // Texten på knappen
  active: boolean;  // Om knappen är vald eller inte
  onPress: () => void; // Vad som händer när vi trycker
}

/**
 * ItemButton - En klickbar knapp som kan vara aktiv eller inaktiv
 *
 * Visar en knapp som ändrar färg beroende på om den är vald eller inte.
 * Blå = vald, Grå = inte vald
 */
function ItemButton({ title, onPress, active }: ItemButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.itemButton,
        // Conditional styling: byt färg beroende på om knappen är aktiv
        active ? { backgroundColor: "blue" } : { backgroundColor: "gray" },
      ]}
      onPress={onPress}
    >
      <ThemedText>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },

  itemButton: {
    paddingHorizontal: 8, // Luft på sidorna
    paddingVertical: 2,   // Luft ovanför och under
    borderRadius: 2,      // Rundade hörn
    minWidth: 32,         // Minsta bredd
    justifyContent: "center", // Centrera innehållet vertikalt
    alignItems: "center",     // Centrera innehållet horisontellt
  },

  list: {
    flexDirection: "row", // Lägg knapparna på rad
    gap: 12,              // Mellanrum mellan knapparna
    flexWrap: "wrap",     // Bryt till ny rad om det inte får plats
  },
});
