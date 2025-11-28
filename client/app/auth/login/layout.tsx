export default function AuthLayout({
  children
}: Readonly<{
    children: React.ReactNode
  }>) {
  return(
    <div className="block">
      <div className="w-full max-w-[400px] mx-auto">
        {children}
      </div>
    </div>
  )
}
