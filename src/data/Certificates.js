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
    image: '/certificates/1html.png',
    title: 'HTML Certification',
  },
  {
    id: 6,
    institution: 'SimpliLearn',
    image: '/certificates/2css.png',
    title: 'CSS Certification',
  },
  {
    id: 7,
    institution: 'SimpliLearn',
    image: '/certificates/3javascript.png',
    title: 'JavaScript Certification',
  },
  {
    id: 8,
    institution: 'SimpliLearn',
    image: '/certificates/4reactjs.png',
    title: 'React.js Certification',
  },
   {
    id: 9,
    institution: 'SimpliLearn',
    image: '/certificates/5java1.png',
    title: 'Java Certification',
  },
   {
    id: 10,
    institution: 'SimpliLearn',
    image: '/certificates/5node.png',
    title: 'Node.js Certification',
  },
   {
    id: 11,
    institution: 'SimpliLearn',
    image: '/certificates/6java.png',
    title: 'Java Certification',
  },
  {
    id: 12,
    institution: 'SimpliLearn',
    image: '/certificates/7csharp.png',
    title: 'C# Certification',
  },
  {
    id: 13,
    institution: 'SimpliLearn',
    image: '/certificates/8sql1.png',
    title: 'SQL Certification',
  },
  {
    id: 14,
    institution: 'SimpliLearn',
    image: '/certificates/9fullstack.png',
    title: 'Full Stack Developer Certification',
  },
  {
    id: 15,
    institution: 'SimpliLearn',
    image: '/certificates/10fullstack.png',
    title: 'Full Stack Developer Certification',
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