import {
  Button,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Stack,
  View,
  Text,
  Pressable,
  Link,
  Icon,
} from 'native-base'
import React from 'react'
import { Dimensions, Image } from 'react-native'
import { LOTTIE_ANIMATIONS } from 'shared/animations/constants/lottie'
import {
  COLORS,
  PRIMARY_LABEL_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
} from 'shared/styles'
import Lottie from 'lottie-react-native'
import { useRegistrationProcess } from '../hooks/registration'
import { RootState } from 'shared/store'
import { useSelector } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {}

export const OwnerInfoForm = (props: Props) => {
  const {
    owner: payload,
    changeOwnerInfoValue: changeValue,
    refs,
    ownerInfoErrors: errors,
    completeOwnerInfo,
    takeIdentificationPhoto,
  } = useRegistrationProcess()
  const user = useSelector((state: RootState) => state.auth.user)
  const width = Dimensions.get('window').width
  return (
    <View flex={1}>
      <ScrollView
        disableScrollViewPanResponder
        px="7.5%"
        _contentContainerStyle={{ py: 18, flexGrow: 1 }}>
        <KeyboardAvoidingView
          flex={1}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <FormControl isRequired isInvalid={errors.fullName}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Nombre completo'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={payload.fullName}
              onChangeText={value => changeValue('fullName', value)}
              ref={refs.ownerFullNameRef}
              onSubmitEditing={() => refs.ownerEmailRef.current?.focus()}
              returnKeyType="next"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={2} isRequired isInvalid={errors.email}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Correo electrónico'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={payload.email}
              onChangeText={value => changeValue('email', value)}
              ref={refs.ownerEmailRef}
              onSubmitEditing={() =>
                refs.ownerIdentificationRef.current?.focus()
              }
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Link
              mt={1}
              pr={1}
              justifyContent={'flex-end'}
              onPress={() => changeValue('email', user?.email)}
              _text={{
                color: COLORS.secondary[700],
                fontSize: 13,
              }}>{`Utilizar ${user?.email}`}</Link>
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={2} isRequired isInvalid={errors.identification}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Cédula'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={payload.identification}
              onChangeText={value => changeValue('identification', value)}
              ref={refs.ownerIdentificationRef}
              onSubmitEditing={() => takeIdentificationPhoto()}
              returnKeyType="next"
              keyboardType="numeric"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
          <Stack my={4} py={4}>
            <Pressable onPress={takeIdentificationPhoto}>
              <Stack justifyContent={'center'} alignItems={'center'}>
                {payload.identificationPhoto ? (
                  <Image
                    source={{ uri: payload.identificationPhoto }}
                    style={{
                      width: width * 0.8,
                      height: width * 0.8,
                      position: 'relative',
                    }}
                  />
                ) : (
                  <Lottie
                    style={{
                      width: width * 0.35,
                      position: 'relative',
                    }}
                    source={LOTTIE_ANIMATIONS.verifyId}
                    autoPlay
                    loop
                  />
                )}
                <Text textAlign={'center'} mt={2}>
                  {'Verificación: Foto con tu cédula'}
                </Text>
              </Stack>
            </Pressable>
            {payload.identificationPhoto && (
              <Button
                _pressed={{ bgColor: 'transparent' }}
                onPress={() => changeValue('identificationPhoto', undefined)}
                colorScheme={'error'}
                variant={'ghost'}
                height={42}
                endIcon={<Icon size={6} name={'delete'} as={MaterialIcons} />}>
                {'Borrar foto'}
              </Button>
            )}
          </Stack>
        </KeyboardAvoidingView>
      </ScrollView>
      <View px="7.5%" pb={4}>
        <Button onPress={completeOwnerInfo}>{'Siguiente'}</Button>
      </View>
    </View>
  )
}
