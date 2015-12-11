export default function runQueries(db) {
  db.Dataset.create({
    title: 'Global Chromatin Profiling Epigenetic Profiling Assay',
    description: 'GCP',
    group: {
      name: 'Broad LINCS Proteomic Characterization Center for Signaling and Epigenetics',
    },
    category: {
      name: 'Mass Spectrometry',
    },
  }, {
    include: [
      { model: db.Group, as: 'group' },
      { model: db.Category, as: 'category' },
    ],
  }).then(() => {
    console.log('Dataset created.');
  }).catch((err) => {
    console.log(err);
  });

  db.User
    .create({
      name: 'Michael McDermott',
      email: 'michael.mcdermott@mssm.edu',
      group: {
        name: 'Maayan Lab - Icahn School of Medicine at Mount Sinai',
      },
    }, {
      include: [{ model: db.Group, as: 'group' }],
    })
    .then(() => {
      console.log('Michael McDermott user created');
    });
}
