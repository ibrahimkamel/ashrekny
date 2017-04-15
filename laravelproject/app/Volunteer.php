<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Volunteer extends Model
{
    public function user(){
    	return $this->belongsTo('App\User');
    }

    public function categories(){
    	return $this->belongsToMany('App\Category');
    }

    public function stories(){
    	return $this->hasMany('App\Story');
    }

    public function tasks(){  
    	return $this->belongsToMany('App\Task');
	}

	public function events(){
		return $this->belongsToMany('App\Event');
	}

	public function reviews(){
    	return $this->hasMany('App\Review');
    }

}
