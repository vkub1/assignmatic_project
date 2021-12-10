# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Grade.destroy_all
Answer.destroy_all
Assignment.destroy_all
Enrollment.destroy_all
Course.destroy_all

User.destroy_all

PASSWORD = '123'


super_user = User.create(
    name: "Admin",
    email: "admin@user.com",
    password: PASSWORD
)

5.times do
    name = Faker::Name.name
    User.create(
        name: name,
        email: "#{name}@email.com",
        password: PASSWORD
    )
end

users = User.all
puts users.count

10.times do 
    c = Course.create(
        title: "Javascript #{rand(101..200)}",
        description: Faker::Lorem.sentence(word_count: 150),
        icon_url: 'fa-js-square',
        price: 999
    )
    if c.valid?
        Enrollment.create(
        course: c,
        user: User.first,
        is_teacher: true
        )
        5.times do
            Enrollment.create(
                course: c,
                user: users[1..10].sample
            )
        end
        a = Assignment.create(
            title: Faker::Lorem.sentence(word_count: 2),
            instructions: Faker::Lorem.sentence(word_count: 150),
            course: c,
        )
        if a.valid?
            an = Answer.create(
                solution: Faker::Lorem.sentence(word_count: 150),
                assignment: a,
                user: users[1..5].sample
            )
            if a.valid?
                g = Grade.create(
                    grade: 80,
                    comment: Faker::Lorem.sentence(word_count: 150),
                    answer: an
                )
            end
        
        end
    end
end

puts "Generated #{User.count} users"
puts "Generated #{Course.count} courses"
puts "Generated #{Enrollment.count} enrollments"
puts "Generated #{Assignment.count} assignments"
puts "Generated #{Answer.count} answer"
puts "Generated #{Grade.count} grades"





