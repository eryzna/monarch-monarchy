require 'pry'
class SightingsController < ApplicationController

    def index
        
        Sighting.update_current_sightings
        sightings = Sighting.all
        
        render json: SightingSerializer.new(sightings).to_serialized_json
        
    end

    def show
        sighting = Sighting.find_by(id: params[:id])
        render json: SightingSerializer.new(sighting).to_serialized_json    
    end

    private

    def sighting_params
        params.require(:sighting).permit(
          :date, 
          :name, 
          :town, 
          :state_province, 
          :num_of_individuals
        )
    end

    
end


