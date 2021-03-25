require 'nokogiri'
require 'open-uri'
#require 'pry'

class Scraper

    
    @@journey_north_urls = [
        'https://journeynorth.org/sightings/querylist.html?season=spring&map=monarch-adult-spring&year=2015&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=fall&map=monarch-adult-fall&year=2015&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=spring&map=monarch-adult-spring&year=2016&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=fall&map=monarch-adult-fall&year=2016&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=spring&map=monarch-adult-spring&year=2017&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=fall&map=monarch-adult-fall&year=2017&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=spring&map=monarch-adult-spring&year=2018&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=fall&map=monarch-adult-fall&year=2018&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=spring&map=monarch-adult-spring&year=2019&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=fall&map=monarch-adult-fall&year=2019&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=spring&map=monarch-adult-spring&year=2020&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=fall&map=monarch-adult-fall&year=2020&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=spring&map=monarch-adult-spring&year=2021&submit=View+Data',
        'https://journeynorth.org/sightings/querylist.html?season=fall&map=monarch-adult-fall&year=2021&submit=View+Data'
    ]
    
    
    def scrape_sitings
        
        sitings = []
        @@journey_north_urls.each do |url|
            
            html = open(url)
            
            doc = Nokogiri::HTML(html)

            sitings_scrape = doc.css('.querylist').css('tbody').css('tr')

            sitings_scrape.each do |siting|
                td = siting.css('td')
                date = td[1].text
                town = td[2].text
                state_province = td[3].text
                num_of_individuals = td[6].text
                if date[7] == '5'
                    year_id = 7
                elsif date[7] == '6'
                    year_id = 6
                elsif date[7] == '7'
                    year_id = 5
                elsif date[7] == '8'
                    year_id = 4
                elsif date[7] == '9'
                    year_id = 3
                elsif date[7] == '0'
                    year_id = 2
                else 
                    year_id = 1
                end
        
                siting_info = {
                    date: date, 
                    town: town, 
                    state_province: state_province, 
                    num_of_individuals: num_of_individuals,
                    year_id: year_id
                    #season_id: season_id
                }
                sitings << siting_info 
            end
        end
        #binding.pry
        sitings
    end
end


#scrape = Scraper.new
#scrape.scrape_sitings
#scrape.scrape_images
#ruby app/models/scraper.rb