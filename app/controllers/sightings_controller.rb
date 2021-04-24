require 'pry'
class SightingsController < ApplicationController

    def index
        #Sighting.delete_current_sightings
        Sighting.update_current_sightings
        sightings = Sighting.all
        #render json: sightings, include: [:year]
        render json: SightingSerializer.new(sightings).to_serialized_json
        #only: [:id, :date, :town, :state, :num_of_individuals, :year_id]
    end

    def show
        sighting = Sighting.find_by(id: params[:id])
        render json: SightingSerializer.new(sighting).to_serialized_json    
    end

    def new
        @sighting = Sighting.new
    end

    def create
        sighting = Sighting.new
        sighting.username = params[:username]
        sighting.date = params[:date]
        sighting.town = params[:town]
        sighting.state_province = params[:state_province]
        sighting.num_of_individuals = params[:num_of_individuals]
        sighting.notes = params[:notes]
        sighting.year_id = sighting_year(sighting.date)
        sighting.save
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


