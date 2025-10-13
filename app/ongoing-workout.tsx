/**
 * ongoing-workout.tsx - Skärmen där vi tränar JUST NU
 *
 * Det här är själva träningsskärmen där vi:
 * - Ser en timer som visar hur länge vi tränat
 * - Går igenom övningar och set
 * - Markerar när vi gjort ett set
 *
 * Just nu visar den bara en timer, men här kommer vi lägga till mer
 * funktionalitet senare (visa övningar, markera set som klara, etc).
 */

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useOngoingStore } from "@/states/ongoing";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

/**
 * OngoingWorkoutScreen - Huvudskärmen för pågående träning
 *
 * Hämtar träningspasset från OngoingStore och visar en timer.
 * useEffect används för att uppdatera timern varje sekund.
 */
export default function OngoingWorkoutScreen() {
  // State för att lagra timer-texten (t.ex. "05:23")
  const [timer, setTimer] = useState("00:00");

  // Hämtar pågående träningspass från OngoingStore
  const workout = useOngoingStore((store) => store.workout);

  // Om något gått fel och det inte finns något träningspass, visa felmeddelande
  if (workout === null) {
    return <ThemedText>Something went wrong!</ThemedText>;
  }

  /**
   * useEffect - Kör kod när komponenten visas första gången
   *
   * Det här är en React hook som låter oss köra "side effects" (saker som
   * händer utanför rendering). Här använder vi den för att starta en timer
   * som uppdateras varje sekund.
   *
   * setInterval = kör en funktion om och om igen med ett visst intervall
   * clearInterval = stoppar timern (viktigt att rensa upp!)
   */
  useEffect(() => {
    // Sätter upp en timer som körs varje sekund (1000 millisekunder)
    const interval = setInterval(() => {
      const now = new Date(); // Nuvarande tid
      // Räknar ut skillnaden mellan nu och när vi startade träningen
      const difference = now.getTime() - workout.startedAt.getTime();
      // Formaterar tiden och uppdaterar state
      setTimer(formatTime(difference));
    }, 1000);

    // Cleanup-funktion: körs när komponenten tas bort från skärmen
    // Stoppar timern så att den inte fortsätter köra i bakgrunden
    return () => {
      clearInterval(interval);
    };
  }, []); // Tom array = kör bara en gång när komponenten visas första gången

  return (
    <ThemedView>
      <ScrollView>
        {/* TIMER - visar hur länge vi tränat */}
        <View>
          <ThemedText type="title">{timer}</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

/**
 * formatTime - Formaterar millisekunder till MM:SS format
 *
 * Tar ett antal millisekunder och gör om det till en snygg tidssträng.
 * Exempelvis: 125000 millisekunder blir "02:05" (2 minuter, 5 sekunder)
 *
 * @param ms - Antal millisekunder (1000 ms = 1 sekund)
 * @returns En sträng i formatet "MM:SS" (t.ex. "05:23")
 */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);      // Omvandla ms till sekunder
  const minutes = Math.floor(totalSeconds / 60);   // Räkna ut minuter
  const seconds = totalSeconds % 60;                // Räkna ut resterande sekunder

  // padStart(2, "0") lägger till en nolla framför om siffran är ensiffrig
  // Exempelvis: 5 blir "05", 12 förblir "12"
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
