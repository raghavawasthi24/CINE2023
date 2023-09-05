"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./components/InputField";
import { formfields } from "./formfields";
import SelectField from "./components/SelectField";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  full_name: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^[a-zA-Z]{2,15}(\s[a-zA-Z.]{1,10})?(\s[a-zA-Z]{2,10})?(\s[a-zA-Z]{2,10})?$/.test(
          value
        ),
      { message: "Please Enter Full Name" }
    ),
  student_no: z
    .string()
    .trim()
    .refine((value) => /^22[0-9]{5,6}$/.test(value), {
      message: "Please Enter Correct Student Number",
    }),
  roll_no: z
    .string()
    .trim()
    .refine((value) => /^[2][22][0][0][2][7][01]([0-9]){6}$/.test(value), {
      message: "Please Enter Correct Roll Number",
    }),
  phone_no: z
    .string()
    .trim()
    .refine((value) => /^[6-9]([0-9]){9}$/.test(value), {
      message: "Invalid Mobile Number",
    }),
  email: z
    .string()
    .trim()
    .refine(
      (value) => /^([a-zA-Z]){2,15}22[0-9]{5,6}@akgec.ac.in$/.test(value),
      { message: "Please Enter Correct College Email Id" }
    ),
  branch: z.enum(["cse", "it"]),
  gender: z.enum(["male", "female", "none"]),
  isHosteler: z.enum(["true", "false"]),
});

export default function page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-3"
        >
          {formfields.map((fields, index) => {
            if (fields.type === "input")
              return (
                <InputField
                  form={form}
                  name={fields.key}
                  label={fields.label}
                  placeholder={fields.placeHolder}
                  key={index}
                />
              );
            else
              return (
                <SelectField
                  form={form}
                  name={fields.key}
                  label={fields.label}
                  placeholder={fields.placeHolder}
                  options={fields.options || []}
                  key={index}
                />
              );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
