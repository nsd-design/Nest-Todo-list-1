import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TodoEntity } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { AddTodoDto } from './todoDto/todo.dto';

@Controller('todo')
export class TodoController {

    constructor(
        private todoService: TodoService
    ){}

    @Get()
    getTodos(): TodoEntity[]{
        return this.todoService.getTodos();
    }

    @Get(':id')
    getTodoById(
        @Param('id', ParseIntPipe) id: number
    ): TodoEntity{
        return this.todoService.getTodoById(id);
    }

    @Post()
    addTodo(
        @Body() todo: AddTodoDto
    ): TodoEntity{
        return this.todoService.addTodo(todo);
    }

    @Delete(':id')
    deleteTodo(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.todoService.deleteTodo(id);
    }

    @Put(':id')
    updateTodo(
        @Param('id', ParseIntPipe) id: number,
        @Body() todoData: AddTodoDto
    ){
        return this.todoService.updateTodo(id, todoData);
    }


}
