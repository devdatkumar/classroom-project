"use server";
import z from "zod";
import fsPromises from "fs/promises";
import path from "path";
const coursesFilePath = path.join(process.cwd(), "/src/lib/courses.json");
import courses from "@/lib/courses.json";
import { courseSchema } from "@/lib/definitions/courseschema";

export const addCourseAction = async (course: z.infer<typeof courseSchema>) => {
  if (!course) {
    return { error: "Invalid Data" };
  }

  try {
    courses.push(course);
    await fsPromises.writeFile(coursesFilePath, JSON.stringify(courses));
  } catch (error) {
    return { error: "Unknown Error found" };
  }
};

export const removeCourseAction = async (index: number) => {
  const updatedCourses = courses.filter((_, i) => i !== index);
  try {
    await fsPromises.writeFile(coursesFilePath, JSON.stringify(updatedCourses));
  } catch (error) {
    return { error: "Unknown Error found" };
  }
};
