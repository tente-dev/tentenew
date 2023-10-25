import { extendTheme } from 'native-base'
import { COLORS, TEXT_COLORS } from '../constants/colors'
import { FONTS, FONTS_CONFIG } from '../constants/fonts'

export const nativeBaseTheme = extendTheme({
  colors: { ...COLORS },
  fontConfig: { ...FONTS_CONFIG },
  fonts: { ...FONTS },
  components: {
    Button: {
      baseStyle: {
        rounded: 19,
        height: 65,
      },
      variants: {
        outline: ({ colorScheme }: any) => ({
          borderWidth: 2,
          borderColor: `${colorScheme}.500`,
        }),
      },
    },
    Text: {
      baseStyle: {
        color: TEXT_COLORS.primary,
      },
    },
    Input: {
      baseStyle: {
        rounded: 19,
        height: 65,
      },
      variants: {
        outline: ({ colorScheme }: any) => ({
          borderWidth: 2,
          borderColor: `${colorScheme}.500`,
        }),
      },
    },
  },
})
