import {
  Button,
  FormControl,
  Icon,
  Input,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Stack,
  Text,
  TextArea,
  View,
} from 'native-base'
import React from 'react'
import { Dimensions, Image } from 'react-native'
import { LOTTIE_ANIMATIONS } from 'shared/animations/constants/lottie'
import {
  PRIMARY_LABEL_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
} from 'shared/styles'
import Lottie from 'lottie-react-native'
import { useRegistrationProcess } from '../hooks/registration'
import { SocialMediaForm } from './social-media-form'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {}

export const StoreInfoForm = (props: Props) => {
  const width = Dimensions.get('window').width
  const {
    storeInfo: payload,
    changeStoreInfoValue: changeValue,
    refs,
    storeInfoErrors: errors,
    selectLogoFile,
    completeStoreInfo,
  } = useRegistrationProcess()
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
          <FormControl isRequired isInvalid={errors.name}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Nombre del negocio'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={payload.name}
              onChangeText={value => changeValue('name', value)}
              ref={refs.storeNameRef}
              onSubmitEditing={() => refs.storeSloganRef.current?.focus()}
              returnKeyType="next"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={2} isInvalid={false}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Slogan (Opcional)'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={payload.slogan}
              onChangeText={value => changeValue('slogan', value)}
              ref={refs.storeSloganRef}
              onSubmitEditing={() => refs.storeStrRef.current?.focus()}
              returnKeyType="next"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={2} isRequired isInvalid={errors.str}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'RUC'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={payload.str}
              onChangeText={value => changeValue('str', value)}
              ref={refs.storeStrRef}
              onSubmitEditing={() => refs.storeDescriptionRef.current?.focus()}
              returnKeyType="next"
              keyboardType="numeric"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt={2} isInvalid={false}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Reseña del negocio (Opcional)'}
            </FormControl.Label>
            <TextArea
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={payload.description}
              onChangeText={value => {
                if ((payload.description?.split(' ')?.length ?? 0) > 50) return
                changeValue('description', value)
              }}
              ref={refs.storeDescriptionRef}
              onSubmitEditing={selectLogoFile}
              autoCompleteType={''}
            />
            <FormControl.HelperText pl={2}>
              {`${
                payload.description?.split(' ')?.length ?? 0
              }/50 (Máximo 50 palabras)`}
            </FormControl.HelperText>
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
          <Stack py={4} mt={6} pb={0}>
            <Pressable onPress={selectLogoFile}>
              <Stack justifyContent={'center'} alignItems={'center'}>
                {payload.logo ? (
                  <Image
                    source={{ uri: payload.logo }}
                    style={{
                      width: width * 0.4,
                      height: width * 0.4,
                      position: 'relative',
                    }}
                  />
                ) : (
                  <Lottie
                    style={{
                      width: width * 0.4,
                      position: 'relative',
                    }}
                    source={LOTTIE_ANIMATIONS.album}
                    autoPlay
                    loop
                  />
                )}
                <Text mt={4} textAlign={'center'}>
                  {'Sube el logo de tu empresa (Opcional)'}
                </Text>
              </Stack>
            </Pressable>
            {payload.logo && (
              <Button
                _pressed={{ bgColor: 'transparent' }}
                onPress={() => changeValue('logo', undefined)}
                colorScheme={'error'}
                variant={'ghost'}
                height={42}
                endIcon={<Icon size={6} name={'delete'} as={MaterialIcons} />}>
                {'Borrar logo'}
              </Button>
            )}
          </Stack>
          <SocialMediaForm />
        </KeyboardAvoidingView>
      </ScrollView>
      <View px="7.5%" pb={4}>
        <Button onPress={completeStoreInfo}>{'Siguiente'}</Button>
      </View>
    </View>
  )
}
