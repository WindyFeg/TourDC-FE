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

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 5,
        shadowOpacity: 0.5,
        shadowRadius: 4,
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

    tourismPage_contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: "20%",
    },

    tourismPage_contentHeaderIcons: {
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 0.5,
    },

    tourismPage_contentHeaderTextTitle: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        textAlign: 'center',
        width: 100,
    },

    tourismPage_contentHeaderText: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        textAlign: 'center',
        width: 100,
    },

    tourismPage_contentHeaderTextContent: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'light',
        fontFamily: 'Roboto',
        textAlign: 'center',
        opacity: 0.7,
        margin: 10,
        // make the text content justified
        textAlign: 'justify',
    },

    tourismPage_contentImageContainer: {
        borderRadius: 30,
        backgroundColor: '#fff',
        // Drop Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 5,
        shadowOpacity: 0.7,
        // height: 360,
    },

    readMoreBtn: {
        lineHeight: 21,
        marginVertical: 10,
        color: '#39A7FF',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',

    },

    tourismPage_contentImages: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20,
    },

    tourismPage_contentImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },

    tourismPage_whatPeopleSay: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        margin: 10,
    },

    WhatPeopleSay_container: {
        width: 300,
        height: 130,
        // Drop Shadow
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 4,
        shadowOpacity: 0.7,

        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 10,

    },

    tourismPage_whatPeopleSayUserAvatar: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },

    tourismPage_whatPeopleSayUserSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    tourismPage_whatPeopleSayUserName: {
        fontWeight: 'regular',
        fontSize: 15,
        fontFamily: 'Roboto',
        marginHorizontal: 10,
    },

    WhatPeopleSay_text: {
        fontSize: 14,
        fontWeight: 'light',
        fontFamily: 'Roboto',
        marginVertical: 10,
        opacity: 0.7,
    },

    ReviewPostHeader_image: {
        width: "100%",
        height: 230,
        borderRadius: 30,
    },

    ReviewPostHeader_title: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        top: 50,
        padding: 20,
    },

    ReviewPostHeader_userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    ReviewPostHeader_backgroundUserAvatar: {
        backgroundColor: '#FFF',
        width: 50,
        height: 50,
        borderRadius: 100,
        left: 20,
        top: 40,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    ReviewPostHeader_userAvatar: {
        width: 45,
        height: 45,
        borderRadius: 100,
    },

    ReviewPostHeader_username: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'regular',
        fontFamily: 'Roboto',
        left: 20,
        top: 130,
    },

});

export default styles;