// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginLabel: {
        display: 'flex',
        width: 290,
        height: 32,
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#878282',
        fontFamily: 'Inter',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 17, // You need to specify a numeric value for lineHeight
    },

    SearchInput: {
        height: 40,
        borderRadius: 5,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        backgroundColor: '#FFF',
        width: 284,
        height: 44,

    },

    loginBtn: {
        borderRadius: 10,
        backgroundColor: '#39A7FF',
        width: '80%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },

    loginBackgroundOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '95%',
        // height: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        // marginBottom: 20,

    },

    pinkOverlay: {
        width: 250,
        height: 600,
        transform: [{ rotate: '60deg' }],
        flexShrink: 0,
        backgroundColor: '#FFEED9',
        position: 'absolute',
    },

    tourismLogo: {
        width: 200,
        height: 200,
        resizeMode: 'contain', // or 'cover'

        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    tourDCLogo: {
        width: 150,
        height: 150,
        resizeMode: 'contain', // or 'cover'

        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

});

export default styles;