import React, { useMemo } from 'react'
import { Store, StoreBranch } from '../types/store'
import {
  Pressable,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  Image as NBImage,
  Button,
} from 'native-base'
import { TEXT_COLORS } from 'shared/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image, Linking } from 'react-native'
import { IMAGES } from 'shared/images/constants/image'
import { useFavorites } from '../hooks/favorite'
import { useNavigationActions } from 'shared/navigation'

type Props = {
  item: StoreBranch
  onClose?: () => void
}

export const StoreBranchInfo = (props: Props) => {
  const { item, onClose } = props
  const { branch, store } = item
  const { navigateToCatalogue } = useNavigationActions()
  const { addToFavorites, removeFromFavorites, favorites, loading } =
    useFavorites()
  const favorite = useMemo(() => {
    return favorites.find(f => f.branchId === branch.id)
  }, [favorites, branch])
  const isOnFavorites = Boolean(favorite)
  const handleFavorite = () => {
    if (isOnFavorites) {
      if (favorite) removeFromFavorites(favorite)
    } else {
      addToFavorites(branch, store as Store)
    }
  }
  const hasPaymentMethods = useMemo(() => {
    return (
      Boolean(branch.bankTransferAsPaymentMethod) ||
      Boolean(branch.creditCardAsPaymentMethod) ||
      Boolean(branch.debitCardAsPaymentMethod)
    )
  }, [branch])
  const hasSocialMedia = useMemo(() => {
    return (
      Boolean(store.socialMedia.facebook) ||
      Boolean(store.socialMedia.instagram) ||
      Boolean(store.socialMedia.tiktok) ||
      Boolean(store.socialMedia.whatsapp)
    )
  }, [branch])
  const handleLink = async (url: string | null) => {
    if (url === null) return
    await Linking.openURL(url)
  }

  return (
    <VStack space={6}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack space={4} alignItems={'center'}>
          <Image
            source={{
              uri:
                store.logo?.path ??
                'https://pixsector.com/cache/a35c7d7b/avd437689ef3a02914ac1.png',
            }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
          <VStack>
            <HStack space={1}>
              <Text fontSize={'md'} fontWeight={'700'}>{`${store.name}`}</Text>
              <Text
                fontSize={'md'}
                fontWeight={'700'}>{`(${branch.name})`}</Text>
            </HStack>
            <Text
              maxW={200}
              textTransform={'capitalize'}
              fontSize={'sm'}
              fontWeight={'300'}>{`${store.slogan}`}</Text>
          </VStack>
        </HStack>
        {onClose && (
          <IconButton
            size="md"
            onPress={onClose}
            icon={
              <Icon
                color={TEXT_COLORS.primary}
                size={28}
                as={MaterialCommunityIcons}
                name="chevron-down"
              />
            }
          />
        )}
      </HStack>
      <Text textAlign={'justify'} fontSize={15} opacity={0.7}>
        {store.description}
      </Text>
      {hasPaymentMethods && (
        <VStack space={3}>
          <Text fontWeight={'700'}>{'Métodos de pago aceptados:'}</Text>
          <HStack flexWrap={'wrap'} pt={4}>
            {Boolean(branch.bankTransferAsPaymentMethod) && (
              <VStack
                flex={1}
                justifyContent={'center'}
                alignItems={'center'}
                space={3}>
                <VStack
                  p={3}
                  borderRadius={'full'}
                  bgColor={'primary.500'}
                  width={60}
                  height={60}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Icon
                    color={'primary.200'}
                    size={8}
                    as={MaterialCommunityIcons}
                    name="cash"
                  />
                </VStack>
                <Text>{'Transferencia'}</Text>
              </VStack>
            )}
            {Boolean(branch.creditCardAsPaymentMethod) && (
              <VStack
                flex={1}
                justifyContent={'center'}
                alignItems={'center'}
                space={3}>
                <VStack
                  p={3}
                  borderRadius={'full'}
                  bgColor={'secondary.500'}
                  width={60}
                  height={60}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Icon
                    color={'secondary.200'}
                    size={8}
                    as={MaterialCommunityIcons}
                    name="credit-card"
                  />
                </VStack>
                <Text>{'Crédito'}</Text>
              </VStack>
            )}
            {Boolean(branch.debitCardAsPaymentMethod) && (
              <VStack
                flex={1}
                justifyContent={'center'}
                alignItems={'center'}
                space={3}>
                <VStack
                  p={3}
                  borderRadius={'full'}
                  bgColor={'tertiary.500'}
                  width={60}
                  height={60}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Icon
                    color={'tertiary.200'}
                    size={8}
                    as={MaterialCommunityIcons}
                    name="card-outline"
                  />
                </VStack>
                <Text>{'Débito'}</Text>
              </VStack>
            )}
          </HStack>
        </VStack>
      )}
      {hasSocialMedia && (
        <VStack space={3} pt={2}>
          <Text fontWeight={'700'}>{'Redes sociales:'}</Text>
          <VStack pt={4} space={3}>
            {store.socialMedia.instagram && (
              <Pressable
                borderRadius={14}
                onPress={() => handleLink(store.socialMedia.instagram)}>
                <HStack
                  px={4}
                  py={3}
                  pr={1}
                  backgroundColor={'tertiary.50'}
                  borderRadius={14}
                  alignItems={'center'}>
                  <Icon
                    mr={4}
                    size={8}
                    color={'tertiary.500'}
                    name="instagram"
                    as={MaterialCommunityIcons}
                  />
                  <VStack flexGrow={1}>
                    <Text color="tertiary.900">{'Instagram'}</Text>
                  </VStack>
                  <Icon
                    mr={4}
                    size={8}
                    color={'tertiary.500'}
                    name="chevron-right"
                    as={MaterialCommunityIcons}
                  />
                </HStack>
              </Pressable>
            )}
            {store.socialMedia.whatsapp && (
              <Pressable
                borderRadius={14}
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?phone=${
                      store.socialMedia.whatsapp
                    }&text=${'He visitado su tienda desde Tente App y quisiera mas información sobre sus productos!'}`,
                  )
                }>
                <HStack
                  px={4}
                  py={3}
                  pr={1}
                  backgroundColor={'primary.50'}
                  borderRadius={14}
                  alignItems={'center'}>
                  <Icon
                    mr={4}
                    size={8}
                    color={'primary.500'}
                    name="whatsapp"
                    as={MaterialCommunityIcons}
                  />
                  <VStack flexGrow={1}>
                    <Text color="primary.900">{'WhatsApp'}</Text>
                  </VStack>
                  <Icon
                    mr={4}
                    size={8}
                    color={'primary.500'}
                    name="chevron-right"
                    as={MaterialCommunityIcons}
                  />
                </HStack>
              </Pressable>
            )}
            {store.socialMedia.facebook && (
              <Pressable
                borderRadius={14}
                onPress={() => handleLink(store.socialMedia.facebook)}>
                <HStack
                  px={4}
                  py={3}
                  pr={1}
                  backgroundColor={'info.100'}
                  borderRadius={14}
                  alignItems={'center'}>
                  <Icon
                    mr={4}
                    size={8}
                    color={'secondary.500'}
                    name="facebook"
                    as={MaterialCommunityIcons}
                  />
                  <VStack flexGrow={1}>
                    <Text color="secondary.900">{'Facebook/Messenger'}</Text>
                  </VStack>
                  <Icon
                    mr={4}
                    size={8}
                    color={'secondary.500'}
                    name="chevron-right"
                    as={MaterialCommunityIcons}
                  />
                </HStack>
              </Pressable>
            )}
            {store.socialMedia.tiktok && (
              <Pressable
                borderRadius={14}
                onPress={() => handleLink(store.socialMedia.tiktok)}>
                <HStack
                  px={4}
                  py={3}
                  pr={1}
                  backgroundColor={'gray.100'}
                  borderRadius={14}
                  alignItems={'center'}>
                  <NBImage
                    mr={4}
                    size={8}
                    opacity={0.5}
                    alt="tik tok logo"
                    source={IMAGES.tik_tok_logo}
                  />
                  <VStack flexGrow={1}>
                    <Text color="gray.900">{'Tik Tok'}</Text>
                  </VStack>
                  <Icon
                    mr={4}
                    size={8}
                    color={'gray.500'}
                    name="chevron-right"
                    as={MaterialCommunityIcons}
                  />
                </HStack>
              </Pressable>
            )}
          </VStack>
        </VStack>
      )}
      {Boolean(branch.homeDelivery) && (
        <HStack alignItems={'center'} mt={2}>
          <Icon
            mr={2}
            size={7}
            color={TEXT_COLORS.primary}
            name="truck-delivery-outline"
            as={MaterialCommunityIcons}
          />
          <Text fontWeight={'700'}>{'Realiza envios a domicilio'}</Text>
        </HStack>
      )}
      <VStack space={2} mt={6} mb={10}>
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
        <Button
          isLoading={loading}
          onPress={handleFavorite}
          leftIcon={
            <Icon
              size={5}
              name="cards-heart-outline"
              as={MaterialCommunityIcons}
            />
          }
          variant={isOnFavorites ? 'solid' : 'outline'}>
          {isOnFavorites ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        </Button>
      </VStack>
    </VStack>
  )
}
