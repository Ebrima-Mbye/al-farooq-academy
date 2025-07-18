import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  UserCheck,
  Loader2,
} from "lucide-react";
import { countryCodes } from "@/data/countryCodes";

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  country_code: z.string().min(1, "Country code is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select your gender"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  emergency_contact_name: z
    .string()
    .min(2, "Emergency contact name is required"),
  emergency_contact_phone: z
    .string()
    .min(10, "Emergency contact phone is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileProps {
  onClose?: () => void;
  isModal?: boolean;
  onProfileUpdated?: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  onClose,
  isModal = false,
  onProfileUpdated,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<any>(null);
  const [countryCode, setCountryCode] = useState<string>(null);
  // const [countryCode, setCountryCode] = useState<string>(
  //   countryCodes[0].name + " " + countryCodes[0].code
  // );

  useEffect(() => {
    if (!countryCode) return;
    console.log("Country code:", countryCode);
  }, [countryCode]);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      email: "",
      country_code: "",
      phone: "",
      date_of_birth: "",
      gender: "",
      address: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setCurrentProfile(profile);
        form.reset({
          full_name: profile.full_name || "",
          email: profile.email || user.email || "",
          country_code: profile.phone?.split(" ")[0] || "+1",
          phone: profile.phone?.split(" ")[1] || profile.phone || "",
          date_of_birth: profile.date_of_birth || "",
          gender: profile.gender || "",
          address: profile.address || "",
          emergency_contact_name: profile.emergency_contact_name || "",
          emergency_contact_phone: profile.emergency_contact_phone || "",
        });
      } else {
        form.reset({
          full_name: user.user_metadata?.full_name || "",
          email: user.email || "",
          country_code: "+1",
          phone: "",
          date_of_birth: "",
          gender: "",
          address: "",
          emergency_contact_name: "",
          emergency_contact_phone: "",
        });
      }
    };

    fetchProfile();
  }, [user, form]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    setIsUpdating(true);
    try {
      // Update auth user email if changed
      if (data.email !== user.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: data.email,
        });

        if (authError) {
          throw new Error(`Email update failed: ${authError.message}`);
        }
      }

      // Update auth user metadata for full name
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { full_name: data.full_name },
      });

      if (metadataError) {
        throw new Error(`Metadata update failed: ${metadataError.message}`);
      }

      // Update profile table
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: data.full_name,
        email: data.email,
        phone: `${data.country_code} ${data.phone}`,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        address: data.address,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_phone: data.emergency_contact_phone,
        profile_completed: true,
      });

      if (profileError) {
        throw new Error(`Profile update failed: ${profileError.message}`);
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });

      if (onProfileUpdated) {
        onProfileUpdated();
      }

      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast({
        title: "Error updating profile",
        description:
          error.message ||
          "An unexpected error occurred while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const content = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Complete Your Profile</h3>
            <p className="text-sm text-muted-foreground">
              All fields are required for course enrollment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code *</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setCountryCode(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countryCodes.map((country, index) => (
                      <SelectItem key={index} value={country.code}>
                        {country.name} ({country.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Date of Birth *</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergency_contact_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Emergency Contact Name *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Emergency contact full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergency_contact_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Emergency Contact Phone *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Emergency contact phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Address *</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your full address"
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isUpdating} className="flex-1">
            {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {currentProfile?.profile_completed
              ? "Update Profile"
              : "Complete Profile"}
          </Button>
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );

  if (isModal) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }

  return content;
};

export default EditProfile;
