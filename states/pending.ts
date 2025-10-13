import { PendingExercise } from "@/models/exercise";
import { PendingWorkout } from "@/models/workout";
import { create } from "zustand";

/**
 * PendingStore - Här sparar vi träningspasset vi planerar
 *
 * Det här är ett "state store" som använder Zustand. Tänk det som en låda
 * där vi lägger vår träningsplan och som alla komponenter i appen kan
 * komma åt. När vi lägger till övningar här så uppdateras skärmen automatiskt.
 *
 * Zustand är ett bibliotek som hjälper oss dela data mellan olika delar
 * av appen utan att behöva skicka props överallt.
 */
export interface PendingStore {
  workout: PendingWorkout;  // Träningspasset vi håller på att planera

  reset: () => void;                              // Rensar träningsplanen
  addExercise: (exercise: PendingExercise) => void;  // Lägger till en övning
}

/**
 * usePendingStore - Hook för att komma åt träningsplanen
 *
 * Det här är själva "lådan" där vi sparar träningsplanen. Vi kan använda
 * den här hooken i vilken komponent som helst för att:
 * - Läsa träningsplanen (workout)
 * - Lägga till en övning (addExercise)
 * - Rensa hela planen (reset)
 */
export const usePendingStore = create<PendingStore>((set) => ({
  // Startvärde: Ett tomt träningspass
  workout: new PendingWorkout(),

  /**
   * reset - Rensar träningsplanen och börjar om från noll
   *
   * Användbart när vi vill börja planera ett helt nytt träningspass.
   */
  reset: () => {
    set({ workout: new PendingWorkout() });
  },

  /**
   * addExercise - Lägger till en övning i träningsplanen
   *
   * När vi väljer en övning och klickar "lägg till" så hamnar den här.
   * Vi skapar en kopia av träningspasset (med spread operator ...),
   * lägger till övningen, och uppdaterar state. Det gör att React
   * märker att något ändrats och uppdaterar skärmen.
   */
  addExercise: (exercise: PendingExercise) => {
    set((current) => {
      let newWorkout = { ...current.workout }; // Kopierar nuvarande träningspass
      newWorkout.exercises.push(exercise);      // Lägger till övningen i listan
      return { workout: newWorkout };           // Returnerar uppdaterat state
    });
  },
}));
