import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constans";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, usePage } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

const Show = ({ user, tasks, queryParams }) => {
  const user = usePage().props.auth.user;

  return (
    <AuthenticatedLayout
      user={user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {user.name}
        </h2>
      }
    >

      <Head title={`User ${user.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                src={user.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="p-6 text-gray-900 dark:text-gray-100">

              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="text-lg font-bold">ID</label>
                    <p className="mt-1">{user.id}</p>
                  </div>

                  <div className="mt-4">
                    <label className="text-lg font-bold">Name</label>
                    <p className="mt-1">{user.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="text-lg font-bold">Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          USER_STATUS_CLASS_MAP[user.status]
                        }
                      >
                        {USER_STATUS_TEXT_MAP[user.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="text-lg font-bold">Created By</label>
                    <p className="mt-1">{user.createdBy.name}</p>
                  </div>
                </div>

                <div>
                  <div>
                    <label className="text-lg font-bold">Due Date</label>
                    <p className="mt-1">{user.due_date}</p>
                  </div>

                  <div className="mt-4">
                    <label className="text-lg font-bold">Created At</label>
                    <p className="mt-1">{user.created_at}</p>
                  </div>

                  <div className="mt-4">
                    <label className="text-lg font-bold">Updated By</label>
                    <p className="mt-1">{user.updatedBy.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-lg font-bold">Description</label>
                <p className="mt-1">{user.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable 
                tasks={tasks} 
                queryParams={queryParams} 
                hideUserNameColumn={true}
              />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

export default Show