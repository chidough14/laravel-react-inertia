import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react'

const Create = () => {
  const user = usePage().props.auth.user;

  const { data, setData, post, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()

    post(route('user.store'))
  }

  return (
    <AuthenticatedLayout
      user={user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Users
          </h2>
        </div>
      }
    >
      <Head title="User" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

            <form onSubmit={onSubmit} className="p-4 bg-white sm:p-8 dark:bg-gray-800 shadow sm:rounded">
             

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
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                  id="email"
                  type="text"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className='mt-2' />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />

                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  placeholder="Password"
                  onChange={(e) => setData('password', e.target.value)}
                />

                <InputError message={errors.password} className='mt-2' />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="email" value="Password Confirmation" />

                <TextInput
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  placeholder="Confirm Password"
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                />

                <InputError message={errors.password_confirmation} className='mt-2' />
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

export default Create