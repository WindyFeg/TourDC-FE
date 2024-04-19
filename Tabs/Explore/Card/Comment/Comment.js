import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../../../styles.js';
import GLOBAL from '../../../Custom/Globals.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
import * as web3 from '../../../../service/web3.js';

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
    } = props;
    const [isHeartSelected, setHeartSelected] = useState(false);
    const [upvoteNum, setUpvoteNum] = useState(0);

    function convertDateTimeString(dateTimeString) {
        // Create a Date object from the ISO 8601 formatted string
        const dateObject = new Date(dateTimeString);
        // Check if the Date object is valid
        if (isNaN(dateObject.getTime())) {
            return "? Ago"; // Return null for invalid strings
        }
        // Format the time (hours:minutes)
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        // Format the date (day/month/year)
        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        return `${time}, ${date}`;
    }

    // ! Upvote user on blockchain
    async function upvoteOnBlockChain() {
        console.log('upvoteOnBlockChain');
        console.log('SessionRK:', SessionRK);
        console.log('SessionAD:', SessionAD);
        console.log('postId:', postId);
        // const response = await web3.autoUpvote(SessionRK, SessionAD, postId)
        console.log('response:', response)
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
                    }}
                >
                    <SvgComponent name='ReplyComment' />
                </TouchableOpacity>
                <Text style={styles.UpvoteButtonText}>{commentUpvoteNumber}</Text>
            </View>
        )
    }


    return (
        <View style={styles.CommentContainer}>
            <View style={styles.CommentHeader}>
                {/* User avatar */}
                <View style={styles.UserContainer}>
                    <Image
                        style={styles.Comment_avatar}
                        source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${userAddress}` }}
                    />
                    <Text style={styles.MyTrip_headerStatText}>
                        REP: {REP} Ⓡ
                    </Text>
                    <Text style={styles.MyTrip_headerStatText}>
                        VP: {VP} Ⓥ
                    </Text>

                    <View style={{ flexDirection: 'column' }}>
                        <UpvoteButton />
                        <ReplyCommentButton />
                    </View>
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

                    </View>
                </View>
            </View>


        </View>
    );
};

export default Comment;