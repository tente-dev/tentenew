import React, { Fragment, useEffect } from 'react'
import { Store } from '../types/store'
import { useNavigation, useRoute, useTheme } from '@react-navigation/native'
import {
  Alert,
  Button,
  Divider,
  FormControl,
  HStack,
  Icon,
  ScrollView,
  StatusBar,
  Text,
  TextArea,
  VStack,
} from 'native-base'
import {
  Image,
  Keyboard,
  Linking,
  Platform,
  Pressable,
  useWindowDimensions,
} from 'react-native'
import { NonAcceptedFields, useRequestFields } from '../hooks/requests'
import { Branch } from '../types/branch'
import {
  PRIMARY_LABEL_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
} from 'shared/styles'
import { useApiServiceMutation } from 'shared/api'
import { useShowToast } from 'shared/feedback'
import { useNavigationActions } from 'shared/navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const StoreRequest = () => {
  const route = useRoute()
  const params = route.params as any
  const item: Store | undefined = params?.item
  const navigation = useNavigation()
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const { showToast } = useShowToast()
  const {
    toggleField,
    isBranchRejected,
    storeNameRejected,
    storeDescriptionRejected,
    storeLogoRejected,
    storeSloganRejected,
    storeStrRejected,
    instagramRejected,
    whatsappRejected,
    facebookRejected,
    tiktokRejected,
    ownerEmailRejected,
    ownerIdentificationPhotoRejected,
    ownerIdentificationRejected,
    ownerNameRejected,
    nonAcceptedFields,
    updateNote,
  } = useRequestFields()

  const checkStoreStatus = () => {
    return (
      storeNameRejected ||
      storeDescriptionRejected ||
      storeLogoRejected ||
      storeSloganRejected ||
      storeStrRejected ||
      instagramRejected ||
      whatsappRejected ||
      facebookRejected ||
      tiktokRejected ||
      ownerEmailRejected ||
      ownerIdentificationPhotoRejected ||
      ownerIdentificationRejected ||
      ownerNameRejected ||
      (nonAcceptedFields?.branches?.length ?? -1) > 0
    )
  }

  const storeRejected = checkStoreStatus()

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss()
      await apiService({
        url: `/stores/${item?.id}`,
        method: 'PATCH',
        body: {
          name: item?.name ?? '',
          str: item?.str ?? '',
          verified: storeRejected ? 0 : 1,
          ownerId: item?.ownerId as number,
          nonAcceptedFields: JSON.stringify(nonAcceptedFields),
        } as any,
      }).unwrap()
      showToast(
        'success',
        `Tienda ${storeRejected ? 'Rechazada' : 'Aprobada'}`,
        `Tienda ${item?.name ?? ''}`,
      )
      navigation.goBack()
    } catch (error) {
      console.log(JSON.stringify(error))
      showToast(
        'error',
        'Hubo un error al actualiza la tienda',
        'Error de registo',
      )
    }
  }

  const theme = useTheme()
  useEffect(() => {
    if (!item) {
      navigation.goBack()
    }
  }, [item, navigation])

  return (
    <Fragment>
      <StatusBar
        translucent={false}
        backgroundColor={theme.colors.background}
      />
      <ScrollView
        disableScrollViewPanResponder
        _contentContainerStyle={{ px: '7.5%', py: 4 }}>
        <Text fontWeight={'800'} opacity={0.5}>
          {'Información de tienda'}
        </Text>
        <VStack mt={4} space={8}>
          <StringValue
            field={'name'}
            label="Nombre"
            rejected={storeNameRejected}
            subgroup={'store'}
            toggleField={toggleField}
            value={item?.name}
          />
          <StringValue
            field={'slogan'}
            label="Slogan"
            rejected={storeSloganRejected}
            subgroup={'store'}
            toggleField={toggleField}
            value={item?.slogan}
          />
          <StringValue
            field={'str'}
            label="RUC"
            rejected={storeStrRejected}
            subgroup={'store'}
            toggleField={toggleField}
            value={item?.str}
          />
          <StringValue
            field={'description'}
            label="Descripción"
            rejected={storeDescriptionRejected}
            subgroup={'store'}
            toggleField={toggleField}
            value={item?.description}
          />
          {item?.logo?.path && (
            <ImageValue
              field={'logo'}
              label="Logo"
              rejected={storeLogoRejected}
              subgroup={'store'}
              toggleField={toggleField}
              value={item?.logo?.path ?? ''}
            />
          )}
          {(item?.socialMedia?.instagram ||
            item?.socialMedia?.whatsapp ||
            item?.socialMedia?.facebook ||
            item?.socialMedia?.tiktok) && (
            <Text fontWeight={'800'} opacity={0.5}>
              {'Redes sociales'}
            </Text>
          )}
          {item?.socialMedia?.instagram && (
            <LinkValue
              field={'instagram'}
              label="Instagram"
              rejected={instagramRejected}
              subgroup={'socialMedia'}
              toggleField={toggleField}
              value={item?.socialMedia?.instagram ?? ''}
            />
          )}
          {item?.socialMedia?.whatsapp && (
            <StringValue
              field={'whatsapp'}
              label="WhatsApp"
              rejected={whatsappRejected}
              subgroup={'socialMedia'}
              toggleField={toggleField}
              value={item?.socialMedia?.whatsapp ?? ''}
            />
          )}
          {item?.socialMedia?.facebook && (
            <LinkValue
              field={'facebook'}
              label="Facebook"
              rejected={facebookRejected}
              subgroup={'socialMedia'}
              toggleField={toggleField}
              value={item?.socialMedia?.facebook ?? ''}
            />
          )}
          {item?.socialMedia?.tiktok && (
            <LinkValue
              field={'tiktok'}
              label="Tik Tok"
              rejected={tiktokRejected}
              subgroup={'socialMedia'}
              toggleField={toggleField}
              value={item?.socialMedia?.tiktok ?? ''}
            />
          )}
          <Text fontWeight={'800'} opacity={0.5}>
            {'Información del propietario'}
          </Text>
          <StringValue
            field={'fullName'}
            label="Nombre completo"
            rejected={ownerNameRejected}
            subgroup={'owner'}
            toggleField={toggleField}
            value={item?.owner.fullName ?? ''}
          />
          <StringValue
            field={'email'}
            label="Correo electrónico"
            rejected={ownerEmailRejected}
            subgroup={'owner'}
            toggleField={toggleField}
            value={item?.owner.email ?? ''}
          />
          <StringValue
            field={'identification'}
            label="Cédula"
            rejected={ownerIdentificationRejected}
            subgroup={'owner'}
            toggleField={toggleField}
            value={item?.owner.identification ?? ''}
          />
          <ImageValue
            field={'identificationPhoto'}
            label="Foto con cédula"
            rejected={ownerIdentificationPhotoRejected}
            subgroup={'owner'}
            toggleField={toggleField}
            value={item?.owner?.photo?.path ?? ''}
          />
          <Text fontWeight={'800'} opacity={0.5}>
            {'Sucursales'}
          </Text>
          {item?.branches.map(branch => (
            <BranchValue
              key={branch.id.toString() + '_Branch'}
              branch={branch}
              rejected={Boolean(isBranchRejected(branch.id))}
              toggleField={toggleField}
            />
          ))}
          <FormControl isInvalid={false}>
            <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
              {'Nota de rechazo'}
            </FormControl.Label>
            <TextArea
              {...SECONDARY_INPUT_STYLES_PROPS}
              value={nonAcceptedFields?.note}
              onChangeText={value => {
                updateNote(value)
              }}
              isDisabled={loading}
              // ref={refs.storeDescriptionRef}
              // onSubmitEditing={selectLogoFile}
              autoCompleteType={''}
            />
          </FormControl>
          <Button my={6} isLoading={loading} onPress={handleSubmit}>
            {storeRejected ? 'Rechazar' : 'Aprobar'}
          </Button>
        </VStack>
      </ScrollView>
    </Fragment>
  )
}

