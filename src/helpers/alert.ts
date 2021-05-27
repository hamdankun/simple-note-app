import { Alert } from 'react-native';

export const showAlertError = (errorMessage: string): void => Alert.alert('Kesalahan', errorMessage);