import React from 'react';
import { Pressable, Text } from 'react-native';

import { colors, globalStyles } from '../../config/theme';

interface Props {
    label: string;
    color?: string;
    doubleSize?: boolean;
    blackText?: boolean;
    onPress: () => void;
}

export const CalculatorButton = ({
    label,
    color = colors.darkGray,
    doubleSize = false,
    blackText = false,
    onPress,
}: Props) => {
    return (
        <Pressable
            onPress={ () => onPress() }
            style={({ pressed }) => ({
                ...globalStyles.button,
                width: doubleSize ? 140 : 60,
                backgroundColor: color,
                opacity: pressed ? 0.8 : 1,
            })}
        >
            <Text
                style={{
                    ...globalStyles.buttonText,
                    color: blackText ? 'black' : 'white',
                }}
            >
                { label }
            </Text>
        </Pressable>
    );
};
