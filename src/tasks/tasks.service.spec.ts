// In this spec.ts file we are going to test the methods of tasks.service.ts
// To Access tasksService we need to create a variable for it
// In tasks.service file the variable which is common for all methods is taskRepository of type TaskRepository
//  variable for Task repository should also be created by mocking it.

import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";

//Mock the required tasks in tasks repository 
const mockTaskRepository = () => ({

});

describe('Task service test', () => {
    //Variable declarations
    let tasksService;
    let taskRepository; //Need to be mocked, as it has interaction with database

    //Before each test cases the variables should be re-initialized, because each test should be performed independently
    beforeEach( async () => {
        //Create a module which mocks task.module.ts
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                //Since Task repository is injected by Task service, it need to be added in providers.
                {provide: TaskRepository, useFactory: mockTaskRepository},
            ]
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    })

    // Sample test
    it('Sample test', () => {
        expect(true).toEqual(true);
    })
});