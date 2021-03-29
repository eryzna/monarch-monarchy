class SitingsController < ApplicationController

    def index
        @sitings = Siting.all
        render json: @sitings.first
    end
    
end

