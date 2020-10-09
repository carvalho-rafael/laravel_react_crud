<?php

namespace App\Http\Controllers\API;

use App\Image;
use App\Repositories\ImageRepository;
use App\Http\Controllers\Controller;

class ImageController extends Controller {

    public function __construct(Image $image) {
        $this->image = $image;
    }

    public function store($requestImage, $product_id) {
        try {
            $image = new Image();
            $repo = new ImageRepository;
            $filename = $repo->saveImage($requestImage);

            $image->path = $filename;
            $image->product_id = $product_id;
            $image->save();

            return response()->json(['message' => $filename]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function deleteByProduct($product_id) {
        try{
            foreach($this->image->where('product_id', $product_id)->cursor() as $item){
                if(file_exists('storage/images/' . $item->path))           
                    unlink(public_path('storage/images/' . $item->path));
                $item->delete();

            };

            return response()->json(['message' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
  
    }

    public function delete($id) {
        try{
            $image = $this->image->find($id);
            if(file_exists('storage/images/' . $image->path))           
                unlink(public_path('storage/images/' . $image->path));

            $image->delete();

            return response()->json(['message' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
  
    }
}

