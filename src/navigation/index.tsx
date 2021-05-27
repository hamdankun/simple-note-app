import React, { Suspense, lazy } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import ScreenLoader from '@components/screen-loader';

const NoteListFormScreen = lazy(() => import('@screens/note/list'));
const NoteFormScreen = lazy(() => import('@screens/note/form'));

const MainStackNavigator = createNativeStackNavigator();

const Navigation = (): JSX.Element => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Suspense fallback={<ScreenLoader />}>
                    <MainStackNavigator.Navigator
                        initialRouteName={'note.list'}
                    >

                        <MainStackNavigator.Screen
                            name='note.list'
                            component={NoteListFormScreen}
                            options={{
                                title: 'Note List',
                            }}
                            />

                        <MainStackNavigator.Screen
                            name='note.form'
                            component={NoteFormScreen}
                            options={{
                                title: 'Note Form'
                            }}
                        />

                    </MainStackNavigator.Navigator>
                </Suspense>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default Navigation;