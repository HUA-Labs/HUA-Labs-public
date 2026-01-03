'use client';

import { WelcomePage } from "@hua-labs/hua-ux/framework";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useMotion } from '@hua-labs/hua-ux/framework';

export default function HomePage() {
  const { ref, isVisible } = useMotion('fade-in');

  return (
    <div ref={ref} className={isVisible ? 'opacity-100' : 'opacity-0'}>
      {/* Language Toggle - Fixed position at top right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      {/* Welcome Page */}
      <WelcomePage
        projectName="HUA UX"
        showFeatures={true}
        showQuickLinks={true}
      />
    </div>
  );
}
