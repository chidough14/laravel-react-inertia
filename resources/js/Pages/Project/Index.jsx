import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constans";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, router, usePage } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";


const Index = ({ projects, queryParams = null }) => {
  queryParams = queryParams || {}
  const user = usePage().props.auth.user;

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('project.index'), queryParams)
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

    router.get(route('project.index'), queryParams)
  }

  return (
    <AuthenticatedLayout
      user={user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Projects
        </h2>
      }
    >
      <Head title="Project" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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

                      <th className="px-3 py-3">
                        Image
                      </th>

                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >name</TableHeading>
                      
                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >status</TableHeading>

                       <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >Create Date</TableHeading>

                      <TableHeading
                        name="due_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >Due Date</TableHeading>

                      <th className="px-3 py-3">
                        Created By
                      </th>
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

                      </th>
                      <th scope="col" className="px-6 py-3">
                        <TextInput
                          className="w-full"
                          placeholder="Project Name"
                          defaultValue={queryParams.name}
                          onBlur={(e) => searchFieldChange('name', e.target.value)}
                          onKeyPress={(e) => onKeyPress('name', e)}
                        />
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) => searchFieldChange("status", e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th scope="col" className="px-6 py-3">

                      </th>
                      <th scope="col" className="px-6 py-3">

                      </th>
                      <th scope="col" className="px-6 py-3">

                      </th>
                      <th scope="col" className="px-6 py-3 text-right">

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      projects.data.map((project) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={project.id}>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {project.id}
                          </th>
                          <td className="px-3 py-2">
                            <img src={project.image_path} alt="" style={{ width: 60 }} />
                          </td>
                          <th className="px-3 py-2 hover:underline text-white">
                            <Link
                              href={route('project.show', project.id)}
                            >
                              {project.name}
                            </Link>
                          </th>
                          <td className="px-3 py-2">
                            <span
                              className={
                                "px-2 py-1 rounded text-white " +
                                PROJECT_STATUS_CLASS_MAP[project.status]
                              }
                            >
                              {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            {project.created_at}
                          </td>
                          <td className="px-3 py-2">
                            {project.due_date}
                          </td>
                          <td className="px-3 py-2">
                            {project.createdBy.name}
                          </td>
                          <td className="px-3 py-2">
                            <Link href={route('project.edit', project.id)} className='text-blue-500'>
                              Edit
                            </Link>

                            <Link href={route('project.destroy', project.id)} className='text-red-500 ml-3'>
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

                <Pagination links={projects.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

export default Index