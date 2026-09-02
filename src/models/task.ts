export type TaskStatus = "pending" | "completed";

//Representar con tipos la información que utilizará toda la aplicación.

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  createdAt: Date;
}
