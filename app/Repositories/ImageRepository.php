<?php
namespace App\Repositories;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManagerStatic as Image;

class ImageRepository
{
    public function saveImage($image, $index) {
        if (!is_null($image)) {
            $name = $image->getClientOriginalName();
            $fileName = date('Y-m-d_H:i:s') .'.' . $index . $name; 

            $image->storeAs('public/images', $fileName);
                    
            return $fileName;
        } else {
            return 'placeholder200x200.jpg';
        }
    }
}