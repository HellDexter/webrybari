import { updatePassword } from './actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function UpdatePasswordPage(props: {
  searchParams: Promise<{ error?: string }>
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient()

  // Kontrola, zda má uživatel platnou session (zda se správně vrátil z e-mailu)
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    // Pokud sem někdo přijde napřímo bez tokenu, vyhodíme ho
    redirect('/login?error=Neplatný přístup nebo odkaz vypršel.')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Nové heslo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Zadejte a potvrďte své nové heslo.
          </p>
        </div>

        {searchParams?.error && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {searchParams.error}
          </div>
        )}

        <form className="mt-8 space-y-6" action={updatePassword}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                Nové heslo
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="relative block w-full rounded-t-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                placeholder="Nové heslo"
              />
            </div>
            <div>
              <label htmlFor="passwordConfirm" className="sr-only">
                Potvrzení nového hesla
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                minLength={6}
                className="relative block w-full rounded-b-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                placeholder="Potvrzení nového hesla"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-green-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
            >
              Uložit heslo a pokračovat
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
