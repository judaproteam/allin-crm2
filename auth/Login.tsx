'use client'

import Script from 'next/script'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { checkUser } from './authFuncs'
import { useRouter } from 'next/navigation'
import { useUser } from '@/utils/userCtx'

declare global {
  const google: any
}

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    try {
      if (google) initGoogle()
    } catch (error) {}
  }, [])

  // GOOGLE LOGIN
  const client_id = process.env.NEXT_PUBLIC_GGLID

  async function callback(gglUser) {
    let user = null
    try {
      user = jwtDecode(gglUser.credential)

      await checkUser({
        email: user.email,
        gglName: user.name,
        picture: user.picture,
        gglSub: user.sub,
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  function initGoogle() {
    google.accounts.id.initialize({
      client_id,
      callback,
    })

    // google.accounts.id.prompt()
    google.accounts.id.renderButton(document.getElementById('gglBtn'), {
      width: 250,
    })
  }

  return (
    <div>
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={initGoogle}
        strategy="lazyOnload"
      />

      <div id="gglBtn"></div>
    </div>
  )
}
