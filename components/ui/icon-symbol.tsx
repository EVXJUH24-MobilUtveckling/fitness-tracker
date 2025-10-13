/**
 * icon-symbol.tsx - Ikonkomponent för Android och web
 *
 * Det här är en fallback-version av IconSymbol som används på Android och web.
 * På iOS finns det en separat fil (icon-symbol.ios.tsx) som använder SF Symbols.
 *
 * Den här filen översätter SF Symbol-namn (som "house.fill") till Material Icons
 * (som "home") så att vi får liknande ikoner på alla plattformar.
 */

// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

// Typer för att hålla koll på vilka ikoner som finns
type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * MAPPING - Översättning från SF Symbols till Material Icons
 *
 * SF Symbols är Apples ikonbibliotek (används på iOS/Mac).
 * Material Icons är Googles ikonbibliotek (används på Android/web).
 *
 * Här mappar vi SF Symbol-namn till motsvarande Material Icons-namn
 * så att ikonerna ser likadana ut på alla plattformar.
 *
 * Lägg till fler ikoner här när du behöver dem:
 * - Material Icons: https://icons.expo.fyi
 * - SF Symbols: https://developer.apple.com/sf-symbols/
 */
const MAPPING = {
  "house.fill": "home",                                    // Hem-ikon
  "paperplane.fill": "send",                               // Skicka-ikon
  "chevron.left.forwardslash.chevron.right": "code",       // Kod-ikon
  "chevron.right": "chevron-right",                        // Höger-pil
  "directions_run.fill": "directions-run",                 // Löpare-ikon (träning)
  "timer.circle": "history",                               // Historik-ikon
} as IconMapping;

/**
 * IconSymbol - En ikonkomponent som funkar på alla plattformar
 *
 * På iOS används native SF Symbols (från icon-symbol.ios.tsx).
 * På Android och web används Material Icons (från den här filen).
 *
 * Vi använder samma namn överallt i koden (t.ex. "house.fill"),
 * och komponenten väljer automatiskt rätt ikon för plattformen.
 *
 * Exempel:
 * <IconSymbol name="house.fill" size={28} color="blue" />
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;                   // Namnet på ikonen (från MAPPING)
  size?: number;                          // Storlek i pixlar (standard: 24)
  color: string | OpaqueColorValue;       // Färg på ikonen
  style?: StyleProp<TextStyle>;           // Eventuella extra styles
  weight?: SymbolWeight;                  // Används bara på iOS (ignoreras här)
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]} // Översätter SF Symbol-namn till Material Icons-namn
      style={style}
    />
  );
}
