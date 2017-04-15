<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Phone;
class PhonesTableSeeder extends Seeder
{
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
            
            Phone::create([
						        'organization_id'=>$faker->numberBetween($min = 1, $max = 5),
						        'phone_number'=> $faker->phoneNumber,
						    ]);
        }
    }
}
