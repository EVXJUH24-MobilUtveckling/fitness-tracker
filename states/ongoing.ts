import {
  CompletedExercise,
  CompletedSet,
  OngoingExercise,
} from "@/models/exercise";
import { OngoingWorkout } from "@/models/workout";
import { create } from "zustand";

/**
 * OngoingStore - Här sparar vi träningspasset vi tränar JUST NU
 *
 * Det här är ett state store (precis som PendingStore) fast för det
 * pågående träningspasset. När vi startar träningen så flyttas träningspasset
 * hit från PendingStore. Då kan vi hålla koll på vilken övning vi kör,
 * vilka set vi gjort, och allt sånt.
 *
 * Värdet är "null" när vi inte tränar, och blir en OngoingWorkout när
 * vi startar ett träningspass.
 */
export interface OngoingStore {
  workout: OngoingWorkout | null; // Träningspasset vi kör, eller null om vi inte tränar

  clear: () => void;
  startWorkout: (workout: OngoingWorkout) => void; // Startar ett träningspass
  startNewSet: () => void;
  endActiveSet: () => void;
}

/**
 * useOngoingStore - Hook för att komma åt pågående träning
 *
 * Vi använder den här hooken för att:
 * - Se om vi tränar just nu (workout är null eller inte)
 * - Starta ett träningspass (startWorkout)
 * - Komma åt info om nuvarande övning, set, etc.
 */
export const useOngoingStore = create<OngoingStore>((set) => ({
  // Startvärde: null (vi tränar inte när appen startar)
  workout: null,

  clear: () => {
    set({ workout: null });
  },

  /**
   * startWorkout - Startar ett träningspass
   *
   * När vi trycker på "Starta träning" så tar vi träningsplanen från
   * PendingStore, gör om den till en OngoingWorkout, och sparar den här.
   * Då vet appen att vi är i träningsläge och kan visa rätt skärm.
   */
  startWorkout: (workout: OngoingWorkout) => {
    set({ workout });
  },

  startNewSet: () => {
    set((current) => {
      let copy = { ...current.workout };
      let nextSet = copy.ongoingExercise?.getNextSet();
      if (nextSet) {
        nextSet.startedAt = new Date();
      }

      return { workout: copy };
    });
  },

  endActiveSet: () => {
    set((current) => {
      let copy = { ...current.workout };
      let activeSet = copy.ongoingExercise?.getActiveSet();
      if (activeSet) {
        activeSet.endedAt = new Date();
      }

      if (copy.ongoingExercise?.getNextSet() === null) {
        const completedExercise = new CompletedExercise(
          copy.ongoingExercise.exercise,
          copy.ongoingExercise.startedAt,
          new Date(),
          copy.ongoingExercise.sets.map(
            (set) =>
              new CompletedSet(
                set.startedAt ?? new Date(),
                set.endedAt ?? new Date(),
                set.repetitions,
                set.weight
              )
          )
        );

        copy.completedExercises?.push(completedExercise);
        const pendingExercise = copy.pendingExercises?.splice(0, 1);
        if (pendingExercise?.length === 1) {
          copy.ongoingExercise = OngoingExercise.fromPending(
            pendingExercise[0]
          );
        } else {
          copy.ongoingExercise = null;
        }
      }

      return { workout: copy };
    });
  },
}));
