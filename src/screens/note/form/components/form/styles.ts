import { StyleSheet, Appearance, Dimensions } from 'react-native';

import colors from '@theme/colors';

const colorScheme = Appearance.getColorScheme();

const { height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    fromGroup: {
        marginBottom: 10
    },
    formInput: {
        borderWidth: 1,
        borderColor: colorScheme === 'dark' ? colors.light : colors.earth,
        borderRadius: 10,
        marginTop: 10,
        padding: 10
    },
    textarea: {
        height: height * 0.5,
        textAlignVertical: 'top'
    },
    errorLabel: {
        color: colors.red
    },
    defaultForm: {
        padding: 0,
        margin: 0
    },
    modalContainer: {
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? colors.dark : colors.light,
    },
    modalItem: {
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomColor: colorScheme === 'dark' ? colors.light : colors.earth,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    closeAction: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})