import { Button, ScrollView, Stack, View } from 'native-base'
import React, { Fragment, useCallback, useRef } from 'react'
import { BranchesInfoForm } from '../components/branches-info-form'
import { BottomSheetScrollView, BottomSheetModal } from '@gorhom/bottom-sheet'
import { ModalSheetBackdrop } from 'shared/components'
import { useRegistrationProcess } from '../hooks/registration'
import { BranchList } from '../components/branch-list'

export const BranchesInfo = () => {
  const sheetRef = useRef<BottomSheetModal>(null)
  const { branches, submitRequest, loading } = useRegistrationProcess()

  const noBranches = branches.length === 0

  return (
    <Fragment>
      <View flex={1}>
        <ScrollView
          disableScrollViewPanResponder
          px="7.5%"
          _contentContainerStyle={{ py: 18, flexGrow: 1 }}>
          {noBranches && <BranchesInfoForm />}
          <BranchList />
          {!noBranches && (
            <Button
              disabled={loading}
              variant={'outline'}
              mb={4}
              onPress={() => sheetRef.current?.present()}>
              {'Registrar nueva sucursal'}
            </Button>
          )}
        </ScrollView>
        {!noBranches && (
          <View px="7.5%" pb={4}>
            <Button
              isLoading={loading}
              disabled={noBranches}
              colorScheme={'tertiary'}
              onPress={submitRequest}>
              {'Enviar solicitud'}
            </Button>
          </View>
        )}
      </View>
      <BottomSheetModal
        backdropComponent={ModalSheetBackdrop}
        ref={sheetRef}
        index={0}
        snapPoints={['50%', '80%']}>
        <BottomSheetScrollView disableScrollViewPanResponder>
          <Stack space={2} mt={1} px="7.5%" pb={26}>
            <BranchesInfoForm onCreate={() => sheetRef.current?.close()} />
          </Stack>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </Fragment>
  )
}
