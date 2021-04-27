class Sighting < ApplicationRecord
    belongs_to :year

    def self.create_from_collection(sightings)
        sightings.each do |sightings_hash|
            Sighting.create!(sightings_hash)
        end
    end

    def self.delete_current_sightings
        sightings = Sighting.where(year_id: 1)
        sightings.destroy_all 
    end

    def self.update_current_sightings
        scrape = Scraper.new
        new_sightings = scrape.scrape_new_sightings
        current_sightings = Sighting.where(year_id: 1)
        new_record_count = new_sightings.length - current_sightings.length
        if new_record_count >= 1
            new_records = new_sightings[0...new_record_count]
            Sighting.create_from_collection(new_records)
        else
            new_records = []
        end
        
        
    end

end
