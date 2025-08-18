import { useState, useEffect, createContext, useContext } from "react";
import supabase from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
    isLoading: boolean;
    isAuth: boolean;
    user: User | null;
    logout: () => void;
    signIn: (email: string, password: string) => void;
    signUp: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuth, setAuth] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data }) => {
            const session = data.session;

            if (session) {
                const { data, error } = await supabase.auth.getUser();
                if (!data.user || error) {
                    logout();
                    setSession(null);
                    setAuth(false);
                } else {
                    setSession(session);
                    setAuth(true);
                }
            } else {
                setSession(null);
                setAuth(false);
            }
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setAuth(session !== null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            throw new Error(error.message);
        } else {
            //logged in
            //console.log(data);
        }
    };
    const signUp = () => {
        return;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw new Error(error.message);
        }
        setAuth(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isAuth,
                user: session?.user ?? null,
                logout,
                signIn,
                signUp,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
