import { useToast } from 'primevue/usetoast';
export const useNotification = () => {
  const toast = useToast();

  function errorMessage(message: string) {
    toast.add({
      severity: 'error',
      detail: message,
      life: 10000,
    });
  }

  function successMessage(message: string) {
    toast.add({
      severity: 'success',
      detail: message,
      life: 10000,
    });
  }

  function warningMessage(message: string) {
    toast.add({
      severity: 'warn',
      detail: message,
      life: 10000,
    });
  }

  return {
    errorMessage,
    successMessage,
    warningMessage,
  };
};
