<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:150',
            'last_name' => 'required|string|max:150',
            'company_id' => 'required|integer|exists:companies,id',
            'email' => 'required|string|email|max:150',
            'phone' => ['required', 'string', 'regex:/^(0\d{9}|(\+233|233)\d{9})$/'],
            'photo' => 'nullable|image|mimes:png,jpg|max:5024',
            'social_accounts' => 'nullable|array',
            'social_accounts.*.platform' => 'required|string',
            'social_accounts.*.username' => 'required|string',
        ];
    }
}
