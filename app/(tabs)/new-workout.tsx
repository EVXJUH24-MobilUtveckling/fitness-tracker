/**
 * new-workout.tsx - Skärmen där vi planerar ett nytt träningspass
 *
 * Det här är där vi bygger ihop vår träning innan vi börjar. Vi kan:
 * 1. Se vilka övningar vi lagt till
 * 2. Lägga till fler övningar
 * 3. Starta träningen när vi är redo
 */

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { OngoingWorkout } from "@/models/workout";
import { useOngoingStore } from "@/states/ongoing";
import { usePendingStore } from "@/states/pending";
import { router } from "expo-router";
import { Button, ScrollView, StyleSheet } from "react-native";

/**
 * NewWorkoutScreen - Huvudkomponenten för att planera träning
 *
 * Här hämtar vi träningsplanen från PendingStore och visar den.
 * När vi trycker "Starta workout" så:
 * 1. Skapar vi en OngoingWorkout från planen
 * 2. Sparar den i OngoingStore
 * 3. Rensar träningsplanen i PendingStore
 * 4. Navigerar till träningsskärmen
 */
export default function NewWorkoutScreen() {
  // Hämtar träningsplanen från state
  const pendingWorkout = usePendingStore((store) => store.workout);
  const resetPendingWorkout = usePendingStore((store) => store.reset);
  const startStateWorkout = useOngoingStore((store) => store.startWorkout);

  /**
   * startWorkout - Startar träningen
   *
   * När vi klickar på "Starta workout" så händer följande:
   * 1. Vi skapar en OngoingWorkout från alla övningar i planen
   * 2. Sparar den i OngoingStore (så att ongoing-workout skärmen kan se den)
   * 3. Rensar träningsplanen (så att den är tom till nästa gång)
   * 4. Navigerar till träningsskärmen där vi kan börja köra set
   */
  const startWorkout = () => {
    startStateWorkout(new OngoingWorkout(pendingWorkout.exercises));
    resetPendingWorkout();
    router.push("/ongoing-workout");
  };

  /**
   * addExercise - Navigerar till skärmen där vi väljer övning
   *
   * Tar oss till add-exercise skärmen där vi kan välja från en lista
   * med tillgängliga övningar (bänkpress, benböj, etc).
   */
  const addExercise = () => {
    router.push("/add-exercise");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Loopar igenom alla övningar vi lagt till och visar deras namn */}
        {pendingWorkout.exercises.map((a) => (
          <ThemedText>{a.exercise.name}</ThemedText>
        ))}

        {/* Knapp för att lägga till fler övningar */}
        <Button title="+ Lägg till övning" onPress={addExercise} />
      </ScrollView>

      {/* Knapp för att starta träningen */}
      <Button title="Starta workout" onPress={startWorkout} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Tar upp hela skärmen
  },
  scrollView: {},

  startWorkout: {
    alignSelf: "flex-end",
  },
});
