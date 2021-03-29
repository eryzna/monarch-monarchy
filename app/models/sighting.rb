class Sighting < ApplicationRecord
    belongs_to :year

    def self.create_from_collection(sightings)
        sightings.each do |sightings_hash|
            Sighting.create!(sightings_hash)
        end
    end

end
