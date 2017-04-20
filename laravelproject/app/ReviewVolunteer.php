<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReviewVolunteer extends Model
{
        protected $table = 'organization_volunteer';

    public function volunteer(){
    	return $this->belongsTo('App\Volunteer');
    }

    public function organization(){
    	return $this->belongsTo('App\organization');
    }
}
