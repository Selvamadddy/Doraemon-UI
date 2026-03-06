import ToastItem from "./ToastItem";
import type ToastModel from "./ToastModel";

interface Props {
  toasts: ToastModel[];
  removeToast: (id: number) => void;
}

export default function ToastStack({ toasts, removeToast }: Props) {
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 100, width: "320px" }}>
      {toasts.map(toast =>  <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)}/>)}
    </div>
  );
}