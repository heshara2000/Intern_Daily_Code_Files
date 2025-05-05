// "use client";
// import {ExclamationTriangleIcon} from '@heroicons/react/24/outline';
// import { useFlagsmith} from 'flagsmith/react';

// export default function Alert() {
//     const { welcome_message } = useFlagsmith(["welcome_message"]);
//     if (!welcome_message.enabled) {
//         return null;
//     }
//     return <div>{welcome_message.value}</div>;
// }

"use client";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFlagsmith } from "flagsmith/react";
import { useEffect, useState } from "react";

export default function Alert() {
  const { flagsmith, isLoading } = useFlagsmith();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR/hydration mismatch and undefined access
  if (!mounted || isLoading || !flagsmith) return null;

  const isEnabled = flagsmith.hasFeature("welcome_message");
  const message = flagsmith.getValue("welcome_message");

  if (!isEnabled || !message) return null;

  return (
    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md flex items-center gap-2">
      <ExclamationTriangleIcon className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}

