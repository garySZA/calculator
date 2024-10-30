import React from 'react';
import { StatusBar, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import IonIcon from 'react-native-vector-icons/Ionicons';

import { CalculatorScreen } from './presentation/screens';
import { globalStyles } from './config/theme';

const iconProvider = (props: React.ComponentProps<typeof IonIcon>) => <IonIcon { ...props }/>;

export const App = () => {
    return (
        <PaperProvider
          settings={{
            icon: iconProvider,
          }}
        >
          <View style={ globalStyles.background }>
            <StatusBar
              barStyle={ 'light-content' }
              backgroundColor={ 'black' }
            />
            <CalculatorScreen />
          </View>
        </PaperProvider>
    );
};
