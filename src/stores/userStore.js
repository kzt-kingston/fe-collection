import { supabase } from "@/supabase";
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { useAuthStore } from "./authStore";

export const useUserStore = defineStore("user", () => {
  const auth = useAuthStore();
  // Actions
  const getUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", auth.user.id)
        .single();

      if (error) {
        console.error("Error getting user profile:", error);
        return;
      }
      console.log("User profile:", data);
      return data;
    } catch (error) {
      ElMessage.error("Error getting user profile");
      console.error("Error getting user profile:", error);
    }
  };

  const updateUserProfile = async (username, website, avatar_url) => {
    try {
      const updates = {
        id: auth.user.id,
        username: username,
        website: website,
        avatar_url: avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;

      ElMessage.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user profile:", error);
      ElMessage.error(error.message);
    }
  };

  return {
    getUserProfile,
    updateUserProfile,
  };
});
