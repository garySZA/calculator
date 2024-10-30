import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, globalStyles } from '../../config/theme';
import { CalculatorButton } from '../components';
import { useCalculator } from '../hooks';

export const CalculatorScreen = () => {
    const {
        addOperation,
        buildNumber,
        calculateResult,
        clean,
        deleteOperation,
        divideOperation,
        multiplyOperation,
        number,
        prevNumber,
        subtractOperation,
        toggleSign,
    } = useCalculator();

    return (
        <View style={ globalStyles.calculatorContainer }>
            <View style={ styles.calculatorRow }>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={ 1 }
                    style={ globalStyles.mainResult }
                >
                    { number }
                </Text>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={ 1 }
                    style={ globalStyles.subResult }
                >
                    { ( prevNumber === '0' ? ' ' : prevNumber ) }
                </Text>
            </View>

            <View style={ globalStyles.row }>
                <CalculatorButton onPress={ clean } label="C" color={ colors.lightGray } blackText />
                <CalculatorButton onPress={ toggleSign } label="+/-" color={ colors.lightGray } blackText />
                <CalculatorButton onPress={ deleteOperation } label="del" color={ colors.lightGray } blackText />
                <CalculatorButton onPress={ divideOperation } label="÷" color={ colors.orange } />

            </View>

            <View style={ globalStyles.row }>
                <CalculatorButton onPress={ () => buildNumber('7') } label="7"/>
                <CalculatorButton onPress={ () => buildNumber('8') } label="8"/>
                <CalculatorButton onPress={ () => buildNumber('9') } label="9"/>
                <CalculatorButton onPress={ multiplyOperation } label="x" color={ colors.orange } />
            </View>

            <View style={ globalStyles.row }>
                <CalculatorButton onPress={ () => buildNumber('4') } label="4"/>
                <CalculatorButton onPress={ () => buildNumber('5') } label="5"/>
                <CalculatorButton onPress={ () => buildNumber('6') } label="6"/>
                <CalculatorButton onPress={ subtractOperation } label="-" color={ colors.orange } />
            </View>

            <View style={ globalStyles.row }>
                <CalculatorButton onPress={ () => buildNumber('1') } label="1"/>
                <CalculatorButton onPress={ () => buildNumber('2') } label="2"/>
                <CalculatorButton onPress={ () => buildNumber('3') } label="3"/>
                <CalculatorButton onPress={ addOperation } label="+" color={ colors.orange } />
            </View>

            <View style={ globalStyles.row }>
                <CalculatorButton onPress={ () => buildNumber('0') } label="0" doubleSize/>
                <CalculatorButton onPress={ () => buildNumber('.') } label="."/>
                <CalculatorButton onPress={ calculateResult } label="=" color={ colors.orange } />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    calculatorRow: {
        paddingHorizontal: 30,
        paddingBottom: 20,
    },
});
