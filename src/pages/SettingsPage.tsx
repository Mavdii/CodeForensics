import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layouts/AppLayout";
import { User, Shield, Activity, Bell, Palette, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

/**
 * Settings Page - Premium, Professional
 * Like Notion/Linear settings
 */
export default function SettingsPage() {
  const { user } = useAuth();
  const displayName = user?.email?.split("@")[0] || "User";
  const memberSince = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* Profile Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Profile</h2>
              <p className="text-sm text-muted-foreground">Your personal information</p>
            </div>
          </div>
          
          <div className="card-elevated p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{displayName}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
            
            <Separator />
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={displayName}
                  disabled
                  className="bg-muted/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Security</h2>
              <p className="text-sm text-muted-foreground">Keep your account secure</p>
            </div>
          </div>
          
          <div className="card-elevated divide-y divide-border">
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-medium text-foreground">Password</p>
                <p className="text-sm text-muted-foreground">
                  Last changed: Never
                </p>
              </div>
              <Button variant="outline" size="sm">
                Change password
              </Button>
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-medium text-foreground">Two-factor authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Enable
              </Button>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <Palette className="h-5 w-5 text-info" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Preferences</h2>
              <p className="text-sm text-muted-foreground">Customize your experience</p>
            </div>
          </div>
          
          <div className="card-elevated divide-y divide-border">
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-medium text-foreground">Dark mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-medium text-foreground">Default language</p>
                <p className="text-sm text-muted-foreground">
                  Auto-select language for new analyses
                </p>
              </div>
              <Button variant="outline" size="sm">
                Auto-detect
              </Button>
            </div>
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <Code2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Editor theme</p>
                  <p className="text-sm text-muted-foreground">
                    Monaco editor appearance
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Light
              </Button>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-success" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">Choose what updates you receive</p>
            </div>
          </div>
          
          <div className="card-elevated divide-y divide-border">
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-medium text-foreground">Email notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates about your analyses
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-medium text-foreground">Weekly summary</p>
                <p className="text-sm text-muted-foreground">
                  Get a weekly report of your code quality
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        {/* Usage Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-chart-5/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-chart-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Usage & Plan</h2>
              <p className="text-sm text-muted-foreground">Your account activity</p>
            </div>
          </div>
          
          <div className="card-elevated p-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-semibold text-foreground tabular-nums">24</p>
                <p className="text-sm text-muted-foreground mt-1">Total analyses</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground tabular-nums">47</p>
                <p className="text-sm text-muted-foreground mt-1">Issues detected</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground">{memberSince}</p>
                <p className="text-sm text-muted-foreground mt-1">Member since</p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Free Plan</p>
                <p className="text-sm text-muted-foreground">
                  50 analyses per month
                </p>
              </div>
              <Button variant="outline">
                Upgrade
              </Button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <div className="card-elevated border-destructive/20 p-6">
            <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Irreversible and destructive actions.
            </p>
            <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10">
              Delete account
            </Button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
