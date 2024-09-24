import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import AddItemForm from "../Components/AddItemForm";

const callback = fn((title: string) => alert(title));

const meta = {
  title: "Example/AddItemForm",
  component: AddItemForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onAddItem: callback },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
