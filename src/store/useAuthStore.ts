import { AuthLogin } from "@/actions/Auth/Auth";
import { UserEntity } from "@/domain/entity/UserEntity";
import { AuthStatus } from "@/infrastructure/interfaces/AuthStatus.interfaces";
import { create } from "zustand";

export interface AuthState {
    status: AuthStatus;

    token?: string;
    user?: UserEntity;

    Login: (email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(( set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,


    Login: async (email: string, password: string) => {
        const resp = await AuthLogin(email, password);

        if ( !resp ) {
            set({ status: 'authenticated', token: undefined, user: undefined });
            return false;
        } 

        // TODO: save token in storage

        set({ status: 'authenticated', token: resp.token, user: resp.user });
        return true;
    }
}))

