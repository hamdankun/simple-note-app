import { StyleSheet, Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import colors from '@theme/colors';

const commonContainerStyle = {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1
}

export default StyleSheet.create({
    containerDark: {
        ...commonContainerStyle,
        backgroundColor: '#BFBFBF',
        borderColor: '#ABB7B7'
    },
    containerLight: {
        ...commonContainerStyle,
        backgroundColor: Colors.white,
        borderColor: '#dddddd',
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5
            }
        })
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: colors.red,
        marginRight: 10
    },
    pushTop: {
        marginTop: 10
    }
})