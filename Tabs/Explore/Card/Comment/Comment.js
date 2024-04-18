import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../../../styles.js';
import GLOBAL from '../../../Custom/Globals.js';

const Comment = (props) => {
    const { username,
        userAddress,
        commentContent,
        REP,
        VP,
        commentTime,
        commentPostId,
        postID,
        commentUpvoteNumber } = props;

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


    return (
        <View style={styles.CommentContainer}>
            <View style={styles.CommentHeader}>
                {/* User avatar */}
                <View>
                    <Image
                        style={styles.Comment_avatar}
                        source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${userAddress}` }}
                    />
                    <Text style={styles.Comment_username}>
                        REP: {REP}
                        {'\n'}
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
                        <Text style={styles.CommentFooterText}>
                            {commentUpvoteNumber}
                        </Text>

                    </View>
                </View>
            </View>


        </View>
    );
};

export default Comment;