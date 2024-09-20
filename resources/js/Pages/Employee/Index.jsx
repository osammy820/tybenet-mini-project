import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Pen, Trash } from "lucide-react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Company({ employees }) {


    const formEvent = useForm({
        onSuccess: (page) => {
            toast.success("Employee deleted successfully");
        },
    });



    const columns = [
        {
            name: 'image',
            cell: row => (<img src={row.photo} alt="Employee Photo" className="w-10 h-10 rounded-full" />),
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'company',
            selector: row => row.company,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex space-x-2">
                    <Link
                        href={route('employee.edit', row.id)}
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

    const data = employees.map((employee) => ({
        id: employee.id,
        name: employee.first_name + " " + employee.last_name,
        email: employee.email,
        photo: employee.photo,
        phone: employee.phone,
        company: employee.company.name,
    }));



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
                formEvent.delete(route('employee.destroy', id), {
                    onSuccess: () => {
                        toast.success("Employee deleted successfully");
                    },
                    onError: () => {
                        toast.error("Failed to delete the company.");
                    }
                });
            }
        });
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Employee Management
                </h2>
            }
        >
            <Head title="Employee List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center p-6">
                            <div>
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee List</h2>
                            </div>
                            <div className="flex flex-row gap-5">
                                <Link href={route('employee.create')} className="bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md">Add New Employee</Link>
                                <a href={route('employee.export')} className="bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md">Export</a>
                            </div>

                        </div>
                        <div className="p-6 text-gray-900">
                            <DataTable
                                columns={columns}
                                data={data}
                                pagination
                                highlightOnHover

                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
