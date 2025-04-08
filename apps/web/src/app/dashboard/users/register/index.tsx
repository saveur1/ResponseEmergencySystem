import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState
} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from 'Context/user-context'

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'responder',
    profileImage: null
  })

  const [imagePreview, setImagePreview] = useState('')
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  if (!authContext) return null

  const { setError, isLoading, register, error } = authContext

  useEffect(() => {
    setError('')
  }, [])
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        profileImage: file
      })

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!")
      return
    }

    const user = await register(
      {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        profileImageUrl: imagePreview
      },
      formData.password
    )

    if (user) navigate('/')
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 p-5 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
        <form onSubmit={handleSubmit}>
          <div className='flex gap-2 w-full'>
            <div className="mb-4 w-1/2">
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4 w-1/2">
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

                  
          <div className='flex gap-2 w-full'>
                      
          <div className="mb-4 w-1/2">
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4 w-1/2">
            <label className="block font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
         </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="responder">First Responder</option>
              <option value="dispatcher">Dispatcher</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="flex flex-col items-center mb-4">
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex justify-center items-center rounded-lg overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Profile Image</span>
              )}
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="profileImage"
              className="mt-2 px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              Choose Image
            </label>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <strong className="font-bold">Error: </strong>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600"
            disabled={authContext?.isLoading}
          >
            {isLoading ? 'Creating user...' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
