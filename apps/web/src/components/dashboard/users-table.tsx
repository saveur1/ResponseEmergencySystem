import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { MoreHorizontal } from 'lucide-react'

export function UsersTable() {
  const users = [
    {
      id: 'u1',
      name: 'NYIRAMBARUSHIMANA Constantine',
      email: 'constantine@example.com',
      role: 'Admin'
    },
    {
      id: 'u2',
      name: 'BIZIMANA Gelio',
      email: 'gelio@example.com',
      role: 'Responder'
    },
    {
      id: 'u3',
      name: 'NSENGA Queen Mireille',
      email: 'queen@example.com',
      role: 'Dispatcher'
    },
    {
      id: 'u4',
      name: 'MUNEZERO BAGIRA Sostene',
      email: 'sostene@example.com',
      role: 'Responder'
    },
    {
      id: 'u5',
      name: 'GIKUNDIRO Ange Marie Happy',
      email: 'ange@example.com',
      role: 'Dispatcher'
    }
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-10">
                  <Avatar className="h-8 w-8 ">
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32`}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
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
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit user</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Delete user
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
