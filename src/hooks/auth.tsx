"use client"
import { AxiosError } from "axios";
import { useRouter } from 'next/navigation';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';

import { api } from '@/services/api';

type signProps = {
    email: string;
    password: string;
}

type User = {
    name: string;
    email: string;
    isAdmin: number;
    avatar: string;
}

type AuthContextType = {
    user: User | null;
    signIn: (data: signProps) => Promise<void>
    signOut: () => void;
    updateProfile: ({user, avatarFile}: any) => Promise<void>
}



export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}:any) {
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    async function signIn({email, password}:signProps) {
        try {
            const response = await api.post("/sessions", {email, password});
            const { user, token } = response.data;

            setCookie(undefined, 'foodexplorer.token', token, {
                maxAge: 60 * 60 * 1, //1 hour
                path: "/",
            })

            api.defaults.headers["Authorization"] = "Bearer " + token;

            localStorage.setItem("@foodexplorer:user", JSON.stringify(user));
            //localStorage.setItem("@foodexplorer:token", token);
            setUser(user);

            router.push("/Home");

        } catch (e) {
            const error = e as AxiosError;
            const responseData = error.response?.data as | {message: string[]} | undefined;

            if (responseData) {
                alert(responseData?.message);
            } else {
                alert("Não foi possível entrar.");
            }
        }
    }

    function signOut(){

        destroyCookie(null, 'foodexplorer.token');
        localStorage.removeItem("@foodexplorer:user");
        setUser(null);

        router.push("/");
    }

    async function updateProfile({ user, avatarFile }: any){
        try {

            if (avatarFile){
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }

            await api.put("/users", user);
            localStorage.setItem("@foodexplorer:user", JSON.stringify(user));

            setUser(user);
            alert("Perfil atualizado com sucesso!");
            router.push("/Home");


        } catch (e) {
            const error = e as AxiosError;
            const responseData = error.response?.data as | {message: string[]} | undefined;

            if (responseData) {
                alert(responseData?.message);
            } else {
                alert("Não foi possível atualizar o perfil.");
            }
        }
    }


    useEffect(() => {
        const user = localStorage.getItem("@foodexplorer:user");

        if (user) {

            const usuario = JSON.parse(user)

            console.log(usuario)

            //setUser({usuario})
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            signIn,
            user,
            signOut,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { useAuth };
