import React, { useCallback, useEffect, useState } from "react";
import Dialog from 'react-native-dialog';

export const InputDialog = (
  {
    title,
    placeholder,
    visible,
    onFireEvent,
    onCancelEvent,
  } : {
    title: string,
    placeholder: string,
    visible: boolean,
    onFireEvent: (value: string) => void,
    onCancelEvent: () => void, 
  }
) => {
    const [inputStr, setInputStr] = useState<string>('');

    useEffect(() => {
      console.log('inputStr: ', inputStr);
    }, []);
    
    const onFireEventResponseHandler = useCallback(() => {
      onFireEvent(inputStr);
      console.log(inputStr);
    }, [inputStr]);

    return (
    <Dialog.Container visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Input 
          placeholder={placeholder} 
          value={inputStr} 
          onChangeText={(text: string) => setInputStr(text)} />
        <Dialog.Button label="Cancel" onPress={onCancelEvent} />
        <Dialog.Button label="Save" onPress={onFireEventResponseHandler}/>
      </Dialog.Container>
    )
}

export default { InputDialog };