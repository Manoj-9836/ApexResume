// eslint-disable-next-line import/no-anonymous-default-export
export default {
    firstName: 'James',
    lastName: 'Carter',
    jobTitle: 'Full Stack Developer',
    address: '525 N Tryon Street, NC 28117',
    phone: '(123)-456-7890',
    linkedIn: 'https://www.linkedin.com/in/example',
    gitHub: 'https://www.Github.com/in/example',
    email: 'example@gmail.com',
    themeColor: '#000',
    summery:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

    experience: [
        {
            id: 1,
            title: 'Python Developer',
            companyName: 'Amazon',
            city: 'New York',
            state: 'NY',
            startDate: 'Jan 2021',
            endDate: 'Present',
            currentlyWorking: true,
            workSummery:
                '• Designed, developed, and maintained full-stack applications using React and Node.js.\n' +
                '• Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers.\n' +
                '• Maintaining the React Native in-house organization application.\n' +
                '• Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.'
        },
        {
            id: 2,
            title: 'Frontend Developer',
            companyName: 'Google',
            city: 'Charlotte',
            state: 'NC',
            startDate: 'May 2019',
            endDate: 'Jan 2021',
            currentlyWorking: false,
            workSummery:
                '• Developed and maintained dynamic web applications using React.\n' +
                '• Collaborated closely with UX/UI designers to implement responsive and accessible designs.\n' +
                '• Integrated RESTful APIs using Axios for seamless backend communication.\n' +
                '• Enhanced application performance by optimizing React components and improving load times.'
        }
    ],

    education: [
        {
            id: 1,
            universityName: 'Western Illinois University',
            startDate: 'Aug 2018',
            endDate: 'Dec 2019',
            degree: 'Master',
            major: 'Computer Science',
            description:
                'Gained expertise in data structures, algorithms, and software development. ' +
                'Worked on academic projects involving machine learning and web applications.'
        },
        {
            id: 2,
            universityName: 'Western Illinois University',
            startDate: 'Aug 2014',
            endDate: 'May 2018',
            degree: 'Bachelor',
            major: 'Information Technology',
            description:
                'Studied core IT concepts, database management, and software engineering principles. ' +
                'Completed a capstone project on cloud computing and data storage solutions.'
        }
    ],

    skills: {
        languages: [
            { id: 1, name: 'JavaScript', rating: 95 },
            { id: 2, name: 'SQL', rating: 85 }
        ],
        frameworks: [
            { id: 3, name: 'React', rating: 100 },
            { id: 4, name: 'Angular', rating: 80 },
            { id: 5, name: 'Redux', rating: 85 },
            { id: 6, name: 'Express.js', rating: 90 }
        ],
        mobile: [
            { id: 7, name: 'React Native', rating: 100 }
        ],
        databases: [
            { id: 8, name: 'MySQL', rating: 80 },
            { id: 9, name: 'MongoDB', rating: 85 }
        ],
        backend: [
            { id: 10, name: 'Node.js', rating: 90 }
        ],
        cloudTools: [
            { id: 11, name: 'Firebase', rating: 75 },
            { id: 12, name: 'AWS', rating: 70 }
        ],
        others: [
            { id: 11, name: 'HTML', rating: 75 },
            { id: 12, name: 'CSS', rating: 70 }
        ]
    },


    projects: [
        {
            id: 1,
            name: 'E-Commerce Platform',
            link: 'https://examlpedomain.com',
            technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
            description: 'This is a project description'
        },
        {
            id: 2,
            name: 'Social Media App',
            link: 'https://examlpedomain.com',
            technologies: ['React Native', 'Firebase', 'Redux'],
            description: 'This is a project description'
        },
        {
            id: 3,
            name: 'Portfolio Website',
            link: 'https://examlpedomain.com',
            technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
            description: 'This is a project description'
        },
        {
            id: 4,
            name: 'MERN Website',
            link: 'https://examlpedomain.com',
            technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
            description: 'This is a project description'
        }
    ],

    certificates: [
        {
            id: 1,
            name: 'AWS Certified Solutions Architect',
            issuedBy: 'Amazon Web Services',
            date: 'May 2020',
            description: 'this is a description on the certificate'
        },
        {
            id: 2,
            name: 'Google Associate Android Developer',
            issuedBy: 'Google',
            date: 'May 2020',
            description: 'this is a description on the certificate'
        },
        {
            id: 3,
            name: 'React Developer Certification',
            issuedBy: 'Udacity',
            date: 'May 2020',
            description: 'this is a description on the certificate'
        }
    ]
}