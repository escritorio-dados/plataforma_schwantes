import { Alert, Snackbar } from '@mui/material';
import { createContext, useCallback, useState, useContext, ReactNode } from 'react';

interface IToastData {
  message: string;
  severity: 'error' | 'info' | 'success' | 'warning';
  duration?: number;
}

interface IToastContextData {
  toast(data: IToastData): void;
}

type IToastProviderProps = { children: ReactNode };

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

export function ToastProvider({ children }: IToastProviderProps) {
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState<IToastData>({
    message: '',
    severity: 'info',
    duration: 6000,
  });

  const toast = useCallback(({ message, severity, duration }: IToastData) => {
    setOpen(true);

    setToastData({
      message,
      severity,
      duration: duration || 6000,
    });
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={toastData.duration}
        onClose={() => setOpen(false)}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Alert elevation={6} variant="filled" severity={toastData.severity}>
          {toastData.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast(): IToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}
