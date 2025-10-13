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
  workout: OngoingWorkout | null;  // Träningspasset vi kör, eller null om vi inte tränar

  startWorkout: (workout: OngoingWorkout) => void;  // Startar ett träningspass
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
}));
