/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, {
  Component,
  Navigator,
} from 'react-native';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import store from './todoStore';

class PluralTodo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = store.getState();

        store.subscribe(() => {
            this.setState(store.getState()); // eslint-disable-line react/no-set-state
        });
    }

    onAddStarted() {
        this.nav.push({
            name: 'taskform',
        });
    }

    onCancel() {
        console.log('cancel clicked');
        this.nav.pop();
    }

    onAdd(task) {
        console.log('a task was added: ', task);
        // this.state.todos.push({ task });
        // this.setState({ todos: this.state.todos });
        store.dispatch({
            type: 'ADD_TODO',
            task,
        });
        this.nav.pop();
    }

    onDone(todo) {
        console.log('todo was completed: ', todo);
        const filteredTodos =
            this.state.todos.filter((filterTodo) =>
                filterTodo !== todo
            );

        this.setState({ todos: filteredTodos });
    }

    renderScene(route, nav) {
        switch (route.name) {
        case 'taskform': {
            return (
                <TaskForm
                    onAdd={this.onAdd.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                />
            );
        }
        default: {
            return (
                <TaskList
                    onAddStarted={this.onAddStarted.bind(this)}
                    onDone={this.onDone.bind(this)}
                    todos={this.state.todos}
                />
            );
        }
        }
    }

    configureScene() {
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    render() {
        return (
            <Navigator
                configureScene={this.configureScene}
                initialRoute={{ name: 'tasklist', index: 0 }}
                ref={((nav) => {
                    this.nav = nav;
                })}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }
}

export default PluralTodo;
