import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { MoreHorizontal, Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllUsers, deleteUser } from '@/actions/users'
import { UserShape } from 'types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

export default function UsersPage() {
  const [users, setUsers] = useState<UserShape[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [userToDelete, setUserToDelete] = useState<UserShape | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const usersData = await getAllUsers()
      setUsers(usersData)
      setError(null)
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('Failed to load users. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    return (
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The filtering is already handled by the above filter function
  }

  const handleConfirmDelete = async () => {
    if (!userToDelete || !userToDelete.id) {
      toast(
      'Cannot delete user: Missing user ID'
      )
      return
    }

    try {
      const success = await deleteUser(userToDelete.id)
      if (success) {
        // Remove the user from local state
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userToDelete.id)
        )
        toast(`${userToDelete.fullName} has been deleted successfully.`
        )
      } else {
        toast(
          'Failed to delete user. Please try again.'
        )
      }
    } catch (err) {
      console.error('Error deleting user:', err)
      toast('An unexpected error occurred while deleting the user.'
      )
    } finally {
      setUserToDelete(null)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Link to="/dashboard/users/register">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex items-center gap-2 my-5">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            className="pl-8 max-w-sm border-2 border-gray-300 focus:border-red-200 focus:ring- rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {/* Users Table */}
      {loading && <div className="text-center p-4">Loading users...</div>}
      {error && <div className="text-red-500 text-center p-4">{error}</div>}

      {!loading && !error && (
        <div className="rounded-md border px-5">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="">{index + 1}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-10">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              user.profileImageUrl ||
                              `/placeholder.svg?height=32&width=32`
                            }
                            alt={user.fullName}
                          />
                          <AvatarFallback>
                            {user.fullName?.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white rounded-[5px]"
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="text-red-600 cursor-pointer"
                                onSelect={(e) => {
                                  e.preventDefault()
                                  setUserToDelete(user)
                                }}
                              >
                                Delete user
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete {userToDelete?.fullName}'s
                                  account and remove their data from our
                                  servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleConfirmDelete}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
