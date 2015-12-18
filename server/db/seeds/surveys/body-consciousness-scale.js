var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "Body Consciousness Scale",
    description: "Please rate the following statements as they relate to your personal experience as accurately as possible on the provided scale.",
    est_completion_time_minutes: 10,
    is_featured: true
  },
  version: {
    version: 1,
    status: "In progress"
  },
  questions: [
    {
      id: 'bc-q1',
      group_number: 0,
      group_type: 'table',
      order: 0,
      text: "I'm sensitive to internal bodily tensions."
    },
    {
      id: 'bc-q2',
      group_number: 0,
      group_type: 'table',
      order: 1,
      text: "I know immediately when my mouth or throat gets dry."
    },
    {
      id: 'bc-q3',
      group_number: 0,
      group_type: 'table',
      order: 2,
      text: "I can often feel my heart beating."
    },
    {
      id: 'bc-q4',
      group_number: 0,
      group_type: 'table',
      order: 3,
      text: "I am quick to sense the hunger contractions of my stomach."
    },
    {
      id: 'bc-q5',
      group_number: 0,
      group_type: 'table',
      order: 4,
      text: "I'm very aware of changes in my body temperature."
    }
  ],
  fields: [
    {
      id: 'bc-f1',
      value: 1,
      order: 0,
      text: "extremely uncharacteristic",
      widget: 'radio'
    },
    {
      id: 'bc-f2',
      value: 2,
      order: 1,
      widget: 'radio'
    },
    {
      id: 'bc-f3',
      value: 3,
      order: 2,
      widget: 'radio'
    },
    {
      id: 'bc-f4',
      value: 4,
      order: 3,
      widget: 'radio'
    },
    {
      id: 'bc-f5',
      value: 5,
      order: 4,
      text: "extremely characteristic",
      widget: 'radio'
    }
  ],
  mappings: [
    {
      qid: 'bc-q1',
      fid: ['bc-f1','bc-f2','bc-f3','bc-f4','bc-f5']
    },
    {
      qid: 'bc-q2',
      fid: ['bc-f1','bc-f2','bc-f3','bc-f4','bc-f5']
    },
    {
      qid: 'bc-q3',
      fid: ['bc-f1','bc-f2','bc-f3','bc-f4','bc-f5']
    },
    {
      qid: 'bc-q4',
      fid: ['bc-f1','bc-f2','bc-f3','bc-f4','bc-f5']
    },
    {
      qid: 'bc-q5',
      fid: ['bc-f1','bc-f2','bc-f3','bc-f4','bc-f5']
    }
  ]
};

createSurvey(data);
