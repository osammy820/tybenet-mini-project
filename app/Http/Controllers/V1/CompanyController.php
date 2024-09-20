<?php

namespace App\Http\Controllers\V1;

use App\Traits\ImageTrait;
use Exception;
use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CompanyController extends Controller
{
    use ImageTrait;

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $companies = Company::paginate($perPage);
        return Inertia::render('Company/Index', ['companies' => $companies]);
    }

    public function create()
    {
        return Inertia::render('Company/Create');
    }

    public function store(StoreCompanyRequest $request)
    {
        try {
            $data = $request->only(['name', 'email', 'website', "logo"]);
            $ImageUrl = $this->insertImage($request, 'Companies', 'logo');
            $data['logo'] = $ImageUrl;
            Company::create($data);

            return redirect()->back()->with('success', 'Company created successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            return redirect()->back()->withErrors("Company Creation Failed", "errors");
        }
    }

    public function edit($id)
    {
        try {
            $company = Company::findOrFail($id);
            return Inertia::render('Company/Edit', ['company' => $company]);
        } catch (ModelNotFoundException $e) {
            return redirect()->back(404)->withErrors("Compony Not Found", "errors");
        }
    }

    public function update(StoreCompanyRequest $request, $id)
    {
        try {
            $company = Company::findOrFail($id);
            $data = $request->only(['name', 'email', 'website', 'logo']);

            $ImageUrl = $this->updateImage($request, 'Companies', $company, 'logo');
            $data['logo'] = $ImageUrl;

            $company->update($data);
            return redirect()->route('company.index')->with('success', 'Company updated successfully');
        } catch (ModelNotFoundException $e) {
            return redirect()->back(404)->withErrors("Compony Not Found", "errors");
        }
    }

    public function destroy($id)
    {
        try {
            $company = Company::findOrFail($id);
            $company->delete();
            return redirect()->back()->with('success', 'Company delete successfully');
        } catch (ModelNotFoundException $e) {
            return redirect()->back(404)->withErrors("Compony Not Found", "errors");
        }
    }
}
