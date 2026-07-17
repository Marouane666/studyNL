"use client";

import { useEffect, useState } from "react";
import { SiAndroidauto } from "react-icons/si";
import { FaAppStoreIos } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#092A4D";

const INSTALL_DISMISSED_KEY = "studynl.pwa.installDismissed";
const PUSH_ASKED_KEY = "studynl.pwa.pushAsked";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Device = {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isStandalone: boolean;
};

function detectDevice(): Device {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;
  return { isIOS, isAndroid, isMobile: isIOS || isAndroid, isStandalone };
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

// Triggers the browser's own native permission dialog — there is no way to
// subscribe without it. "Implicit" here just means our UI doesn't show a
// second custom prompt asking first; we go straight to the OS-level one.
async function subscribeToPush(): Promise<void> {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!publicKey || !("serviceWorker" in navigator) || !("PushManager" in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });
  }

  await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription),
  }).catch(() => {});
}

export function PwaBoot() {
  const t = useT();
  const [device, setDevice] = useState<Device | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installDismissed, setInstallDismissed] = useState(true);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    setDevice(detectDevice());
    try {
      setInstallDismissed(window.localStorage.getItem(INSTALL_DISMISSED_KEY) === "1");
    } catch {
      setInstallDismissed(false);
    }

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    function onAppInstalled() {
      setDeferredPrompt(null);
      persistDismissed();
      // Covers installs triggered from the browser's own UI (e.g. the address-bar
      // icon) rather than our button, which otherwise chains this itself.
      maybeSubscribePush();
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    // Already-installed users (including iOS, which has no beforeinstallprompt
    // event at all) still get one implicit chance to opt into push.
    if (detectDevice().isStandalone) maybeSubscribePush();

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  function persistDismissed() {
    setInstallDismissed(true);
    try {
      window.localStorage.setItem(INSTALL_DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function maybeSubscribePush() {
    if (typeof Notification === "undefined" || Notification.permission !== "default") return;
    try {
      if (window.localStorage.getItem(PUSH_ASKED_KEY) === "1") return;
      window.localStorage.setItem(PUSH_ASKED_KEY, "1");
    } catch {
      /* localStorage unavailable — fall through and ask anyway */
    }
    subscribeToPush();
  }

  async function handleInstallClick() {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } catch {
      /* user dismissed the native prompt or it failed — nothing to recover */
    }
    setDeferredPrompt(null);
    setInstalling(false);
    persistDismissed();
    maybeSubscribePush();
  }

  if (!device || !device.isMobile) return null;

  const showBanner = !device.isStandalone && !installDismissed && (device.isAndroid ? !!deferredPrompt : device.isIOS);
  if (!showBanner) return null;

  const platformActionLabel = device.isAndroid
    ? t("pwa.install.actionAndroid")
    : device.isIOS
      ? t("pwa.install.actionIOS")
      : t("pwa.install.action");

  const PlatformIcon = device.isAndroid ? SiAndroidauto : device.isIOS ? FaAppStoreIos : FaMobileScreen;

  return (
    <PwaCard
      icon={<PlatformIcon size={16} />}
      title={t("pwa.install.title")}
      subtitle={device.isAndroid ? t("pwa.install.valueProp") : t("pwa.install.iosSubtitle")}
      actionLabel={device.isAndroid && installing ? t("pwa.install.installing") : platformActionLabel}
      onAction={device.isAndroid ? handleInstallClick : persistDismissed}
      onDismiss={persistDismissed}
      dismissAriaLabel={t("pwa.dismissAriaLabel")}
    />
  );
}

function PwaCard({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  onDismiss,
  dismissAriaLabel,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  actionLabel: string;
  onAction: () => void;
  onDismiss: () => void;
  dismissAriaLabel: string;
}) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-sm">
      <div className="relative rounded-4xl bg-white p-4 text-center shadow-[0_12px_40px_rgba(9,42,77,0.22)]">
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissAriaLabel}
          className="absolute -right-2 -top-2 inline-flex size-5 items-center justify-center rounded-full bg-white text-xs leading-none shadow ring-1 ring-[#092A4D]/10 hover:text-[#092A4D]"
          style={{ color: `${NAVY}80` }}
        >
          <CloseIcon />
        </button>

        <h2 className="text-base font-extrabold" style={{ color: NAVY }}>
          {title}
        </h2>
        <p className="mx-auto mt-1 max-w-70 text-xs leading-snug" style={{ color: `${NAVY}99` }}>
          {subtitle}
        </p>

        <button
          type="button"
          onClick={onAction}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          {icon}
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
