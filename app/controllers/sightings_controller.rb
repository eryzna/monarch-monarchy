class SightingsController < ApplicationController

    def index
        sightings = Sighting.all
        #render json: sightings, include: [:year]
        render json: SightingSerializer.new(sightings).to_serialized_json
        #only: [:id, :date, :town, :state, :num_of_individuals, :year_id]
    end

    def show
        sighting = Sighting.find_by(id: params[:id])
        render json: SightingSerializer.new(sighting).to_serialized_json    
    end

    
end


