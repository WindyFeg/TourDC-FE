import { React, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Comment from './Comment.js';
import styles from '../../../../styles.js';
import SvgComponent from '../../../../assets/SvgComponent.js';

const CommentSection = () => {
    const [text, setText] = useState('');


    return (
        <View style={styles.CommentSection}>
            {/* Write Comment */}
            {/* input */}
            <View style={styles.CommentInputContainer}>
                <Image
                    style={styles.Comment_avatar}
                    source={require('../../../../assets/background/bai-bien-bali-2.jpg')}
                />
                <TextInput
                    style={styles.Comment_Input}
                    placeholder="Write a comment..."
                    onChangeText={setText}
                    value={text}
                />

                {text !== '' && (
                    <TouchableOpacity style={styles.Comment_BlueBtn}>
                        <SvgComponent name="Send" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Comments */}
            {
                Array.from({ length: 4 }).map((_, i) => (
                    <Comment
                    //     username,
                    // image,
                    // comment,
                    // time,
                    // upvote
                    />
                ))
            }
        </View>
    );
};

export default CommentSection;