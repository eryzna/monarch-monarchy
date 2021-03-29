class SightingsController < ApplicationController

    def index
        sightings = Sighting.all
        render json: sighting.first
    end

    def show
    end
    
end

