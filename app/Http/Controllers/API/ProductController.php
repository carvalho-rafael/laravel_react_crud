<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Http\Controllers\API\ImageController;
use App\Image;

class ProductController extends Controller
{
    public function __construct(Product $product) {
        $this->product = $product;
    }

    function index() {
        try {
            $products = $this->product->all();
            $result = [];
            foreach ($products as $product) {
                $result[] = [
                    'product' => $product,
                    'category' => $product->category()->first('name'),
                    'image' => $product->images()->first()
                ];
            }

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    function show(Product $id) {
        try {
            $data = [
                "product" => $id,
                "images" => $id->images()->get(['path', 'id'])
            ];

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id) {
        try {
            $productData = $request->except('image');
            $product = $this->product->find($id);
            $product->update($productData);

            $imageController = new ImageController(new Image);

            $images = $request->file('image');

            if ($request->hasFile('image')) {
                foreach($images as $im){
                    $imageController->store($im, $product->id);
                }
            }

            return response()->json(['message' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function store(Request $request) {
        try {
            $productData = $request->all();
            $product = $this->product->create($productData);

            $imageController = new ImageController(new Image);
            
            $images = $request->file('image');

            if ($request->hasFile('image')) {
                foreach($images as $im){
                    $imageController->store($im, $product->id);
                }
            }
            return response()->json(['message' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $product = $this->product->find($id);
            
            $imageController = new ImageController(new Image);

            $imageController->deleteByProduct($id);

            $product->delete();

            return response()->json(['message' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }
}
