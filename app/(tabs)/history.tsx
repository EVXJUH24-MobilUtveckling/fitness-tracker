/**
 * history.tsx - Historikskärmen
 *
 * Här kommer vi visa alla träningspass vi gjort tidigare.
 * Just nu är den tom, men senare kan vi visa:
 * - Datum och tid för varje träningspass
 * - Vilka övningar vi körde
 * - Hur mycket vikt och reps
 * - Hur lång tid träningen tog
 */

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useCompletedWorkoutsStore } from "@/states/completed";

/**
 * HistoryScreen - Visar historik över tidigare träningspass
 *
 * En enkel placeholder-skärm just nu. När vi implementerat
 * så kan vi spara CompletedWorkout till AsyncStorage eller en databas
 * och visa dem här!
 */
export default function HistoryScreen() {
  const workouts = useCompletedWorkoutsStore((store) => store.workouts);
  return (
    <ThemedView>
      {workouts.map((workout) => (
        <ThemedText>{workout.startedAt.toLocaleTimeString()}</ThemedText>
      ))}
    </ThemedView>
  );
}
