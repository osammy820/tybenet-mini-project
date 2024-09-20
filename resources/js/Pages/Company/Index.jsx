import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Pen, Trash } from "lucide-react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { router } from '@inertiajs/react';

export default function Company({ companies }) {
    const [data, setData] = useState(companies.data);
    const [totalRows, setTotalRows] = useState(companies.total);
    const [perPage, setPerPage] = useState(companies.per_page);

    const formEvent = useForm({
        onSuccess: (page) => {
            toast.success("Company deleted successfully");
        },
    });

    const columns = [
        {
            name: 'logo',
            cell: row => (<img src={row.logo} alt="Employee Photo" className="w-10 h-10 rounded-full" />),
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Website',
            selector: row => row.website,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex space-x-2">
                    <Link
                        href={route('company.edit', row.id)}
                        className="px-4 py-2 text-blue-500 hover:text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        <Pen /> <div>Edit</div>
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-4 py-2 flex flex-col justify-center items-center text-red-500 hover:text-white rounded hover:bg-red-600 transition duration-300"
                    >
                        <Trash /> <div>Delete</div>
                    </button>
                </div>
            ),
        },
    ];

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                formEvent.delete(route('company.destroy', id), {
                    onSuccess: () => {
                        toast.success("Company deleted successfully");
                        fetchCompanies(1); // Refresh the data after deletion
                    },
                    onError: () => {
                        toast.error("Failed to delete the company.");
                    }
                });
            }
        });
    };

    const handlePageChange = page => {
        fetchCompanies(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchCompanies(page, newPerPage);
    };

    const fetchCompanies = (page, newPerPage = perPage) => {
        router.get(
            route('company.index'),
            { page: page, per_page: newPerPage },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setData(page.props.companies.data);
                    setTotalRows(page.props.companies.total);
                    setPerPage(page.props.companies.per_page);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Company Management
                </h2>
            }
        >
            <Head title="Company List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center p-6">
                            <div>
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Company List</h2>
                            </div>
                            <div>
                                <Link href={route('company.create')} className="bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md">Add New Company</Link>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900">
                            <DataTable
                                columns={columns}
                                data={data}
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                onChangePage={handlePageChange}
                                onChangeRowsPerPage={handlePerRowsChange}
                                highlightOnHover
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
