import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoEntity } from './entities/todo.entity';
import { AddTodoDto } from './todoDto/todo.dto';

@Injectable()
export class TodoService {

    todos: TodoEntity[] = [];

    getTodos() {
        return this.todos;
    }

    getTodoById(id: number): TodoEntity {
        const myTodo = this.todos.find((todo) => todo.id === +id);
        if (myTodo) {
            return myTodo;
        } else {
            throw new NotFoundException()
        }
    }

    addTodo(todo: AddTodoDto): TodoEntity {
        const { title, description, active } = todo;
        let id: number;

        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1;
        } else {
            id = 1;
        }
        const newTodo = {
            id,
            title,
            description,
            active,
            createdAt: new Date()
        }
        this.todos.push(newTodo);
        return newTodo;
    }

    deleteTodo(id: number) {
        const delTodo = this.todos.findIndex((todo) => todo.id === id);
        if (delTodo >= 0) {
            this.todos.splice(delTodo, 1);
            return `Todo d'id ${id} deleted`;
        } else {
            throw new NotFoundException(`Todo d'id ${id} not found`);
        }
    }

    updateTodo(id: number, todoData: AddTodoDto) {
        // const {title, description, active} = todoData;
        const myTodo = this.getTodoById(id);
        myTodo.title = todoData.title ? todoData.title : todoData.title;
        myTodo.description = todoData.description ? todoData.description : todoData.description;
        myTodo.active = todoData.active ? todoData.active : todoData.active;

        return myTodo;


    }

}
