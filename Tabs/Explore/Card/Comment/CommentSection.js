import { React, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Comment from './Comment.js';
import styles from '../../../../styles.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
import * as web3 from '../../../../service/web3.js';
import { autoComment } from '../../../../service/signmessage.js';
import GLOBAL from '../../../Custom/Globals.js';

const CommentSection = (props) => {
    const { postId,
        SessionRK,
        SessionAD,
        placeId
    } = props;
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);
    const [numberOfComments, setNumberOfComments] = useState(0);
    const [isLoadingComments, setIsLoadingComments] = useState(true);


    //! Debugging
    console.log("Number of Comments: " + comments.length);
    // console.log("Comments: " + comments[0].userInfor);


    //! Smart Contract load all Comments
    useEffect(() => {
        const fetchPostComment = async () => {
            console.log("Fetching all fetchPostComment of postId: " + placeId);
            console.log("Post ID: " + postId);
            web3.getCommentsOfReviewPost(postId).then((result) => {
                setComments(result);
                setNumberOfComments(result.length);
                setIsLoadingComments(false);
            })
        };
        if (SessionAD != '') fetchPostComment();
    }, [SessionAD]);

    async function commentToBlockChain() {
        console.log("Commenting to blockchain: " + text);
        console.log("SessionRK: " + SessionRK);
        console.log("SessionAD: " + SessionAD);
        console.log("postId: " + postId);
        let result = await autoComment(
            SessionRK,
            SessionAD,
            postId,
            text);
        console.log("Commenting to blockchain result: " + result);
    }

    const LoadingIcon = () => {
        return (
            <ActivityIndicator size="large" color="#39A7FF"
                style={{
                    margin: 10
                }}
            />
        )
    }

    return (
        <View style={styles.CommentSection}>
            {/* Write Comment */}
            {/* input */}
            <View style={styles.CommentInputContainer}>
                <Image
                    style={styles.Comment_avatar}
                    source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${SessionAD}` }}
                />
                <TextInput
                    style={styles.Comment_Input}
                    placeholder="Write a comment..."
                    onChangeText={setText}
                    value={text}
                />

                {text !== '' && (
                    <TouchableOpacity
                        style={styles.Comment_BlueBtn}
                        onPress={commentToBlockChain}
                    >
                        <SvgComponent name="Send" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Comments */}
            {
                isLoadingComments ? <LoadingIcon /> :
                    Array.from({ length: numberOfComments }).map((_, i) => (
                        <Comment
                            username={comments[i].userInfor.firstName + " " + comments[i].userInfor.lastName}
                            userAddress={comments[i].userInfor.wallet_address}
                            commentContent={comments[i].content}
                            commentUpvoteNumber={comments[i].upvoteNum}
                            commentTime={comments[i].createTime}
                            REP={comments[i].REP}
                            VP={comments[i].VP}
                            comment={comments[i].reviewPostId}
                            postId={comments[i].postId}
                        // time,
                        // upvote
                        />
                    ))
            }
        </View>
    );
};

export default CommentSection;