<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Task;
class TasksTableSeeder extends Seeder
{
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
            Task::create([
						        'required_volunteers' =>$faker->randomDigit,
						        'going_volunteers' =>$faker->randomDigit,
						        'name' =>$faker->name,
						        'event_id'=>$faker->numberBetween($min = 1, $max = 5),
						 ]);
        }
    }
}
