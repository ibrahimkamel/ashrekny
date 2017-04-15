<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Volunteer;
class VolunteersTableSeeder extends Seeder
{
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
            Volunteer::create([
						        'first_name' => $faker->name,
						        'last_name' => $faker->name,
						        'work' => $faker->name,
						        'profile_picture' => $faker->address,
						        'gender' => $faker->randomElement(['male','female']),
						        'phone' => $faker->unique()->numberBetween($min = 121570000, $max = 1215752191) ,
                                'user_id'=>$faker->numberBetween($min = 1, $max = 5),
						    ]);
        }
    }
}
