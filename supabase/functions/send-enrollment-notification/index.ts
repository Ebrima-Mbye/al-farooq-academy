// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createServer } from "http-server";
const serve = createServer();
// import { Resend } from "npm:resend@2.0.0";
import * as dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EnrollmentNotificationRequest {
  userEmail: string;
  userName: string;
  courseTitle: string;
  courseInstructor: string;
  userPhone: string;
  userAddress: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      userEmail,
      userName,
      courseTitle,
      courseInstructor,
      userPhone,
      userAddress,
    }: EnrollmentNotificationRequest = await req.json();

    console.log(
      "Processing enrollment notification for:",
      userName,
      "in course:",
      courseTitle
    );

    const studentEmailResponse = await resend.emails.send({
      from: "Al-Farooq Academy <noreply@alfarooqacademy.com>",
      to: [userEmail],
      subject: `Enrollment Confirmation - ${courseTitle}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #2563eb; text-align: center;">Al-Farooq Academy</h1>
          
          <h2>Enrollment Confirmation</h2>
          
          <p>Dear ${userName},</p>
          
          <p>Congratulations! You have successfully enrolled in:</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">${courseTitle}</h3>
            <p style="margin: 5px 0;"><strong>Instructor:</strong> ${courseInstructor}</p>
            <p style="margin: 5px 0;"><strong>Format:</strong> In-Person</p>
          </div>
          
          <p><strong>What's Next?</strong></p>
          <ul>
            <li>You will receive course location and schedule details within 24-48 hours</li>
            <li>Please ensure your contact information is up to date</li>
            <li>Prepare any required materials as specified by your instructor</li>
          </ul>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          The Al-Farooq Academy Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    const adminEmailResponse = await resend.emails.send({
      from: "Al-Farooq Academy <notifications@alfarooqacademy.com>",
      to: ["admin@alfarooqacademy.com"],
      subject: `New Enrollment - ${courseTitle}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #2563eb;">New Course Enrollment</h1>
          
          <p>A new student has enrolled in one of your courses:</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0;">Course Details</h3>
            <p style="margin: 5px 0;"><strong>Course:</strong> ${courseTitle}</p>
            <p style="margin: 5px 0;"><strong>Instructor:</strong> ${courseInstructor}</p>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0;">Student Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${userName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${userPhone}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${userAddress}</p>
          </div>
          
          <p><strong>Action Required:</strong></p>
          <ul>
            <li>Review the student's profile in the admin dashboard</li>
            <li>Send course location and schedule details</li>
            <li>Add the student to your course communication channels</li>
          </ul>
          
          <p>Login to the admin dashboard to manage this enrollment.</p>
        </div>
      `,
    });

    console.log("Student email sent:", studentEmailResponse);
    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        studentEmailId: studentEmailResponse.data?.id,
        adminEmailId: adminEmailResponse.data?.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in enrollment notification function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
