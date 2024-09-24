import { StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "../state/store";

const ReduxDecorator = (Story: StoryFn) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

export default ReduxDecorator;
