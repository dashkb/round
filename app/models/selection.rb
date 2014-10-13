class Selection < Sequel::Model
  many_to_one :track
  one_to_one :history
end
