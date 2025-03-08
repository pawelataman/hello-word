import Reactotron from "reactotron-react-native";
import reactotronZustand from "reactotron-plugin-zustand";
import { useAuth } from "@clerk/clerk-expo";
import { useQuizStore } from "./core/state/quiz.state";

Reactotron.configure() // controls connection & communication settings
  .useReactNative()
  .use(
    reactotronZustand({
      stores: [
        { name: "auth", store: useAuth },
        { name: "quiz", store: useQuizStore },
      ],
      omitFunctionKeys: true,
    }),
  ) // add all built-in react native plugins
  .connect(); // let's connect!
