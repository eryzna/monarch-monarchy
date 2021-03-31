class SightingSerializer

    def initialize(sighting_object)
        @sighting = sighting_object
    end
     
    def to_serialized_json
       @sighting.to_json(:include => {
            :year => {:only => [:value]}},
            :except => [:updated_at, :created_at, :year_id])
    end

end