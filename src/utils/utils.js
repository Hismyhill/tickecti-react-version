import toast from "react-hot-toast";

export const notifySuccess = (message) =>
  toast.success(message, { position: "top-right" });

export const notifyError = (message) =>
  toast.error(message, { position: "top-right" });

export const notifyInfo = (message) =>
  toast(message, { position: "top-right" });
