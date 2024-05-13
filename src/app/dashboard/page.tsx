import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardDisplay } from "@/app/dashboard/dashboarddisplay";
export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/authenticate");
  }
  if (session.user?.email == "admin@email.com") {
    redirect("/dashboard/admin");
  }
  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 gap-5">
        <div className="md:grid gap-4">
          {session.user?.email}
          <DashboardDisplay sessionEmail={session.user?.email!} />
        </div>
      </div>
    </>
  );
}
