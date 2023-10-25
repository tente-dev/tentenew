import { BACKGROUND_COLORS, TEXT_COLORS } from '../constants/colors'

export const PRIMARY_LABEL_STYLES_PROPS = {
  _text: { color: TEXT_COLORS.primary },
  mb: 2,
  pl: 2,
  _astrick: { color: TEXT_COLORS.primary },
}

export const SECONDARY_INPUT_STYLES_PROPS = {
  colorScheme: 'secondary',
  borderColor: TEXT_COLORS.primary,
  bgColor: BACKGROUND_COLORS.secondaryInput,
  _focus: { borderColor: 'secondary.500' },
}

export const PRIMARY_LINK_STYLES_PROPS = {
  _text: {
    fontSize: 'sm',
    fontWeight: '500',
    color: TEXT_COLORS.secondary,
  },
  alignSelf: 'flex-end',
  m: 2,
  py: 4,
}

export const TOGGLE_PASSWORD_BUTTON_STYLES_PROPS = {
  size: 'xs',
  variant: 'ghost',
  colorScheme: 'secondary',
  px: 5,
  _pressed: { bgColor: 'transparent' },
}
