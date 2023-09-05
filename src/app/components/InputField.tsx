import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'

type Props = {
    form:any,
    name:string,
    label:string,
    placeholder:string
}

const InputField = ({form,name,label,placeholder}:Props) => {
  return (
    <div>
         <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
  )
}

export default InputField