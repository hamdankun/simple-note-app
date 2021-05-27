import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noticeDark: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
        color: Colors.black
    },
    noticeNormal: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
        color: Colors.white
    }
});