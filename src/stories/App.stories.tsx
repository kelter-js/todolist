import type { Meta, StoryObj } from "@storybook/react";

import ReduxDecorator from "./WithReduxStoreDecorator";
import App from "../App";

const meta = {
  title: "Example/App",
  component: App,
  parameters: {
    layout: "centered",
    fullscreen: true,
  },
  tags: ["autodocs"],
  args: {},
  decorators: [ReduxDecorator],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
