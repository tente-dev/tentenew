import {View, HStack, VStack, Text} from 'native-base';
import React from 'react';
import {FacebookButton} from './facebook-button';
import {GoogleButton} from './google-button';
import {TEXT_COLORS} from 'shared/styles';

type Props = {};

export const SocialAuth = (props: Props) => {
  return (
    <VStack>
      <HStack space={4} opacity={0.5} alignItems={'center'}>
        <View
          flexGrow={1}
          style={{height: 0.5}}
          bgColor={TEXT_COLORS.secondary}
        />
        <Text fontSize={'xs'}>{'ó utiliza'}</Text>
        <View
          flexGrow={1}
          style={{height: 0.5}}
          bgColor={TEXT_COLORS.secondary}
        />
      </HStack>
      <HStack space={2} mt={8}>
        <GoogleButton />
        <FacebookButton />
      </HStack>
    </VStack>
  );
};
