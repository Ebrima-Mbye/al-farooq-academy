import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    instructor: string;
    price: number | null;
    category: string | null;
  };
  userProfile: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
    date_of_birth: string | null;
    address: string | null;
    emergency_contact_name: string | null;
    emergency_contact_phone: string | null;
    profile_completed: boolean;
  } | null;
  onProfileUpdate: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  course,
  userProfile,
  onProfileUpdate,
}) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showProfileIncomplete, setShowProfileIncomplete] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleEnroll = async () => {
    if (!user || !userProfile) return;

    // Check if profile is complete
    if (!userProfile.profile_completed) {
      setShowProfileIncomplete(true);
      return;
    }

    setIsEnrolling(true);

    try {
      // Check if user is already enrolled
      const { data: existingEnrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .single();

      if (existingEnrollment) {
        toast({
          title: "Already Enrolled",
          description: "You are already enrolled in this course.",
          variant: "default",
        });
        onClose();
        return;
      }

      // Create enrollment
      const { error: enrollmentError } = await supabase
        .from("enrollments")
        .insert({
          user_id: user.id,
          course_id: course.id,
          status: "enrolled",
        });

      if (enrollmentError) throw enrollmentError;

      // Send notification email
      const { error: emailError } = await supabase.functions.invoke(
        "send-enrollment-notification",
        {
          body: {
            userEmail: userProfile.email,
            userName: userProfile.full_name,
            courseTitle: course.title,
            courseInstructor: course.instructor,
            userPhone: userProfile.phone,
            userAddress: userProfile.address,
          },
        }
      );

      if (emailError) {
        console.error("Email notification error:", emailError);
        // Don't throw error here as enrollment was successful
      }

      toast({
        title: "Enrollment Successful!",
        description: `You have been enrolled in ${course.title}. A confirmation email has been sent.`,
        variant: "default",
      });

      onClose();
    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        title: "Enrollment Failed",
        description:
          "There was an error processing your enrollment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleCompleteProfile = () => {
    onProfileUpdate();
    onClose();
  };

  const missingFields = [];
  if (!userProfile?.full_name) missingFields.push("Full Name");
  if (!userProfile?.phone) missingFields.push("Phone Number");
  if (!userProfile?.date_of_birth) missingFields.push("Date of Birth");
  if (!userProfile?.address) missingFields.push("Address");
  if (!userProfile?.emergency_contact_name)
    missingFields.push("Emergency Contact Name");
  if (!userProfile?.emergency_contact_phone)
    missingFields.push("Emergency Contact Phone");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enroll in Course</DialogTitle>
          <DialogDescription>
            Confirm your enrollment in this course
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{course.title}</h3>
            <p className="text-muted-foreground">
              Instructor: {course.instructor}
            </p>
            {course.category && (
              <Badge variant="secondary" className="mt-2">
                {course.category}
              </Badge>
            )}
            {course.price !== null && (
              <p className="text-xl font-bold text-primary mt-2">
                ${course.price}
              </p>
            )}
          </div>

          {showProfileIncomplete && missingFields.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please complete your profile before enrolling. Missing fields:
                <ul className="list-disc list-inside mt-2">
                  {missingFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {userProfile?.profile_completed && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your profile is complete. You can proceed with enrollment.
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
            <p>
              <strong>Important:</strong> This is an in-person course. After
              enrollment, you will receive further instructions about the course
              location and schedule.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>

            {!userProfile?.profile_completed ? (
              <Button onClick={handleCompleteProfile} className="flex-1">
                Complete Profile
              </Button>
            ) : (
              <Button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="flex-1"
              >
                {isEnrolling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enrolling...
                  </>
                ) : (
                  "Confirm Enrollment"
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
