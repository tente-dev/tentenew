import {
  BottomSheetBackdropProps,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'
import { Pressable } from 'native-base'
import { useMemo, Fragment, useEffect } from 'react'
import { BackHandler, StatusBar } from 'react-native'
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { COLORS } from 'shared/styles'

const Backdrop = Animated.createAnimatedComponent(Pressable)

export const ModalSheetBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  const { dismiss } = useBottomSheetModal()
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0.5, 1],
      [0.5, 1],
      Extrapolate.CLAMP,
    ),
  }))

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        dismiss()
        return true
      },
    )
    return () => backHandler.remove()
  }, [])

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: COLORS.primary[100],
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  )

  return (
    <Fragment>
      <StatusBar backgroundColor={COLORS.primary[50]} />
      <Backdrop style={containerStyle} onPress={() => dismiss()} />
    </Fragment>
  )
}
