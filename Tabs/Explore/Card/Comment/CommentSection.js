import { React, useState, useEffect, useRef } from 'react';
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
        placeId,
        refreshing,
        setRefreshing
    } = props;
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);
    const [numberOfComments, setNumberOfComments] = useState(0);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    // const [reload, setReload] = useState(false);
    const [replyCommentPostId, setReplyCommentPostId] = useState('');
    const commentInputRef = useRef(null);


    //! Debugging
    console.log("Comments: " + comments);
    // console.log("Comments: " + comments[0].userInfor);


    //! Smart Contract load all Comments
    const fetchPostComment = () => {
        console.log("Post ID: " + postId);
        web3.getCommentsOfReviewPost(postId).then((result) => {
            setComments(result);
            setNumberOfComments(result.length);
            setIsLoadingComments(false);
            setRefreshing(false);
        })
    };

    useEffect(() => {
        if (SessionAD != '') fetchPostComment();
    }, [SessionAD, refreshing]);

    async function commentToBlockChain() {
        console.log("Commenting to blockchain: " + text);
        console.log("SessionRK: " + SessionRK);
        console.log("SessionAD: " + SessionAD);
        if (text[0] === '@') {
            console.log("Replying to comment: " + replyCommentPostId);
            let result = await autoComment(
                SessionRK,
                SessionAD,
                replyCommentPostId,
                text,
            );
            console.log("Commenting^2 to blockchain result: " + result);
        }
        else {
            console.log("postId: " + postId);
            let result = await autoComment(
                SessionRK,
                SessionAD,
                postId,
                text);
            console.log("Commenting to blockchain result: " + result);
            setT
        }
        text('');
        // setReload(true);
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
            <Text style={styles.Comment_title}>COMMENT SECTION</Text>
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
                    ref={commentInputRef}
                />

                {
                    text.length > 0 ?
                        (
                            <TouchableOpacity
                                style={styles.Comment_BlueBtn}
                                onPress={commentToBlockChain}
                            >
                                <SvgComponent name="Send" />
                            </TouchableOpacity>
                        )
                        : (<></>)
                }
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
                            commentPostId={comments[i].postID}
                            postId={comments[i].reviewPostID}
                            SessionAD={SessionAD}
                            SessionRK={SessionRK}
                            commentInputRef={commentInputRef}
                            setReplyCommentPostId={setReplyCommentPostId}
                        // time,
                        // upvote
                        />
                    ))
            }
        </View>
    );
};

export default CommentSection;