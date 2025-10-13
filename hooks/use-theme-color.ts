/**
 * use-theme-color.ts - En hook för att hämta rätt färg baserat på ljust/mörkt tema
 *
 * Det här är en custom React hook som hjälper oss få rätt färg beroende på
 * om användaren har ljust eller mörkt läge aktiverat på telefonen.
 *
 * Hooks är funktioner som börjar med "use" och ger oss tillgång till React-features
 * (som state, context, etc). Den här hooken använder useColorScheme för att kolla
 * vilket tema som är aktivt.
 *
 * Läs mer om ljust och mörkt läge:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * useThemeColor - Hämtar rätt färg för nuvarande tema
 *
 * Den här funktionen kollar om användaren har ljust eller mörkt läge
 * och returnerar rätt färg.
 *
 * Vi kan antingen:
 * 1. Skicka in egna färger via props (light och dark)
 * 2. Använda fördefinierade färger från Colors (background, text, etc)
 *
 * Exempel:
 * const textColor = useThemeColor({}, 'text')
 * const bgColor = useThemeColor({light: '#fff', dark: '#000'}, 'background')
 *
 * @param props - Objekt med light och dark färger (valfria)
 * @param colorName - Namnet på färgen från Colors (t.ex. 'text', 'background')
 * @returns En färgsträng (t.ex. '#fff' eller '#000')
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Hämtar nuvarande tema ('light' eller 'dark'), defaultar till 'light' om inte satt
  const theme = useColorScheme() ?? 'light';

  // Kollar om vi skickat in en egen färg för det här temat via props
  const colorFromProps = props[theme];

  // Om vi har en egen färg i props, använd den
  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Annars, använd fördefinierad färg från Colors-objektet
    return Colors[theme][colorName];
  }
}
