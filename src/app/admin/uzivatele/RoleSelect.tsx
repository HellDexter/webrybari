'use client'

import { changeUserRole } from './actions'

export default function RoleSelect({ 
  userId, 
  currentRole, 
  disabled 
}: { 
  userId: string, 
  currentRole: string, 
  disabled: boolean 
}) {
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value
    const result = await changeUserRole(userId, newRole)
    if (result?.error) {
      alert(result.error)
      // reset back to current role on error
      e.target.value = currentRole
    }
  }

  return (
    <select
      defaultValue={currentRole}
      onChange={handleChange}
      disabled={disabled}
      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 disabled:bg-gray-100 disabled:text-gray-500"
    >
      <option value="member">Člen (Member)</option>
      <option value="administrator">Administrátor</option>
      <option value="superuser">Superuser</option>
    </select>
  )
}
