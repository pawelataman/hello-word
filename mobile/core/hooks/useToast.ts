import Toast, { ToastOptions } from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, ToastAndroid } from "react-native";

type ToastType = "success" | "error" | "info";
const TOAST_COLOR = {
  success: "#10B981",
  error: "#EF4444",
  info: "#3B82F6",
};

export function useToast() {
  const { top } = useSafeAreaInsets();

  const showToast = (
    message: string,
    type: ToastType = "success",
    options?: ToastOptions,
  ) => {
    const opts = {
      ...options,
      duration: 5000,
      backgroundColor: TOAST_COLOR[type],
      position: Toast.positions.TOP + top,
      opacity: 1,
      shadow: false,
    };

    Platform.OS === "ios"
      ? Toast.show(message, opts)
      : ToastAndroid.showWithGravity(message, opts.duration, ToastAndroid.LONG);
  };

  return {
    showToast,
  };
}
