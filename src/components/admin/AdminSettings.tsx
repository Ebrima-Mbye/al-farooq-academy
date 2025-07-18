
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Save, Upload } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Academy Settings</CardTitle>
          <CardDescription>
            Configure global settings for Al-Farooq Academy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">General Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="academy-name">Academy Name</Label>
                <Input id="academy-name" defaultValue="Al-Farooq Academy" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academy-email">Contact Email</Label>
                <Input id="academy-email" type="email" placeholder="contact@academy.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="academy-description">Academy Description</Label>
              <Input id="academy-description" defaultValue="Where Clarity Meets Conviction" />
            </div>
          </div>

          <Separator />

          {/* Registration Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Registration Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Open Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new students to register</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-users">Maximum Students</Label>
                  <Input id="max-users" type="number" placeholder="1000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration-deadline">Registration Deadline</Label>
                  <Input id="registration-deadline" type="date" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Course Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-approve Enrollments</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve course enrollments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Payment</Label>
                  <p className="text-sm text-muted-foreground">Require payment for course enrollment</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <Separator />

          {/* Storage Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Storage & Media</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storage-bucket">Storage Bucket</Label>
                <div className="flex space-x-2">
                  <Input id="storage-bucket" defaultValue="bucket-1" disabled />
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connected to Supabase storage bucket for course videos and materials
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
