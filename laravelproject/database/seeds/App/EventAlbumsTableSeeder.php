<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\EventAlbum;
class EventAlbumsTableSeeder extends Seeder
{
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
            EventAlbum::create([
                            'photo_link' => 'public/images/sample.jpg',
                            'event_id'=>$faker->numberBetween($min = 1, $max = 5),
                        ]);
        }
    }
}
