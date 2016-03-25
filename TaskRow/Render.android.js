import React from 'react-native';

const {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet,
    Animated,
} = React;

export default function render(styles) {
    const doneAnimation = new Animated.ValueXY();

    const localStyle = StyleSheet.create({
        doneButton: {
            borderRadius: 5,
            padding: 5,
        },
        row: {
            transform: doneAnimation.getTranslateTransform(),
        },
    });

    function animatedPress() {
        Animated.spring(doneAnimation, {
            tension: 2,
            friction: 3,
            toValue: {
                x: -500,
                y: 0,
            },
        }).start();

        setTimeout(() => {
            this.onDonePressed();
        }, 1000);
    }

    return (
        <Animated.View style={[styles.container, localStyle.row]}>
            <Text style={styles.label}>
                {this.props.todo.task}
            </Text>

            <TouchableHighlight
                onPress={animatedPress.bind(this)}
                style={localStyle.doneButton}
                underlayColor="#ddd"
            >
                <Image
                    source={require('../images/1458930543_checkmark.png')}
                />
            </TouchableHighlight>
        </Animated.View>
    );
}
