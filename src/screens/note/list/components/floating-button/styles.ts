import { StyleSheet } from 'react-native';

import colors from '@theme/colors';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colors.red,
        width: 50,
        height: 50,
        borderRadius: 50/2
    },
    label: {
        fontSize: 22
    }
})