class YearsController < ApplicationController

    def index
        years = Year.all
        render json: YearSerializer.new(years).to_serialized_json 
    end

    def show
        year = Year.find_by(id: params[:id])
        render json: YearSerializer.new(year).to_serialized_json 
    end
    
end

#render json: sighting, include: [:bird, :location]
#:include => {
#    :year => {:only => [:value]}},
#    :except => [:updated_at, :created_at, :year_id])