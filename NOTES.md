NEED

[x] Format listing objects
[x] Filter for year
[x] Filter for location (query)
[x] Filter by state
[x] Form for creating new siting
[x] Speed up data rendering
[] Update 2021 data
[x] Fast json gem
[x] Format list
[x] Total number of individuals
[] Add back button
[] Add footer information
[] Add image
[] State dropdown
[] On DOM load, submit
[] Clear test data

<form action="http://localhost:3000/sightings" method="POST">
                <label> Date: <input type="date" name="sightingDate" id="sightingDate" /></label><br />
                <label> Town: <input type="text" name="sightingTown" id="sightingTown" /></label><br />
                <label> State/Province: <input type="text" name="sightingStateProvince" id="sightingStateProvince" /></label><br />
                <label> Number of Individuals: <input type="text" name="sightingNumber" id="sightingNumber" /></label><br />
        
        
                <input type="submit" id="submit" value="Submit" />
</form>

<img src="img_avatar.png" alt="Avatar man">
fetch('http://localhost:3000/birds').then(response => response.json()).then(object => console.log(object))


def scrape_images
        
        images = []
        @journey_north_urls.each do |url|
        
            html = open(url)
     
            doc = Nokogiri::HTML(html)

            sitings_scrape = doc.css('.querylist').css('tbody').css('tr')

            sitings_scrape.each do |siting|
                td = siting.css('td')
                img_url = td[7].css('img').attribute('src').value

                imgs_info = {
                    img_url: img_url
                }

                images << imgs_info if imgs_info[:img_url] != "/maps/graphics/spacer.gif"
            #binding.pry
            end
        #binding.pry
        #sitings
        end
        #binding.pry
        images
    end
end
#binding.pry


 def scrape_new_sightings
        sightings = []
        url = 'https://journeynorth.org/sightings/querylist.html?season=spring&map=monarch-adult-spring&year=2021&submit=View+Data'
        
        html = open(url)
            
        doc = Nokogiri::HTML(html)

        sightings_scrape = doc.css('.querylist').css('tbody').css('tr')

            sightings_scrape.each do |sighting|
                td = sighting.css('td')
                date = td[1].text
                town = td[2].text
                state_province = td[3].text
                num_of_individuals = td[6].text
                year_id = 1
        
                sighting_info = {
                    date: date, 
                    town: town, 
                    state_province: state_province, 
                    num_of_individuals: num_of_individuals,
                    year_id: year_id
                    #season_id: season_id
                }
                sightings << sighting_info 
            end
        #binding.pry
        sightings
    end
end

