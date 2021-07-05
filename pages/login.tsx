import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react"
import Head from "next/head"
import Link from "next/link"

export default function Login() {
  const [login, setLogin] = useState({ email: '', password: ''})

  function changeLogin(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target)
    if (e.target.id == 'email') setLogin({ ...login, email: e.target.value })
    if (e.target.id == 'password') setLogin({ ...login, password: e.target.value })
  }

  function submitLogin(e: FormEvent) {
    e.preventDefault()
    console.log(login)
    console.log('submited')
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 py-12 h-full">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex justify-center pb-16">
        <h1 className="text-2xl font-semibold">Login</h1>
      </div>
      <form action="" className="flex flex-col mx-auto w-1/2 py-5 px-3 shadow-md bg-blue-400 rounded-sm space-y-3"
        onSubmit={submitLogin}
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-800">Email</label>
          <input type="email" name="email" id="email" placeholder="Email"
            className="px-2 py-1"
            onChange={changeLogin}
            value={login.email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-800">Password</label>
          <input type="password" name="password" id="password" placeholder="Password"
            className="px-2 py-1"
            onChange={changeLogin}
            value={login.password}
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-200 px-4 py-2" type="submit">Login</button>
        </div>
        <Link href="/">
          <a href="" className="underline">Home</a>
        </Link>
      </form>
    </div>
  )
}
