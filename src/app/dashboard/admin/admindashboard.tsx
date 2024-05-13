"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { courseSchema } from "@/lib/definitions/courseschema";
import { addCourseAction } from "./admin-action";

import courses from "@/lib/courses.json";
import { removeCourseAction } from "./admin-action";
import { useToast } from "@/components/ui/use-toast";

export function AdminDashboard() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof courseSchema>) {
    const res = await addCourseAction(values);

    toast({
      title: "Added new course " + values.name,
    });
  }

  return (
    <Table className="shadow-2xl">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course, index) => (
          <TableRow key={index}>
            <TableCell>{course.name}</TableCell>
            <TableCell>{course.description}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                onClick={async () => {
                  await removeCourseAction(index);
                  toast({
                    title: "Removed course: " + course.name,
                  });
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead>Add a new Course</TableHead>
          <TableCell colSpan={3} align={"center"}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-wrap items-center gap-3 justify-center"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Course Name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
