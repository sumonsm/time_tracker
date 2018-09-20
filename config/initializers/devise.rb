Devise.setup do |config|
  #  Tell devise to ignore ActionDispatch::Flash middleware.
  config.navigational_formats = [:json]

  config.secret_key = 'e0ff2728a3420588ae3974ef076fb8f67b6ded818c9852970e27880b49ff7f951a32044e9fd6a5ba2cea232d35a8a5514449051f4894b08574ec6c283b81a5eb'
end
