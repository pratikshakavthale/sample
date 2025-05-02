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

          });
      })
      .then((sub) => {
        console.log("Push subscription:", sub);
        // You can send this `sub` to your server here
      })
      .catch((error) => {
        console.error("Service Worker registration or Push setup failed:", error);
      });
  } else {
    console.warn("Push messaging is not supported in this browser.");
  }
}
