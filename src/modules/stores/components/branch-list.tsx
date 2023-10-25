import {
  Badge,
  Button,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Stack,
  Text,
} from 'native-base'
import React, { Fragment, useRef } from 'react'
import { useRegistrationProcess } from '../hooks/registration'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TEXT_COLORS } from 'shared/styles'
import { BranchPayload } from '../types/store'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ModalSheetBackdrop } from 'shared/components'
import { BranchesInfoForm } from './branches-info-form'
import { useDispatch } from 'react-redux'
import { deleteBranch, updateBranch } from '../slice/store'
import { useShowToast } from 'shared/feedback'

export const BranchList = () => {
  const { branches } = useRegistrationProcess()
  return (
    <Stack mt={2} mb={8} space={5}>
      {branches.map((branch, index) => {
        return (
          <BranchItem key={branch.name + index} branch={branch} index={index} />
        )
      })}
    </Stack>
  )
}

interface BranchProps {
  branch: BranchPayload
  index: number
}

const BranchItem = ({ branch, index }: BranchProps) => {
  const optionsSheetRef = useRef<BottomSheetModal>(null)
  const formSheetRef = useRef<BottomSheetModal>(null)
  const { showToast } = useShowToast()
  const dispatch = useDispatch()
  const location = branch.lat !== undefined && branch.long !== undefined
  const openForm = () => {
    optionsSheetRef.current?.forceClose()
    setTimeout(() => {
      formSheetRef.current?.present()
    }, 500)
  }
  const handleEdit = (payload: BranchPayload) => {
    dispatch(updateBranch({ branch: payload, index }))
    optionsSheetRef.current?.close()
    formSheetRef.current?.forceClose()
    showToast('success', 'Actualizada!', payload.name)
  }
  const handleDelete = () => {
    optionsSheetRef.current?.close()
    dispatch(deleteBranch(index))
    showToast('success', 'Eliminada!', branch.name)
  }

  return (
    <Fragment>
      <Pressable
        borderRadius={'xl'}
        p={4}
        pt={2.5}
        borderWidth={1}
        borderColor={`${TEXT_COLORS.primary}50`}>
        <Stack space={2}>
          <HStack
            alignItems={'center'}
            space={2}
            justifyContent={'space-between'}>
            <HStack alignItems={'center'} space={2} flexGrow={1}>
              <Icon
                size={7}
                color={TEXT_COLORS.primary}
                name={'store'}
                as={MaterialIcons}
              />
              <Text fontWeight={'700'}>{branch.name}</Text>
            </HStack>
            <IconButton
              onPress={() => {
                optionsSheetRef.current?.present()
              }}
              icon={<Icon as={MaterialIcons} name="more-horiz" />}
              borderRadius="full"
              _icon={{
                color: TEXT_COLORS.primary,
                size: 'md',
              }}
            />
          </HStack>
          <HStack mt={1}>
            <Badge
              colorScheme={branch.homeDelivery ? 'success' : 'info'}
              variant={'subtle'}
              alignSelf="center"
              borderRadius={'xl'}>
              {branch.homeDelivery
                ? 'Envio a domicilio'
                : 'Sin envio a domicilio'}
            </Badge>
          </HStack>
          <HStack flexWrap={'wrap'} space={1}>
            {branch.bankTransferAsPaymentMethod && (
              <Badge
                colorScheme={'primary'}
                variant={'subtle'}
                alignSelf="center"
                borderRadius={'xl'}>
                {'Transferencia'}
              </Badge>
            )}
            {branch.creditCardAsPaymentMethod && (
              <Badge
                colorScheme={'warning'}
                variant={'subtle'}
                alignSelf="center"
                borderRadius={'xl'}>
                {'Crédito'}
              </Badge>
            )}
            {branch.debitCardAsPaymentMethod && (
              <Badge
                colorScheme={'tertiary'}
                variant={'subtle'}
                alignSelf="center"
                borderRadius={'xl'}>
                {'Débito'}
              </Badge>
            )}
          </HStack>
          <HStack pb={1.5} pt={3} alignItems={'center'} space={2} opacity={0.5}>
            <Icon
              size={4}
              color={TEXT_COLORS.primary}
              name={location ? 'location-on' : 'wrong-location'}
              as={MaterialIcons}
            />
            <Text fontSize={12}>
              {location ? 'Presenta local físico' : 'Sin local físico'}
            </Text>
          </HStack>
        </Stack>
      </Pressable>
      <BottomSheetModal
        backdropComponent={ModalSheetBackdrop}
        ref={optionsSheetRef}
        index={0}
        snapPoints={index > 0 ? [210] : [135]}>
        <Stack space={2} px="7.5%" pt={4}>
          <Button colorScheme={'secondary'} onPress={openForm}>
            {'Editar'}
          </Button>
          {index > 0 && (
            <Button onPress={handleDelete} colorScheme={'tertiary'}>
              {'Eliminar'}
            </Button>
          )}
        </Stack>
      </BottomSheetModal>
      <BottomSheetModal
        backdropComponent={ModalSheetBackdrop}
        ref={formSheetRef}
        index={0}
        snapPoints={['50%', '80%']}>
        <BottomSheetScrollView disableScrollViewPanResponder>
          <Stack space={2} mt={1} px="7.5%" pb={26}>
            <BranchesInfoForm
              initialPayload={branch}
              onEdit={payload => handleEdit(payload)}
              edit
            />
          </Stack>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </Fragment>
  )
}
