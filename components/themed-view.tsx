/**
 * themed-view.tsx - En View-komponent som anpassar sig till ljust/mörkt läge
 *
 * Det här är en förbättrad version av React Natives vanliga <View>-komponent.
 * Den sätter automatiskt rätt bakgrundsfärg beroende på om telefonen har
 * ljust eller mörkt tema.
 *
 * View är som en <div> i HTML - en container som håller annat innehåll.
 */

import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

/**
 * ThemedViewProps - Props som ThemedView kan ta emot
 *
 * Utökar de vanliga View-props med:
 * - lightColor: Bakgrundsfärg för ljust läge (valfri)
 * - darkColor: Bakgrundsfärg för mörkt läge (valfri)
 */
export type ThemedViewProps = ViewProps & {
  lightColor?: string;  // Bakgrundsfärg i ljust läge
  darkColor?: string;   // Bakgrundsfärg i mörkt läge
};

/**
 * ThemedView - En View-komponent som anpassar sig till temat
 *
 * Används precis som vanlig <View> men får automatiskt rätt bakgrundsfärg
 * för ljust eller mörkt läge.
 *
 * Exempel:
 * <ThemedView style={{padding: 20}}>
 *   <ThemedText>Min text här</ThemedText>
 * </ThemedView>
 */
export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // Hämtar rätt bakgrundsfärg beroende på tema (ljust/mörkt)
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
