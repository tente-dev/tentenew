import { HStack, Text, VStack, View } from 'native-base'
import React, { useState } from 'react'
import { Dimensions, ImageBackground } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Lottie from 'lottie-react-native'
import { LOTTIE_ANIMATIONS } from '@lottie-animations'
import { ALTERNATIVE_COLORS, BACKGROUND_COLORS } from '@styles'
import { IMAGES } from '@images'

const FEATURES = [
  {
    description:
      'Encuentra tiendas cercanas a ti para facilitar la disminución de tus residuos y desechos.',
    animation: LOTTIE_ANIMATIONS.store,
  },
  {
    description: 'Encuentra gestores de residuos cercanos a tu hogar.',
    animation: LOTTIE_ANIMATIONS.powerRecycling,
  },
  {
    description:
      '​Contacta con las tiendas y gestores de residuos de forma fácil y rápida sin salir de tu hogar.',
    animation: LOTTIE_ANIMATIONS.sendMessage,
  },
]

export const FeaturesSlider = () => {
  const width = Dimensions.get('window').width
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <VStack>
      <ImageBackground
        source={IMAGES.carousel_bg}
        resizeMode="contain"
        imageStyle={{ width: '80%', marginLeft: '10%' }}>
        <Carousel
          loop
          width={width}
          height={width * 0.9}
          autoPlay={true}
          data={[...new Array(3).keys()]}
          scrollAnimationDuration={1000}
          autoPlayInterval={5000}
          snapEnabled
          pagingEnabled
          onSnapToItem={index => setCurrentIndex(index)}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: -50,
          }}
          renderItem={({ index }) => (
            <VStack flexGrow={1} alignItems={'center'}>
              <Lottie
                style={{
                  height: width * 0.8,
                }}
                source={FEATURES[index].animation}
                autoPlay
                loop
              />
              <Text textAlign={'center'} px={'10%'}>
                {FEATURES[index].description}
              </Text>
            </VStack>
          )}
        />
      </ImageBackground>
      <HStack
        height={width * 0.1}
        mt={2}
        justifyContent={'center'}
        space={2}
        alignItems={'center'}>
        {FEATURES.map((_, index) => (
          <View
            key={`dot_${index}`}
            width={2}
            height={2}
            borderRadius={'full'}
            bgColor={
              currentIndex === index
                ? ALTERNATIVE_COLORS.primary
                : BACKGROUND_COLORS.light
            }
          />
        ))}
      </HStack>
    </VStack>
  )
}
