import React from 'react'
import { auth } from '../_lib/auth'

export const metadata = {
  title: 'Guest area'

}

const page = async () => {
  const session = await auth()
  console.log(session);
  
  const firstname = session?.user?.name?.split(' ').at(0)
  return (
    <div>Welcome {firstname}</div>
  )
}

export default page