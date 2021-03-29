class YearsController < ApplicationController

    def index
        @years = Year.all
        render json: @years
    end
    
end