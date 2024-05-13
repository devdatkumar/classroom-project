"use server";
import { z } from "zod";
import fsPromises from "fs/promises";
import path from "path";
const courseByUserFilePath = path.join(
  process.cwd(),
  "/src/lib/coursesbyuser.json"
);
import courseshistory from "@/lib/coursesbyuser.json";
import { courseByUserSchema } from "@/lib/definitions/coursebyuserschema";
import { courseSchema } from "@/lib/definitions/courseschema";

export const addCourseToUserHistory = async (
  course: z.infer<typeof courseSchema>,
  sessionEmail: string
) => {
  const courseByUser: z.infer<typeof courseByUserSchema> = {
    email: sessionEmail,
    ...course,
  };

  courseshistory.push(courseByUser);
  await fsPromises.writeFile(
    courseByUserFilePath,
    JSON.stringify(courseshistory)
  );
};
