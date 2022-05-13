import { IsBoolean, IsString } from "class-validator";

export class AddTodoDto{

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    active: boolean;

}
