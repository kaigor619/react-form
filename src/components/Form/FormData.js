const str_required = 'This field is required';
const str_correct_number = 'Please enter number from 1 to 99';

let matchData = {
  text: (value) => {
    let error = '';
    if (value == '') error = str_required;
    return error;
  },
  number: (value) => {
    let error = '';
    if (value == '') error = str_required;
    if (isNaN(value)) error = str_correct_number;

    if (error == '') {
      if (value < 1 || value > 99) {
        error = str_correct_number;
      }
    }
    return error;
  },
  file: (value) => {
    let error = '';

    if (value == '') error = str_required;
    else {
      if (value instanceof FileList && value.length < 1)
        error = 'Please, add at least 1 file';
    }

    return error;
  },
};

const fields = {
  name: {
    type: 'text',
    name: 'name',
    placeholder: 'Type text',
    label: 'Your company name',
    matchError: matchData.text,
  },
  number: {
    type: 'text',
    name: 'number',
    required: true,
    placeholder: '1-99',
    label: 'Number of people',
    matchError: matchData.number,
  },
  business: {
    type: 'text',
    name: 'business',
    required: true,
    placeholder: 'Design, Marketing, Development, etc.',
    label: 'Business area',
    matchError: matchData.text,
  },
  description: {
    type: 'text',
    name: 'description',
    required: true,
    label: 'Description',
    placeholder: 'Type text',
    matchError: matchData.text,
    html: 'textarea',
  },
  file: {
    type: 'file',
    name: 'file',
    label: 'Add file as attachment',
    matchError: matchData.file,
  },
};

export default fields;
