import api from "@/lib/api"


export const authService = {
  signIn: async (email: string, password: string) => {
    const res = await api.post("/auth/signin", { 
      email, password 
    }, { withCredentials: true });
    return res.data;
  },
  signUp: async (name: string, email: string, password: string) => {
    const res = await api.post("/auth/signup", { 
      name, email, password 
    }, { withCredentials: true });
    return res.data;
  },
  getMe: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  }
}