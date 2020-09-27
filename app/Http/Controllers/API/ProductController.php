<?php

namespace App\Http\Controllers\API;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    function index()
    {
        $products = $this->product->with('category', 'images')->get();

        return response()->json($products);
    }

    function show(Product $id)
    {
        $data =
            [
                "product" => $id,
                "categories" => Category::all('id','name'),
                "images" => $id->images()->get('path')
            ];

        return response()->json($data);
    }

    public function update(Request $request, $id)
    {
        try {
            $productData = $request->all();
            $product = $this->product->find($id);
            $product->update($productData);

            return response()->json(['message' => 'ok']);
            
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        try {
            $productData = $request->all();
            $this->product->create($productData);

            return response()->json(['message' => 'ok']);
            
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }
}
