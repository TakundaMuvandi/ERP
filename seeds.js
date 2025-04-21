const mongoose = require('mongoose');
const Student = require('./models/student');

mongoose.connect('mongodb://localhost:27017/erp')
    .then(() => {
        console.log("Database connection successful!");
    })
    .catch(err => {
        console.log("Database connection error:", err);
    });

const seedStudents = [
    {
        firstName: 'John',
        lastName: 'Doe',
        studentID: 'S1001',
        email: 'john.doe@example.com',
        dateOfBirth: '2001-05-14',
        gender: 'Male',
        phone: '1234567890',
        course: 'information technology',
        address: {
            street: '123 Main St',
            city: 'Harare',
            state: 'Harare',
            zip: '0001'
        },
        isActive: true,
        payments: [
            {
                amount: 500,
                method: 'bank transfer',
                status: 'completed'
            }
        ]
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        studentID: 'S1002',
        email: 'jane.smith@example.com',
        dateOfBirth: '2000-09-22',
        gender: 'Female',
        phone: '0987654321',
        course: 'cosmetology',
        address: {
            street: '456 Side St',
            city: 'Bulawayo',
            state: 'Bulawayo',
            zip: '0023'
        },
        isActive: true,
        payments: [
            {
                amount: 300,
                method: 'mobile money',
                status: 'pending'
            }
        ]
    },
    {
        firstName: 'Mike',
        lastName: 'Brown',
        studentID: 'S1003',
        email: 'mike.brown@example.com',
        dateOfBirth: '1999-12-01',
        gender: 'Male',
        phone: '1122334455',
        course: 'electrical engineering',
        address: {
            street: '789 Industrial Rd',
            city: 'Mutare',
            state: 'Manicaland',
            zip: '0045'
        },
        isActive: false,
        payments: [
            {
                amount: 450,
                method: 'card',
                status: 'completed'
            }
        ]
    },
    {
        firstName: 'Emily',
        lastName: 'Johnson',
        studentID: 'S1004',
        email: 'emily.johnson@example.com',
        dateOfBirth: '2002-07-18',
        gender: 'Female',
        phone: '2211334455',
        course: 'tourism and hospitality',
        address: {
            street: '12 Beach Rd',
            city: 'Victoria Falls',
            state: 'Matabeleland North',
            zip: '0077'
        },
        isActive: true,
        payments: [
            {
                amount: 600,
                method: 'cash',
                status: 'completed'
            }
        ]
    },
    {
        firstName: 'David',
        lastName: 'White',
        studentID: 'S1005',
        email: 'david.white@example.com',
        dateOfBirth: '1998-03-25',
        gender: 'Male',
        phone: '3344556677',
        course: 'motor mechanics',
        address: {
            street: '45 Garage St',
            city: 'Gweru',
            state: 'Midlands',
            zip: '0055'
        },
        isActive: false,
        payments: [
            {
                amount: 350,
                method: 'mobile money',
                status: 'pending'
            }
        ]
    },
    {
        firstName: 'Sophia',
        lastName: 'Green',
        studentID: 'S1006',
        email: 'sophia.green@example.com',
        dateOfBirth: '2001-11-10',
        gender: 'Female',
        phone: '5566778899',
        course: 'clothing',
        address: {
            street: '78 Fashion St',
            city: 'Harare',
            state: 'Harare',
            zip: '0088'
        },
        isActive: true,
        payments: [
            {
                amount: 400,
                method: 'card',
                status: 'completed'
            }
        ]
    }
];

Student.insertMany(seedStudents)
    .then(res => {
        console.log("Students seeded successfully:", res);
        mongoose.connection.close();
    })
    .catch(err => {
        console.log("Error seeding students:", err);
    });
