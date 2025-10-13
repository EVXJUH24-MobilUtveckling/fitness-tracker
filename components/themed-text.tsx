/**
 * themed-text.tsx - En textkomponent som automatiskt anpassar sig till ljust/mörkt läge
 *
 * Det här är en förbättrad version av React Natives vanliga <Text>-komponent.
 * Den kan automatiskt byta färg beroende på om telefonen har ljust eller mörkt tema,
 * och har inbyggda textstilar för olika användningsområden (rubrik, länk, etc).
 */

import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

/**
 * ThemedTextProps - Props som ThemedText kan ta emot
 *
 * Utökar de vanliga Text-props med:
 * - lightColor: Färg för ljust läge (valfri)
 * - darkColor: Färg för mörkt läge (valfri)
 * - type: Vilken typ av text (rubrik, länk, etc)
 */
export type ThemedTextProps = TextProps & {
  lightColor?: string;  // Vilken färg texten ska ha i ljust läge
  darkColor?: string;   // Vilken färg texten ska ha i mörkt läge
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link"; // Typ av text
};

/**
 * ThemedText - En textkomponent som anpassar sig till temat
 *
 * Används precis som vanlig <Text> men får automatiskt rätt färg
 * för ljust eller mörkt läge. Vi kan också välja typ av text för att
 * få färdig styling (stor rubrik, länk, etc).
 *
 * Exempel:
 * <ThemedText type="title">Min Rubrik</ThemedText>
 * <ThemedText type="link">Klicka här</ThemedText>
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest // Alla andra props skickas vidare till <Text>
}: ThemedTextProps) {
  // Hämtar rätt färg beroende på tema (ljust/mörkt)
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color }, // Sätt färgen från temat
        // Välj stil baserat på type-prop (om title, använd styles.title, osv)
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style, // Eventuella egna styles läggs på sist (override)
      ]}
      {...rest} // Skicka vidare alla andra props (children, onPress, etc)
    />
  );
}

// Fördefinierade textstilar för olika användningsområden
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600", // Halvfet text
  },
  title: {
    fontSize: 32,      // Stor text
    fontWeight: "bold", // Fet text
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4", // Blå färg (standardfärg för länkar)
  },
});
