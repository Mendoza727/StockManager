export interface UserEntity {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
}