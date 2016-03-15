import React, {
  Component,
  View,
  ListView,
  TouchableHighlight,
  Text,
} from 'react-native';

import TaskRow from './TaskRow';

const styles = {
    container: {
        paddingTop: 40,
        backgroundColor: '#f7f7f7',
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        height: 60,
        borderColor: '#05a5d1',
        borderWidth: 2,
        backgroundColor: '#333',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fafafa',
        fontSize: 20,
        fontWeight: '600',
    },
};

class TaskList extends Component {
    constructor(props, context) {
        super(props, context);

        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.todos),
        };
    }

    componentWillReceiveProps(nextProps) {
        const dataSource = this
            .state
            .dataSource
            .cloneWithRows(nextProps.todos);
        this.setState({ dataSource });
    }

    renderRow(todo) {
        return (
            <TaskRow todo={todo} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    key={this.props.todos}
                    renderRow={this.renderRow.bind(this)}
                />

                <TouchableHighlight
                    onPress={this.props.onAddStarted}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Add one</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

TaskList.propTypes = {
    onAddStarted: React.PropTypes.func.isRequired,
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default TaskList;
