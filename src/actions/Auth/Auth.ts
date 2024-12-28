import { tesloApi } from "@/config/api/tesloApi";
import type { AuthResponse } from "@/infrastructure/interfaces/Interfaces";
import { UserEntity } from '@/domain/entity/UserEntity';

const returnUserToken = (data: AuthResponse) => {
    const user: UserEntity = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles
    }

    return {
        user: user,
        token: data.token,
    }
}

export const AuthLogin = async(email: string, password: string) => {

    email.toLowerCase();    
    
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email,
            password
        });

        return returnUserToken(data);
    } catch (error) {
        console.error(error);
        return null;
    }
}