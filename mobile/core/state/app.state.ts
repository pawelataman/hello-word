import { create } from "zustand/react";

type State = {
  isLoading: boolean;
};
type Actions = {
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
};

type AppState = State & Actions;

const INITIAL_STATE: State = {
  isLoading: false,
};

export const useAppStore = create<AppState>((set) => ({
  ...INITIAL_STATE,
  setIsLoading: (isLoading: boolean) => {
    return set({ isLoading });
  },
  reset: () => {
    return set({ ...INITIAL_STATE });
  },
}));
