<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use App\Model;
use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'ref' => $faker->bothify('?###?'),
        'name' => $faker->word,
        'resume' => $faker->paragraph,
        'description' => $faker->paragraph,
        'category_id' => function () {
            return factory(Category::class)->create()->id;
        },
        'price' => $faker->randomFloat(2, 2, 300),
        'quantity' => $faker->numberBetween(5, 100),
        'active' => $faker->boolean
    ];
});
