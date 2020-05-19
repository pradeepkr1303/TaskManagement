import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidator implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ]

    transform(value: any) {
        value = value.toUpperCase();
        if(!this.validateStatus(value)) {
            throw new BadRequestException(`"${value}" is not a valid status`);
        }
        return value;
    }

    private validateStatus(value: any) {
        const index = this.allowedStatuses.indexOf(value);
        return index !== -1;
    }
}