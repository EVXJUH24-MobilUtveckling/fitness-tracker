/**
 * Exercise - En övning typ bänkpress eller benböj
 *
 * Det här är själva "mallen" för en övning. Tänk det som ett recept där
 * vi bara har namnet på rätten och vilka ingredienser vi behöver, men
 * inte hur mycket eller när vi tillagade det.
 */
export interface Exercise {
  name: string;           // Namnet på övningen, typ "Bänkpress"
  muscleGroups: string[]; // Vilka muskler vi tränar, typ ["Bröst", "Axlar"]
}

// Här är två färdiga övningar vi kan använda direkt
export const BENCH_PRESS = {
  name: "Bänkpress",
  muscleGroups: ["Bröst", "Axlar"],
} as Exercise;

export const SQUATS = { name: "Benböj", muscleGroups: ["Ben"] } as Exercise;

// En lista med alla övningar som finns tillgängliga i appen
export const EXERCISES = [BENCH_PRESS, SQUATS];

/**
 * CompletedExercise - En övning som vi är helt klara med
 *
 * När vi gjort klart en övning på gymmet så blir den en CompletedExercise.
 * Här sparar vi allt som hände: vilken övning det var, när vi började/slutade,
 * och alla set vi körde.
 */
export class CompletedExercise {
  public exercise: Exercise;        // Vilken övning (t.ex. Bänkpress)
  public startedAt: Date;            // När vi började övningen
  public endedAt: Date;              // När vi blev klara
  public sets: CompletedSet[];       // Alla set vi körde (viktigt!)
}

/**
 * CompletedSet - Ett färdigt set
 *
 * Ett "set" är typ när vi lyfter vikten 10 gånger, vilar, och kör igen.
 * När vi är klara med ett set så sparas det här - hur många reps vi gjorde,
 * hur mycket vikt, och när vi började/slutade.
 */
export class CompletedSet {
  public startedAt: Date;     // När vi började settet
  public endedAt: Date;       // När vi blev klara med settet
  public repetitions: number; // Hur många repetitioner (lyft) vi gjorde
  public weight: number;      // Hur mycket vikt i kg
}

/**
 * PendingExercise - En planerad övning som vi inte börjat än
 *
 * När vi planerar vårt träningspass så lägger vi till övningar här.
 * Vi bestämmer vilken övning och hur många set vi ska göra, men
 * vi har inte börjat träna än. Det är typ vår att-göra-lista för träningen.
 */
export class PendingExercise {
  public exercise: Exercise;    // Vilken övning vi ska göra
  public sets: PendingSet[];    // Alla set vi planerat att göra

  constructor(exercise: Exercise, sets: PendingSet[]) {
    this.exercise = exercise;
    this.sets = sets;
  }
}

/**
 * PendingSet - Ett planerat set som vi inte gjort än
 *
 * Det här är planen för ett enskilt set. Vi har bestämt hur många reps
 * och hur mycket vikt, men vi har inte lyft vikten än.
 */
export class PendingSet {
  public repetitions: number; // Hur många reps vi planerat att göra
  public weight: number;      // Hur mycket vikt vi planerat att lyfta

  constructor(repetitions: number, weight: number) {
    this.repetitions = repetitions;
    this.weight = weight;
  }
}

/**
 * OngoingExercise - En övning vi håller på med JUST NU
 *
 * När vi börjar köra en övning på gymmet så blir den en OngoingExercise.
 * Den håller koll på när vi började, vilka set vi redan gjort, och vilka
 * vi har kvar att göra. Det är här vi är "mitt i" träningen.
 */
export class OngoingExercise {
  public startedAt: Date;       // När vi började denna övning
  public exercise: Exercise;    // Vilken övning vi kör
  public sets: OngoingSet[];    // Alla set (både gjorda och kommande)

  constructor(exercise: Exercise, startedAt: Date, sets: OngoingSet[]) {
    this.exercise = exercise;
    this.startedAt = startedAt;
    this.sets = sets;
  }

  /**
   * fromPending - Startar en övning från planen
   *
   * Den här funktionen tar vår planerade övning (PendingExercise) och
   * gör om den till en pågående övning (OngoingExercise). Typ som att
   * gå från "vi ska träna" till "vi tränar NU!". Den sätter starttid
   * och gör om alla planerade set till pågående set.
   */
  static fromPending(value: PendingExercise) {
    return new OngoingExercise(
      value.exercise,
      new Date(), // Nuvarande tidpunkt blir starttid
      value.sets.map((set) => new OngoingSet(set.repetitions, set.weight))
    );
  }
}

/**
 * OngoingSet - Ett set vi håller på med eller ska göra snart
 *
 * När vi tränar så går vi igenom våra set ett i taget. Ett OngoingSet kan
 * vara i tre lägen:
 * - Inte börjat (startedAt är null)
 * - Pågår (startedAt har ett värde, endedAt är null)
 * - Klart (både startedAt och endedAt har värden)
 */
export class OngoingSet {
  public startedAt: Date | null; // När vi började settet (null = inte börjat)
  public endedAt: Date | null;   // När vi blev klara (null = inte klart än)
  public repetitions: number;    // Hur många reps vi ska göra
  public weight: number;         // Hur mycket vikt vi ska lyfta

  constructor(repetitions: number, weight: number) {
    // När vi skapar ett set är det inte påbörjat ännu, därför null
    this.startedAt = null;
    this.endedAt = null;
    this.repetitions = repetitions;
    this.weight = weight;
  }
}
