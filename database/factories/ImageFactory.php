<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Image;
use App\Product;
use Faker\Generator as Faker;

$factory->define(Image::class, function (Faker $faker) {
    return [
        'path' => $faker->image('public/storage/images', 100, 100, null, false),
        'product_id' => function () {
            return factory(Product::class)->create()->id;
        }
    ];
});
