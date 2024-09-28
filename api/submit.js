const https = require('https');
const querystring = require('querystring');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    let body = '';

    // Collect incoming data
    req.on('data', chunk => {
      body += chunk.toString(); // Convert the Buffer to a string
    });

    // Process the complete body once it's fully received
    req.on('end', () => {
      // Parse the form data (urlencoded)
      const parsedBody = querystring.parse(body);

      const {
        name, email, date, phone, residency, school, university, faculty, radio,
        other_option_response, whatknow, howknow, interest, volunteer, strength,
        leader, available, rateurself, skillslearn, taskexample, onlineresources,
        priorities, project, engaging, criticism, ask, other_field_response
      } = parsedBody;

      // Handle the checkboxes 'fields[]'
      const fields = parsedBody['fields[]'] || []; // If no fields are selected, it will be undefined

      const dateParts = date.split("-");

      // Create the data payload
      let postData = querystring.stringify({
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
      });

      // Add checkboxes values
      const values = [
        "Graphic Design", "Web Development", "Presentation", "Marketing",
        "Photography", "Fundraising", "Research and development", "Field work", "__other_option__"
      ];

      // Ensure fields is an array and iterate over it
      if (Array.isArray(fields)) {
        fields.forEach((chkval) => {
          if (chkval === values[0]) {
            postData += `&entry.754710658=${encodeURIComponent("Graphic Design")}`;
          }
          if (chkval === values[1]) {
            postData += `&entry.754710658=${encodeURIComponent("Web Development")}`;
          }
          if (chkval === values[2]) {
            postData += `&entry.754710658=${encodeURIComponent("Presentation")}`;
          }
          if (chkval === values[3]) {
            postData += `&entry.754710658=${encodeURIComponent("Marketing")}`;
          }
          if (chkval === values[4]) {
            postData += `&entry.754710658=${encodeURIComponent("Photography")}`;
          }
          if (chkval === values[5]) {
            postData += `&entry.754710658=${encodeURIComponent("Fundraising")}`;
          }
          if (chkval === values[6]) {
            postData += `&entry.754710658=${encodeURIComponent("Research and development")}`;
          }
          if (chkval === values[7]) {
            postData += `&entry.754710658=${encodeURIComponent("Field work")}`;
          }
          if (chkval === values[8]) {
            postData += `&entry.754710658=${encodeURIComponent("__other_option__")}`;
            postData += `&entry.754710658.other_option_response=${encodeURIComponent(other_field_response)}`;
          }
        });
      }

      // Set up the POST request options
      const options = {
        hostname: 'docs.google.com',
        path: '/forms/d/1Y9L-q9jUNSRzuyoIB1NAYwyajjvdVb8646QClvHWJmc/formResponse',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      // Make the POST request to Google Forms
      const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          // Send success response to client
          res.status(200).json({ success: true, message: 'Form submitted successfully' });
        });
      });

      request.on('error', (error) => {
        // Handle any errors
        res.status(500).json({ success: false, message: 'Error submitting form', error });
      });

      // Write the data and end the request
      request.write(postData);
      request.end();
    });
  } else {
    // Return 405 if not POST method
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
