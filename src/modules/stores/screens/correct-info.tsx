import { useRoute, useTheme } from '@react-navigation/native'
import {
  FormControl,
  Input,
  ScrollView,
  Stack,
  Text,
  TextArea,
  VStack,
  Button,
  Icon,
  Image as NBImage,
  Divider,
} from 'native-base'
import React, { Fragment } from 'react'
import { NonAcceptedFields } from '../hooks/requests'
import { Dimensions, Image, Pressable, StatusBar } from 'react-native'
import {
  COLORS,
  PRIMARY_LABEL_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
} from 'shared/styles'
import { useCorrectInfo } from '../hooks/correct-info'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { IMAGES } from 'shared/images/constants/image'
import { useNavigationActions } from 'shared/navigation'

export const CorrectInfo = () => {
  const width = Dimensions.get('window').width
  const route = useRoute()
  const params = route.params as any

  const nonAcceptedFields = params?.nonAcceptedFields as NonAcceptedFields

  const theme = useTheme()

  const {
    store,
    socialMedia,
    owner,
    branches,
    loading,
    changeOwnerValue,
    changeStoreInfoValue,
    selectLogoFile,
    changeSocialMediaValue,
    takeIdentificationPhoto,
    changeBranchValue,
    updateStore,
  } = useCorrectInfo()

  const { navigateToSelectLocation } = useNavigationActions()

  return (
    <ScrollView
      disableScrollViewPanResponder
      _contentContainerStyle={{ px: '7.5%', pb: 12 }}>
      <StatusBar
        backgroundColor={theme.colors.background}
        translucent={false}
      />
      <VStack mt={4} space={2}>
        {(nonAcceptedFields?.store?.length ?? 0) > 0 && (
          <Text fontWeight={'800'} opacity={0.5} pb={4}>
            {'Información de tienda'}
          </Text>
        )}
        {nonAcceptedFields?.store?.includes('name') && (
          <FormControl isRequired>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Nombre del negocio'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={store.name}
              onChangeText={value => changeStoreInfoValue('name', value)}
              returnKeyType="next"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        {nonAcceptedFields?.store?.includes('slogan') && (
          <FormControl mt={2} isInvalid={false}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Slogan '}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={store.slogan}
              onChangeText={value => changeStoreInfoValue('slogan', value)}
              returnKeyType="next"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        {nonAcceptedFields?.store?.includes('str') && (
          <FormControl mt={2} isRequired>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'RUC'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={store.str}
              onChangeText={value => changeStoreInfoValue('str', value)}
              returnKeyType="next"
              keyboardType="numeric"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        {nonAcceptedFields?.store?.includes('description') && (
          <FormControl mt={2} isInvalid={false}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Reseña del negocio'}
            </FormControl.Label>
            <TextArea
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={store.description}
              onChangeText={value => {
                if ((store.description?.split(' ')?.length ?? 0) > 50) return
                changeStoreInfoValue('description', value)
              }}
              autoCompleteType={''}
            />
            <FormControl.HelperText pl={2}>
              {`${
                store.description?.split(' ')?.length ?? 0
              }/50 (Máximo 50 palabras)`}
            </FormControl.HelperText>
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        {nonAcceptedFields?.store?.includes('logo') && (
          <Stack py={4} mt={6} pb={0} space={4}>
            <Pressable onPress={selectLogoFile}>
              <Stack justifyContent={'center'} alignItems={'center'}>
                <Image
                  source={{ uri: store?.logo }}
                  style={{
                    width: width * 0.4,
                    height: width * 0.4,
                    position: 'relative',
                  }}
                />
              </Stack>
            </Pressable>
            <Button onPress={selectLogoFile}>{'Cambiar logo'}</Button>
          </Stack>
        )}
        {(nonAcceptedFields?.socialMedia?.length ?? 0) > 0 && (
          <Text fontWeight={'800'} opacity={0.5} py={4}>
            {'Redes Sociales'}
          </Text>
        )}
        {nonAcceptedFields?.socialMedia?.includes('instagram') && (
          <FormControl>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Instagram'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={socialMedia.instagram}
              onChangeText={value => changeSocialMediaValue('instagram', value)}
              returnKeyType="next"
              keyboardType="url"
              rightElement={
                <Icon
                  mr={4}
                  size={8}
                  color={COLORS.tertiary[400]}
                  name="instagram"
                  as={MaterialCommunityIcons}
                />
              }
            />
            <FormControl.HelperText pl={2}>
              {'Copia y pega el enlace'}
            </FormControl.HelperText>
          </FormControl>
        )}
        {nonAcceptedFields?.socialMedia?.includes('whatsapp') && (
          <FormControl>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'WhatsApp'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={socialMedia.whatsapp}
              onChangeText={value => changeSocialMediaValue('whatsapp', value)}
              returnKeyType="next"
              keyboardType="numeric"
              rightElement={
                <Icon
                  mr={4}
                  size={8}
                  color={COLORS.primary[400]}
                  name="whatsapp"
                  as={MaterialCommunityIcons}
                />
              }
            />
            <FormControl.HelperText pl={2}>
              {'Número de teléfono'}
            </FormControl.HelperText>
          </FormControl>
        )}
        {nonAcceptedFields?.socialMedia?.includes('facebook') && (
          <FormControl>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Facebook/Messenger'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={socialMedia.facebook}
              onChangeText={value => changeSocialMediaValue('facebook', value)}
              returnKeyType="next"
              keyboardType="url"
              rightElement={
                <Icon
                  mr={4}
                  size={8}
                  color={COLORS.secondary[200]}
                  name="facebook"
                  as={MaterialCommunityIcons}
                />
              }
            />
            <FormControl.HelperText pl={2}>
              {'Copia y pega el enlace'}
            </FormControl.HelperText>
          </FormControl>
        )}
        {nonAcceptedFields?.socialMedia?.includes('tiktok') && (
          <FormControl>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Tik Tok'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={socialMedia.tiktok}
              onChangeText={value => changeSocialMediaValue('tiktok', value)}
              returnKeyType="next"
              keyboardType="url"
              rightElement={
                <NBImage
                  mr={4}
                  size={8}
                  opacity={0.5}
                  alt="tik tok logo"
                  source={IMAGES.tik_tok_logo}
                />
              }
            />
            <FormControl.HelperText pl={2}>
              {'Copia y pega el enlace'}
            </FormControl.HelperText>
          </FormControl>
        )}
        {(nonAcceptedFields?.owner?.length ?? 0) > 0 && (
          <Text fontWeight={'800'} opacity={0.5} pt={6} pb={4}>
            {'Información de propietario'}
          </Text>
        )}
        {nonAcceptedFields?.owner?.includes('name') && (
          <FormControl isRequired>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Nombre completo'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={owner.fullName}
              onChangeText={value => changeOwnerValue('fullName', value)}
              returnKeyType="next"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        {nonAcceptedFields?.owner?.includes('email') && (
          <FormControl mt={2} isRequired>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Correo electrónico'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={owner.email}
              onChangeText={value => changeOwnerValue('email', value)}
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        {nonAcceptedFields?.owner?.includes('identification') && (
          <FormControl mt={2} isRequired>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Cédula'}
            </FormControl.Label>
            <Input
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={owner.identification}
              onChangeText={value => changeOwnerValue('identification', value)}
              returnKeyType="next"
              keyboardType="numeric"
            />
            <FormControl.ErrorMessage pl={2}>
              {'Campo requerido.'}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        {nonAcceptedFields?.owner?.includes('identificationPhoto') && (
          <Stack py={4} mt={6} pb={0} space={4}>
            <Pressable onPress={takeIdentificationPhoto}>
              <Stack justifyContent={'center'} alignItems={'center'}>
                <Image
                  source={{ uri: owner.identificationPhoto }}
                  style={{
                    width: width * 0.4,
                    height: width * 0.4,
                    position: 'relative',
                  }}
                />
              </Stack>
            </Pressable>
            <Button onPress={takeIdentificationPhoto}>{'Cambiar foto'}</Button>
          </Stack>
        )}
        {(nonAcceptedFields?.branches?.length ?? 0) > 0 && (
          <Text fontWeight={'800'} opacity={0.5} py={4} mt={4}>
            {'Sucursales'}
          </Text>
        )}
        {branches.map((branch: any, index: number) => {
          const locationSelected = branch.lat && branch.long
          return (
            <Fragment key={`correct-info-${branch.id}`}>
              {nonAcceptedFields?.branches?.includes(branch.id.toString()) && (
                <VStack space={4}>
                  <FormControl mt={2} isRequired>
                    <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
                      {'Nombre/Identificador'}
                    </FormControl.Label>
                    <Input
                      {...SECONDARY_INPUT_STYLES_PROPS}
                      value={branch.name}
                      onChangeText={value =>
                        changeBranchValue(index, { ...branch, name: value })
                      }
                    />
                    <FormControl.ErrorMessage pl={2}>
                      {'Campo requerido.'}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  {branch.lat && branch.long && (
                    <Button
                      onPress={() =>
                        navigateToSelectLocation({
                          type: 'update',
                          title: 'Actualizar ubicación',
                          initialCoordinates: locationSelected
                            ? ({
                                latitude: branch.lat,
                                longitude: branch.long,
                              } as any)
                            : undefined,
                          id: branch.id,
                          nonAcceptedFields,
                        })
                      }>
                      {'Actualizar ubicación'}
                    </Button>
                  )}
                  <Divider my={4} />
                </VStack>
              )}
            </Fragment>
          )
        })}
      </VStack>
      <Button
        my={8}
        colorScheme={'tertiary'}
        onPress={updateStore}
        isLoading={loading}>
        {'Actualizar'}
      </Button>
    </ScrollView>
  )
}
