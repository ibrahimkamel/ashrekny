<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Story;
class StoriesTableSeeder extends Seeder
{
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
            Story::create([
						        'content' => $faker->address,
						        'title' =>$faker->name,
						        'volunteer_id'=>$faker->numberBetween($min = 1, $max = 5),
						 ]);
        }
    }
}
