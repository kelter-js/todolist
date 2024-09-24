import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import EditableTitle from "../Components/EditableTitle";

const handleTaskChangeCallback = fn((id: string, title: string) =>
  alert(`$Called with id ${id} and with title ${title}`)
);

const meta = {
  title: "Example/EditableTitle",
  component: EditableTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "Test Title",
    id: "UniqueId",
    handleTaskChange: handleTaskChangeCallback,
  },
} satisfies Meta<typeof EditableTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
