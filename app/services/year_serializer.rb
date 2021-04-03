class YearSerializer

    def initialize(year_object)
        @year = year_object
    end
     
    def to_serialized_json
       @year.to_json( :include => {
            :sightings => {:only => [:date, :town, :state_province, :num_of_individuals]}},
            :except => [:updated_at, :created_at])
           # 
    end

end
