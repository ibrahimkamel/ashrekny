<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Story;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request)
    {
        $this->validate($request, [
            'title'       => 'required|max:255',
            'content' => 'required'
            ]);

        $title = $request->get('title');
        $content = $request->get('content');
        $volunteer = $request->get('volunteer_id');

        $story = new Story;
        $story->title = $title;
        $story->content = $content;
        $story->volunteer_id = $volunteer;

        $story->save();

        return response()->json("successfully created",201);
    }

    /**
     * Get All events.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        $stories = Story::all();
        return response()->json($stories,200);
    }
    
    /**
     * Get All events paginated.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllPaginate()
    {
        $stories = Story::paginate();    // default 15 per page
        return response()->json($stories,200);
    }
}
