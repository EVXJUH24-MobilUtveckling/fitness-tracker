/**
 * _layout.tsx - Huvudlayouten för hela appen
 *
 * Det här är "roten" av appen. Alla andra skärmar visas inuti den här.
 * Här bestämmer vi hur navigeringen fungerar och vilket tema (ljust/mörkt) appen ska ha.
 */

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

// Talar om för expo-router att standardskärmen är (tabs)
export const unstable_settings = {
  anchor: "(tabs)",
};

/**
 * RootLayout - Appens huvudkomponent
 *
 * Det här är första komponenten som körs när appen startar. Den gör två saker:
 * 1. Sätter upp temat (ljust eller mörkt läge)
 * 2. Definierar alla skärmar i appen och hur man navigerar mellan dem
 *
 * Stack betyder att skärmarna läggs ovanpå varandra, som en kortlek.
 * När vi går till en ny skärm så glider den in från höger.
 */
export default function RootLayout() {
  // Kollar om användaren har mörkt läge aktiverat på sin telefon
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Stack = en hög med skärmar som vi navigerar mellan */}
      <Stack>
        {/* Tabs-skärmen (hemskärmen med tabs längst ner) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Skärmen där vi tränar just nu */}
        <Stack.Screen name="ongoing-workout" options={{ headerShown: false }} />

        {/* Skärmen där vi väljer vilken övning vi vill lägga till */}
        <Stack.Screen
          name="add-exercise"
          options={{ headerShown: true, headerTitle: "Välj övning" }}
        />

        {/* Skärmen där vi konfigurerar vikt och reps för en övning */}
        <Stack.Screen
          name="configure-exercise/[name]"
          options={{ headerShown: true, headerTitle: "Konfigurera övning" }}
        />

        {/* En modal (används inte just nu, men kan användas senare) */}
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>

      {/* StatusBar är den översta raden på telefonen (tid, batteri, etc) */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
