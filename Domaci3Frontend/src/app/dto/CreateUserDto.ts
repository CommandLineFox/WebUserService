export class CreateUserDto {
    firstName: string = '';
    lastName: string = '';
    mail: string = '';
    password: string = '';

    readUserPermission: number = 0;
    createUserPermission: number = 0;
    updateUserPermission: number = 0;
    deleteUserPermission: number = 0;

    constructor(data: Partial<CreateUserDto>) {
        Object.assign(this, data);
    }
}
