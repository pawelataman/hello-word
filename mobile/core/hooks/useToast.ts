import { toast } from "@backpackapp-io/react-native-toast";

type ToastType = "success" | "error" | "info";
const TOAST_COLOR = {
  success: "#10B981",
  error: "#EF4444",
  info: "#3B82F6",
};

export function useToast() {
  const showToast = (
    message: string,
    type: ToastType = "success",
    options?: any,
  ) => {
    const opts = {
      ...options,
      duration: 5000,
      style: {
        backgroundColor: TOAST_COLOR[type],
      },
      position: "top-center",
    };

    if (type === "error") {
      toast.error(message, {
        duration: 5000,
      });
    } else {
      toast(message, {
        duration: 5000,
      });
    }

    /*Toast.show(message, opts);
    Platform.OS === "ios"
      ? Toast.show(message, opts)
      : ToastAndroid.showWithGravity(message, opts.duration, ToastAndroid.LONG);*/
  };

  return {
    showToast,
  };
}
