<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Review;
class ReviewsTableSeeder extends Seeder
{
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
            Review::create([
						        'comment' => $faker->address,
						        'event_id'=>$faker->numberBetween($min = 1, $max = 5),
						        'volunteer_id'=>$faker->numberBetween($min = 1, $max = 5),

						        'rate'=>$faker->numberBetween($min = 1, $max = 5),
						    ]);
        }
    }
}
