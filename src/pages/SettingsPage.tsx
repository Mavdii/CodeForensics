import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layouts/AppLayout";
import { User, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Settings Page
 * Profile, preferences, usage
 * Will be expanded in Phase 6
 */
export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      <div className="space-y-8 max-w-2xl">
        {/* Profile Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-medium text-foreground">Profile</h2>
          </div>
          
          <div className="card-soft p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Your email address cannot be changed.
              </p>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-medium text-foreground">Security</h2>
          </div>
          
          <div className="card-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Password</p>
                <p className="text-sm text-muted-foreground">
                  Change your password to keep your account secure.
                </p>
              </div>
              <Button variant="outline" disabled>
                Change password
              </Button>
            </div>
          </div>
        </section>

        {/* Usage Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-medium text-foreground">Usage</h2>
          </div>
          
          <div className="card-soft p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-2xl font-semibold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">Total analyses</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">—</p>
                <p className="text-sm text-muted-foreground">Member since</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
