'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/db/db'
import { daysFromNow } from '@/utils/dateFuncs'
import { NextRequest, NextResponse } from 'next/server'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

export async function getCrntUser() {
  const session = cookies().get('user')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function checkUser(user) {
  const userExist = await db.agnt.findUnique({
    where: { email: user.email },
    select: { id: true, email: true, name: true, role: true },
  })

  if (!userExist) return redirect('/auth')

  console.log('checkUser: user: ', user)

  // שמור נתונים מחשבון הגוגל
  await db.agnt.update({
    where: { email: user.email },
    data: {
      gglName: user.name,
      picture: user.picture,
      gglSub: user.sub,
    },
  })

  // צור קוקי
  const saveToCookie = {
    id: userExist.id,
    email: user.email,
    name: userExist.name,
    picture: user.picture,
    role: userExist.role,
  }

  const expires = daysFromNow(365)
  const userToken = await encrypt({ ...saveToCookie, expires })
  cookies().set('user', userToken, { expires, httpOnly: true })

  return saveToCookie
  // return redirect('/')
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365 days')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function logout() {
  cookies().delete('user')
  redirect('/auth')
}

export async function updateSession(request: NextRequest) {
  const user = request.cookies.get('user')?.value
  if (!user) return

  // Refresh the user session so it doesn't expire
  const parsed = await decrypt(user)
  parsed.expires = daysFromNow(2)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'user',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })
  return res
}
