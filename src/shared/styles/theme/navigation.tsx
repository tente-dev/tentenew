import { DefaultTheme, Theme } from '@react-navigation/native'
import { BACKGROUND_COLORS, COLORS } from '../constants/colors'

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary['500'],
    background: BACKGROUND_COLORS.light,
  },
}
