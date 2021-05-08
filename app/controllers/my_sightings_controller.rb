class MySightingsController < ApplicationController
    
    def index
        sightings = MySighting.all
        render json: MySightingSerializer.new(sightings).to_serialized_json
    end

    def new
        @sighting = MySighting.new
    end

    def create
        sighting = MySighting.new
        sighting.username = params[:username]
        sighting.date = params[:date]
        sighting.town = params[:town]
        sighting.state_province = params[:state_province]
        sighting.num_of_individuals = params[:num_of_individuals]
        sighting.notes = params[:notes]
        sighting.year_id = sighting_year(sighting.date)
        sighting.save
        render json: MySightingSerializer.new(sighting).to_serialized_json    
    end

end
