import Login from '@/auth/Login'

export default function AuthPage() {
  return (
    <div className="col-span-2 overflow-hidden">
      <div className="grid grid-cols-2  w-screen bg-white place-items-center">
        <div className="grid place-items-center gap-8">
          <h1 className="text-5xl font-bold">ברוכים הבאים ל Allin</h1>
          <Login />
        </div>
        <img src="auth_bg.jpg" alt="" className="w-full h-screen" />
      </div>
    </div>
  )
}
