import { tesloApi } from "@/config/api/tesloApi";
import type { AuthResponse } from "@/infrastructure/interfaces/Interfaces";
import { UserEntity } from "@/domain/entity/UserEntity";

const returnUserToken = (data: AuthResponse) => {
  const user: UserEntity = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  };

  return {
    user: user,
    token: data.token,
  };
};

export const AuthLogin = async (email: string, password: string) => {
  email.toLowerCase();

  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    console.log(data);

    return returnUserToken(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const AuthRegister = async(fullName: string, email: string, password: string) => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password
    });

    return returnUserToken(data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const AuthCheckStatus = async () => {
  try {
    const { data } = await tesloApi.get("/auth/check-status");
    return returnUserToken(data);
  } catch (error) {
    throw new Error(`Error checking auth: ${error}`);
  }
};
