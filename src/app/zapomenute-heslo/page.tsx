import { requestPasswordReset } from './actions'
import Link from 'next/link'

export default async function ForgotPasswordPage(props: {
  searchParams: Promise<{ error?: string, message?: string }>
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Zapomenuté heslo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Zadejte svůj e-mail a my vám pošleme odkaz pro vytvoření nového hesla.
          </p>
        </div>

        {searchParams?.error && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {searchParams.error}
          </div>
        )}

        {searchParams?.message && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
            {searchParams.message}
          </div>
        )}

        <form className="mt-8 space-y-6" action={requestPasswordReset}>
          <div>
            <label htmlFor="email" className="sr-only">
              E-mailová adresa
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="E-mailová adresa"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-green-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
            >
              Odeslat odkaz
            </button>
          </div>
          
          <div className="text-center mt-4">
            <Link href="/login" className="text-sm font-medium text-green-600 hover:text-green-500">
              Zpět na přihlášení
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
