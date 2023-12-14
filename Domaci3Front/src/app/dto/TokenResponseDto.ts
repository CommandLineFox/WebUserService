export interface TokenResponseDto {
  token: string;
  permissions: {
    readUser: number;
    createUser: number;
    updateUser: number;
    deleteUser: number;
  };
}
