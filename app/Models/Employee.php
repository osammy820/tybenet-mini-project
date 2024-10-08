<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'social_media_accounts' => 'array',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
