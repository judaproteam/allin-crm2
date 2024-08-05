export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  console.log('test layout')

  return <div className="bg-cyan-100 w-full h-screen">{children}</div>
}
