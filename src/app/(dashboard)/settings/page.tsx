import type { Metadata } from 'next';
import { SettingsTabs } from '@/components/settings/settings-tabs';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6 page-enter">
      <div>
        <h1 className="text-xl font-bold text-zinc-100">Settings</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Manage your account, billing, and notification preferences.
        </p>
      </div>
      <SettingsTabs />
    </div>
  );
}
