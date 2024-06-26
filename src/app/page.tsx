"use client";
import CryptoJS from "crypto-js"; // Add this import

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./components/InputField";
import { formfields } from "./formfields";
import SelectField from "./components/SelectField";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Poster from "../../public/CINE.png";
import Gif from "../../public/Festivities.gif";

import { BsFillSendFill } from "react-icons/bs";
import branch_code from "./constants/branchCode";

declare global {
  interface Window {
    grecaptcha: ReCAPTCHA;
  }
}

interface ReCAPTCHA {
  ready: (callback: () => void) => void;
  execute: (sitekey: string, options: { action: string }) => Promise<string>;
}

const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^[a-zA-Z]{2,25}(\s[a-zA-Z.]{1,20})?(\s[a-zA-Z]{2,10})?(\s[a-zA-Z]{2,20})?$/.test(
          value
        ),
      { message: "Please Enter Full Name*" }
    ),
  studentNo: z
    .string()
    .trim()
    .refine(
      (value) => /^[2][0123](([x]{3})|[0-9]{2,3})([0-9]){3}(-d)?$/.test(value),
      {
        message: "Please Enter Correct Student Number*",
      }
    ),
  mobileNo: z
    .string()
    .trim()
    .refine((value) => /^[6-9]([0-9]){9}$/.test(value), {
      message: "Invalid Mobile Number*",
    }),
  email: z
    .string()
    .trim()
    .refine(
      (value) => /^([a-zA-Z]){2,15}2[0123]{1}[0-9]{5,6}@akgec.ac.in$/.test(value),
      { message: "Please Enter Correct College Email Id*" }
    ),
  year: z.enum(["1", "2", "3", "4"]),
  branch: z.enum([
    "CSE",
    "CSE-DS",
    "CSE-AIML",
    "AIML",
    "IT",
    "CSIT",
    "CS",
    "ECE",
    "EN",
    "ME",
    "CE",
    "CSE-HINDI",
  ]),
  gender: z.enum(["Male", "Female"]),
  isHosteler: z.enum(["true", "false"]),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { toast } = useToast();
  const [csrfToken, setCsrfToken] = useState("");
  const [captcha, setRecaptcha] = useState("");
  const [toggle, setToggle] = useState(false);
  // const [branchVerification, setBranchVerification] = useState(false);

  useEffect(() => {
    form.formState.isDirty && form.trigger("studentNo");
  }, [form.watch("studentNo")]);

  // Find the corresponding branch name in the branch_code array
  const getBranchVerification = (data: any) => {
    // console.log(data, "checking");
    let branchVerification = false;
    branch_code.map((item) => {
      if (
        item.code === data.studentNo.substring(2, data.studentNo.length - 3) &&
        item.branch === data.branch
      ) {
        console.log(data.studentNo.substring(2, data.studentNo.length - 3));
        console.log(item.branch, data.branch);
        // setBranchVerification(true);
        branchVerification = true;
        // return true;
      }
    });
    if (branchVerification) return true;
    else return false;
    // return false;
  };

  useEffect(() => {
    // Fetch CSRF token from the backend
    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API}/preregistration`)
      .then((response) => {
        setCsrfToken(response.data.csrfToken);
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });
  }, []);

  useEffect(() => {
    // Load the reCAPTCHA script dynamically
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}`;
    script.async = true;

    script.onload = () => {
      // Once the reCAPTCHA script is loaded, you can execute the reCAPTCHA verification.
      // Replace YOUR_RECAPTCHA_SITE_KEY with your actual reCAPTCHA site key.
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(`${process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}`, {
            action: "submit",
          })
          .then((token) => {
            // You can send the 'token' to your server for verification.
            // console.log("reCAPTCHA token:", token);
            setRecaptcha(token);
          });
      });
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed when the component unmounts
      document.body.removeChild(script);
    };
  }, [toggle]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Extract the student number from the form data
    const studentNo = data.studentNo;
    // Construct the expected email
    const expectedEmail = new RegExp(`^[a-z]+${studentNo}@akgec.ac.in$`);
    // console.log(data, expectedEmail);

    // Check if the submitted email matches the expected email
    if (!expectedEmail.test(data.email.toLowerCase())) {
      toast({
        variant: "destructive",
        description: "College Email Id and Student Number does not match!",
      });
      return; // Do not proceed with form submission
    }
    // Check if the branch and student number match
    // console.log(getBranchVerification(data));
    // if (!branchVerification) {
    // if (!getBranchVerification(data)) {
    //   toast({
    //     variant: "destructive",
    //     description: "Select correct branch!",
    //   });
    //   return; // Do not proceed with form submission
    // }
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // 128-bit key

    console.log(data);
    const re_defindData = {
      ...data,
      recaptchaToken: captcha,
    };
    // console.log(re_defindData);

    // Function to encrypt the data using CryptoJS
    const encryptData = (data: any, secretKey: any) => {
      try {
        const dataString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(
          dataString,
          secretKey
        ).toString();
        return encrypted;
      } catch (error) {
        // console.error("Encryption error:", error);
        return null; // Handle the error as needed
      }
    };
    // Encrypt the data
    const encryptedData = encryptData(re_defindData, secretKey);

    if (encryptedData) {
      // Proceed with the encrypted data in your HTTP request.
      const headers = {
        "X-CSRF-Token": csrfToken,
      };
      // console.log(encryptedData);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_NODE_API}/Decregister`,
          { encryptedData, recaptchaToken: captcha },
          { headers }
        )
        .then(() => {
          // console.log(res);
          toast({
            title: "Your response has been recorded.",
            description: (
              <pre className="m-0 w-[340px] rounded-md bg-green-600 p-4">
                <code className="text-white">
                  Please check email to verify!
                </code>
              </pre>
            ),
          });
        })
        .catch((error) => {
          // console.error("Error submitting form:", error);
          if (error.response.status === 401) {
            toast({
              variant: "destructive",
              description: "Already Registered!",
            });
          } else if (error.response.status === 400) {
            toast({
              variant: "destructive",
              description: "Recaptcha Verification Failed! Please Refresh",
            });
            if (toggle) setToggle(false);
            else setToggle(true);
          } else {
            toast({
              variant: "destructive",
              description: "Something went wrong! Please try again",
            });
            if (toggle) setToggle(false);
            else setToggle(true);
          }
        });
    }
  }

  return (
    <div className="flex flex-col p-6 md:flex-row items-center md:items-start">
      <div className="w-[90%] md:w-1/2">
        <Image src={Poster} alt="CINE" />
      </div>
      <div className="w-full md:w-1/2 md:shadow-2xl md:ml-6 md:p-6 p-3 sm:w-[80%]">
        <p className="font-semibold text-center md:text-[30px] text-[20px] text-[#0A012A] my-4">
          Hey! Get Yourself Registered
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
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

            <div className="w-full flex justify-center my-6">
              <Button type="submit" className="w-[200px] bg-[#0A012A]">
                <BsFillSendFill className="w-4 h-4 mr-2 text-white" />
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

// ("use client");

// const Page = () => {
//   return (
//     <div className="w-full flex justify-center items-center md:flex-row flex-col-reverse md:p-6 p-2">
//       <div className="md:w-1/2 w-full">
//         <Image src={Poster} alt="CINE" />
//       </div>
//       <div
//         className="flex flex-col items-center text-center md:text-[3rem] text-[25px] font-spartan md:w-1/2 md:p-7 w-full h-full"
//         style={{ fontFamily: "League Spartan" }}
//       >
//         <p className="mb-5"></p>
//         <p>Registrations are Closed!</p>
//         <Image src={Gif} alt="Gif" />
//       </div>
//     </div>
//   );
// };

// export default Page;
