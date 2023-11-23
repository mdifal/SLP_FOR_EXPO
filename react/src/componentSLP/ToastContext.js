// ToastContext.js

import React, { createContext, useContext, useReducer } from 'react';

// Define the actions for your toast notifications
const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';

const ToastContext = createContext();

// Create a custom hook for using the ToastContext
export const useToast = () => {
  return useContext(ToastContext);
};

// Reducer function to handle toast actions
const toastReducer = (state, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case HIDE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      return state;
  }
};

// Toast Provider component
export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const showToast = (content) => {
    dispatch({ type: SHOW_TOAST, payload: { id: Date.now(), content } });
  };

  const hideToast = (id) => {
    dispatch({ type: HIDE_TOAST, payload: id });
  };

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
