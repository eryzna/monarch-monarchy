NEED

[] Filter for year
[] Filter for location (query)
[] Form for creating new siting





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

