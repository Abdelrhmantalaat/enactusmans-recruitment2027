const https = require("https");
const querystring = require("querystring");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    let body = "";

    // Collect incoming data
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convert the Buffer to a string
    });

    // Process the complete body once it's fully received
    req.on("end", () => {
      // Parse the form data (urlencoded)
      const parsedBody = querystring.parse(body);

      const {
        name,
        email,
        date,
        phone,
        residency,
        instagram,
        school,
        university,
        faculty,
        radio,
        other_option_response,
        whatknow,
        howknow,
        interest,
        volunteer,
        strength,
        leader,
        leadershipRole,
        leaderBalance,
        available,
        responsibilities,
        rateurself,
        skillslearn,
        newskills,
        researchskills,
        taskexample,
        onlineresources,
        priorities,
        project,
        engaging,
        criticism,
        excited,
        ask,
        other_field_response,
      } = parsedBody;

      // Handle the checkboxes 'fields[]'
      const fields = parsedBody["fields[]"] || []; // If no fields are selected, it will be undefined

      const dateParts = date.split("-");

      // Add checkboxes values
      const values = [
        "Graphic Design",
        "Web development",
        "Presentation",
        "Sessions Trainer",
        "Marketing",
        "Photography",
        "Fundraising",
        "Research and development",
        "Field work",
        "__other_option__",
      ];

      // Ensure fields is an array and iterate over it
      let checkboxData = "";

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
            checkboxData += "Sessions Trainer, ";
          }
          if (chkval === values[4]) {
            checkboxData += "Marketing, ";
          }
          if (chkval === values[5]) {
            checkboxData += "Photography, ";
          }
          if (chkval === values[6]) {
            checkboxData += "Fundraising, ";
          }
          if (chkval === values[7]) {
            checkboxData += "Research and Development, ";
          }
          if (chkval === values[8]) {
            checkboxData += "Field Work, ";
          }
        });
        checkboxData = checkboxData.replace(/, $/, "");
        checkboxData = checkboxData.replace(/['"]/g, "");
      }
      // Create the data payload
      let postData = querystring.stringify({
        "entry.226913857": name,
        "entry.2081579804": email,
        "entry.237350523_year": dateParts[0],
        "entry.237350523_month": dateParts[1],
        "entry.237350523_day": dateParts[2],
        "entry.2081579804": phone,
        "entry.1353136778": residency,
        "entry.416320931": instagram,
        "entry.1207179881": school,
        "entry.2254370": university,
        "entry.1877000918": faculty,
        "entry.186073311": radio,
        "entry.186073311.other_option_response": other_option_response,
        "entry.323024726": whatknow,
        "entry.61761973": howknow,
        "entry.1535046649": interest,
        "entry.1503551755": volunteer,
        "entry.1509395968": strength,
        "entry.359773790": leader,
        "entry.739317209": leadershipRole,
        "entry.1150687452": leaderBalance,
        "entry.1319878197": available,
        "entry.1994962965": responsibilities,
        "entry.1261486210": rateurself,
        "entry.1866108043": skillslearn,
        "entry.1050127696": newskills,
        "entry.1672324758": researchskills,
        "entry.226143631": taskexample,
        "entry.581162371": onlineresources,
        "entry.1724899656": priorities,
        "entry.309251967": project,
        "entry.571747934": engaging,
        "entry.34927441": criticism,
        "entry.1139972872": excited,
        "entry.1380734089": ask,
        "entry.1588840401": checkboxData,
        "entry.1588840401": other_field_response,
      });

      // Set up the POST request options
      const options = {
        hostname: "docs.google.com",
        path: "forms/u/0/d/e/1FAIpQLSfLVqhDO0IHMojP_GVFda7Nd74u-Dvmex32FPq0OffpnIlQnw/formResponse",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      // Make the POST request to Google Forms
      const request = https.request(options, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          // Send success response to client
          res.setHeader("Content-Type", "text/html"); // Set content type to HTML
          res.status(200).send(successPage);
        });
      });

      request.on("error", (error) => {
        // Handle any errors
        res.setHeader("Content-Type", "text/html"); // Set content type to HTML
        res.status(500).send(failPage);
      });

      // Write the data and end the request
      request.write(postData);
      request.end();
    });
  } else {
    // Return 405 if not POST method
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

const successPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Success! - Enactus Mansoura University</title>
    <link rel="shortcut icon" href="https://apply.enactus-mans.live/assets/favicon.ico" type="image/x-icon">
    <link rel="icon" href="https://apply.enactus-mans.live/assets/favicon.ico" type="image/x-icon">
<link href="https://apply.enactus-mans.live/style/bootstrap.min.css" rel="stylesheet">
<script src="https://apply.enactus-mans.live/script/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://apply.enactus-mans.live/style/style.css?v=2">
  </head>
  <body>


    <div class="heading" style=" min-height: 100vh;">
      

        <img id="status" src="https://apply.enactus-mans.live/assets/success.svg" alt="">
        <p id="statustxt">Thank you for your interest in joining us!</p>

                <div class="button">
            <div class="bott">
                <p>Follow Us</p>
                <div class="social" id="contact">
                   <a href="https://instagram.com/enactusmans/" target="_blank"><img src="https://apply.enactus-mans.live/assets/instagram.png" alt=""></a>
                   <a href="https://facebook.com/EnactusMansouraUniversity/" target="_blank"><img src="https://apply.enactus-mans.live/assets/facebook.png" alt=""></a>
                   <a href="https://twitter.com/enactusmans" target="_blank"><img src="https://apply.enactus-mans.live/assets/twitter.png" alt=""></a>

                </div>
            </div>
        </div>


        <div class="bar" style="position: absolute; bottom: 0;">
            <p>© 2024 Enactus Mansoura University</p>
          </div>
        </div>
    </div>


    
  </body>
</html>`;

const failPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Failure! - Enactus Mansoura University</title>
    <link rel="shortcut icon" href="https://apply.enactus-mans.live/assets/favicon.ico" type="image/x-icon">
    <link rel="icon" href="https://apply.enactus-mans.live/assets/favicon.ico" type="image/x-icon">
<link href="https://apply.enactus-mans.live/style/bootstrap.min.css" rel="stylesheet">
<script src="https://apply.enactus-mans.live/script/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://apply.enactus-mans.live/style/style.css?v=2">
  </head>
  <body>


    <div class="heading" style=" min-height: 100vh;">
      

        <img id="status" src="https://apply.enactus-mans.live/assets/failure.svg" alt="">
        <p id="statustxt">Please try again</p>
        <div class="button">
            <div class="bott">
                <p>Follow Us</p>
                <div class="social" id="contact">
                   <a href="https://instagram.com/enactusmans/" target="_blank"><img src="https://apply.enactus-mans.live/assets/instagram.png" alt=""></a>
                   <a href="https://facebook.com/EnactusMansouraUniversity/" target="_blank"><img src="https://apply.enactus-mans.live/assets/facebook.png" alt=""></a>
                   <a href="https://twitter.com/enactusmans" target="_blank"><img src="https://apply.enactus-mans.live/assets/twitter.png" alt=""></a>

                </div>
            </div>
        </div>
    </div>
    <div class="bar" style="position: absolute; bottom: 0;">
        <p>© 2024 Enactus Mansoura University</p>
      </div>
    </div>
    
  </body>
</html>`;
