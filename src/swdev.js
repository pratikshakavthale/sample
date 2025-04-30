export default function swDev() {
  // Convert base64 VAPID key to Uint8Array
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function determineAppServerKey() {
    const vapidPublicKey =
      "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

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

            // return registration.pushManager.subscribe({
            //   userVisibleOnly: true,
            //   applicationServerKey: determineAppServerKey()
            // });
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
