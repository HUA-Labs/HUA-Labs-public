'use client';

import { HuaUxPage } from "@hua-labs/hua-ux/framework";
import { Button, Card } from "@hua-labs/hua-ux";

export default function HomePage() {
  return (
    <HuaUxPage title="Home" description="Welcome to hua-ux">
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="max-w-2xl w-full">
          <div className="p-8 text-center space-y-6">
            <h1 className="text-4xl font-bold">Welcome to hua-ux</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your project has been created successfully!
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="default">Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </Card>
      </div>
    </HuaUxPage>
  );
}
