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

      // Add checkboxes values
      const values = [
        "Graphic Design", "Web development", "Presentation", "Marketing",
        "Photography", "Fundraising", "Research and development", "Field work", "__other_option__"
      ];

      // Ensure fields is an array and iterate over it
      let checkboxData = ""

      if (Array.isArray(fields)) {
        fields.forEach((chkval) => {
          if (chkval === values[0]) {
            checkboxData += "Graphic Design, ";
          }
          if (chkval === values[1]) {
            checkboxData += "Web Development, ";
          }
          if (chkval === values[2]) {
            checkboxData += "Presentation, ";
          }
          if (chkval === values[3]) {
            checkboxData += "Marketing, ";
          }
          if (chkval === values[4]) {
            checkboxData += "Photography, ";
          }
          if (chkval === values[5]) {
            checkboxData += "Fundraising, ";
          }
          if (chkval === values[6]) {
            checkboxData += "Research and Development, ";
          }
          if (chkval === values[7]) {
            checkboxData += "Field Work, ";
          }
        });
        checkboxData = checkboxData.replace(/, $/, '');
        checkboxData = checkboxData.replace(/['"]/g, '');
      }
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
        "entry.149518962": other_option_response,
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
        "entry.1224952906": ask,
        "entry.533756903": checkboxData,
        "entry.149518962":other_field_response
      });


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


const successPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Success! - Enactus Mansoura</title>
    <link rel="shortcut icon" href="assets/favicon.ico" type="image/x-icon">
    <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
<link href="style/bootstrap.min.css" rel="stylesheet">
<script src="script/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="style/style.css?v=2">
  </head>
  <body>


    <div class="heading" style=" min-height: 100vh;">
      

        <img id="status" src="assets/success.svg" alt="">
        <p id="statustxt">Your application was successfully <br>submitted</p>
        <!-- <div class="button">
            <div class="bott">
                <p>Follow Us</p>
                <div class="social" id="contact">
                   <a href="https://instagram.com/enactusmans/" target="_blank"><img src="assets/instagram.png" alt=""></a>
                   <a href="https://facebook.com/EnactusMansouraUniversity/" target="_blank"><img src="assets/facebook.png" alt=""></a>
                   <a href="https://twitter.com/enactusmans" target="_blank"><img src="assets/twitter.png" alt=""></a>

                </div>
            </div>
        </div> -->
    </div>
    <div class="bar" style="position: fixed;
    ">
      <p>© All Rights Reserved. Enactus Mansoura.</p>
    </div>
    </div>
    
  </body>
</html>`

const failPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Failure! - Enactus Mansoura</title>
    <link rel="shortcut icon" href="assets/favicon.ico" type="image/x-icon">
    <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
<link href="style/bootstrap.min.css" rel="stylesheet">
<script src="script/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="style/style.css?v=2">
  </head>
  <body>


    <div class="heading" style=" min-height: 100vh;">
      

        <img id="status" src="assets/failure.svg" alt="">
        <p id="statustxt">Please try again</p>
        <!-- <div class="button">
            <div class="bott">
                <p>Follow Us</p>
                <div class="social" id="contact">
                   <a href="https://instagram.com/enactusmans/" target="_blank"><img src="assets/instagram.png" alt=""></a>
                   <a href="https://facebook.com/EnactusMansouraUniversity/" target="_blank"><img src="assets/facebook.png" alt=""></a>
                   <a href="https://twitter.com/enactusmans" target="_blank"><img src="assets/twitter.png" alt=""></a>

                </div>
            </div>
        </div> -->
    </div>
    <div class="bar" style="position: fixed;
    ">
      <p>© All Rights Reserved. Enactus Mansoura.</p>
    </div>
    </div>
    
  </body>
</html>`
      // Make the POST request to Google Forms
      const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          // Send success response to client
          res.setHeader('Content-Type', 'text/html'); // Set content type to HTML
          res.status(200).send(successPage);
        });
      });

      request.on('error', (error) => {
        // Handle any errors
      res.setHeader('Content-Type', 'text/html'); // Set content type to HTML
        res.status(500).send(failPage);
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