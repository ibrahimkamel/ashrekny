<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event;
use App\Task;

class EventController extends Controller
{
    /**
     * Get All events.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        $events = Event::all();
        return response()->json(compact('events'),200);
    }
    /**
     * Get All events paginated.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllPaginate()
    {
        $events = Event::paginate();    // default 15 per page
        return response()->json(compact('events'),200);
    }

    /**
     * get top 3 events.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getTop()
    {
        $events = Events::sortByDesc('avg_rate')->limit(3)->get();
        return response()->json(compact('events'),200);
    }

    /**
     * Get specific event.
     *
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        $event= Event::find($id);
        return response()->json(compact('event'),200);
    }

    /**
     * Get event's organization.
     *
     * @return \Illuminate\Http\Response
     */
    public function getOrganization($id)
    {
        $organization= Event::find($id)->organization;
        return response()->json(compact('organization'),200);
    }

    /**
     * get event's tasks.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getTasks($id)
    {
        $tasks= Event::find($id)->tasks;
        return response()->json(compact('tasks'),200);
    }

    /**
     * get event's categories.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getCategories($id)
    {
        $categories = Event::find($id)->categories;
        return response()->json(compact('categories'),200);
    }

    /**
     * get event's album.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getAlbum($id)
    {
        $album = Event::find($id)->album;
        return response()->json(compact('album'),200);
    }

    /**
     * get event review.
     *
     * @return \Illuminate\Http\Response
     */
    public function getReview($id)
    {
        $Reviews = Event::find($id)->reviews;
        return response()->json('Reviews',200);
    }

    /**
     * add reviews on event.
     *  TODO IN NEXT SPRINT
     * @return \Illuminate\Http\Response
     */
    public function addReview($id)
    {
    }

    /**
     * add new event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function add(Request $request)
    {

        $this->validate($request, [
            'title'       => 'required|max:100',
            'description' => 'required',
            'start_date'  => 'required|date',
            'end_date'    => 'date|after:start_date',
            'country'     => 'required|max:50',
            'city'        => 'required|max:50',
            'region'      => 'required|max:50',
            'full_address'=> 'max:200'
            ]);
         
        $title            = $request->get('title');
        $description      = $request->get('description');
        $start_date       = $request->get('start_date');
        $end_date         = $request->get('end_date');
        $country          = $request->get('country');
        $city             = $request->get('city');
        $region           = $request->get('region');
        $full_address     = $request->get('full_address');
        $organization_id  = $request->get('organization_id');
        $tasks            = $request->get('tasks');
        $logo             = $request->file('logo');

        $event               = new Event;
        $event->title        = $title;
        $event->description = $description;
        $event->start_date  = $start_date;
        $event->end_date    = $end_date;
        $event->country     = $country ;
        $event->city        = $city;
        $event->region      = $region;
        $event->full_address  = $full_address;
        $event->organization_id = $organization_id;
        if($request->hasFile('logo'))
        {
            $event->logo = $logo->store('images/logos');
        }

        $event->save();
        if(isset($tasks))
        {
            $tasks = json_decode($tasks);
            foreach ($tasks as $task) 
            {
                $newTask = new Task;
                $newTask->name = $task->name;
                if(isset($task->required_volunteers))
                {
                    $newTask->required_volunteers = $task->required_volunteers;
                }
                $newTask->event_id = $event->id;
                $newTask->save();
            }
        }
        return response()->json("success",200);
    }

    /**
     * Update the specified event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'title'       => 'required|max:100',
            'description' => 'required',
            'start_date'  => 'required|date',
            'end_date'    => 'date|after:start_date',
            'country'     => 'required|max:50',
            'city'        => 'required|max:50',
            'region'      => 'required|max:50',
            'full_address'=> 'max:200'
            ]);
         
        $title            = $request->get('title');
        $description      = $request->get('description');
        $start_date       = $request->get('start_date');
        $end_date         = $request->get('end_date');
        $country          = $request->get('country');
        $city             = $request->get('city');
        $region           = $request->get('region');
        $full_address     = $request->get('full_address');
        $organization_id  = $request->get('organization_id');
        $tasks            = $request->get('tasks');
        $logo             = $request->file('logo');

        $event               = new Event;
        $event->title        = $title;
        $event->description = $description;
        $event->start_date  = $start_date;
        $event->end_date    = $end_date;
        $event->country     = $country ;
        $event->city        = $city;
        $event->region      = $region;
        $event->full_address  = $full_address;
        $event->organization_id = $organization_id;
        if($request->hasFile('logo'))
        {
            $event->logo = $logo->store('images/logos');
        }

        $event->save();

        if(isset($tasks))
        {
            $tasks = json_decode($tasks);
            foreach ($tasks as $task) 
            {
                $newTask = new Task;
                $newTask->name = $task->name;
                if(isset($task->required_volunteers))
                {
                    $newTask->required_volunteers = $task->required_volunteers;
                }
                $newTask->event_id = $event->id;
                $newTask->save();
            }
        }
        return response()->json("success",200);
    }

    /**
     * Delete Specific Event.
     *
     * @return \Illuminate\Http\Response
     */

    public function delete($id)
    {
        $event = Event::find($id);
        $event->delete();
        return response()->json('Event Deleted Successfully',200);
    }
}
