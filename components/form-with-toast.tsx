"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import toast from "react-hot-toast";

type ActionState = { success: boolean; message: string } | null;

interface FormWithToastProps {
  children: React.ReactNode;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  className?: string;
  onSuccess?: () => void;
}

export function FormWithToast({ 
  children, 
  action, 
  className,
  onSuccess 
}: FormWithToastProps) {
  const [state, formAction] = useActionState(action, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (onSuccess) onSuccess();
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
}