export default function swDev() {


  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    console.log("Service Worker URL:", swUrl);

    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.log("Service Worker registered:", registration);

        return registration.pushManager.getSubscription()
          .then((subscription) => {
            if (subscription) {
              console.log("Already subscribed:", subscription);
              return subscription;
            }

            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: determineAppServerKey()
            });
          });
      })
      .then((sub) => {
        console.log("Push subscription:", sub);
       
      })
      .catch((error) => {
        console.error("Service Worker registration or Push setup failed:", error);
      });
  } else {
    console.warn("Push messaging is not supported in this browser.");
  }
}
