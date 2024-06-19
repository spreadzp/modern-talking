import { useState, useEffect } from 'react' 
import { createUser, getUsers } from '@/server/users'
import { User } from '@prisma/client'
 

const Users = () => {
    const [users, setUsers] = useState ([] as User[])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        // Fetch users
        const fetchUsers = async () => {
            const response = await getUsers()
            setUsers(response)
        }
        fetchUsers()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // const newUser = { name, email } as User 
        const newUser = {  } as User 
        const response = await createUser( newUser)
        if(!response) {
            return

        }
        const updatedUsers = [...users, response]
        setUsers(() => [...updatedUsers])  
        setName('')
        setEmail('')
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add User
                </button>
            </form>
            {/* <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.id} className="bg-gray-100 p-4 rounded-lg shadow">
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default Users
