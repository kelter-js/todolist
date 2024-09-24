import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Task from "../Components/Task";

const onDeleteCallback = fn((id: string) => alert(id));
const onChangeMarkCallback = fn((id: string) => alert(id));
const handleTaskDescriptionChangeCallback = fn((id: string, title: string) =>
  alert(`called with ${id} and title ${title}`)
);

const meta = {
  title: "Example/Task",
  component: Task,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    description: "Test Description",
    isDone: false,
    id: "UniqueId",
    onDelete: onDeleteCallback,
    onChangeMark: onChangeMarkCallback,
    handleTaskDescriptionChange: handleTaskDescriptionChangeCallback,
  },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
