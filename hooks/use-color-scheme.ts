/**
 * use-color-scheme.ts - Hook för att kolla om telefonen har ljust eller mörkt läge
 *
 * Det här är egentligen bara en re-export av React Natives inbyggda useColorScheme.
 * Vi har en egen fil för det så att vi kan ha olika implementationer för olika
 * plattformar (se use-color-scheme.web.ts för webbversionen).
 *
 * useColorScheme returnerar 'light', 'dark', eller null.
 */

export { useColorScheme } from 'react-native';
