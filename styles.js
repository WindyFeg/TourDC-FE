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
        width: "85%",
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

    ReviewPost_achievementContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: "10%",
        marginTop: 20,
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
        width: 50,
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
        margin: 20,
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
        left: 20,
        top: 40,
    },

    ReviewPostHeader_backgroundUserAvatar: {
        backgroundColor: '#FFF',
        width: 50,
        height: 50,
        borderRadius: 100,
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
        // fontFamily: 'Inter',
        marginHorizontal: 10,
    },

    ReviewPostShort_content: {
        margin: 20,
        opacity: 0.7,
        fontFamily: 'InterR',
        fontWeight: 'regular',
        height: 100,
        fontSize: 12,
        textAlign: 'justify',
    },

    UpvoteButton: {
        width: 35,
        height: 35,
        borderRadius: 5,
        backgroundColor: '#ffe6e6',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ff7676',
    },

    UpvoteButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    UpvoteButtonText: {
        color: '#7c7979',
        fontWeight: 'bold',
        marginLeft: 5,
    },

    ReviewPostFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },

    MyTrip_header: {
        width: '100%',
        height: 200,
        backgroundColor: '#46adff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    MyTrip_headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    MyTrip_headerText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        fontFamily: 'InterR',
    },

    MyTrip_headerToken: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#192733',
        borderRadius: 20,
        width: 80,
        height: 30,
    },
    MyTrip_headerBackground: {

        // Drop Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,
        shadowOpacity: 0.5,
        marginBottom: 20,

        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        width: '100%',
    },

    MyTrip_headerIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
        margin: 10,
    },

    MyTrip_userAvatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },

    MyTrip_backgroundUserAvatar: {
        backgroundColor: '#FFF',
        width: 72,
        height: 72,
        borderRadius: 100,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    MyTrip_headerIcon: {
        marginHorizontal: 20,
        opacity: 0.7,
        flexDirection: 'column',
        alignItems: 'center',
    },

    MyTrip_headerStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 20,
    },

    MyTrip_headerStat: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    MyTrip_headerStatText: {
        fontFamily: 'InterB',
        fontSize: 12,
        opacity: 0.7,
    },

    MyTrip_Navigator:
    {
        tabBarActiveTintColor: '#75baf1',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#75baf1' },
        tabBarStyle: { backgroundColor: '#d9d9d9', borderRadius: 10 },

    },

    MyTripCard_Container: {
        height: 120,
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 10,
        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,

        flexDirection: 'row',
    },

    MyTripCard_Image: {
        width: 140,
        height: 120,
        borderRadius: 10,
    },

    Review_BlackBtn: {
        backgroundColor: '#000',
        borderRadius: 5,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',

    },

    Review_BlackBtn_Text: {
        color: 'white',
        fontFamily: 'InterB',
        fontSize: 12,

    },

    Review_BlueBtn: {
        backgroundColor: '#39A7FF',
        borderRadius: 5,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },

    Review_BlueBtn_Text: {
        color: 'white',
        fontFamily: 'InterB',
        fontSize: 12,
    },

    CreateReview_container: {
        margin: 20,
        paddingTop: 20,
    },

    CreateReview_Text: {
        fontFamily: 'InterL',
        fontSize: 20,
        margin: 10,
    },

    CreateReview_Input: {
        height: 100,
        borderColor: '#b3b3b3',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
        marginVertical: 10,
        opacity: 0.7,
        fontFamily: 'InterL',
        padding: 10,
    },

    CreateReview_imageContainer: {
    }
    ,

    CreateReview_image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },

    CreateReview_errorText: {
        color: 'red',
        fontFamily: 'InterL',
        fontSize: 12,
    },

    CreateReview_uploadImageButtonText: {
    },

    CreateReview_uploadImageButton: {
        backgroundColor: '#39A7FF',
        borderRadius: 5,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },

    CreateReview_uploadImageHeader: {
        fontFamily: 'InterL',
        fontSize: 20,
        margin: 10,
    },

    CreateReview_uploadImageContainer: {
        margin: 20,
    },

    ReviewPostShort_achievement: {
        margin: 20,
        backgroundColor: 'white',
    },

    CommentContainer: {
        margin: 5,
    },

    CommentHeader: {
        margin: 10,
        flexDirection: 'row',
        // alignItems: 'center',
    },

    Comment_avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 10,
    },
    CommentContentContainer: {
        backgroundColor: '#ececec',
        maxWidth: "90%",
        borderRadius: 10,
        padding: 5,
    },

    Comment_username: {
        fontFamily: 'InterM',
        fontSize: 15,
    },

    Comment_text: {
        fontFamily: 'InterR',
        fontSize: 15,
    },

    CommentFooterContainer: {
        flexDirection: 'row',
        opacity: 0.7,
        justifyContent: 'space-evenly',
    },

    CommentSection: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
    },

    CommentInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        // borderColor: '#D9D9D9',
        borderRadius: 10,
    },

    Comment_BlueBtn: {
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },

    Comment_Input: {
        width: '80%',
        height: 40,
        marginLeft: 10,
    },

    MyAccount_Container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },

    UserHeader_Info: {
        height: 170,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#D9D9D9',
    },
    UserHeader_Inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },
    UserHeader_Avatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    UserHeader_Text: {
        width: 170,
    },
    UserHeader_UserName: {
        fontFamily: 'InterB',
        fontSize: 18,
    },
    UserHeader_Phone: {
        fontFamily: 'InterM',
        fontSize: 14,
        color: '#828282',
    },
    UserHeader_Verify: {
        backgroundColor: '#5cca60',
        width: 70,
        height: 20,
        textAlign: 'center',
        borderRadius: 50,
        color: 'white',
    },

    UserHeader_NotVerify: {
        backgroundColor: '#39A7FF',
    },

    UserHeader_NumberPost: {
        fontFamily: 'InterM',
        fontSize: 14,
        color: '#828282',
    },
    UserHeader_QRCode: {},

    UserHeader_ProfileButton: {
        backgroundColor: '#39a7ff',
        borderRadius: 5,
        height: 30,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    UserHeader_ProfileButtonText: {
        color: 'white',
    },

    TourDC_Button: {
        backgroundColor: '#000',
        borderRadius: 5,
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 42,
        marginVertical: 20,
    },

    TourDC_ButtonText: {
        color: 'white',
    },

    MyAccount_Button: {
        backgroundColor: '#fff',
        borderColor: '#D9D9D9',
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 42,
    },

    MyAccount_Inline: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    MyAccount_Text: {
        color: 'white',
    },

    MyAccount_BtnTitle: {
        fontFamily: 'InterB',
        fontSize: 16,
    },

    MyAccount_BtnDescription: {
        fontFamily: 'InterM',
        fontSize: 14,
        color: '#828282',
    },

    MyAccount_DoubleButton: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 118,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        marginVertical: 10,
    },

});

export default styles;