# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

year_list = [2021, 2020, 2019, 2018, 2017, 2016]

year_list.each do |value|
    Year.create(value: value)
end

#SCRAPE
scrape = Scraper.new

sightings = scrape.scrape_sightings
Sighting.create_from_collection(sightings)

#images = scrape.scrape_images
#Image.create_from_collection(images)

#SCRAPE