interface FieldProps {
  label: string
  field: any
  subgroup: any
  rejected: boolean
  value?: string
  hideButton?: boolean
  toggleField: (key: keyof NonAcceptedFields, value: string) => void
}

const StringValue = ({
  field,
  label,
  subgroup,
  rejected,
  value,
  toggleField,
  hideButton,
}: FieldProps) => {
  return (
    <VStack space={4}>
      <Alert w="100%" status={rejected ? 'error' : 'success'}>
        <HStack alignItems={'center'} flexGrow={1} w="full" space={3} pr={16}>
          <Alert.Icon size={7} />
          <VStack>
            <Text fontWeight={'800'}>{label}</Text>
            <Text>{value}</Text>
          </VStack>
        </HStack>
      </Alert>
      {!hideButton && (
        <Button
          height={42}
          borderRadius={8}
          colorScheme={rejected ? 'success' : 'tertiary'}
          onPress={() => toggleField(subgroup, field)}>
          {rejected ? 'Aceptar' : 'Rechazar'}
        </Button>
      )}
    </VStack>
  )
}

const ImageValue = ({
  field,
  label,
  subgroup,
  rejected,
  value,
  toggleField,
}: FieldProps) => {
  const { width } = useWindowDimensions()

  return (
    <VStack space={4}>
      <Alert w="100%" status={rejected ? 'error' : 'success'}>
        <HStack alignItems={'center'} flexGrow={1} w="full" space={3} pr={16}>
          <Alert.Icon size={7} />
          <VStack>
            <Text fontWeight={'800'}>{label}</Text>
          </VStack>
        </HStack>
      </Alert>
      <Image
        source={{ uri: value }}
        style={{ width: width * 0.85, height: width * 0.85 }}
      />
      <Button
        height={42}
        borderRadius={8}
        colorScheme={rejected ? 'success' : 'tertiary'}
        onPress={() => toggleField(subgroup, field)}>
        {rejected ? 'Aceptar' : 'Rechazar'}
      </Button>
    </VStack>
  )
}

