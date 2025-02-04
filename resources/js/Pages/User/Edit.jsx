import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react'

const Edit = ({user}) => {
  const user = usePage().props.auth.user;

  const { data, setData, post, errors, reset } = useForm({
    image: '',
    // image_path: user.image_path || "",
    name: user.name || "",
    description: user.description || "",
    status: user.status || "",
    due_date: user.due_date || "",
    _method: 'PUT'
  })

  const onSubmit = (e) => {
    e.preventDefault()

    post(route('user.update', user.id))
  }

  return (
    <AuthenticatedLayout
      user={user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit User "{user.name}"
          </h2>
        </div>
      }
    >
      <Head title="User" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

            <form onSubmit={onSubmit} className="p-4 bg-white sm:p-8 dark:bg-gray-800 shadow sm:rounded">
              {
                user.image_path &&
                <div className="mb-4">
                  <img src={user.image_path} alt="alt" className="w-64" />
                </div>
              }

              <div>
                <InputLabel htmlFor="user_image_path" value="User Image" />

                <TextInput
                  id="user_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('image', e.target.files[0])}
                />

                <InputError message={errors.image} className='mt-2' />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="User Name" />

                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData('name', e.target.value)}
                />

                <InputError message={errors.name} className='mt-2' />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_description" value="User Description" />

                <TextAreaInput
                  id="user_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('description', e.target.value)}
                />

                <InputError message={errors.description} className='mt-2' />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_due_date" value="User Deadline" />

                <TextInput
                  id="user_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('due_date', e.target.value)}
                />

                <InputError message={errors.due_date} className='mt-2' />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_status" value="User Status" />

                <SelectInput
                  id="user_status"
                  name="status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('status', e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>

                <InputError message={errors.status} className='mt-2' />
              </div>

              <div className="mt-4 text-right">
                <Link 
                  href={route('user.index')}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>

                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Edit