import { useEffect, useState } from 'react'
import './App.css'

const USERS_URL = 'https://fake-json-api.mock.beeceptor.com/users'

function App() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(USERS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <main className="page">
      <h1>Users</h1>

      {status === 'loading' && <p>Loading users…</p>}
      {status === 'error' && <p>Couldn't load users. Please try again later.</p>}

      {status === 'ready' && (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-card">
              <img src={user.photo} alt="" className="avatar" />
              <div className="user-info">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>
                  {user.company} · {user.state}, {user.country}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
