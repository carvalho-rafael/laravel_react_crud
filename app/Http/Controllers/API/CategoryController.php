<?php

namespace App\Http\Controllers\API;

use App\Category;
use App\Http\Controllers\Controller;


class CategoryController extends Controller
{
    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    function index()
    {
        $categories = $this->category->all();

        return response()->json($categories);
    }

}
