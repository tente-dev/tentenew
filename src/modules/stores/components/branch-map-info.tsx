import React, {
  Fragment,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { StoreBranch } from '../types/store'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { StoreBranchInfo } from './store-info'

type Props = {}

export interface BranchMapInfoRef {
  showInfo: (store: StoreBranch) => void
}

export const BranchMapInfo = forwardRef<BranchMapInfoRef, Props>(
  (props, ref) => {
    const [item, setItem] = useState<StoreBranch>()
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['1%', '20%', '80%'], [])
    useImperativeHandle(ref, () => ({
      showInfo: s => {
        setItem(s)
      },
    }))
    return (
      <Fragment>
        {item && (
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={index => {
              if (index === 0) setItem(undefined)
            }}>
            <BottomSheetScrollView
              contentContainerStyle={{
                paddingLeft: '5%',
                paddingRight: '5%',
                paddingTop: 15,
                paddingBottom: 5,
              }}>
              <StoreBranchInfo item={item} onClose={() => setItem(undefined)} />
            </BottomSheetScrollView>
          </BottomSheet>
        )}
      </Fragment>
    )
  },
)
