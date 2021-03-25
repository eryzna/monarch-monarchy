class Siting < ApplicationRecord
    belongs_to :year

    def self.create_from_collection(sitings)
        sitings.each do |sitings_hash|
            Siting.create!(sitings_hash)
        end
    end

end


