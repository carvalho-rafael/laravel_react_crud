<?php

namespace App\Http\Controllers\API;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use Dotenv\Result\Result;

class ProductController extends Controller
{
    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    function index()
    {
        $products = $this->product->all();
        $result = [];
        $i = 0;
        foreach ($products as $product) {
            $i++;
            $result[] = [
                'product' => $product,
                'category' => $product->category()->first('name'),
                'image' => $product->images()->first()
            ];
        }

        return response()->json($result);
    }

    function show(Product $id)
    {
        $data =
            [
                "product" => $id,
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
            $result = $this->product->create($productData);
            if ($result)
                return response()->json(['message' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $product = $this->product->find($id);
            $product->images()->delete();
            $result = $product->delete();
            if ($result)
                return response()->json(['message' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }
}
