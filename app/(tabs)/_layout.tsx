/**
 * (tabs)/_layout.tsx - Layouten för tab-navigeringen
 *
 * Det här är "hemskärmen" i appen. Här har vi tabs (flikar) längst ner
 * som vi kan trycka på för att byta mellan olika skärmar:
 * - Home: Startsidan
 * - New Workout: Där vi planerar ett träningspass
 * - History: Historik över tidigare träningspass
 */

import { Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

/**
 * TabLayout - Sätter upp tab-navigeringen
 *
 * Tabs är de här knapparna längst ner i appen som vi ser i typ Instagram
 * eller Facebook. Vi kan swipea eller trycka på dem för att byta skärm.
 */
export default function TabLayout() {
  // Kollar om vi har mörkt läge för att välja rätt färg på ikonerna
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Vilken färg den aktiva tab-knappen ska ha
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Vi vill inte ha en header längst upp (tas hand om i root layout)
        headerShown: false,
      }}
    >
      {/* Home-tab: Startsidan */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* New Workout-tab: Där vi skapar ett nytt träningspass */}
      <Tabs.Screen
        name="new-workout"
        options={{
          title: "New Workout",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="directions_run.fill" color={color} />
          ),
        }}
      />

      {/* History-tab: Visa tidigare träningspass */}
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="timer.circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
