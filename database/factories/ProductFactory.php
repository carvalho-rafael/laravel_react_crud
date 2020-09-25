<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'ref' => $faker->bothify('?###?'),
        'name' => $faker->word,
        'category' => $faker->word,
        'price' => $faker->randomFloat(2, 2, 300),
        'quantity' => $faker->numberBetween(5, 100),
        'active' => $faker->boolean
    ];
});
