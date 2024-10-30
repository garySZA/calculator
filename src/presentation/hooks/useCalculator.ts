import { useEffect, useRef, useState } from 'react';

enum Operator {
    add = '+',
    subtract = '-',
    multiply = 'x',
    divide = '÷',
}

export const useCalculator = () => {
    const [formula, setFormula] = useState('');
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>();

    useEffect(() => {
        if( lastOperation.current ){
            const firstFormulaPart = formula.split( ' ' ).at( 0 );

            setFormula(`${ firstFormulaPart } ${ lastOperation.current } ${ number }`);
        } else {
            setFormula( number );
        }
    }, [number, formula]);

    useEffect(() => {
        const subResult = calculateSubResult();
        setPrevNumber(`${ subResult }`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formula]);


    const buildNumber = (numberString: string) => {

        if ( number.includes('.') && numberString === '.' ) { return; }

        if ( number.startsWith('0') || number.startsWith('-0') ){

            //* Punto decimal
            if( numberString === '.' ){
                return setNumber( number + numberString );
            }

            //* Evaluar si es otro cero y no hay punto
            if( numberString === '0' && number.includes('.') ){
                return setNumber(number + numberString);
            }

            //* Evaluar si es diferente de cero, no hay punto, y es el primer número
            if( numberString !== '0' && !number.includes('.') ){
                return setNumber( numberString );
            }

            //* Evitar 00000000000000
            if( numberString === '0' && !number.includes('.') ){
                return;
            }

            return setNumber( number + numberString );
        }

        setNumber( number + numberString );
    };

    //* Pone todo en cero
    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = undefined;
        setFormula('');
    };

    //* Borra el último número
    const deleteOperation = () => {
        let currentSign = '';
        let temporalNumber = number;

        if( number.includes('-') ){
            currentSign = '-';

            temporalNumber = number.substring(1);
        }

        if( temporalNumber.length > 1 ){
            return setNumber( currentSign + temporalNumber.slice(0, -1) );
        }

        setNumber('0');

    };

    const toggleSign = () => {
        if( number.includes('-') ){
            return setNumber( number.replace('-', '') );
        }

        setNumber('-' + number);
    };

    const setLastNumber = () => {
        calculateResult();

        if( number.endsWith('.') ){
            setPrevNumber( number.slice(0, -1) );
        } else {
            setPrevNumber( number );
        }

        setNumber('0');
    };

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    };

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    };

    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    };

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    };

    const calculateResult = () => {
        const result = calculateSubResult();
        setFormula( `${ result }` );

        lastOperation.current = undefined;
        setPrevNumber('0');
    };

    const calculateSubResult = () => {
        const [ firstValue, operation, lastValue ] = formula.split( ' ' );

        const firstNumber = Number( firstValue );
        const lastNumber = Number( lastValue );

        if( isNaN( lastNumber ) ) {return firstNumber;}

        switch ( operation ) {
            case Operator.add:
                return firstNumber + lastNumber;

            case Operator.subtract:
                return firstNumber - lastNumber;

            case Operator.multiply:
                return firstNumber * lastNumber;

            case Operator.divide:
                return firstNumber / lastNumber;

            default:
                throw new Error('operation not implemented');
        }
    };

    return {
        //* Props
        formula,
        number,
        prevNumber,

        //* Methods
        addOperation,
        buildNumber,
        calculateResult,
        clean,
        deleteOperation,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        toggleSign,
    };
};
