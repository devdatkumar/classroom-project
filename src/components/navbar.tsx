import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { auth, signOut, signIn } from "@/auth";
import { CourseHistory } from "@/app/dashboard/coursehistory";

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border-b-2 border-black dark:border-white">
      <div className="flex pl-2 items-center">
        <Button variant="outline">
          <Link href={"/"}>Learning Management System!</Link>
        </Button>
      </div>
      <div className="gap-x-2 p-1 flex justify-end">
        <div className="">
          {session?.user ? (
            <div className="flex justify-between gap-2">
              {session.user.email !== "admin@email.com" && (
                <Button asChild>
                  <CourseHistory />
                </Button>
              )}
              <Button asChild>
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
              <SignOutButton />
            </div>
          ) : (
            <Button asChild>
              <Link href={"/authenticate"}>Verify!</Link>
            </Button>
          )}
        </div>
        <div className="">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
