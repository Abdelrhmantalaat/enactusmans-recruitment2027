const https = require("https");
const querystring = require("querystring");

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSexkC04-UsvsQ18TmOOj4DVVaLPF7ulavqJBETLnmyMtSPTlA/formResponse";

function getBody(req) {
  return new Promise((resolve, reject) => {
    // Vercel may already parse the body
    if (req.body && typeof req.body === "object") {
      resolve(req.body);
      return;
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(querystring.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

function sendSuccess(res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.end(successPage);
}

function sendFailure(res, statusCode = 500) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.end(failPage);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Method Not Allowed" }));
    return;
  }

  try {
    const parsedBody = await getBody(req);

    console.log("FORM DATA RECEIVED:");
    console.log(parsedBody);

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
      ask,
    } = parsedBody;

    const googleFormData = [];

    function addField(entry, value) {
      googleFormData.push([
        entry,
        value == null ? "" : String(value),
      ]);
    }

    // =========================
    // PERSONAL
    // =========================

    addField("entry.1884265043", name);
    addField("entry.893066703", email);
    addField("entry.762664935", phone);
    addField("entry.777963996", residency);
    addField("entry.16062350", birthDate);
    addField("entry.525139968", highSchool);

    // =========================
    // ACADEMIC
    // =========================

    addField("entry.1951007764", university);
    addField("entry.943573766", faculty);

    // Tutorial Year
    if (tutorialYear === "__other_option__") {
      addField("entry.914168470", "__other_option__");
      addField(
        "entry.914168470.other_option_response",
        tutorialYearOther
      );
    } else {
      addField("entry.914168470", tutorialYear);
    }

    addField("entry.1224563023", instagram);

    // =========================
    // OPEN QUESTIONS
    // =========================

    addField("entry.1964115254", whatKnow);
    addField("entry.211995956", howKnow);
    addField("entry.1600134367", difference);
    addField("entry.212046804", interest);
    addField("entry.1208719334", volunteerWork);
    addField("entry.212781714", strengthWeakness);
    addField("entry.1706350781", teamPreference);
    addField("entry.513669972", leadershipRole);
    addField("entry.1033504492", availability);
    addField("entry.1556742120", workLifeBalance);
    addField("entry.1711800281", responsibilities);

    // =========================
    // FIELDS
    // =========================

    let selectedFields = fields || [];

    if (!Array.isArray(selectedFields)) {
      selectedFields = [selectedFields];
    }

    selectedFields.forEach((field) => {
      if (field === "__other_option__") {
        addField(
          "entry.1842565250",
          "__other_option__"
        );

        addField(
          "entry.1842565250.other_option_response",
          otherField
        );
      } else if (field) {
        addField("entry.1842565250", field);
      }
    });

    // =========================
    // FIELD RATING
    // =========================

    addField("entry.1891756682", fieldRating);

    // =========================
    // REMAINING QUESTIONS
    // =========================

    addField("entry.65505240", whatAdd);
    addField("entry.2032761895", learning);
    addField("entry.14291829", reliableSource);
    addField("entry.1862403506", fieldVsOnline);
    addField("entry.1531088855", researchExample);
    addField("entry.1093445631", sponsorChoice);
    addField("entry.517038073", innovativeSolution);
    addField("entry.139029733", knownOrNewField);
    addField("entry.1710103116", teamBehavior);
    addField("entry.1037119084", independentOrTeam);
    addField("entry.1782600271", criticism);
    addField("entry.1261012492", ask);

    // =========================
    // CONVERT TO URL ENCODED
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

    console.log("Sending data to Google Forms...");

    // =========================
    // SEND TO GOOGLE FORMS
    // =========================

    const googleResponse = await new Promise(
      (resolve, reject) => {
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
            let responseData = "";

            response.on("data", (chunk) => {
              responseData += chunk;
            });

            response.on("end", () => {
              resolve({
                statusCode: response.statusCode,
                body: responseData,
              });
            });
          }
        );

        request.on("error", reject);

        request.write(postData);
        request.end();
      }
    );

    console.log(
      "Google Forms response:",
      googleResponse.statusCode
    );

    // Google Forms normally returns 200 or 3xx
    if (
      googleResponse.statusCode >= 200 &&
      googleResponse.statusCode < 400
    ) {
      sendSuccess(res);
    } else {
      console.error(
        "Google Forms rejected submission:",
        googleResponse.statusCode
      );

      sendFailure(res, 502);
    }
  } catch (error) {
    console.error("SUBMISSION ERROR:", error);

    sendFailure(res, 500);
  }
};

// =========================
// SUCCESS PAGE
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
// FAILURE PAGE
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