"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string(),
  // TODO: correctly validate this to a valid phone number
  phone: z.string()
})

enum ChosenInput {
  Email = 'email',
  Phone = 'phone'
}

export default function LoginPage() {
  const [chosenInput, setChosenInput] = useState<ChosenInput>(ChosenInput.Email)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      phone: ""
    }
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }

  return(
    <Form {...form}>
      <h1 className='text-lg font-semibold py-4'>
        Login
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className=''>
          <div className='mb-4'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  )
}
