// "use client";

// import { FlagsmithProvider } from 'flagsmith/react';
// import { createFlagsmithInstance } from 'flagsmith/isomorphic';
// import { useRef } from 'react';

// export default function Providers({ serverState, children }) {
//   const flagsmith = useRef(createFlagsmithInstance());

//   return (
//     <FlagsmithProvider flagsmith={flagsmith.current} serverState={serverState}>
//       {children}
//     </FlagsmithProvider>
//   );
// }
"use client";

import { FlagsmithProvider } from 'flagsmith/react';
import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { useRef, useEffect, useState } from 'react';

export default function Providers({ serverState, children }) {
  const flagsmith = useRef(createFlagsmithInstance());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Or a fallback like <div>Loading...</div>

  return (
    <FlagsmithProvider flagsmith={flagsmith.current} serverState={serverState}>
      {children}
    </FlagsmithProvider>
  );
}
