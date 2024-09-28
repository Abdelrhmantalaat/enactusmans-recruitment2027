const axios = require('axios');

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(403).send('Forbidden');
  }

  const { name, email, date, phone, residency, school, university, faculty, radio, other_option_response, whatknow, howknow, interest, volunteer, strength, leader, available, rateurself, skillslearn, taskexample, onlineresources, priorities, project, engaging, criticism, ask, fields, other_field_response } = req.body;

  const dateParts = date.split('-');

  // Base form data
  const data = {
    "entry.1041785167": name,
    "entry.1542320257": email,
    "entry.1921783901_year": dateParts[0],
    "entry.1921783901_month": dateParts[1],
    "entry.1921783901_day": dateParts[2],
    "entry.1034888980": phone,
    "entry.969657102": residency,
    "entry.1442446771": school,
    "entry.1052834700": university,
    "entry.590478216": faculty,
    "entry.881662986": radio,
    "entry.881662986.other_option_response": other_option_response,
    "entry.1603392820": whatknow,
    "entry.2091645574": howknow,
    "entry.1961912970": interest,
    "entry.2005818525": volunteer,
    "entry.1267060927": strength,
    "entry.1033467631": leader,
    "entry.1043994900": available,
    "entry.986324613": rateurself,
    "entry.1550371383": skillslearn,
    "entry.1725474681": taskexample,
    "entry.1606644202": onlineresources,
    "entry.2035339081": priorities,
    "entry.736068933": project,
    "entry.1480818960": engaging,
    "entry.18863860": criticism,
    "entry.1224952906": ask
  };

  const values = [
    "Graphic Design",
    "Web Development",
    "Presentation",
    "Marketing",
    "Photography",
    "Fundraising",
    "Research and development",
    "Field work",
    "__other_option__"
  ];

  // Build checkbox data
  let checkboxData = [];
  fields.forEach(chkval => {
    if (chkval === values[0]) checkboxData.push("Graphic Design");
    if (chkval === values[1]) checkboxData.push("Web Development");
    if (chkval === values[2]) checkboxData.push("Presentation");
    if (chkval === values[3]) checkboxData.push("Marketing");
    if (chkval === values[4]) checkboxData.push("Photography");
    if (chkval === values[5]) checkboxData.push("Fundraising");
    if (chkval === values[6]) checkboxData.push("Research and development");
    if (chkval === values[7]) checkboxData.push("Field work");
    if (chkval === values[8]) {
      checkboxData.push("__other_option__");
      data["entry.754710658.other_option_response"] = other_field_response;
    }
  });

  // Build query string for repeated checkbox values
  const formData = Object.entries(data).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
  const checkboxString = checkboxData.map(val => `entry.754710658=${encodeURIComponent(val)}`).join('&');

  // Combine form data and checkbox data
  const postData = `${formData}&${checkboxString}`;

  try {
    const response = await axios.post('https://docs.google.com/forms/d/1Y9L-q9jUNSRzuyoIB1NAYwyajjvdVb8646QClvHWJmc/formResponse', postData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    res.status(200).json({ success: true, response: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
