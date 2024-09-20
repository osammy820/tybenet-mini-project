<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

trait ImageTrait
{
    public function insertImage($request, string $directory, string $imageColumnName, int $width = 500, int $height = 500)
    {
        if ($request->hasFile($imageColumnName)) {
            $imageFile = $request->file($imageColumnName);
            $imgUrl = $this->getImagePath($directory, $imageFile->getClientOriginalExtension());
            $image = ImageManager::imagick()->read($imageFile);
            $image->resizeDown($width, $height);

            Storage::disk('public')->put($imgUrl, $image->encode());
            return Storage::disk('public')->url($imgUrl);
        }

        return null;
    }

    public function updateImage($request, string $directory, $record, string $imageColumnName = "image", int $width = 500, int $height = 500)
    {
        if ($request->hasFile($imageColumnName)) {
            $imageFile = $request->file($imageColumnName);
            $imgUrl = $this->getImagePath($directory, $imageFile->getClientOriginalExtension());
            $image = ImageManager::imagick()->read($imageFile);
            $image->resizeDown($width, $height);

            Storage::disk('public')->put($imgUrl, $image->encode());

            try {
                if ($record->is_award_image === 'false' && isset($record->$imageColumnName)) {
                    Storage::disk('public')->delete($record->$imageColumnName);
                }
            } catch (\Throwable $th) {
                Log::error('Error deleting old image: ' . $th->getMessage());
            }

            return Storage::disk('public')->url($imgUrl);
        }

        return $record->$imageColumnName;
    }

    protected function getImagePath($pathname, $extension)
    {
        $base_location = 'images/' . $pathname;
        $imageName = Str::uuid() . '.' . $extension;
        return $base_location . "/" . $imageName;
    }
}