const LinkValue = ({
  field,
  label,
  subgroup,
  rejected,
  value,
  toggleField,
}: FieldProps) => {
  return (
    <VStack space={4}>
      <Pressable onPress={() => Linking.openURL(value ?? '')}>
        <Alert w="100%" status={rejected ? 'error' : 'success'}>
          <HStack alignItems={'center'} flexGrow={1} w="full" space={3} pr={16}>
            <Alert.Icon size={7} />
            <VStack>
              <Text fontWeight={'800'}>{label}</Text>
              <Text textDecorationLine={'underline'}>{value}</Text>
            </VStack>
          </HStack>
        </Alert>
      </Pressable>
      <Button
        height={42}
        borderRadius={8}
        colorScheme={rejected ? 'success' : 'tertiary'}
        onPress={() => toggleField(subgroup, field)}>
        {rejected ? 'Aceptar' : 'Rechazar'}
      </Button>
    </VStack>
  )
}

interface BranchProps {
  branch: Branch
  rejected: boolean
  toggleField: (key: keyof NonAcceptedFields, value: string) => void
}

const BranchValue = ({ branch, rejected, toggleField }: BranchProps) => {
  const { navigateToCatalogue } = useNavigationActions()
  const handleLocation = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    })
    const latLng = `${branch.lat},${branch.long}`
    const label = 'Custom Label'
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    })
    Linking.openURL(url ?? '')
  }
  return (
    <VStack space={4}>
      <Divider />
      <StringValue
        field={'name'}
        label="Nombre"
        rejected={rejected}
        subgroup={branch.id.toString()}
        toggleField={toggleField}
        value={branch.name ?? ''}
        hideButton
      />
      {branch.lat && branch.long && (
        <Pressable onPress={handleLocation}>
          <Alert w="100%" status={rejected ? 'error' : 'success'}>
            <HStack
              alignItems={'center'}
              flexGrow={1}
              w="full"
              space={3}
              pr={16}>
              <Alert.Icon size={7} />
              <VStack>
                <Text fontWeight={'800'}>{'Ver ubicación'}</Text>
              </VStack>
            </HStack>
          </Alert>
        </Pressable>
      )}
      {Boolean(branch.catalogue) && (
        <Button
          onPress={() =>
            navigateToCatalogue({ catalogue: branch.catalogue?.path })
          }
          leftIcon={
            <Icon
              size={5}
              name="storefront-outline"
              as={MaterialCommunityIcons}
            />
          }
          colorScheme={'secondary'}>
          {'Ver productos'}
        </Button>
      )}
      <Divider />
      <Button
        height={42}
        borderRadius={8}
        colorScheme={rejected ? 'success' : 'tertiary'}
        onPress={() => toggleField('branches', branch.id.toString())}>
        {rejected ? 'Aceptar' : 'Rechazar'}
      </Button>
    </VStack>
  )
}
