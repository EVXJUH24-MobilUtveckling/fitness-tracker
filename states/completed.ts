import { CompletedWorkout, OngoingWorkout } from "@/models/workout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "completed_workouts";

export interface CompletedWorkoutsStore {
  workouts: CompletedWorkout[];

  loadWorkouts: () => void;
  addWorkout: (workout: OngoingWorkout) => void;
}

export const useCompletedWorkoutsStore = create<CompletedWorkoutsStore>(
  (set) => ({
    workouts: [],

    loadWorkouts: () => {
      AsyncStorage.getItem(STORAGE_KEY).then((result) => {
        if (result) {
          const completed = JSON.parse(result);
          console.log("Loaded " + completed.length + " workouts from storage");
          set({ workouts: completed });
        }
      });
    },

    addWorkout: (workout: OngoingWorkout) => {
      const completedWorkout = new CompletedWorkout(
        workout.startedAt,
        new Date(),
        workout.completedExercises
      );

      set((current) => {
        const newArray = [...current.workouts, completedWorkout];
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newArray));

        return { workouts: newArray };
      });
    },
  })
);
