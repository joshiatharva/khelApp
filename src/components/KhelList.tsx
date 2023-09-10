import React, { useCallback, useEffect, useState } from "react";
import { 
  Box, 
  VStack, 
  Badge, 
  BadgeText, 
  ButtonGroup, 
  ButtonIcon, 
  AddIcon, 
  ButtonText, 
  InfoIcon, 
  HStack,
  Button,
  Text,
} from "@gluestack-ui/themed";
import { KhelCategory, KhelProps } from "./KhelItem";
import { getColor, shareList } from "../utils/utils";

export type KhelListProps = Map<'name', string> & Map<'categories', Array<KhelCategory>> & Map<number, Array<KhelProps>>;

export const KhelList = (khelList: KhelListProps) => {

  const displayKhelList = () => {
    const listOfKhels = Array.from(khelList.keys()).filter(el => el !== 'name' && el !== 'categories');
  }

  const shareListCallback = useCallback(() => {
    const str = shareList(khelList);
    try {
      // const result = await Share.share({ message: str });
      return;
    } catch (error: any) {

    }
  }, []);

  return (
    <Box>
      <VStack>
        <Text bold>{khelList.get('name')}</Text>
        <HStack>
          {khelList.get('categories')!.map((category) => (
            <Badge bg={getColor(category)}>
              <BadgeText>{category}</BadgeText>
            </Badge>
          ))}
        </HStack>
        <VStack>
          {displayKhelList()}
        </VStack>
      </VStack>
      <ButtonGroup isAttached>
        <Button
          onPress={shareListCallback}
        >
          <ButtonIcon as={AddIcon} />
          <ButtonText>
            Add to List
          </ButtonText>
        </Button>

        <Button
          // onPress={moreInfoOnPress}
        >
          <ButtonIcon as={InfoIcon} />
          <ButtonText>
            More info
          </ButtonText>
        </Button>
      </ButtonGroup>
    </Box>
  )
}