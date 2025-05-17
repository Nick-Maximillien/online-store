import { useAuth } from "context/AuthContext"

export default function UserProfile() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
    </div>
  )
}
