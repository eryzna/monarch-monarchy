NEED

[x] Format listing objects
[x] Filter for year
[x] Filter for location (query)
[x] Filter by state
[x] Form for creating new siting
[x] Speed up data rendering
[x] Update 2021 data
[x] Fast json gem
[x] Format list
[x] Total number of individuals
[x] Add back button
[x] Add footer information
[x] Add image
[x] State dropdown
[] On DOM load, submit
[x] Clear test data
[] Seasons
[] Loading animation
[] Need to create my sightings model. Otherwise, user sightings will be incorporated into sightings and thus updates from Journey North won't be accurately incorporated

4/25/21: 1156

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

Sighting.prototype.renderToPage = function () {
  console.log("renderToPage");
  let ul = document.querySelector('#sighting-info');
  const button = document.createElement('button')
  button.innerText = "Like"
  const counter = document.createElement('p')
  counter.innerHTML = "0"
  ul.className = "sightings-info";
  let li = document.createElement('li');
  li.innerText = `Date: ${this.date}, City: ${this.town}, State/Province: ${this.stateProvince}, Monarchs: ${this.numOfIndiv}`;
  li.appendChild(button)
  li.appendChild(counter)
  ul.appendChild(li)
  addLikeSightingListener(button, counter)

}

function addLikeSightingListener(button, counter) {
  button.addEventListener('click', function() {
    //counter.value 
    counter.innerHTML = parseInt(counter.innerHTML) + 1
})}