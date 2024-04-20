import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../../../styles.js';
import GLOBAL from '../../../Custom/Globals.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
import * as web3 from '../../../../service/web3.js';


const Comment2 = (props) => {
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

    function convertDateTimeString(dateTimeString) {
        const dateObject = new Date(dateTimeString);
        if (isNaN(dateObject.getTime())) {
            return "? Ago";
        }
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return `${time}, ${date}`;
    }

    return (

        <View style={styles.CommentContainer}>
            <View style={styles.CommentHeader}>
                {/* User avatar */}
                <View style={styles.UserContainer}>
                    <Image
                        style={styles.Comment_avatar}
                        source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${'0xec2d5E57E1c4B9450D1b9cB3E50dF8CC07bBfC6F'}` }}
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
                    </View>
                </View>

                {/* ReplyComment (Comment 2) */}
            </View>
        </View>
    );
}

export default Comment2;