/**
 * theme.ts - Färger och typsnitt för hela appen
 *
 * Här definierar vi alla färger som används i appen, både för ljust och mörkt läge.
 * På det här sättet har vi alla färger på ett ställe, vilket gör det lätt att ändra
 * utseendet på hela appen.
 *
 * Det finns många andra sätt att styla React Native-appar, t.ex:
 * - Nativewind: https://www.nativewind.dev/
 * - Tamagui: https://tamagui.dev/
 * - Unistyles: https://reactnativeunistyles.vercel.app
 */

import { Platform } from 'react-native';

// Huvudfärger för ljust och mörkt läge
const tintColorLight = '#0a7ea4'; // Ljusblå accentfärg för ljust läge
const tintColorDark = '#fff';     // Vit accentfärg för mörkt läge

/**
 * Colors - Färgscheman för ljust och mörkt läge
 *
 * Det här objektet innehåller alla färger vi använder i appen.
 * När vi använder ThemedText eller ThemedView så hämtas färgerna härifrån
 * automatiskt beroende på vilket läge telefonen har.
 */
export const Colors = {
  light: {
    text: '#11181C',            // Mörkgrå text på ljus bakgrund
    background: '#fff',         // Vit bakgrund
    tint: tintColorLight,       // Accentfärg (knappar, aktiv tab, etc)
    icon: '#687076',            // Grå för vanliga ikoner
    tabIconDefault: '#687076',  // Färg på inaktiva tabs
    tabIconSelected: tintColorLight, // Färg på aktiv tab
  },
  dark: {
    text: '#ECEDEE',            // Ljusgrå text på mörk bakgrund
    background: '#151718',      // Nästan svart bakgrund
    tint: tintColorDark,        // Vit accentfärg
    icon: '#9BA1A6',            // Ljusare grå för ikoner
    tabIconDefault: '#9BA1A6',  // Färg på inaktiva tabs
    tabIconSelected: tintColorDark, // Färg på aktiv tab
  },
};

/**
 * Fonts - Typsnitt för olika plattformar
 *
 * Platform.select() gör att vi kan ha olika typsnitt på iOS, Android och web.
 * Varje plattform har sina egna standardfonts som ser bra ut.
 *
 * Vi har fyra kategorier:
 * - sans: Vanligt typsnitt (standard för de flesta texter)
 * - serif: Typsnitt med "fötter" (som i tidningar)
 * - rounded: Rundare typsnitt (mjukare känsla)
 * - mono: Monospace (alla bokstäver lika breda, bra för kod)
 */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',       // iOS systemfont
    serif: 'ui-serif',       // iOS serif-font
    rounded: 'ui-rounded',   // iOS rundad font (SF Pro Rounded)
    mono: 'ui-monospace',    // iOS monospace-font
  },
  default: {
    // Fallback för Android och andra plattformar
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    // Fontstack för webben (försöker flera fonts tills en hittas)
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
