// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainExploreContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 44,
        marginBottom: 20,
    },

    loginLabel: {
        display: 'flex',
        width: 290,
        height: 32,
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#878282',
        // fontFamily: 'Inter',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 17, // You need to specify a numeric value for lineHeight
    },

    SearchBar: {
        height: 40,
        borderRadius: 5,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: 284,
        height: 44,
        paddingHorizontal: 10,
    },

    SearchInput: {
        width: '100%',
        height: 40,
        marginLeft: 10,
    },

    loginBtn: {
        borderRadius: 10,
        backgroundColor: '#39A7FF',
        width: '80%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },

    qrCodeBtn: {
        borderRadius: 5,
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
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

    destinationCard: {
        width: "100%",
        height: 120,
        backgroundColor: '#FFF',
        borderRadius: 20,
        // padding: 10,
        marginBottom: 10,
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

    bcDestinationImage: {
        width: "100%",
        height: "100%",

        // Image Style
        borderRadius: 20,
    },

    bcDestinationStar: {
        width: 10,
        height: 10,
        marginLeft: 5,
    },

    bcDestinationScore: {
        color: '#000',
        backgroundColor: '#FFF',
        borderRadius: 10,
        width: 50,
        fontSize: 12,
        fontWeight: 'bold',
        margin: 10,
        right: "-80%",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    bcDestinationName: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },

    bcDestinationAddress: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: 'light',
    },

    bcTextContainer: {
        margin: 15,
    },

    backBtn: {
        position: 'absolute',
        zIndex: 1,
        top: 20,
        left: 20,
    },

    optionsBtn: {
        position: 'absolute',
        zIndex: 1,
        top: 20,
        right: 20,
    },

    tourismPageImage: {
        width: "100%",
        height: 220,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    tourismPageName: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        left: 20,
        top: 130,
    },

    tourismPageRating: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'light',
        fontFamily: 'Roboto',
        left: 20,
        top: 130,
        flexDirection: 'row',
    },


});

export default styles;