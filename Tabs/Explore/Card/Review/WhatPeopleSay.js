import { Button, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../../../styles.js';
import SvgComponent from '../../../../assets/SvgComponent.js';



const WhatPeopleSay = ({ navigation }) => {

    const ReviewPost = () => {
        navigation.navigate('ReviewPost');
    }

    const UserSection = (props) => {
        return (
            <View style={styles.tourismPage_whatPeopleSayUserSection}>
                <Image
                    style={styles.tourismPage_whatPeopleSayUserAvatar}
                    source={require('../../../../assets/destinations/dc_dalat.jpg')}
                />
                <Text style={styles.tourismPage_whatPeopleSayUserName}>David BeckHam</Text>

                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <SvgComponent key={i} name={i < props.nStart ? "StarBig0" : "StarBig1"} />
                    ))
                }

            </View>
        );
    }

    return (
        <View style={styles.WhatPeopleSay_container}>
            <TouchableOpacity onPress={ReviewPost}>
                <UserSection nStart={5} />

                <Text style={styles.WhatPeopleSay_text}>
                    Sapa offers some of Vietnam's best trekking, and some villages such as Cat Cat and Ta Phin can be seen without a guide…
                </Text>

            </TouchableOpacity>
        </View>
    );
}
export default WhatPeopleSay;