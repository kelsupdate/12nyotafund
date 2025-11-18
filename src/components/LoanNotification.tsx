import { useState, useEffect, useRef } from 'react';

interface Notification {
  id: string;
  message: string;
  visible: boolean;
}

const loanMessages = [
  "Loan 4521 disbursed. KSh 5,000. Phone: 07xx xxx312.",
  "Loan 1189 sent. KSh 12,500. Phone: 07xx xxx984.",
  "Loan 9034 released. KSh 3,000. Phone: 07xx xxx721.",
  "Loan 6602 verified. KSh 20,000. Phone: 07xx xxx540.",
  "Loan 2215 disbursed. KSh 8,500. Phone: 07xx xxx194.",
  "Loan 7740 sent. KSh 15,000. Phone: 07xx xxx628.",
  "Loan 3351 released. KSh 7,200. Phone: 07xx xxx413.",
  "Loan 5098 verified. KSh 25,000. Phone: 07xx xxx875.",
  "Loan 6420 disbursed. KSh 4,800. Phone: 07xx xxx267.",
  "Loan 9124 sent. KSh 10,000. Phone: 07xx xxx530.",
  "Loan 2843 released. KSh 6,000. Phone: 07xx xxx109.",
  "Loan 7719 verified. KSh 18,500. Phone: 07xx xxx742.",
  "Loan 6332 sent. KSh 9,000. Phone: 07xx xxx680.",
  "Loan 4027 disbursed. KSh 3,500. Phone: 07xx xxx954.",
  "Loan 5591 released. KSh 22,000. Phone: 07xx xxx376.",
  "Loan 8745 verified. KSh 30,000. Phone: 07xx xxx821.",
  "Loan 1206 sent. KSh 2,800. Phone: 07xx xxx408.",
  "Loan 9973 released. KSh 16,000. Phone: 07xx xxx590.",
  "Loan 6630 verified. KSh 11,500. Phone: 07xx xxx744.",
  "Loan 3478 disbursed. KSh 5,600. Phone: 07xx xxx231."
];

export function LoanNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const showNotification = () => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        message: loanMessages[currentIndexRef.current],
        visible: true
      };

      setNotifications([newNotification]);
      currentIndexRef.current = (currentIndexRef.current + 1) % loanMessages.length;

      // Hide after 3 seconds
      setTimeout(() => {
        setNotifications(prev =>
          prev.map(n => n.id === newNotification.id ? { ...n, visible: false } : n)
        );
        // Remove after animation
        setTimeout(() => {
          setNotifications([]);
        }, 300);
      }, 3000);
    };

    // Start after 2 seconds
    timeoutId = setTimeout(() => {
      showNotification();

      // Then show notifications every 6 seconds (3s display + 3s pause)
      intervalId = setInterval(showNotification, 6000);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
            notification.visible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          }`}
          style={{ maxWidth: '300px' }}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
