import React from 'react';

import {Button, HStack, Image, Text} from 'native-base';
import {ICONS} from '@icons';
import {ALTERNATIVE_COLORS, TEXT_COLORS} from '@styles';
import Envs from 'react-native-config';
import {useShowToast} from '@feedback';
import {useApiServiceMutation} from '@api';
import {LoginResponse, saveToken} from '@auth';
import {useDispatch} from 'react-redux';
import {useNavigationActions} from '@navigation';

export const GoogleButton = () => {
  const {resetToMaps} = useNavigationActions();
  const {showToast} = useShowToast();
  const [apiService, {isLoading: loading}] = useApiServiceMutation();
  const dispatch = useDispatch();

  return (
    <Button
      flexGrow={1}
      flex={0.5}
      variant={'outline'}
      colorScheme={'secondary'}
      borderColor={ALTERNATIVE_COLORS.secondaryLight}
      onPress={() => {}}
      isLoading={loading}>
      <HStack alignItems={'center'} space={2}>
        <Image
          alt="google icon"
          source={ICONS.google}
          style={{width: 30, height: 30}}
        />
        <Text color={TEXT_COLORS.secondary} style={{marginRight: 15}}>
          {'Google'}
        </Text>
      </HStack>
    </Button>
  );
};
