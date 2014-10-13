class History < Sequel::Model
  many_to_one :track
end
