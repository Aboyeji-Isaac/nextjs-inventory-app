import { getCurrentUser } from "@/lib/auth";
import { UserButton } from "@stackframe/stack";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-black rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Profile</h2>

          <div className="flex items-center gap-4 mb-6">
            <img
              src={user.profileImageUrl ?? "/avatar-placeholder.png"}
              alt={user.displayName ?? "User"}
              className="w-16 h-16 rounded-full border border-gray-800"
            />

            <div>
              <div className="font-medium">{user.displayName ?? "Unnamed User"}</div>
              <div className="text-sm text-gray-500">{user.primaryEmail}</div>
            </div>
          </div>

          <div className="flex gap-4">
            <UserButton />
          </div>
        </div>

        {/* Preferences (future-ready) */}
        <div className="bg-black rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Preferences</h2>

          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-center justify-between">
              <span>Theme</span>
              <span className="text-green-600">Dark</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <span className="text-gray-600">Coming soon</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Data export</span>
              <span className="text-gray-600">Coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}