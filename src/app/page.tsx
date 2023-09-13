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
import { useEffect, useState } from "react";
import Image from "next/image";
import Poster from "../../public/CINE.png"
import {BsFillSendFill }from "react-icons/bs"


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
        /^[a-zA-Z]{2,15}(\s[a-zA-Z.]{1,10})?(\s[a-zA-Z]{2,10})?(\s[a-zA-Z]{2,10})?$/.test(
          value
        ),
      { message: "Please Enter Full Name" }
    ),
  studentNo: z
    .string()
    .trim()
    .refine((value) => /^2[12]{1}[0-9]{5,6}$/.test(value), {
      message: "Please Enter Correct Student Number",
    }),
  mobileNo: z
    .string()
    .trim()
    .refine((value) => /^[6-9]([0-9]){9}$/.test(value), {
      message: "Invalid Mobile Number",
    }),
  email: z
    .string()
    .trim()
    .refine(
      (value) => /^([a-zA-Z]){2,15}2[12]{1}[0-9]{5,6}@akgec.ac.in$/.test(value),
      { message: "Please Enter Correct College Email Id" }
    ),
  branch: z.enum(["CSE", "IT"]),
  gender: z.enum(["Male", "Female", "none"]),
  isHosteler: z.enum(["true", "false"]),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { toast } = useToast();
  const [csrfToken, setCsrfToken] = useState('');
  const [captcha,setRecaptcha]=useState("")

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

  useEffect(() => {
    // Load the reCAPTCHA script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6Lf8ViAoAAAAADuxEptRi7-3b1x-9_Kg6JYi1UqC';
    script.async = true;

    script.onload = () => {
      // Once the reCAPTCHA script is loaded, you can execute the reCAPTCHA verification.
      // Replace YOUR_RECAPTCHA_SITE_KEY with your actual reCAPTCHA site key.
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('6Lf8ViAoAAAAADuxEptRi7-3b1x-9_Kg6JYi1UqC', { action: 'submit' }).then((token) => {
          // You can send the 'token' to your server for verification.
          console.log('reCAPTCHA token:', token);
          setRecaptcha(token)
        });
      });
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed when the component unmounts
      document.body.removeChild(script);
    };
  }, []);



  // const GoogleCaptcha = () => {
  //   const { executeRecaptcha } = useGoogleReCaptcha();
  //   const handleReCaptchaVerify = useCallback(async () => {
  //     if (!executeRecaptcha) {
  //       console.log("Execute recaptcha not yet available");
  //       return;
  //     }
  
  //     const token = await executeRecaptcha();
  //     console.log(token) 

  //     setRecaptcha(token)
  //   }, [executeRecaptcha]);
    
  //   useEffect(() => {
  //     handleReCaptchaVerify();
  
  //   }, [handleReCaptchaVerify]);
  
   
  // };




  function onSubmit(data: z.infer<typeof FormSchema>) {
    const secretKey = "b5c1f7e190de3e88ca462b3f98b41c76a88f8a6ab82be52c75e1871cc653b37"; // 128-bit key

    console.log(data)
    const re_defindData ={
      ...data,
      "recaptchaToken":captcha
    } 
    console.log(re_defindData)
    // const key="04e055a20e3b46ef6b26595c1533b8b360978ac0104e43571bbb9d894daadc86377817b1da0c2d68ed9fbabb7725f7dbf772e80e1161fcf32d2968c0cb02cf0f53"
    // const encrypted_data=encryptData(re_defindData,secretKey)
    // console.log("ye",encrypted_data)
    const headers = {
      'X-CSRF-Token': csrfToken,
    };
    axios.post("https://csi-examportal.onrender.com/api/v1/auth/register",re_defindData, { headers }).then((res)=>{
      console.log(res)
      toast({
        description: "Please check your email to verify!",
      });
    })
    .catch((err)=>{
      toast({
        variant:"destructive",
        description: "Please check your email to verify!",
      });
    })
   
  }

  // const encryptData = (data:any, secretKey:any) => {
    // console.log("jbrbfhew")
    // // Create an initialization vector (IV) for added security
    // const iv = CryptoJS.lib.WordArray.random(16);
    // const dataString = JSON.stringify(data);
  
    // // Encrypt the data using AES encryption and the provided secret key and IV
    // const encrypted = CryptoJS.AES.encrypt(dataString, secretKey, {
    //   // iv,
    //   mode: CryptoJS.mode.CFB,
    //   padding: CryptoJS.pad.Pkcs7,
    // });
  
    // // Combine the IV and ciphertext into a single string
    // // const ciphertext = iv.toString() + encrypted.toString();
    // const ciphertext = encrypted.toString();
    //  console.log(ciphertext)
    // return ciphertext;


  //   console.log(data)
  //   const dataString = JSON.stringify(data);

  //   const key = 'b5c1f7e190de3e88ca462b3f98b41c76a88f8a6ab82be52c75e1871cc653b37'; // Replace with your secret key
  //   const encrypted = CryptoJS.AES.encrypt(dataString, key).toString();
  //   console.log(encrypted)
  //   return encrypted
  //   // setEncryptedData(encrypted);
  // };


  // const encryptData = (data:any, secretKey:any) => {
  //   console.log(data,secretKey)
  //   try {
  //     const dataString = JSON.stringify(data);
  //     const encrypted = CryptoJS.AES.encrypt(dataString, secretKey).toString();
  //     console.log(encrypted);
  //     return encrypted;
  //   } catch (error) {
  //     console.error('Encryption error:', error);
  //     return null; // Handle the error as needed
  //   }
  // };



  return (
    <div className="flex">
      <div className="w-1/2 h-screen">
        <Image src={Poster} alt="CINE"/>
      </div>
      <Form {...form}>
        
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 p-6 space-y-6"
        >
          <p className="font-semibold text-center text-lg text-blue-700">Hey! Get Yourself Registered</p>
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
          <Button type="submit" className=" bg-[#0A012A] w-full">
          <BsFillSendFill className="w-4 h-4 mr-2 text-white"/>Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
