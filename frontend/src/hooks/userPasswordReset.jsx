import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export const usePasswordReset = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const reset = async (token, newPassword, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword, confirmPassword }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Password reset failed");
        return false;
      }

      // Password reset successful
      return true;
    } catch (error) {
      setError("Network error. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { reset, isLoading, error };
};

// Fix the export - remove "default" since it's a named export
export default usePasswordReset;
