import { FormControl, Input, Icon, Image } from 'native-base'
import React, { Fragment } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { IMAGES } from 'shared/images/constants/image'
import {
  PRIMARY_LABEL_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
  COLORS,
} from 'shared/styles'
import { useRegistrationProcess } from '../hooks/registration'

export const SocialMediaForm = () => {
  const {
    socialMedia: payload,
    changeSocialMediaValue: changeValue,
    refs,
  } = useRegistrationProcess()
  return (
    <Fragment>
      <FormControl mt={10}>
        <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
          {'Instagram'}
        </FormControl.Label>
        <Input
          {...SECONDARY_INPUT_STYLES_PROPS}
          value={payload.instagram}
          onChangeText={value => changeValue('instagram', value)}
          ref={refs.instagramRef}
          onSubmitEditing={() => refs.whatsappRef.current?.focus()}
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
      <FormControl mt={4}>
        <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
          {'WhatsApp'}
        </FormControl.Label>
        <Input
          {...SECONDARY_INPUT_STYLES_PROPS}
          value={payload.whatsapp}
          onChangeText={value => changeValue('whatsapp', value)}
          ref={refs.whatsappRef}
          onSubmitEditing={() => refs.whatsappRef.current?.focus()}
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
      <FormControl mt={4}>
        <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
          {'Facebook/Messenger'}
        </FormControl.Label>
        <Input
          {...SECONDARY_INPUT_STYLES_PROPS}
          value={payload.facebook}
          onChangeText={value => changeValue('facebook', value)}
          ref={refs.facebookRef}
          onSubmitEditing={() => refs.facebookRef.current?.focus()}
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
      <FormControl mt={4}>
        <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
          {'Tik Tok'}
        </FormControl.Label>
        <Input
          {...SECONDARY_INPUT_STYLES_PROPS}
          value={payload.tiktok}
          onChangeText={value => changeValue('tiktok', value)}
          ref={refs.tiktokRef}
          onSubmitEditing={() => refs.tiktokRef.current?.focus()}
          returnKeyType="next"
          keyboardType="url"
          rightElement={
            <Image
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
    </Fragment>
  )
}
