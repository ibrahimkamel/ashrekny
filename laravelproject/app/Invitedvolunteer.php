<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invitedvolunteer extends Model
{
	public $table = 'invitedvolunteer';

	protected $hidden = ['volunteer_id','event_id'];

    public function invitedvolunteers(){
    	return $this->belongsTo('App\Volunteer', 'volunteer_id');
    }
    public function invitedevents(){
    	return $this->belongsTo('App\Event', 'event_id');
    }
}
