import React from 'react';
import { StyleSheet, View, KeyboardTypeOptions } from 'react-native';
import { TextInput } from 'react-native-paper';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon1?: string;
  icon2?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  onPress?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  icon1,
  icon2,
  secureTextEntry = false,
  error = false,
  keyboardType = 'default',
  onPress,
}) => {
  return (
    <View>
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        outlineColor="#E0E0E0"
        activeOutlineColor="#C4c0c0"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        error={!!error}
        keyboardType={keyboardType}
        style={styles.textInput}
        underlineColor="white"
        textColor="black"
        theme={{ roundness: 10, colors: { primary: '#C4c0c0' } }}
        right={
          icon1 ? (
            <TextInput.Icon
              size={19}
              icon={icon1}
              color="#333333"
              onPress={onPress}
            />
          ) : null
        }
        left={
          icon2 ? (
            <TextInput.Icon
              size={19}
              icon={icon2}
              color={error ? '#bc3433' : '#333333'}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    fontSize: 15,
    backgroundColor: 'white',
    marginBottom: 16,
    borderColor: '#C4c0c0',
  },
});

export default CustomInput;
