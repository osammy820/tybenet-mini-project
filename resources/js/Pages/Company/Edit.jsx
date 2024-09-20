import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';

const Edit = ({ company }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: company?.name,
        email: company?.email,
        website: company?.website,
        logo: company?.logo,
        _method: 'PUT'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('website', data.website);
        formData.append('_method', 'PUT');
        if (data.logo) {
            formData.append('logo', data.logo);
        }

        post(route('company.update', company.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                if (!page.props.errors || Object.keys(page.props.errors).length === 0) {
                    toast.success("Company updated successfully");
                }
            },
            onError: () => {
                toast.error("Company update failed. Please check the form for errors.");
            },
        });
    }

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Company
                </h2>
            }>
            <Head title="Create Company" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center p-6 w-4/5 mx-auto">
                            <div>
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Company Details</h2>
                            </div>
                            <div>
                                <Link href={route('company.index')} className="bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md">Back</Link>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900 w-full">
                            <div className="w-4/5 mx-auto">
                                <form onSubmit={handleSubmit}>
                                    <div className="w-full mb-4">
                                        <InputLabel htmlFor="name" value="Company Name" className='font-semibold text-gray-800 mb-2' />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder="Enter Company Name"
                                            className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        />
                                        <InputError>{errors.name}</InputError>
                                    </div>
                                    <div className="w-full mb-4">
                                        <InputLabel htmlFor="email" value="Email Address" className='font-semibold text-gray-800 mb-2' />
                                        <TextInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder="company@example.com"
                                            className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        />
                                        <InputError>{errors.email}</InputError>
                                    </div>
                                    <div className="w-full mb-4">
                                        <InputLabel htmlFor="website" value="Website URL" className='font-semibold text-gray-800 mb-2' />
                                        <TextInput
                                            id="website"
                                            name="website"
                                            type="url"
                                            value={data.website}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder="https://example.com"
                                            className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        />
                                        <InputError>{errors.website}</InputError>
                                    </div>
                                    <div className="w-full mb-4">
                                        {company?.logo && (
                                            <img src={company.logo} alt="Employee Photo" className="w-20 h-20 rounded-full" />
                                        )}
                                        <InputLabel htmlFor="logo" value="Upload Logo" className='font-semibold text-gray-800 mb-2' />
                                        <input
                                            id="logo"
                                            name="logo"
                                            type="file"
                                            required={true}
                                            onChange={handleChange}
                                            className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        />
                                        <p className="text-sm text-red-600">{errors.logo}</p>
                                        <InputError>{errors.logo}</InputError>
                                    </div>
                                    <button disabled={processing} className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-md w-full transition-all">
                                        {processing ? 'Updating...' : 'Update Details'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit
