const https = require("https");
const querystring = require("querystring");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedBody = querystring.parse(body);

    // =========================
    // Get data from website
    // =========================

    const {
      name,
      email,
      phone,
      residency,
      birthDate,
      highSchool,
      university,
      faculty,
      tutorialYear,
      tutorialYearOther,
      instagram,
      whatKnow,
      howKnow,
      difference,
      interest,
      volunteerWork,
      strengthWeakness,
      teamPreference,
      leadershipRole,
      availability,
      workLifeBalance,
      responsibilities,
      fields,
      otherField,
      fieldRating,
      whatAdd,
      learning,
      reliableSource,
      fieldVsOnline,
      researchExample,
      sponsorChoice,
      innovativeSolution,
      knownOrNewField,
      teamBehavior,
      independentOrTeam,
      criticism,
      ask
    } = parsedBody;

    // =========================
    // Google Forms data
    // =========================

    const googleFormData = [];

    // Name
    googleFormData.push([
      "entry.1884265043",
      name || ""
    ]);

    // Mail
    googleFormData.push([
      "entry.893066703",
      email || ""
    ]);

    // Phone Number
    googleFormData.push([
      "entry.762664935",
      phone || ""
    ]);

    // Residency
    googleFormData.push([
      "entry.777963996",
      residency || ""
    ]);

    // Birth Date
    googleFormData.push([
      "entry.16062350",
      birthDate || ""
    ]);

    // High School
    googleFormData.push([
      "entry.525139968",
      highSchool || ""
    ]);

    // University
    googleFormData.push([
      "entry.1951007764",
      university || ""
    ]);

    // Faculty
    googleFormData.push([
      "entry.943573766",
      faculty || ""
    ]);

    // Tutorial Year
    if (tutorialYear === "__other_option__") {
      googleFormData.push([
        "entry.914168470",
        "__other_option__"
      ]);

      googleFormData.push([
        "entry.914168470.other_option_response",
        tutorialYearOther || ""
      ]);
    } else {
      googleFormData.push([
        "entry.914168470",
        tutorialYear || ""
      ]);
    }

    // Instagram
    googleFormData.push([
      "entry.1224563023",
      instagram || ""
    ]);

    // What do you know about Enactus?
    googleFormData.push([
      "entry.1964115254",
      whatKnow || ""
    ]);

    // How do you know about it?
    googleFormData.push([
      "entry.211995956",
      howKnow || ""
    ]);

    // What makes Enactus Mansoura different?
    googleFormData.push([
      "entry.1600134367",
      difference || ""
    ]);

    // Why are you interested?
    googleFormData.push([
      "entry.212046804",
      interest || ""
    ]);

    // Previous volunteer work
    googleFormData.push([
      "entry.1208719334",
      volunteerWork || ""
    ]);

    // Strengths and weaknesses
    googleFormData.push([
      "entry.212781714",
      strengthWeakness || ""
    ]);

    // Team member or leader
    googleFormData.push([
      "entry.1706350781",
      teamPreference || ""
    ]);

    // When do you step into leadership?
    googleFormData.push([
      "entry.513669972",
      leadershipRole || ""
    ]);

    // Current availability
    googleFormData.push([
      "entry.1033504492",
      availability || ""
    ]);

    // Work-life balance
    googleFormData.push([
      "entry.1556742120",
      workLifeBalance || ""
    ]);

    // Current responsibilities
    googleFormData.push([
      "entry.1711800281",
      responsibilities || ""
    ]);

    // =========================
    // Fields
    // =========================

    let selectedFields = fields || [];

    if (!Array.isArray(selectedFields)) {
      selectedFields = [selectedFields];
    }

    selectedFields.forEach((field) => {
      if (field && field !== "__other_option__") {
        googleFormData.push([
          "entry.1842565250",
          field
        ]);
      }
    });

    // Other field
    if (selectedFields.includes("__other_option__")) {
      googleFormData.push([
        "entry.1842565250",
        "__other_option__"
      ]);

      googleFormData.push([
        "entry.1842565250.other_option_response",
        otherField || ""
      ]);
    }

    // Rate yourself / examples
    googleFormData.push([
      "entry.1891756682",
      fieldRating || ""
    ]);

    // What will you add?
    googleFormData.push([
      "entry.65505240",
      whatAdd || ""
    ]);

    // Learning new skills
    googleFormData.push([
      "entry.2032761895",
      learning || ""
    ]);

    // Reliable source
    googleFormData.push([
      "entry.14291829",
      reliableSource || ""
    ]);

    // Field vs online information
    googleFormData.push([
      "entry.1862403506",
      fieldVsOnline || ""
    ]);

    // Research / resourcefulness example
    googleFormData.push([
      "entry.1531088855",
      researchExample || ""
    ]);

    // Sponsor choice
    googleFormData.push([
      "entry.1093445631",
      sponsorChoice || ""
    ]);

    // Innovative solution
    googleFormData.push([
      "entry.517038073",
      innovativeSolution || ""
    ]);

    // Known field or new field
    googleFormData.push([
      "entry.139029733",
      knownOrNewField || ""
    ]);

    // Team behavior
    googleFormData.push([
      "entry.1710103116",
      teamBehavior || ""
    ]);

    // Independent or team
    googleFormData.push([
      "entry.1037119084",
      independentOrTeam || ""
    ]);

    // Criticism / feedback
    googleFormData.push([
      "entry.1782600271",
      criticism || ""
    ]);

    // Final question
    googleFormData.push([
      "entry.1261012492",
      ask || ""
    ]);

    // =========================
    // Convert data to URL encoded
    // =========================

    const postData = googleFormData
      .map(([key, value]) => {
        return (
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(value)
        );
      })
      .join("&");

    // =========================
    // Google Forms request
    // =========================

    const options = {
      hostname: "docs.google.com",

      path:
        "/forms/d/e/1FAIpQLSexkC04-UsvsQ18TmOOj4DVVaLPF7ulavqJBETLnmyMtSPTlA/formResponse",

      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",

        "Content-Length":
          Buffer.byteLength(postData),
      },
    };

    const request = https.request(
      options,
      (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          console.log(
            "Google Forms response:",
            response.statusCode
          );

          res.setHeader(
            "Content-Type",
            "text/html"
          );

          res.status(200).send(successPage);
        });
      }
    );

    request.on("error", (error) => {
      console.error(
        "Google Forms error:",
        error
      );

      res.setHeader(
        "Content-Type",
        "text/html"
      );

      res.status(500).send(failPage);
    });

    request.write(postData);
    request.end();
  });
};


