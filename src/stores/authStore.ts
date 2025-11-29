import type { AuthState } from "@/types/auth";
import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") || null : null,
  user: null,
  loading: false,
  error: null,

  setAccessToken: (token: string | null) =>
    set(() => ({
      accessToken: token,
  })),

  clearState: () =>
    set(() => ({
      accessToken: null,
      user: null,
      loading: false,
    })),

  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      
      const { accessToken } = await authService.signIn(email, password);
      
      get().setAccessToken(accessToken);

      await get().fetchMe();
      
      typeof window !== "undefined" && localStorage.setItem("accessToken", accessToken);

      toast.success("Chào mừng trở lại với hệ thống 🥰🥰!");
    } catch (error) {
      set({ error: "Đăng nhập thất bại" });
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      await authService.signUp(name, email, password);
      toast.success("Đăng ký thành công! Chào mừng bạn đến với hệ thống 🥳🥳!");
    } catch (error) {
      set({ error: "Đăng ký thất bại" });
      toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      set({ loading: false });
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true, error: null });
      const res = await authService.getMe();
      set({ user: res.user });
    } catch (error) {
      set({ error: "Không thể lấy thông tin người dùng." });
      toast.error("Không thể lấy thông tin người dùng.");
    } finally {
      set({ loading: false });
    }
  },
}));
