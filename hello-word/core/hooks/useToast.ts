import Toast, { ToastOptions } from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useToast() {
  const { top } = useSafeAreaInsets();

  const showToast = (message: string, options?: ToastOptions) => {
    Toast.show(message, {
      ...options,
      duration: 5000,
      backgroundColor: "#EF4444",
      position: Toast.positions.TOP + top,
    });
  };

  return {
    showToast,
  };
}
