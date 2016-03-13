/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
} from 'react-native';
import TaskList from './TaskList';

class PluralTodo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: [
                { task: 'Learn React Native' },
                { task: 'Learn Redux' },
            ],
        };
    }

    render() {
        return (
            <TaskList
                todos={this.state.todos}
            />
        );
    }
}

AppRegistry.registerComponent('PluralTodo', () => PluralTodo);