// =========================
// Success Page
// =========================

const successPage = `
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    Thank You - Enactus Mansoura Recruitment 2027
  </title>

  <style>

    body {
      margin: 0;
      min-height: 100vh;

      display: flex;
      align-items: center;
      justify-content: center;

      font-family: Arial, sans-serif;

      background: #ffffff;
    }

    .container {
      text-align: center;
      padding: 40px;
    }

    h1 {
      font-size: 32px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
    }

  </style>

</head>

<body>

  <div class="container">

    <h1>
      Thank you for your interest in joining Enactus Mansoura!
    </h1>

    <p>
      Your application has been submitted successfully.
    </p>

  </div>

</body>

</html>
`;


// =========================
// Failure Page
// =========================

const failPage = `
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    Submission Failed - Enactus Mansoura
  </title>

  <style>

    body {
      margin: 0;
      min-height: 100vh;

      display: flex;
      align-items: center;
      justify-content: center;

      font-family: Arial, sans-serif;

      background: #ffffff;
    }

    .container {
      text-align: center;
      padding: 40px;
    }

    h1 {
      font-size: 32px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
    }

  </style>

</head>

<body>

  <div class="container">

    <h1>
      Something went wrong.
    </h1>

    <p>
      Please try again.
    </p>

  </div>

</body>

</html>
`;