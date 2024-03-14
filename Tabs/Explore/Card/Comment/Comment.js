import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../../../styles.js';

const Comment = (props) => {
    const { username,
        image,
        comment,
        time,
        upvote } = props;

    return (
        <View style={styles.CommentContainer}>
            <View style={styles.CommentHeader}>
                {/* User avatar */}
                <Image
                    style={styles.Comment_avatar}
                    source={require('../../../../assets/background/bai-bien-bali-2.jpg')}
                />

                {/* Comment section */}
                <View>
                    <View style={styles.CommentContentContainer}>
                        <Text style={styles.Comment_username}>
                            David Beckham
                        </Text>
                        <Text
                            style={styles.Comment_text}
                        >
                            That is very interesting!
                            That is very interesting!
                            That is very interesting!
                            That is very interesting!
                        </Text>
                    </View>
                    {/* Comment Footer */}
                    <View style={styles.CommentFooterContainer}>
                        <Text style={styles.CommentFooterText}>
                            1d
                        </Text>
                        <Text style={styles.CommentFooterText}>
                            100
                        </Text>
                        <Text style={styles.CommentFooterText}>
                            Reply
                        </Text>
                    </View>
                </View>
            </View>


        </View>
    );
};

export default Comment;