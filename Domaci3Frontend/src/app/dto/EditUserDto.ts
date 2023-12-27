export class EditUserDto {
    userId: number = 0;
    firstName: string = '';
    lastName: string = '';
    mail: string = '';

    readUserPermission: number = 0;
    createUserPermission: number = 0;
    updateUserPermission: number = 0;
    deleteUserPermission: number = 0;

    constructor(data: Partial<EditUserDto>) {
        Object.assign(this, data);
    }
}
