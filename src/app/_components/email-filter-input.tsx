'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { type ChangeEvent, useState, type FormEvent } from "react"


export const EmailFilterInput = () => {
  const params = useSearchParams()
  const router = useRouter()

  const email = params.get('email')
  const [value, setValue] = useState(email ?? undefined)

  function handleChange(e: ChangeEvent<HTMLInputElement>) { 
    setValue(e.target.value)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const newEmail = formData.get('email')?.toString()
 
    router.push(`/?email=${newEmail}`)
  }
  return (
    <div className="w-full px-6">
      <div className="font-bold">Are you a PassItOn User?</div>
      <div className="text-xs pb-1">See if you have any matches by entering your email address below</div>
      <form onSubmit={onSubmit} className="w-full grid grid-cols-2 gap-4">
        <input 
          className="text-black p-1 rounded-md"
          type="text"
          name="email"
          value={value}
          onChange={handleChange}
          placeholder="eg user@saa.org.sg, fsc.org.sg etc"
        />
        <button className="w-fit py-1 px-2 border-2 rounded-md" type="submit">Go</button>
      </form>
    </div>
  )
}
