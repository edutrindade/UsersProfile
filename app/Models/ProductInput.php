<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class ProductInput extends Model
{
    use Filterable;
    protected $fillable = ['amount', 'product_id'];

    //many-to-one: Um produto terá várias entradas, mas a entrada está relacionada a apenas um produto 
    public function product()
    {   
        return $this->belongsTo(Product::class); // retorna método que pertence ao model relacionado 
    }

}
