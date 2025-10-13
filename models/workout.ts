import {
  CompletedExercise,
  OngoingExercise,
  PendingExercise,
} from "./exercise";

/**
 * PendingWorkout - Ett träningspass vi planerar
 *
 * Det här är vår träningsplan innan vi börjar träna. Här lägger vi till
 * alla övningar vi tänkt göra på gymmet. När vi väl startar träningen
 * blir den här en OngoingWorkout istället.
 */
export class PendingWorkout {
  public exercises: PendingExercise[]; // Alla övningar vi planerat att göra

  constructor() {
    // När vi skapar ett nytt träningspass börjar listan tom
    this.exercises = [];
  }
}

/**
 * OngoingWorkout - Ett träningspass vi håller på med JUST NU
 *
 * När vi startar träningen blir PendingWorkout en OngoingWorkout.
 * Den håller koll på:
 * - Vilka övningar vi redan gjort klart (completedExercises)
 * - Vilken övning vi kör just nu (ongoingExercise)
 * - Vilka övningar vi har kvar (pendingExercises)
 *
 * Det är typ som en kö där vi jobbar oss igenom en övning i taget.
 */
export class OngoingWorkout {
  public startedAt: Date;                           // När vi började träna
  public pendingExercises: PendingExercise[];       // Övningar vi inte börjat än
  public ongoingExercise: OngoingExercise;          // Övningen vi håller på med NU
  public completedExercises: CompletedExercise[];   // Övningar vi gjort klart

  constructor(pendingExercises: PendingExercise[]) {
    this.startedAt = new Date(); // Sparar när vi började
    this.pendingExercises = pendingExercises;
    this.completedExercises = [];

    // Vi måste ha minst en övning för att starta ett träningspass
    if (pendingExercises.length === 0) {
      throw new Error("Pending exercises cannot be empty");
    }

    // Plockar ut första övningen från listan och startar den
    // splice(0, 1) tar bort första övningen från listan och returnerar den
    let pendingExercise = this.pendingExercises.splice(0, 1)[0];
    this.ongoingExercise = OngoingExercise.fromPending(pendingExercise);
  }
}

/**
 * CompletedWorkout - Ett träningspass vi är helt klara med
 *
 * När vi är färdiga med hela träningen blir OngoingWorkout en CompletedWorkout.
 * Här sparar vi allt som hände: när vi började, när vi slutade, och alla
 * övningar vi körde. Det är det här som sedan kan visas i historiken.
 */
export class CompletedWorkout {
  public startedAt: Date;                 // När vi började träningspasset
  public endedAt: Date;                   // När vi blev klara
  public exercises: CompletedExercise[];  // Alla övningar vi körde

  constructor(startedAt: Date, endedAt: Date, exercises: CompletedExercise[]) {
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.exercises = exercises;
  }
}
