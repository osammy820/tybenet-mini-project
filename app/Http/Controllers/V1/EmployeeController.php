<?php

namespace App\Http\Controllers\V1;

use Exception;
use Inertia\Inertia;
use App\Models\Company;
use App\Models\Employee;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use App\Exports\EmployeeExport;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreEmployeeRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EmployeeController extends Controller
{
    use ImageTrait;

    public function index()
    {
        $employees = Employee::with('company')->get();
        return Inertia::render('Employee/Index', ['employees' => $employees]);
    }

    public function create()
    {
        $companies = Company::all();
        return Inertia::render('Employee/Create', ['companies' => $companies]);
    }

    public function store(Request $request)
    {
        try {
            $data = $request->only(['first_name', 'last_name', 'company_id', 'email', 'phone', 'photo', 'social_media_accounts']);
            $ImageUrl = $this->insertImage($request, 'Employees', 'photo');

            $data['photo'] = $ImageUrl;

            Employee::create($data);
            return redirect()->route('employee.index')->with('success', 'Employee created successfully');
        } catch (Exception $e) {
            return redirect()->back()->withErrors("Employee Creation Failed", "errors");
        }
    }


    public function edit($id)
    {
        try {
            $companies = Company::all();
            $employee = Employee::findOrFail($id);
            return Inertia::render('Employee/Edit', ['employee' => $employee, 'companies' => $companies]);
        } catch (ModelNotFoundException $e) {
            return redirect()->back(404)->withErrors("Employee Not Found", "errors");
        }
    }


    public function update(StoreEmployeeRequest $request, $id)
    {
        try {
            Log::debug($request->all());
            $employee = Employee::findOrFail($id);

            $data = $request->only(['first_name', 'last_name', 'company_id', 'email', 'phone', 'photo', 'social_media_accounts']);

            $image_title = $data['first_name'] . "_" . $data['last_name'];

            if ($request->photo && $request->photo !== null) {
                $ImageUrl = $this->updateImage($request, 'Employees', $employee, $image_title);
                $data['photo'] = $ImageUrl;
            } else {
                $data['photo'] = $employee->photo;
            }

            $employee->update($data);
            return redirect()->route('employee.index')->with('success', 'Employee created successfully');
        } catch (ModelNotFoundException $e) {
            return redirect()->back(404)->withErrors("Employee Not Found", "errors");
        }
    }
    public function destroy($id)
    {
        try {
            $employee = Employee::findOrFail($id);
            $employee->delete();
            return redirect()->back()->with('success', 'Employee Deleted successfully');
        } catch (ModelNotFoundException $e) {
            return redirect()->back(404)->withErrors("Employee Not Found", "errors");
        }
    }

    public function export()
    {
        return Excel::download(new EmployeeExport, 'employees.xlsx');
    }
}
