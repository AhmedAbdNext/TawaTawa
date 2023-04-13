import Airtable from 'airtable';

const airtable = new Airtable({endpointUrl: 'https://api-airtable-com-8hw7i1oz63iz.runscope.net/'})

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID || "Products"
);

export default airtable