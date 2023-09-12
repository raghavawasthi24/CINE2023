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
import axios from "axios"
import CryptoJS from 'crypto-js';
import { useEffect, useState } from "react";



const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^[a-zA-Z]{2,15}(\s[a-zA-Z.]{1,10})?(\s[a-zA-Z]{2,10})?(\s[a-zA-Z]{2,10})?$/.test(
          value
        ),
      { message: "Please Enter Full Name" }
    ),
  studentNo: z
    .string()
    .trim()
    .refine((value) => /^22[0-9]{5,6}$/.test(value), {
      message: "Please Enter Correct Student Number",
    }),
  mobileNo: z
    .string()
    .trim()
    .refine((value) => /^[6-9]([0-9]){9}$/.test(value), {
      message: "Invalid Mobile Number",
    }),
  email_: z
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

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { toast } = useToast();
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch CSRF token from the backend
    axios.get('https://csi-examportal.onrender.com/api/v1/auth/preregistration')
      .then((response) => {
        setCsrfToken(response.data.csrfToken);
      })
      .catch((error) => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const secretKey = CryptoJS.enc.Hex.parse('04e055a20e3b46ef6b26595c1533b8b360978ac0104e43571bbb9d894daadc86377817b1da0c2d68ed9fbabb7725f7dbf772e80e1161fcf32d2968c0cb02cf0f53'); // 128-bit key

    // const key="04e055a20e3b46ef6b26595c1533b8b360978ac0104e43571bbb9d894daadc86377817b1da0c2d68ed9fbabb7725f7dbf772e80e1161fcf32d2968c0cb02cf0f53"
    const encrypted_data=encryptData(data,secretKey)
    console.log("ye",encrypted_data)
    const headers = {
      'X-CSRF-Token': csrfToken,
    };
    axios.post("https://csi-examportal.onrender.com/api/v1/auth/register",encrypted_data, { headers }).then((res)=>{
      console.log(res)
    })
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const encryptData = (data:any, secretKey:any) => {
    console.log("jbrbfhew")
    // Create an initialization vector (IV) for added security
    const iv = CryptoJS.lib.WordArray.random(16);
    const dataString = JSON.stringify(data);
  
    // Encrypt the data using AES encryption and the provided secret key and IV
    const encrypted = CryptoJS.AES.encrypt(dataString, secretKey, {
      iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7,
    });
  
    // Combine the IV and ciphertext into a single string
    const ciphertext = iv.toString() + encrypted.toString();
     console.log(ciphertext)
    return ciphertext;
  };

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
