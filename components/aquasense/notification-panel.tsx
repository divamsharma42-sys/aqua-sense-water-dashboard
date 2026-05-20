"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Droplets, Activity } from "lucide-react";

interface Notification {
  id: string;
  type: "warning" | "danger" | "info";
  message: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function NotificationPanel({ notifications, onDismiss }: NotificationPanelProps) {
  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "danger":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          icon: AlertTriangle,
          iconColor: "text-red-400",
        };
      case "warning":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/30",
          icon: Droplets,
          iconColor: "text-amber-400",
        };
      default:
        return {
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          icon: Activity,
          iconColor: "text-blue-400",
        };
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const styles = getNotificationStyles(notification.type);
          const Icon = styles.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className={`flex items-center gap-3 p-4 rounded-xl border ${styles.border} ${styles.bg} backdrop-blur-xl shadow-xl`}
            >
              <Icon className={`w-5 h-5 ${styles.iconColor} flex-shrink-0`} />
              <p className="text-sm text-white flex-1">{notification.message}</p>
              <button
                onClick={() => onDismiss(notification.id)}
                className="p-1 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
