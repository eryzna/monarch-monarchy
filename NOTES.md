NEED

[] Filter for year
[] Filter for location (query)
[] Form for creating new siting


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

