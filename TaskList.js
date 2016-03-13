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

                <TouchableHighlight>
                    <Text>Add one</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

TaskList.propTypes = {
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default TaskList;
