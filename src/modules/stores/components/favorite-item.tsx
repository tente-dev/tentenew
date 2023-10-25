import React, { Fragment } from 'react'
import { Favorite } from '../types/favorite'
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Modal,
  Text,
  VStack,
  useDisclose,
  Pressable,
} from 'native-base'
import { Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFavorites } from '../hooks/favorite'
import { NavigationProp, useNavigation } from '@react-navigation/native'

type Props = {
  favorite: Favorite
  onNavigate: (storeId: number, branchId: number) => void
}

export const FavoriteItem = (props: Props) => {
  const { favorite, onNavigate } = props
  const { branch } = favorite
  const { store } = branch
  const { isOpen, onOpen, onClose } = useDisclose()
  const { removeFromFavorites, loading } = useFavorites()
  const handleDelete = async () => {
    await removeFromFavorites(favorite)
    onClose()
  }
  return (
    <Fragment>
      <Pressable onPress={() => onNavigate(store.id, branch.id)}>
        <HStack alignItems={'center'} justifyContent={'space-between'} py={3}>
          <HStack alignItems={'center'} space={4}>
            <Image
              source={{
                uri:
                  store.logo?.path ??
                  'https://pixsector.com/cache/a35c7d7b/avd437689ef3a02914ac1.png',
              }}
              style={{ width: 50, height: 50, borderRadius: 10 }}
            />
            <VStack>
              <Text fontWeight={'700'} fontSize={16}>{`${store.name}`}</Text>
              <Text fontWeight={'600'} opacity={0.6}>{`${branch.name}`}</Text>
            </VStack>
          </HStack>
          <IconButton
            onPress={onOpen}
            shadow={4}
            variant={'solid'}
            icon={<Icon size={26} as={MaterialCommunityIcons} name="delete" />}
          />
        </HStack>
      </Pressable>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <Modal.Body>
            <Text
              fontWeight={'800'}
              textAlign={'center'}
              fontSize={20}
              pb={4}
              pt={1}>
              {'¿Estas seguro de eliminar este favorito?'}
            </Text>
            <VStack space={0.5} mt={2}>
              <Button
                onPress={handleDelete}
                colorScheme={'tertiary'}
                isLoading={loading}>
                {'Eliminar'}
              </Button>
              <Button
                disabled={loading}
                colorScheme={'tertiary'}
                variant={'ghost'}
                onPress={onClose}>
                {'Cancelar'}
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Fragment>
  )
}
