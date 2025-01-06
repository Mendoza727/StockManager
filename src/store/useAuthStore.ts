import { AuthCheckStatus, AuthLogin, AuthRegister } from "@/actions/Auth/Auth";
import { StorageAdapter } from "@/config/adapters/storage-adapter";
import { UserEntity } from "@/domain/entity/UserEntity";
import { AuthStatus } from "@/infrastructure/interfaces/AuthStatus.interfaces";
import { create } from "zustand";

export interface AuthState {
  status: AuthStatus;

  token?: string;
  user?: UserEntity;

  Register: (fullName: string, email: string, password: string) => Promise<boolean>;
  Login: (email: string, password: string) => Promise<boolean>;
  Logout: () => Promise<void>;
  CheckStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  Register: async (fullName: string, email: string, password: string) => {
    const resp = await AuthRegister(
      fullName,
      email,
      password
    );

    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }

    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true;
  },

  Login: async (email: string, password: string) => {
    const resp = await AuthLogin(email, password);

    console.log(resp)

    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    // TODO: save token in storage
    await StorageAdapter.setItem("token", resp.token);

    set({ status: "authenticated", token: resp.token, user: resp.user });
    return true;
  },

  CheckStatus: async () => {
    const resp = await AuthCheckStatus();

    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
    }

    // TODO: save token in storage
    await StorageAdapter.setItem("token", resp.token);

    set({ status: "authenticated", token: resp.token, user: resp.user });
  },

  Logout: async () => {
    await StorageAdapter.removeItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
