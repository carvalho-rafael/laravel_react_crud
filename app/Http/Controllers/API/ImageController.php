<?php

namespace App\Http\Controllers\API;

use App\Image;
use App\Repositories\ImageRepository;
use App\Http\Controllers\Controller;

class ImageController extends Controller
{

    public function __construct(Image $image) {
        $this->image = $image;
    }

    public function store($image, $product_id) {
        try {
            $repo = new ImageRepository;
            $filename = $repo->saveImage($image);

            $this->image->path = $filename;
            $this->image->product_id = $product_id;
            $this->image->save();

            return response()->json(['message' => $filename]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function delete($product_id) {
        try{
            foreach($this->image->where('product_id', $product_id)->cursor() as $item){
                
                unlink(public_path('/storage/images/' . $item->path));
                $item->delete();
            };

            return response()->json(['message' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
  
    }
}

