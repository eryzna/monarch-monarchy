class MySightingSerializer

    def initialize(sighting_object)
        @sighting = sighting_object
    end
     
    def to_serialized_json
       @sighting.to_json(
            :except => [:updated_at, :created_at, :year_id])
           # :include => {
               # :year => {:only => [:value]}},
    end

end