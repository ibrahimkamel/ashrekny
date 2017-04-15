<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function volunteers(){
    	return $this->hasMany('App\Volunteer');
    }

    public function organizations(){
    	return $this->hasMany('App\Organization');
    }

    public function events(){
    	return $this->hasMany('App\Event');
    }
}
