<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Event;
class EventsTableSeeder extends Seeder
{
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
            Event::create([
						        'description' => $faker->name,
						        'title' => $faker->name,
						        'start_date' => $faker->date,
						        'end_date' => $faker->date,
						        'country' => $faker->country,
						        'city' => $faker->city,
						        'region' => $faker->city,
						        'full_address' => $faker->address,
						        'avg_rate' => $faker->numberBetween($min = 1, $max = 5),
						        'organization_id'=>$faker->numberBetween($min = 1, $max = 5),
						        'logo'=> 'public/images/sample.jpg',
						    ]);
        }
    }
}
