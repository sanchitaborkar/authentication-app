import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const user = getUserFromCookie();

  if (!user) {
    redirect("/sign-in"); // if not logged in → go to login page
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard 🎉</h1>
      <p>Only logged-in users can see this page.</p>
    </div>
  );
}
