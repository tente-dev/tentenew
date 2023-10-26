import {
  Button,
  Checkbox,
  FormControl,
  Icon,
  Input,
  Pressable,
  Stack,
  Text,
  View,
} from 'native-base'
import React from 'react'
import {
  COLORS,
  PRIMARY_LABEL_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
  TEXT_COLORS,
} from 'shared/styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'
import { useRegistrationProcess } from '../hooks/registration'
import { useRegisterBranch } from '../hooks/register-branch'
import { useNavigationActions } from 'shared/navigation'
import { BranchPayload } from '../types/store'

type Props = {
  initialPayload?: BranchPayload
  edit?: boolean
  onEdit?: (payload: BranchPayload) => void
  onCreate?: () => void
}

export const BranchesInfoForm = (props: Props) => {
  const { edit, initialPayload, onEdit, onCreate } = props
  const theme = useTheme()
  const { branches } = useRegistrationProcess()
  const noBranches = branches.length === 0
  const {
    payload,
    refs,
    changeValue,
    resetLocation,
    errors,
    submit,
    selectProductCatalogue,
  } = useRegisterBranch(initialPayload)
  const { navigateToSelectLocation } = useNavigationActions()
  const locationSelected =
    payload.lat !== undefined && payload.long !== undefined
  const handleSubmit = () => {
    if (edit && onEdit) {
      onEdit(payload)
    } else {
      submit()
      if (onCreate) {
        onCreate()
      }
    }
  }
  return (
    <View>
      <Text fontWeight={'700'} pl={0} pb={3}>
        {edit
          ? 'Editar información'
          : noBranches
          ? 'Sucursal principal'
          : `Sucursal # ${branches.length}`}
      </Text>
      <FormControl isRequired isInvalid={errors.name} mt={1} mb={1}>
        <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS} pl={0}>
          {'Nombre/Identificador'}
        </FormControl.Label>
        <Input
          {...SECONDARY_INPUT_STYLES_PROPS}
          value={payload.name}
          onChangeText={value => changeValue('name', value)}
          ref={refs.branchNameRef}
          returnKeyType="next"
          mt={1}
        />
        <FormControl.ErrorMessage pl={2}>
          {'Campo requerido.'}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS} pl={0} mt={8} mb={4}>
        {'Formas de pago que acepta'}
      </FormControl.Label>
      <Checkbox
        isChecked={payload.bankTransferAsPaymentMethod}
        onChange={selected =>
          changeValue('bankTransferAsPaymentMethod', selected)
        }
        ml={1}
        value="t"
        size={'sm'}
        colorScheme={'secondary'}
        my={2}>
        <Text
          {...PRIMARY_LABEL_STYLES_PROPS}
          ml={0}
          mb={0}
          fontWeight={'600'}
          opacity={0.75}>
          {'Transferencia'}
        </Text>
      </Checkbox>
      <Checkbox
        isChecked={payload.creditCardAsPaymentMethod}
        onChange={selected =>
          changeValue('creditCardAsPaymentMethod', selected)
        }
        ml={1}
        value="tc"
        size={'sm'}
        colorScheme={'secondary'}
        my={2}>
        <Text
          {...PRIMARY_LABEL_STYLES_PROPS}
          ml={0}
          mb={0}
          fontWeight={'600'}
          opacity={0.75}>
          {'Tarjeta de Crédito'}
        </Text>
      </Checkbox>
      <Checkbox
        isChecked={payload.debitCardAsPaymentMethod}
        onChange={selected => changeValue('debitCardAsPaymentMethod', selected)}
        ml={1}
        value="td"
        size={'sm'}
        colorScheme={'secondary'}
        my={2}>
        <Text
          {...PRIMARY_LABEL_STYLES_PROPS}
          ml={0}
          mb={0}
          fontWeight={'600'}
          opacity={0.75}>
          {'Tarjeta de Débito'}
        </Text>
      </Checkbox>
      <Pressable
        mt={10}
        flexDirection={'row'}
        alignItems={'center'}
        mb={locationSelected ? 3 : 12}
        onPress={() =>
          navigateToSelectLocation({
            type: 'branch',
            title: 'Ubicación de sucursal',
            initialCoordinates: locationSelected
              ? { latitude: payload.lat, longitude: payload.long }
              : undefined,
          })
        }>
        <View
          bgColor={locationSelected ? 'success.500' : COLORS.primary[500]}
          width={44}
          height={44}
          borderRadius={6}
          justifyContent={'center'}
          alignItems={'center'}>
          <Icon
            size={7}
            color={theme.colors.background}
            name={locationSelected ? 'my-location' : 'location-on'}
            as={MaterialIcons}
          />
        </View>
        <Stack pl={4}>
          <Text fontWeight={'600'}>
            {locationSelected
              ? 'Ubicación selecionada'
              : 'Selecciona la ubicación'}
          </Text>
          <Text color={TEXT_COLORS.secondary} fontSize={11} opacity={0.7}>
            {locationSelected
              ? 'Actualizar ubicación'
              : 'Deja en blanco si no presenta local físico'}
          </Text>
        </Stack>
      </Pressable>
      <Pressable
        flexDirection={'row'}
        alignItems={'center'}
        mb={locationSelected ? 3 : 12}
        onPress={() =>
          navigateToSelectLocation({
            type: 'branch',
            title: 'Ubicación de sucursal',
            initialCoordinates: locationSelected
              ? { latitude: payload.lat, longitude: payload.long }
              : undefined,
          })
        }>
        <View
          bgColor={locationSelected ? 'success.500' : COLORS.primary[500]}
          width={44}
          height={44}
          borderRadius={6}
          justifyContent={'center'}
          alignItems={'center'}>
          <Icon
            size={7}
            color={theme.colors.background}
            name={locationSelected ? 'my-location' : 'location-on'}
            as={MaterialIcons}
          />
        </View>
        <Stack pl={4}>
          <Text fontWeight={'600'}>
            {locationSelected
              ? 'Ubicación selecionada'
              : 'Selecciona la ubicación de tu sucursal'}
          </Text>
          <Text color={TEXT_COLORS.secondary} fontSize={11} opacity={0.7}>
            {locationSelected
              ? 'Actualizar ubicación'
              : 'Deja en blanco si no presenta local físico'}
          </Text>
        </Stack>
        
      </Pressable>
      {locationSelected && (
        <Button
          _pressed={{ bgColor: 'transparent' }}
          onPress={resetLocation}
          size={'sm'}
          colorScheme={'error'}
          variant={'ghost'}
          height={42}
          mb={6}
          endIcon={<Icon size={4} name={'delete'} as={MaterialIcons} />}>
          {'Borrar ubicación'}
        </Button>
      )}
      <Checkbox
        ml={1}
        value="delivery"
        size={'sm'}
        colorScheme={'secondary'}
        isChecked={payload.homeDelivery}
        onChange={selected => changeValue('homeDelivery', selected)}>
        <Text
          {...PRIMARY_LABEL_STYLES_PROPS}
          ml={0}
          mb={0}
          fontWeight={'600'}
          opacity={0.75}>
          {'Envio a domicilio'}
        </Text>
      </Checkbox>
      <Button
        onPress={selectProductCatalogue}
        mt={10}
        colorScheme={'tertiary'}
        variant={'subtle'}
        endIcon={
          payload.productsCatalogue ? (
            <Icon
              as={MaterialIcons}
              name="check-circle"
              colorScheme={'success'}
              size={22}
            />
          ) : undefined
        }>
        {payload.productsCatalogue
          ? 'Catalogo selecionado'
          : 'Subir catálogo de productos'}
      </Button>
      <Text fontSize={'xs'} mt={1} textAlign={'center'}>
        {'El catalogo debe estar en formato .pdf'}
      </Text>
      {payload.productsCatalogue && (
        <Button
          onPress={() => changeValue('productsCatalogue', undefined)}
          _pressed={{ bgColor: 'transparent' }}
          size={'sm'}
          colorScheme={'error'}
          variant={'ghost'}
          height={42}
          endIcon={<Icon size={4} name={'delete'} as={MaterialIcons} />}>
          {'Borrar archivo'}
        </Button>
      )}
      <Button mt={16} onPress={handleSubmit}>
        {edit ? 'Editar' : 'Registrar'}
      </Button>
    </View>
  )
}
