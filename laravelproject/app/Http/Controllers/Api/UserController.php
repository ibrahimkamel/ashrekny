<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Volunteer;
use App\Organization;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Session;
 

class UserController extends Controller 
{
    /**
     * add user (volunteer and organization).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request)
    {
        $userRules = [
            'email'=>'required|max:50|unique:users',
            'password'=>'required|max:50',
            'region'=>'required|max:50',
            'city'=>'required|max:50|min:10'
        ];

        $messsages = array(
            'email.required'=> 'من فضلك ادخل البريد الالكتروني',
            'email.unique'=>'البريد الالكتروني موجود من قبل',
            'email.max'=>'يجب ألا يزيد البريد الالكتروني عن 50 حرف',
            'password.required'=>'من فضلك ادخل الرقم السري',
            'password.max'=>'يجب ألا يزيد الرقم السري عن 50 حرف',  
            'region.required'=>'من فضل ادخل اسم المنطقة',
            'city.required'=>'من فضلك ادخل اسم المدينة',
            'region.max'=>'يجب ألا يزيد اسم المنطقة عن 50 حرف',
            'city.max'=>'يجب ألا يزيد اسم المدينة عن 50 حرف'
        );
        $validator = Validator::make($request->all(), $userRules,$messsages);
       
        if ($validator->fails())
        {//\Response::json();
          return \Response::json(['userErrors' => $validator
            ->getMessageBag()->toArray()], 200);
        } 
        $newUser= new User ;
        $newUser->email= $request->email;
        $newUser->password=$request->password;
        $newUser->region=$request->region;
        $newUser->city=$request->city;

        $newUser->save();

        $userID=$newUser->id;
        if($request->firstName){
            $volunteerRules = [
                'firstName'=>'required|max:50|',
                'secondName'=>'required|max:50',
                'gender'=>'required|in:male,female'
            ];
        $validator = Validator::make(Input::all(), $volunteerRules);
        if ($validator->fails())
        {//\Response::json();
            return \Response::json(['volErrors' => $validator->getMessageBag()->toArray()], 400);
        }
        
        $newVolunteer= new Volunteer;
        $newVolunteer->first_name=$request->firstName;
        $newVolunteer->last_name=$request->secondName;
        $newVolunteer->gender=$request->gender;
         
        $newVolunteer->user_id=$userID;
        $newVolunteer->save();
        return response()->json("Done Volunteer Adding",200);    
     
        } else if ($request->orgName){

            $orgRules = [
                'orgName'=>'required|max:50',
                'fullAddress'=>'required',
                'license_number'=>'required|max:50|unique:organizations',
                'officeHours'=>'required|max:100'
            ];
            $validator = Validator::make(Input::all(), $orgRules);
            if ($validator->fails())
            {//\Response::json();
                return \Response::json(['orgErrors' => $validator
                    ->getMessageBag()->toArray()], 200);
            }

           $newOrg=new Organization;
           $newOrg->user_id=$userID;
           $newOrg->name=$request->orgName;
           $newOrg->description=$request->desc;
           $newOrg->full_adress=$request->fullAddress;
           $newOrg->license_number=$request->license_number;
           $newOrg->opening_hours=$request->officeHours;

          if($request->file('logo')){
            $newOrg->logo=$request->file('logo')->store('images/logos');
          }
          if($request->file('licenseScan')){
            $newOrg->license_scan=$request->file('licenseScan')->store('images/licenses');
          }
          $newOrg->save();
           return response()->json("Done Orgnization Adding",200);
        }
    }

    /**
     * get user profile.
     *
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        $user = User::find($id);
        return response()->json(compact('user'),200);
    }

    /**
     * get user profile (volunteer or organization).
     *
     * @return \Illuminate\Http\Response
     */
    public function getDetails($id)
    {

        $volunteer=User::find($id)->volunteer;
        if($volunteer)
        {
            return response()->json(compact('volunteer'),200);
        }
        else
        {
            $organization=User::find($id)->organization;
            return response()->json(compact('organization'),200);
        }
    }


    /**
     * .
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $userRules = [
            'email'=>'required|max:50|unique:users',
            'password'=>'required|max:50',
            'region'=>'required|max:50',
            'city'=>'required|max:50|min:10'
        ];

        $messsages = array(
            'email.required'=> 'من فضلك ادخل البريد الالكتروني',
            'email.unique'=>'البريد الالكتروني موجود من قبل',
            'email.max'=>'يجب ألا يزيد البريد الالكتروني عن 50 حرف',
            'password.required'=>'من فضلك ادخل الرقم السري',
            'password.max'=>'يجب ألا يزيد الرقم السري عن 50 حرف',  
            'region.required'=>'من فضل ادخل اسم المنطقة',
            'city.required'=>'من فضلك ادخل اسم المدينة',
            'region.max'=>'يجب ألا يزيد اسم المنطقة عن 50 حرف',
            'city.max'=>'يجب ألا يزيد اسم المدينة عن 50 حرف'
        );
        $validator = Validator::make($request->all(), $userRules,$messsages);
       
        if ($validator->fails())
        {//\Response::json();
          return \Response::json(['userErrors' => $validator->getMessageBag()->toArray()], 200);
        } 
        $user->email= $request->email;
        $user->password=$request->password;
        $user->region=$request->region;
        $user->city=$request->city;

        $user->save();

        $userID=$user->id;
        if($request->firstName){
            $volunteerRules = [
                'firstName'=>'required|max:50|',
                'secondName'=>'required|max:50',
                'gender'=>'required|in:male,female'
            ];
        $validator = Validator::make(Input::all(), $volunteerRules);
        if ($validator->fails())
        {//\Response::json();
            return \Response::json(['volErrors' => $validator
                ->getMessageBag()->toArray()], 400);
        }
        $volunteer= $user->volunteer;
        $volunteer->first_name=$request->firstName;
        $volunteer->last_name=$request->secondName;
        $volunteer->gender=$request->gender;
         
        $volunteer->user_id=$userID;
        $volunteer->save();
        return response()->json("Done Volunteer Adding",200);    
     
        } else if ($request->orgName){

            $orgRules = [
                'orgName'=>'required|max:50',
                'fullAddress'=>'required',
                'license_number'=>'required|max:50|unique:organizations',
                'officeHours'=>'required|max:100'
            ];
            $validator = Validator::make(Input::all(), $orgRules);
            if ($validator->fails())
            {//\Response::json();
                return \Response::json(['orgErrors' => $validator
                    ->getMessageBag()->toArray()], 200);
            }

           $org=$user->organization;
           $org->user_id=$userID;
           $org->name=$request->orgName;
           $org->description=$request->desc;
           $org->full_adress=$request->fullAddress;
           $org->license_number=$request->license_number;
           $org->opening_hours=$request->officeHours;

          if($request->file('logo')){
            $org->logo=$request->file('logo')->store('images/logos');
          }
          if($request->file('licenseScan')){
            $org->license_scan=$request->file('licenseScan')->store('images/licenses');
          }
          $org->save();
           return response()->json("Done Orgnization Adding",200);
        }

    }

}