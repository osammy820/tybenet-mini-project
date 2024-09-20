import React, { useState } from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';

const Edit = ({ companies, employee }) => {
    const { data, setData, post, processing, errors } = useForm({
        first_name: employee?.first_name,
        last_name: employee?.last_name,
        email: employee?.email,
        phone: employee?.phone,
        photo: "",
        company_id: employee?.company_id,
        social_media_accounts: employee?.social_media_accounts,
        _method: 'PUT'
    });
    console.log(data);
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('employee.update', employee.id), {
            ...data,
            social_media_accounts: data.social_media_accounts,
        }, {
            replace: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                if (!page.props.errors || Object.keys(page.props.errors).length === 0) {
                    toast.success("Employee updated successfully");
                }
            },
            onError: () => {
                toast.error("Employee update failed. Please check the form for errors.");
            },
        });
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setData(name, type === 'file' ? files[0] : value);
    };

    const handleSocialMediaChange = (index, field, value) => {
        const updatedAccounts = [...data.social_media_accounts];
        updatedAccounts[index][field] = value;
        setData('social_media_accounts', updatedAccounts);
    };

    const addSocialMediaAccount = () => {
        setData('social_media_accounts', [
            ...data.social_media_accounts,
            { platform: '', handle: '' }
        ]);
    };

    const removeSocialMediaAccount = (index) => {
        const updatedAccounts = data.social_media_accounts.filter((_, i) => i !== index);
        setData('social_media_accounts', updatedAccounts);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Update Employee Details
                </h2>
            }>
            <Head title="Create Employee" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center p-6 w-4/5 mx-auto">
                            <div>
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Employee Details</h2>
                            </div>
                            <div>
                                <Link href={route('employee.index')} className="bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md">Back</Link>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900 w-full">
                            <div className="w-4/5 mx-auto">
                                <form onSubmit={handleSubmit}>
                                    <div className="w-full mb-4">
                                        <InputLabel htmlFor="company_id" value="Select Company" className='font-semibold text-gray-800 mb-2' />
                                        <select required={true} name="company_id" value={data.company_id} onChange={handleChange} className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'>
                                            <option value="">Select Company</option>
                                            {companies?.map((company) => (
                                                <option key={company.id} value={company.id}>{company.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.company_id} />
                                    </div>
                                    <div className="w-full mb-4">
                                        <InputLabel htmlFor="first_name" value="First Name" className='font-semibold text-gray-800 mb-2' />
                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder="Enter First Name"
                                            className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        />
                                        <InputError message={errors.first_name} />
                                    </div>
                                    <div className="w-full mb-4">
                                        <InputLabel htmlFor="last_name" value="Last Name" className='font-semibold text-gray-800 mb-2' />
                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder="Enter Last Name"
                                            className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        />
                                        <InputError message={errors.last_name} />
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
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="w-full mb-4">
                                        <InputLabel htmlFor="phone" value="Phone Number" className='font-semibold text-gray-800 mb-2' />
                                        <TextInput
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder="+233558571228"
                                            className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        />
                                        <InputError message={errors.phone} />
                                    </div>

                                    <div className="w-full mb-4">
                                        {employee?.photo && (
                                            <img src={employee.photo} alt="Employee Photo" className="w-20 h-20 rounded-full" />
                                        )}
                                        <InputLabel htmlFor="photo" value="Upload New Photo" className='font-semibold text-gray-800 mb-2 mt-5' />
                                        <input
                                            id="photo"
                                            name="photo"
                                            type="file"
                                            onChange={handleChange}
                                            className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        />
                                        <InputError message={errors.photo} />
                                    </div>
                                    <div className="w-full mb-4">
                                        <InputLabel value="Social Media Accounts" className='font-semibold text-gray-800 mb-2' />
                                        {data.social_media_accounts.map((account, index) => (
                                            <div key={index} className="flex space-x-2 mb-2">
                                                <TextInput
                                                    placeholder="Platform"
                                                    value={account.platform}
                                                    onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                                                    className='flex-1'
                                                />
                                                <TextInput
                                                    placeholder="Handle"
                                                    value={account.handle}
                                                    onChange={(e) => handleSocialMediaChange(index, 'handle', e.target.value)}
                                                    className='flex-1'
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeSocialMediaAccount(index)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addSocialMediaAccount}
                                            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                                        >
                                            Add More
                                        </button>
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
