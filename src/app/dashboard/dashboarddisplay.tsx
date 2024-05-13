"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import courses from "@/lib/courses.json";
import { addCourseToUserHistory } from "./dashboard-action";
import { useToast } from "@/components/ui/use-toast";

export function DashboardDisplay({ sessionEmail }: any) {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap">
      {courses.map((course, index) => (
        <Card key={index} className="flex justify-between p-6 m-2">
          <div>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <Button
              className="m-2"
              variant="outline"
              onClick={async () => {
                addCourseToUserHistory(course, sessionEmail);

                toast({
                  title: "Opted for course: " + course.name,
                });
              }}
            >
              Practice
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
