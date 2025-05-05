// "use client";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
// import { useFlagsmith } from "flagsmith/react";

// export default function Alert() {
//   const { flagsmith, isLoading } = useFlagsmith();

//   if (isLoading) return null;

//   // Check if the feature flag is enabled
//   const isEnabled = flagsmith.hasFeature("welcome_message");
//   const message = flagsmith.getValue("welcome_message");

//   if (!isEnabled) return null;

//   return (
//     <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md flex items-center gap-2">
//       <ExclamationTriangleIcon className="h-5 w-5" />
//       <span>{message}</span>
//     </div>
//   );
// }

"use client";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFlagsmith } from "flagsmith/react";
import { useEffect, useState } from "react";

export default function Alert() {
  
  const { flagsmith, isLoading } = useFlagsmith();
  const [mounted, setMounted] = useState(false);

  // Run useEffect to mark the component as mounted (to avoid SSR hydration issues)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Log the loading state and flagsmith object
  console.log("Loading state:", isLoading);
  console.log("Flagsmith object:", flagsmith);

  // Wait for the component to mount, flagsmith to be available, and ensure it's not loading
  if (!mounted || isLoading || !flagsmith) {
    console.log("Component not mounted yet, or isLoading is true, or flagsmith is not initialized.");
    return null;
  }

  // Check if the feature flag "welcome_message" is enabled and retrieve the message
  const isEnabled = flagsmith.hasFeature("welcome_message");
  const message = flagsmith.getValue("welcome_message");

  // Log the status of the feature flag and the retrieved message
  console.log("Feature flag 'welcome_message' enabled:", isEnabled);
  console.log("Message from feature flag 'welcome_message':", message);

  // If feature flag is not enabled or message is empty, return null
  if (!isEnabled || !message) {
    console.log("Feature flag is disabled or no message found.");
    return null;
  }

  // Return the alert box with the message
  return (
    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md flex items-center gap-2">
      <ExclamationTriangleIcon className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}


