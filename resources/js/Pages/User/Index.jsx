import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, router, usePage } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";


const Index = ({ users, queryParams = null, success }) => {
  queryParams = queryParams || {}
  const user = usePage().props.auth.user;

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('user.index'), queryParams)
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return

    searchFieldChange(name, e.target.value)
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc'
      } else {
        queryParams.sort_direction = 'asc'
      }
    } else {
      queryParams.sort_field = name
      queryParams.sort_direction = 'asc'
    }

    router.get(route('user.index'), queryParams)
  }

  const deleteUser = (user) => {
    if (!window.confirm('Are you sure you want to delete the user?')) {
      return
    }

    router.delete(route('user.destroy', user.id))
  }

  return (
    <AuthenticatedLayout
      user={user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Users
          </h2>
          <Link href={route('user.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
            Add New
          </Link>
        </div>
      }
    >
      <Head title="User" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {
            success &&
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          }
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >id</TableHeading>

                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >name</TableHeading>

                      <TableHeading
                        name="email"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >email</TableHeading>

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >Create Date</TableHeading>

                      <th className="px-3 py-3 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">

                      </th>
                      <th scope="col" className="px-6 py-3">
                        <TextInput
                          className="w-full"
                          placeholder="User Name"
                          defaultValue={queryParams.name}
                          onBlur={(e) => searchFieldChange('name', e.target.value)}
                          onKeyPress={(e) => onKeyPress('name', e)}
                        />
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <TextInput
                          className="w-full"
                          placeholder="Email"
                          defaultValue={queryParams.email}
                          onBlur={(e) => searchFieldChange('email', e.target.value)}
                          onKeyPress={(e) => onKeyPress('email', e)}
                        />
                      </th>
                      <th scope="col" className="px-6 py-3">

                      </th>
                      <th scope="col" className="px-6 py-3 text-right">

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.data.map((user) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={user.id}>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.id}
                          </th>

                          <th className="px-3 py-2 text-white">
                            {user.name}
                          </th>
                          <td className="px-3 py-2">
                            {user.email}
                          </td>
                          <td className="px-3 py-2">
                            {user.created_at}
                          </td>

                          <td className="px-3 py-2 text-nowrap">
                            <Link href={route('user.edit', user.id)} className='text-blue-500 ml-3'>
                              Edit
                            </Link>

                            <button
                              className='text-red-500 ml-2'
                              onClick={() => deleteUser(user)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

                <Pagination links={users.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

export default Index