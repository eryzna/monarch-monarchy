Rails.application.routes.draw do
  resources :my_sightings
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :sightings
  resources :years

end
