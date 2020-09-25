<?php

use Illuminate\Database\Seeder;
use App\Product;
use App\Image;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Product::class, 10)->create()->each(function ($product) {
            factory(Image::class, 5)->create(['product_id' => $product->id]);
        });
    }
}
