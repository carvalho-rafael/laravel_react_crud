<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'ref', 'price', 'category_id', 'quantity', 'active', 'resume', 'description'];

    public function images() {
        return $this->hasMany('App\Image');
    }

    public function category() {
        return $this->belongsTo('App\Category');
    }
}
