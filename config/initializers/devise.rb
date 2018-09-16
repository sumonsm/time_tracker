Devise.setup do |config|
  #  Tell devise to ignore ActionDispatch::Flash middleware.
  config.navigational_formats = [:json]
end
