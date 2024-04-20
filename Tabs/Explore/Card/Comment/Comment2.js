import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../../../styles.js';
import GLOBAL from '../../../Custom/Globals.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
import * as web3 from '../../../../service/web3.js';

const Comment2 = (props) => {
    const { authorId,
        comment2Content,
        comment2UpvoteNumber,
        Comment2Time,
        REP,
        VP,
        comment2PostId,
        CommentPostId,
        username
    } = props;

    function convertDateTimeString(dateTimeString) {
        const dateObject = new Date(dateTimeString * 1000);
        if (isNaN(dateObject.getTime())) {
            return "? Ago";
        }
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return `${time}, ${date}`;
    }

    return (

        <View style={styles.Comment2Container}>
            <View style={styles.CommentHeader}>
                {/* User avatar */}
                <View style={styles.UserContainer}>
                    <Image
                        style={styles.Comment_avatar}
                        source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${authorId}` }}
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
                    <View style={styles.Comment2ContentContainer}>
                        <Text style={styles.Comment_username}>
                            {username}
                        </Text>
                        <Text
                            style={styles.Comment_text}
                        >
                            {comment2Content}
                        </Text>
                    </View>
                    {/* Comment Footer */}
                    <View style={styles.CommentFooterContainer}>
                        <Text style={styles.CommentFooterText}>
                            {convertDateTimeString(Number(Comment2Time))}
                        </Text>
                        {/* <SvgComponent name={'HeartSmall1'} />
                        <Text style={styles.UpvoteButtonText}>{comment2UpvoteNumber}</Text> */}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Comment2;