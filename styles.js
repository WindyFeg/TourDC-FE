// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    contractVerified_btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderBlockColor: '#39A7FF',
        borderWidth: 1,
        padding: 5,
        margin: 5,
        width: "100%",
        borderRadius: 5,
        height: 30,
        marginVertical: 5,
    },

    MyTrip_UserVerifiedButton: {
        backgroundColor: '#39A7FF',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        marginBottom: 10,
        padding: 5,
        opacity: 0.8,
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

    loginLogoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    scrollLogin: {
        margin: 0,
        padding: 0,

    },

    forgotPasswordBtn: {
        color: '#39A7FF',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'right',
    },

    loginInput: {
        height: 44,
        borderRadius: 5,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 44,
        paddingHorizontal: 10,
        marginVertical: 5,
        padding: 0,
    },

    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    loginTextInput: {
        marginLeft: 10,
        opacity: 0.7,
        color: '#878282',
        width: '80%',
    },

    nameTextInput: {
        marginLeft: 10,
        opacity: 0.7,
        color: '#878282',
        width: 100,
    },

    loginLabel: {
        display: 'flex',
        width: 290,
        height: 28,
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#878282',
        fontFamily: 'InterM',
        fontSize: 14,
    },

    loginText: {
        color: '#878282',
        fontSize: 12,
        fontFamily: 'InterM',
        fontStyle: 'normal',
        fontWeight: '400',
        // center
        textAlign: 'center',
        marginVertical: 5,
    },

    loginBigText: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'InterR',
        margin: 10,
        opacity: 0.7,
    },

    btnText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        margin: 10,
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
    Transaction_SearchBar: {
        height: 40,
        borderRadius: 5,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: "90%",
        height: 44,
        paddingHorizontal: 10,
        marginVertical: 10,
    },

    Transaction_SearchInput: {
        width: '100%',
        height: 40,
        marginLeft: 10,
    },

    loginBtn: {
        borderRadius: 10,
        backgroundColor: '#39A7FF',
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
    },

    metaMaskBtn: {
        backgroundColor: 'black',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 5,
        borderRadius: 10,
        marginVertical: 20,
    },

    metaMaskView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },

    metaMaskText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 16,
        margin: 10,
    },

    metaMaskIcon: {
        width: 40,
        height: 40,
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
        alignItems: "center",
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    pinkOverlay: {
        width: 170,
        height: 800,
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
        // elevation: 5,
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
        // elevation: 5,
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
        borderRadius: 20,
        backgroundColor: '#fff',
        // Drop Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 2,
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
        justifyContent: 'flex-start',
        flexWrap: 'wrap', // Add this line
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-between',
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
        // height: 100,
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

    ReplyCommentButton: {
        width: 35,
        height: 35,
        borderRadius: 5,
        backgroundColor: '#e6f7ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#39A7FF',

    },

    UserContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        maxHeight: 100,
        borderWidth: 2,
        borderColor: '#dfdfdf',
    },

    UpvoteButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 2,
    },

    CommentButtonContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    UpvoteButtonText: {
        color: '#7c7979',
        fontFamily: 'InterR',
        fontSize: 13,
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
        paddingHorizontal: 10,
    },

    MyTrip_headerText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingLeft: 20,
        fontFamily: 'InterR',
    },

    MyTrip_headerToken: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        backgroundColor: '#192733',
        borderRadius: 10,
        width: 100,
        height: 40,
        padding: 5,
        marginTop: 20,
        marginBottom: 10,
    },

    MyTrip_headerTokenIconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: "100%",
    },

    MyTrip_headerBackground: {
        shadowOpacity: 0.5,
        marginBottom: 10,
        borderRadius: 10,
        width: '100%',
    },

    MyTrip_headerIconContainer: {
        // flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
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
        // marginHorizontal: 20,
        opacity: 0.8,
        flexDirection: 'row',
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
        fontSize: 10,
        opacity: 0.7,
        color: '#6d6d6d',
    },

    MyTrip_headerStatBig: {
        alignItems: 'center',
        justifyContent: 'center',

    },

    MyTrip_headerStatLinkText: {
        fontFamily: 'InterR',
        fontSize: 10,
        opacity: 0.7,
        // color: '#828282',
        color: 'black',
        textDecorationLine: 'underline',
    },

    MyTrip_headerStatLinkTextSmall: {
        fontFamily: 'InterB',
        fontSize: 9,
        opacity: 0.9,
        color: 'white',
        // width: "100%",
    },

    Green: {
        color: '#5cca60',
    },

    MyTrip_headerStatTextBig: {
        fontFamily: 'InterB',
        fontSize: 10,
        opacity: 0.8,
        color: '#4e4e4e',
    },

    MyTrip_Navigator:
    {
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#000' },
        tabBarStyle: { backgroundColor: '#fff', borderRadius: 10 },
        padding: 10
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

    PostCard_Container: {
        height: 120,
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 5,
        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    VoucherCard_Container: {
        height: 130,
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 5,
        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    MyTripCard_Image: {
        width: 140,
        height: 100,
        borderRadius: 5,
        margin: 10,
    },

    VoucherCard_Image: {
        width: 140,
        height: 110,
        borderRadius: 5,
        margin: 10,
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
        minWidth: 100,
        maxWidth: 150,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding: 5,
        opacity: 0.9,
    },

    Review_BlueBtn2: {
        backgroundColor: 'white',
        borderRadius: 5,
        minWidth: 100,
        maxWidth: 150,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding: 5,
        borderWidth: 1,
        borderColor: '#39A7FF',
    },

    CommentFooterText: {
        color: '#828282',
        fontFamily: 'InterR',
        fontSize: 12,
    },

    Review_BlueBtn_Text: {
        color: 'white',
        fontFamily: 'InterB',
        fontSize: 12,
    },

    Review_BlueBtn_Text2: {
        fontFamily: 'InterB',
        fontSize: 12,
        color: '#39A7FF',
    },

    Orange_Text: {
        color: '#de6464',
    },

    CreateReview_container: {
        margin: 20,
        paddingTop: 20,
    },

    CreateReview_BigText: {
        fontFamily: 'InterR',
        fontSize: 16,
        margin: 10,
        color: '#828282',
    },
    CreateReview_Text: {
        fontFamily: 'InterL',
        fontSize: 12,
        marginHorizontal: 10,
        color: '#828282',
    },

    CreateReview_Input: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        marginVertical: 10,
        fontFamily: 'InterR',
        padding: 10,
        color: '#828282',
    },

    CreateReview_imageContainer: {
        flexDirection: 'row',

    }
    ,

    CreateReview_image: {
        width: 50,
        height: 50,
        borderRadius: 10,
        margin: 10,
    },

    CreateReview_errorText: {
        color: 'red',
        fontFamily: 'InterR',
        fontSize: 14,
        margin: 10,
    },

    CreateReview_successText: {
        color: 'green',
        fontFamily: 'InterB',
        fontSize: 14,
        margin: 10,
    },

    CreateReview_uploadImageButtonText: {
        color: 'white',
        fontFamily: 'InterB',
        fontSize: 12,

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
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    ReviewPostShort_achievement: {
        margin: 20,
        backgroundColor: 'white',
    },

    CommentContainer: {
        margin: 5,
        backgroundColor: '#f7f7f7',
        borderRadius: 5,
    },

    Comment2Container: {
        margin: 5,
        paddingLeft: 40,
        paddingRight: 0,
    },

    CommentHeader: {
        margin: 10,
        flexDirection: 'row',
        // alignItems: 'center',
    },

    Comment_avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    CommentContentContainer: {
        backgroundColor: '#f7f7f7',
        maxWidth: "85%",
        minWidth: "80%",
        minHeight: 100,
        borderRadius: 5,
        padding: 5,
        marginLeft: 5,
        opacity: 0.9,
    },

    Comment2ContentContainer: {
        backgroundColor: '#f7f7f7',
        maxWidth: "90%",
        minWidth: "85%",
        minHeight: 100,
        borderRadius: 5,
        padding: 5,
        marginLeft: 5,
        opacity: 0.9,
    },

    Comment_username: {
        fontFamily: 'InterM',
        fontSize: 13,
        opacity: 0.8,
    },

    Comment_text: {
        fontFamily: 'InterR',
        fontSize: 12,
        color: '#000',
        opacity: 0.7,
    },

    Comment_title: {
        fontFamily: 'InterB',
        fontSize: 14,
        margin: 10,
        color: '#828282',
    },

    CommentFooterContainer: {
        flexDirection: 'row',
        opacity: 0.7,
        justifyContent: 'space-between',
        width: '80%',
        alignItems: 'center',
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
        marginLeft: 10,
    },

    Comment_Input: {
        width: '80%',
        height: 40,
        marginLeft: 10,
        borderRadius: 5,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        flexDirection: 'row',
        // alignItems: 'space-between',
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        height: 44,
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
        backgroundColor: 'black',
        // width: 70,
        // height: 25,
        padding: 4,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 10,
        borderRadius: 5,
        color: 'white',
        fontFamily: 'InterB',
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

    MyAccount_PreviousIcon: {
        //backgroundColor: '#000',
        width: "100%",
        flexDirection: 'row',
        alignContent: 'flex-end',
    },

    MyAccount_Text: {
        color: 'white',
    },

    MyAccount_BtnTitle: {
        fontFamily: 'InterB',
        fontSize: 14,
        color: '#000',
        opacity: 0.7,
    },

    MyAccount_BtnDescription: {
        fontFamily: 'InterM',
        fontSize: 12,
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

    tourismPage_checkInBtn: {
        // center
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        // Drop Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 1,
        shadowOpacity: 0.7,
        // height: 360,
        padding: 10,
    },

    tourismPage_checkInBtnContainer: {
        backgroundColor: '#39A7FF',
        margin: 5,
        width: "100%",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginVertical: 5,
    },

    tourismPage_checkInLocationText: {
        color: '#828282',
        fontFamily: 'InterR',
        fontSize: 12,
        margin: 10,
    },

    normalText: {
        color: '#828282',
        fontFamily: 'InterR',
        fontSize: 12,
        margin: 10,
    },

    tripCardText: {
        color: '#828282',
        fontFamily: 'InterR',
        fontSize: 12,
    },

    rewardCardText: {
        color: '#828282',
        fontFamily: 'InterR',
        fontSize: 12,
        marginHorizontal: 2,
    },

    rewardCardBigText: {
        color: '#000',
        fontFamily: 'InterB',
        fontSize: 14,
        opacity: 0.7,
        margin: 2,
    },

    tripCardBigText: {
        color: '#000',
        fontFamily: 'InterB',
        fontSize: 14,
        opacity: 0.7,
        margin: 2,
    },

    voucherCardBigText: {
        color: '#000',
        fontFamily: 'InterB',
        fontSize: 14,
        margin: 2,
        opacity: 0.7,
        width: 150
    },

    modalText: {
        color: '#828282',
        fontFamily: 'InterR',
        fontSize: 12,
        margin: 10,
    },

    modalBigText: {
        color: '#000',
        fontFamily: 'InterB',
        fontSize: 18,
        margin: 10,
    },

    tourismPage_checkInLocationTextError: {
        color: 'red',
        fontFamily: 'InterB',
    },

    tourismPage_checkInLocationTextSuccess: {
        color: 'green',
        fontFamily: 'InterB',
    },

    modalCopyTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
    },

    modalQRCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        padding: 10,
    },

    tourismPage_checkInBtnText: {
        color: 'white',
        fontFamily: 'InterB',
        fontSize: 12,
    },

    contractVerified_btnText: {
        color: '39A7FF',
        fontFamily: 'InterB',
        fontSize: 12,
    },

    tourismPage_clipboardIcon: {
        width: 10,
        height: 10,
        opacity: 0.7,
        margin: 5,
    },


    tourismPage_checkInNotify: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: "100%",
    },

    MyAccount_BtnLogout: {
        backgroundColor: '#ff0000',
        borderRadius: 5,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        opacity: 0.8,
    },

    MyAccount_LogoutButtonText: {
        fontFamily: 'InterB',
        fontSize: 14,
        color: 'white',
    },

    HomeTitle: {
        color: '#FFF',
        fontSize: 45,
        fontFamily: 'InterB',
        top: 50,
        padding: 20,
    },

    HomeSubTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'InterM',
        top: 50,
        paddingHorizontal: 20,
        margin: 10,
    },

    HomeTitleBlack: {
        color: '#000',
        fontSize: 30,
        fontFamily: 'InterB',
        margin: 10,
    },

    registerContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 20,
    },

    registerBackground: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
    },

    registerBackgroundOverlay: {
        alignItems: "center",
        width: '95%',
        height: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 20,
    },
    registerHeader: {
        height: 30,
        backgroundColor: '#fff',
    },

    NameInput: {
        borderRadius: 5,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        flexDirection: 'row',
        // alignItems: 'space-between',
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        height: 44,
    },

    TripCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "50%"
    },

    reviewDestinationImage: {
        width: "100%",
        height: 50,
        borderRadius: 5,
    },

    typeOfAccount: {
        fontFamily: 'InterR',
        fontSize: 10,
        // backgroundColor: "#39A7FF",
        color: 'black',
        borderRadius: 5,
    }

    , Cpvp_container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginVertical: 10,
        padding: 5,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: "100%",
    },

    MyTrip_headerTokenText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'InterB',
    },

    RewardUpvoteCard_Container: {
        height: 70,
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 5,
        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    }

    , RewardPostCard_Container: {
        height: 120,
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 5,
        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    RewardCard_avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    RewardCard_userAvatar: {
        width: 45,
        height: 45,
        borderRadius: 100,
        margin: 10,
    },

    RewardCard_InforContainer: {
        flexDirection: 'column',
        marginHorizontal: 5,
    },

    TransactionCard_Container: {
        height: 90,
        width: "97%",
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    ExchangeVoucherCard_Inline: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },

    ExchangeVoucherCard_Container: {
        // height: 130,
        width: "97%",
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,

    },

    ExchangeVoucherCard_Image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        margin: 0,
    },


    TransactionHistory_Container: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 2,
        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        width: "100%",
        // center
        alignItems: 'center',
    },

    TransactionCard_Inline: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },

    TransactionCard_Information: {
        flexDirection: 'column',
        marginHorizontal: 10,
    },

    TransactionCard_icon: {
        width: 55,
        height: 55,
        paddingLeft: 7,
        paddingBottom: 5,
        borderRadius: 100,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
    },

    TransactionCard_TextCopy: {
        color: '#828282',
        fontFamily: 'InterR',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    TransactionCard_TextBig: {
        color: '#000',
        fontFamily: 'InterB',
        fontSize: 12,
        opacity: 0.7,
    },

    TransactionCard_Text: {
        color: '#000',
        fontFamily: 'InterR',
        opacity: 0.7,
        fontSize: 12,
    },

    ExchangeVoucherCard_TextBig: {
        color: '#000',
        fontFamily: 'InterB',
        fontSize: 16,
        opacity: 0.7,
        width: "70%",
    },

    ExchangeVoucherCard_PriceContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#585858',
        borderRadius: 5,
        padding: 2,
        right: 0,
    },

    ExchangeVoucherCardText: {
        color: 'white',
        fontFamily: 'InterB',
        fontSize: 12,
        opacity: 0.7,
        margin: 2,
    },

});

export default styles;
