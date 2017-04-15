<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Organization;
class OrganizationsTableSeeder extends Seeder
{
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
            Organization::create([
					        'name' => $faker->name,
					        'logo' => 'public/images/sample.jpg',
					        'description' => $faker->name,
					        'full_address' => $faker->address,
					        'license_scan' =>'public/images/sample.jpg',
					        'license_number' => $faker->name,
					        'openning_hours' => $faker->unique()->name,
                            'user_id'=>$faker->numberBetween($min = 1, $max = 5),
					    ]);
        }
    }
}
