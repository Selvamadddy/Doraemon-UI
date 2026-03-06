export type ToastType = "success" | "error" | "warning" | "info";

export default interface ToastModel {
  id: number;
  message: string;
  type: ToastType;
}