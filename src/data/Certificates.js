export const certificatesData = [
  {
    id: 1,
    institution: 'Udemy',
    image: '/certificates/phpmysql.jpg',
    title: 'PHP & MySQL Course',
  },
  {
    id: 2,
    institution: 'Holy Cross of Davao College',
    image: '/certificates/holycross.jpeg',
    title: 'Holy Cross Certificate 1',
  },
  {
    id: 3,
    institution: 'Holy Cross of Davao College',
    image: '/certificates/holycross1.jpeg',
    title: 'Holy Cross Certificate 2',
  },
  {
    id: 4,
    institution: '365 DataScience',
    image: '/certificates/sql.png',
    title: 'SQL Course',
  },
  {
    id: 5,
    institution: 'SimpliLearn',
    image: '/certificates/sql1.png',
    title: 'SQL Certification',
  },
  {
    id: 6,
    institution: 'SimpliLearn',
    image: '/certificates/html.png',
    title: 'HTML Certification',
  },
  {
    id: 7,
    institution: 'SimpliLearn',
    image: '/certificates/java.png',
    title: 'Java Certification',
  },
];

// Group certificates by institution for the full certificates page
export const groupedCertificates = certificatesData.reduce((acc, cert) => {
  if (!acc[cert.institution]) {
    acc[cert.institution] = [];
  }
  acc[cert.institution].push(cert);
  return acc;
}, {});