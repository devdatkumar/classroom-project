import { auth } from "@/auth";
import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import coursesbyuser from "@/lib/coursesbyuser.json";

export async function CourseHistory() {
  const session = await auth();

  if (!session) {
    redirect("/authenticate");
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">History</Button>
      </SheetTrigger>
      <SheetContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coursesbyuser.map(
              (course, index) =>
                course.email == session.user?.email && (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.description}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </SheetContent>
    </Sheet>
  );
}
