/**
 * add-exercise.tsx - Skärmen där vi väljer vilken övning vi vill lägga till
 *
 * Här visas en lista med alla tillgängliga övningar (bänkpress, benböj, etc).
 * När vi trycker på en övning går vi vidare till configure-exercise där
 * vi kan välja vikt och repetitioner.
 */

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Exercise, EXERCISES } from "@/models/exercise";
import { router } from "expo-router";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * AddExerciseScreen - Visar listan med tillgängliga övningar
 *
 * Använder FlatList för att visa alla övningar från EXERCISES-listan.
 * FlatList är bra när vi har många items eftersom den bara renderar
 * det som syns på skärmen (lazy loading).
 */
export default function AddExerciseScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {/* FlatList = smart lista som bara renderar synliga items */}
        <FlatList
          data={EXERCISES} // Alla övningar från models/exercise.ts
          renderItem={({ item, index }) => (
            <ExerciseItem exercise={item} key={index} />
          )}
        />
      </ScrollView>
    </ThemedView>
  );
}

// Props (egenskaper) som ExerciseItem förväntar sig
interface ExerciseItemProps {
  exercise: Exercise; // En övning att visa
}

/**
 * ExerciseItem - En rad i listan som visar en övning
 *
 * Det här är en klickbar komponent som visar namnet på en övning.
 * När vi trycker på den så navigerar vi till configure-exercise
 * där vi kan välja vikt och reps.
 */
function ExerciseItem({ exercise }: ExerciseItemProps) {
  /**
   * addExercise - Navigerar till konfigurationsskärmen
   *
   * Tar oss till /configure-exercise/[name] där [name] är övningens namn.
   * Exempelvis: /configure-exercise/Bänkpress
   */
  const addExercise = () => {
    router.push("/configure-exercise/" + exercise.name);
  };

  return (
    <TouchableOpacity style={styles.exerciseItem} onPress={addExercise}>
      <View>
        <ThemedText>{exercise.name}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  exerciseItem: {
    marginBottom: 8,     // Mellanrum mellan övningarna
    borderRadius: 2,     // Rundade hörn
    borderColor: "gray", // Grå ram
    borderWidth: 1,      // 1 pixel tjock ram
    padding: 4,          // Luft inuti rutan
  },
});
