<?php

use App\Category;
use App\Product;
use App\Image;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Category::class, 3)->create()->each(function ($category) {
            factory(Product::class, 10)->create(['category_id' => $category->id])->each(function ($product) {
                factory(Image::class, 2)->create(['product_id' => $product->id]);
            });
        });
    }
}
