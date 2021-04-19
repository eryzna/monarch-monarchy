class ApplicationController < ActionController::API

    def sighting_year(date) 
        if date[9] == '5'
          year_id = 7
        elsif date[9] == '6'
          year_id = 6
        elsif date[9] == '7'
          year_id = 5
        elsif date[9] == '8'
          year_id = 4
        elsif date[9] == '9'
          year_id = 3
        elsif date[9] == '0'
          year_id = 2
        else 
          year_id = 1
        end
    end

    
end
