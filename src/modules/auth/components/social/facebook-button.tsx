import {HStack, Button, Image, Text} from 'native-base';
import React from 'react';
import {ICONS} from 'shared/images/constants/icon';
import {ALTERNATIVE_COLORS, TEXT_COLORS} from 'shared/styles';

type Props = {};

export const FacebookButton = (props: Props) => {
  return (
    <Button
      flexGrow={1}
      flex={0.5}
      variant={'outline'}
      colorScheme={'secondary'}
      borderColor={ALTERNATIVE_COLORS.secondaryLight}
      onPress={() => {}}>
      <HStack alignItems={'center'} space={2}>
        <Image
          alt="google icon"
          source={ICONS.facebook}
          style={{width: 30, height: 30}}
        />
        <Text color={TEXT_COLORS.secondary} style={{marginRight: 15}}>
          {'Facebook'}
        </Text>
      </HStack>
    </Button>
  );
};
