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
        phone,
        age,
        city,
        university,
        faculty,
        whatknow,
        interest,
        hoursPerWeek,
        skillsRating,
        strengthWeakness,
        stress,
        teamwork,
        criticism,
        ask
      } = parsedBody;



      // Create the data payload
      let postData = querystring.stringify({
        "entry.612144490": name,
        "entry.1061558525": email,
        "entry.1298403558": phone,
        "entry.1641660849": age,
        "entry.1216978654": city,
        "entry.789953409": university,
        "entry.1724244797": faculty,
        "entry.389414694": whatknow,
        "entry.1071652212": interest,
        "entry.273776112": hoursPerWeek,
        "entry.1351148600": skillsRating,
        "entry.1194376714": strengthWeakness,
        "entry.260286189": stress,
        "entry.1870358936": teamwork,
        "entry.465791700": criticism,
        "entry.533677153": ask
      });

      // Set up the POST request options
      const options = {
        hostname: "docs.google.com",
        path: "/forms/d/e/1FAIpQLSdxr4M3PL1ZmsGA41AOxrCZ8dPU61wT3RRyx-N-DP7LZwwM-g/formResponse",
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
    <title>Success! - Milestone 2026 Application Forms</title>
    <link rel="shortcut icon" href="https://milestone.enactusmu.live/assets/favicon.ico" type="image/x-icon">
    <link rel="icon" href="https://milestone.enactusmu.live/assets/favicon.ico" type="image/x-icon">
<link href="https://milestone.enactusmu.live/style/bootstrap.min.css" rel="stylesheet">
<script src="https://milestone.enactusmu.live/script/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://milestone.enactusmu.live/style/success-style.css">
  </head>
  <body>


    <div class="heading" style=" min-height: 100vh;">
      

        <img id="status" src="https://milestone.enactusmu.live/assets/success.svg" alt="">
        <p id="statustxt">Thank you for your interest in joining Milestone!</p>

                <div class="button">
            <div class="bott">
                <p>Follow Us</p>
                <div class="social-links" id="contact">
                   <a href="https://instagram.com/enactusmans/" target="_blank"><img src="https://milestone.enactusmu.live/assets/instagram.png" alt=""></a>
                   <a href="https://facebook.com/EnactusMansouraUniversity/" target="_blank"><img src="https://milestone.enactusmu.live/assets/facebook.png" alt=""></a>
                   <a href="https://www.tiktok.com/@enactusmans" target="_blank"><img src="https://milestone.enactusmu.live/assets/tiktok.png" alt=""></a>

                </div>
            </div>
        </div>


        <div class="bar" style="position: absolute; bottom: 0;">
            <p>© 2026 Enactus Mansoura University</p>
          </div>
        </div>
    </div>

<script>
  setTimeout(() => {
    window.location.href = "https://enactusmu.live/";
  }, 4000); // 4000ms = 4 seconds
</script>

    
  </body>
</html>`;

const failPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Failure! - Enactus Mansoura University</title>
    <link rel="shortcut icon" href="https://milestone.enactusmu.live/assets/favicon.ico" type="image/x-icon">
    <link rel="icon" href="https://milestone.enactusmu.live/assets/favicon.ico" type="image/x-icon">
<link href="https://milestone.enactusmu.live/style/bootstrap.min.css" rel="stylesheet">
<script src="https://milestone.enactusmu.live/script/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://milestone.enactusmu.live/style/success-style.css">
  </head>
  <body>


    <div class="heading" style=" min-height: 100vh;">
      

        <img id="status" src="https://milestone.enactusmu.live/assets/failure.svg" alt="">
        <p id="statustxt">Please try again</p>
        <div class="button">
            <div class="bott">
                <p>Follow Us</p>
                <div class="social-links" id="contact">
                   <a href="https://instagram.com/enactusmans/" target="_blank"><img src="https://milestone.enactusmu.live/assets/instagram.png" alt=""></a>
                   <a href="https://facebook.com/EnactusMansouraUniversity/" target="_blank"><img src="https://milestone.enactusmu.live/assets/facebook.png" alt=""></a>
                   <a href="https://www.tiktok.com/@enactusmans" target="_blank"><img src="https://milestone.enactusmu.live/assets/tiktok.png" alt=""></a>

                </div>
            </div>
        </div>
    </div>
    <div class="bar" style="position: absolute; bottom: 0;">
        <p>© 2026 Enactus Mansoura University</p>
      </div>
    </div>

    <script>
  setTimeout(() => {
    window.location.href = "https://enactusmu.live/";
  }, 4000); // 4000ms = 4 seconds
</script>
  </body>
</html>`;
