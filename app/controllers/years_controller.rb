class YearsController < ApplicationController

    def index
        years = Year.all
        render json: years, only: [:id, :value]
    end

    def show
        year = Year.find_by(id: params[:id])
        render json: { id: year.id, sightings: year.sightings}
    end
    
end

#render json: sighting, include: [:bird, :location]