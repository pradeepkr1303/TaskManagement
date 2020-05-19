import { TaskStatus } from "../task-status.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class TaskFiltersDto {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    readonly status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    readonly searchKeyword: string;
}