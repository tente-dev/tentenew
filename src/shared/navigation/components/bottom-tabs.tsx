import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Pressable, View, Text, Stack, VStack, Badge, Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, TEXT_COLORS } from 'shared/styles'
import * as Progress from 'react-native-progress'
import { RootState } from 'shared/store'
import { useSelector } from 'react-redux'

export const BottomTabs = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const loadingAPI = useSelector(
    (state: RootState) => state.feedback.loadingAPI,
  )

  return (
    <VStack>
      <Progress.Bar
        borderRadius={0}
        indeterminate
        borderWidth={0}
        width={loadingAPI ? null : 0}
        color={COLORS.secondary[50]}
      />
      <View flexDirection={'row'} pt={2} pb={3.5}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label = options.title !== undefined ? options.title : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true } as any)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }
          return (
            <Pressable
              key={label}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
              opacity={isFocused ? 1 : 0.85}>
              <Stack
                justifyContent={'center'}
                alignItems={'center'}
                space={1}
                flexGrow={1}
                width={'full'}
                position={'relative'}>
                <Icon
                  name={options.tabBarLabel as string}
                  as={MaterialCommunityIcons}
                  color={
                    !isFocused ? TEXT_COLORS.primary : COLORS.secondary[500]
                  }
                  size={26}
                />
                <Text
                  fontWeight={isFocused ? '800' : '600'}
                  textAlign={'center'}
                  color={
                    !isFocused ? TEXT_COLORS.primary : COLORS.secondary[500]
                  }>
                  {label as any}
                </Text>
                {Boolean(options.tabBarBadge) && (
                  <Badge
                    rounded="full"
                    colorScheme={'tertiary'}
                    bottom={9}
                    zIndex={1}
                    style={{ transform: [{ translateX: 15 }] }}
                    variant="solid"
                    width={6}
                    height={6}
                    position={'absolute'}
                    _text={{ fontSize: 10 }}>
                    {options.tabBarBadge}
                  </Badge>
                )}
              </Stack>
            </Pressable>
          )
        })}
      </View>
    </VStack>
  )
}
