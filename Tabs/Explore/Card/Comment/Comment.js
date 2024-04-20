import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../../../styles.js';
import GLOBAL from '../../../Custom/Globals.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
import { autoUpvote } from '../../../../service/signmessage.js';
import * as web3 from '../../../../service/web3.js';
import Comment2 from './Comment2.js';

const Comment = (props) => {
    const { username,
        userAddress,
        commentContent,
        REP,
        VP,
        commentTime,
        commentPostId,
        postID,
        commentUpvoteNumber,
        SessionRK,
        SessionAD,
        commentInputRef,
        setReplyCommentPostId
    } = props;
    const [isHeartSelected, setHeartSelected] = useState(commentUpvoteNumber === 0 ? false : true);
    const [upvoteNum, setUpvoteNum] = useState(commentUpvoteNumber);
    const [comments2, setComments2] = useState([]);
    const [numberOfComments2, setNumberOfComments2] = useState(0);
    const [isLoadingComments2, setIsLoadingComments2] = useState(true);

    //! Smart Contract load all Comments of Comment
    const fetchPostComment = () => {
        console.log("Comment Post ID: " + commentPostId);
        web3.getCommentsOfReviewPost(commentPostId).then((result) => {
            setComments2(result);
            setNumberOfComments2(result.length);
            setIsLoadingComments2(false);
            console.log("Comments2: " + result);
        })
    };

    useEffect(() => {
        fetchPostComment();
    }, []);

    // ! Upvote user on blockchain
    async function upvoteOnBlockChain() {
        console.log('upvoteOnBlockChain');
        console.log('SessionRK:', SessionRK);
        console.log('SessionAD:', SessionAD);
        console.log('commentPostId:', commentPostId);
        const response = autoUpvote(SessionRK, SessionAD, commentPostId)
        console.log('response:', response)
    }


    function convertDateTimeString(dateTimeString) {
        const dateObject = new Date(dateTimeString);
        if (isNaN(dateObject.getTime())) {
            return "? Ago";
        }
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return `${time}, ${date}`;
    }

    const upVoteLogic = () => {
        if (isHeartSelected === false) {
            setHeartSelected(true);
            upvoteOnBlockChain();
        }
    }

    const UpvoteButton = () => {
        return (
            <View style={styles.UpvoteButtonContainer}>
                <TouchableOpacity
                    // style={styles.UpvoteButton}
                    onPress={upVoteLogic}
                >
                    <SvgComponent name={isHeartSelected ? 'HeartSmall1' : 'HeartSmall0'} />
                </TouchableOpacity >
                <Text style={styles.UpvoteButtonText}>{commentUpvoteNumber}</Text>
            </View>
        )
    }

    const ReplyCommentButton = () => {
        return (
            <View style={styles.UpvoteButtonContainer}>
                <TouchableOpacity
                    // style={styles.ReplyCommentButton}
                    onPress={() => {
                        commentInputRef.current.focus();
                        commentInputRef.current.setNativeProps({ text: `@${username} ` });
                        setReplyCommentPostId(commentPostId);
                    }}
                >
                    <SvgComponent name='ReplyComment' />
                </TouchableOpacity>
                <Text style={styles.UpvoteButtonText}>{commentUpvoteNumber}</Text>
            </View>
        )
    }


    return (
        <>
            <View style={styles.CommentContainer}>
                <View style={styles.CommentHeader}>
                    {/* User avatar */}
                    <View style={styles.UserContainer}>
                        <Image
                            style={styles.Comment_avatar}
                            source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${userAddress}` }}
                        />
                        <Text style={styles.MyTrip_headerStatText}>
                            REP: {REP}
                        </Text>
                        <Text style={styles.MyTrip_headerStatText}>
                            VP: {VP}
                        </Text>
                    </View>
                    {/* Comment section */}
                    <View>
                        <View style={styles.CommentContentContainer}>
                            <Text style={styles.Comment_username}>
                                {username}
                            </Text>
                            <Text
                                style={styles.Comment_text}
                            >
                                {commentContent}
                            </Text>
                        </View>
                        {/* Comment Footer */}
                        <View style={styles.CommentFooterContainer}>
                            <Text style={styles.CommentFooterText}>
                                {convertDateTimeString(Number(commentTime))}
                            </Text>
                            <UpvoteButton />
                            <ReplyCommentButton />
                        </View>
                    </View>

                    {/* ReplyComment (Comment 2) */}
                </View>
            </View>
            {
                Array.from({ length: numberOfComments2 }).map((_, i) => (
                    <Comment2
                        authorId={comments2[i].author}
                        comment2UpvoteNumber={comments2[i].upvoteNum}
                        comment2Content={comments2[i].content}
                        Comment2Time={comments2[i].createTime}
                        comment2PostId={comments2[i].postID}
                        CommentPostId={comments2[i].reviewPostID}
                        REP={comments2[i].REP}
                        VP={comments2[i].VP}
                        username={comments2[i].userInfor.firstName + " " + comments2[i].userInfor.lastName}
                    />
                ))
            }
        </>
    );
};

export default Comment;